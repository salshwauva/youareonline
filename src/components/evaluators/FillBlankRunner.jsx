import React, { useState } from 'react';
import { Puzzle, CheckCircle2, RefreshCw } from 'lucide-react';
import { evaluateFillBlank } from '../../utils/evaluator';

export default function FillBlankRunner({ fillData, onPass }) {
  const [tokens, setTokens] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  if (!fillData) return null;

  const handleChange = (idx, value) => {
    setTokens(prev => ({ ...prev, [idx]: value }));
  };

  const handleSubmit = () => {
    const userArray = fillData.blanks.map((_, idx) => tokens[idx] || '');
    const res = evaluateFillBlank(userArray, fillData.correctTokens);
    setIsCorrect(res.isCorrect);
    setSubmitted(true);

    if (res.isCorrect && onPass) {
      onPass();
    }
  };

  const handleReset = () => {
    setTokens({});
    setSubmitted(false);
    setIsCorrect(null);
  };

  return (
    <div className="retro-window" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="retro-titlebar retro-titlebar-pink">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Puzzle size={16} />
          <span>Code Puzzle: Fill in the Blanks</span>
        </div>
        <div className="retro-controls">
          <span className="retro-win-box">_</span>
          <span className="retro-win-box">▢</span>
          <span className="retro-win-box">✕</span>
        </div>
      </div>

      <div style={{ padding: '24px', background: '#ffffff', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        
        <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.5 }}>
          {fillData.instructions || 'Fill in the missing code tokens below to complete the snippet correctly:'}
        </p>

        {/* Code Snippet Box */}
        <div style={{ padding: '20px', background: '#1e293b', borderRadius: '4px', border: '2px solid #222638', fontFamily: 'var(--font-code)', fontSize: '0.95rem', color: '#f8fafc', lineHeight: 1.8 }}>
          {fillData.templateParts.map((part, idx) => (
            <React.Fragment key={idx}>
              <span>{part}</span>
              {idx < fillData.blanks.length && (
                <input
                  type="text"
                  value={tokens[idx] || ''}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  placeholder={`[${fillData.blanks[idx].hint || 'blank'}]`}
                  disabled={submitted && isCorrect}
                  style={{
                    padding: '4px 8px',
                    margin: '0 4px',
                    background: '#ffffff',
                    color: '#222638',
                    border: '2px solid #ff69b4',
                    borderRadius: '3px',
                    fontFamily: 'var(--font-code)',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    width: `${Math.max(80, (tokens[idx] || '').length * 12 + 20)}px`
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleSubmit}
            className="retro-btn retro-btn-pink"
            style={{ padding: '8px 20px', fontSize: '0.85rem' }}
          >
            Check Puzzle Solution 🧩
          </button>
          {submitted && (
            <button
              onClick={handleReset}
              className="retro-btn retro-btn-blue"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              <RefreshCw size={14} /> Reset
            </button>
          )}
        </div>

        {/* Result Message */}
        {submitted && (
          <div style={{
            padding: '14px',
            borderRadius: '4px',
            border: '2px solid #222638',
            background: isCorrect ? '#f0fdf4' : '#fff1f2',
            color: isCorrect ? '#15803d' : '#b91c1c',
            fontWeight: 'bold',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {isCorrect ? (
              <>
                <CheckCircle2 size={18} />
                <span>Awesome! All tokens matched the solution code correctly.</span>
              </>
            ) : (
              <span>Some blanks need tweaking. Check spelling and syntax!</span>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
