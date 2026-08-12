import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, Sparkles } from 'lucide-react';
import { evaluateQuiz } from '../../utils/evaluator';

export default function QuizRunner({ quizData, onPass }) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  if (!quizData) return null;

  const handleSubmit = () => {
    if (selectedIdx === null) return;
    const res = evaluateQuiz(selectedIdx, quizData.correctOptionIndex);
    setResult(res);
    setSubmitted(true);
    if (res.isCorrect && onPass) {
      onPass();
    }
  };

  const handleReset = () => {
    setSelectedIdx(null);
    setSubmitted(false);
    setResult(null);
  };

  return (
    <div className="retro-window" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="retro-titlebar retro-titlebar-yellow">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HelpCircle size={16} />
          <span>Interactive Knowledge Check Quiz</span>
        </div>
        <div className="retro-controls">
          <span className="retro-win-box">_</span>
          <span className="retro-win-box">▢</span>
          <span className="retro-win-box">✕</span>
        </div>
      </div>

      <div style={{ padding: '24px', background: '#ffffff', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        
        {/* Question Box */}
        <div style={{ padding: '16px', background: '#eef3fc', border: '2px solid #222638', borderRadius: '4px', boxShadow: '3px 3px 0px #222638' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#7c8cc6', textTransform: 'uppercase' }}>
            Conceptual Question ✨
          </span>
          <h3 style={{ fontSize: '1.05rem', color: '#222638', marginTop: '6px', lineHeight: 1.5 }}>
            {quizData.question}
          </h3>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {quizData.options.map((option, idx) => {
            const isSelected = selectedIdx === idx;
            let btnStyle = { background: '#ffffff', borderColor: '#222638' };
            
            if (submitted) {
              if (idx === quizData.correctOptionIndex) {
                btnStyle = { background: '#dcfce7', borderColor: '#16a34a', color: '#15803d' };
              } else if (isSelected) {
                btnStyle = { background: '#fee2e2', borderColor: '#dc2626', color: '#b91c1c' };
              }
            } else if (isSelected) {
              btnStyle = { background: '#fbcfe8', borderColor: '#222638' };
            }

            return (
              <button
                key={idx}
                disabled={submitted}
                onClick={() => setSelectedIdx(idx)}
                className="retro-window retro-window-interactive"
                style={{
                  padding: '14px 18px',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: submitted ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  ...btnStyle
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid #222638',
                  background: isSelected ? '#ff69b4' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#222638',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span style={{ flex: 1 }}>{option}</span>
                {submitted && idx === quizData.correctOptionIndex && (
                  <CheckCircle2 size={20} color="#16a34a" />
                )}
                {submitted && isSelected && idx !== quizData.correctOptionIndex && (
                  <XCircle size={20} color="#dc2626" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedIdx === null}
              className="retro-btn retro-btn-pink"
              style={{ padding: '10px 24px', fontSize: '0.88rem' }}
            >
              <Sparkles size={16} /> Submit Answer
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="retro-btn retro-btn-blue"
              style={{ padding: '8px 18px', fontSize: '0.82rem' }}
            >
              Try Again
            </button>
          )}
        </div>

        {/* Feedback & Explanation Box */}
        {submitted && result && (
          <div style={{
            padding: '16px',
            borderRadius: '4px',
            border: '2px solid #222638',
            background: result.isCorrect ? '#f0fdf4' : '#fff1f2',
            boxShadow: '3px 3px 0px #222638',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: result.isCorrect ? '#15803d' : '#b91c1c' }}>
              {result.feedback}
            </div>
            {quizData.explanation && (
              <p style={{ fontSize: '0.85rem', color: '#222638', lineHeight: 1.5 }}>
                💡 <strong>Explanation:</strong> {quizData.explanation}
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
