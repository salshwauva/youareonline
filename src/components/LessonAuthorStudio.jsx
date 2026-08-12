import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Copy, Download, Code, Eye, HelpCircle, Check, Terminal } from 'lucide-react';
import CodeEditor from './CodeEditor';

export default function LessonAuthorStudio({ onBackToCatalog }) {
  const [courseId, setCourseId] = useState('javascript-course');
  const [chapterTitle, setChapterTitle] = useState('Chapter 1: Intro');
  const [lessonId, setLessonId] = useState('my-new-lesson');
  const [lessonTitle, setLessonTitle] = useState('1.1 My Custom Lesson');
  const [type, setType] = useState('code');
  const [xp, setXp] = useState(50);
  const [theory, setTheory] = useState('## Intro to Concept\n\nExplain your concept here with code snippets!');
  const [instructions, setInstructions] = useState('Follow the steps to complete the exercise.');
  const [starterCode, setStarterCode] = useState('// Write code here');
  const [solutionCode, setSolutionCode] = useState('// Solution code here');
  const [testName, setTestName] = useState('Code includes keyword');
  const [testPattern, setTestPattern] = useState('console.log');
  
  const [copied, setCopied] = useState(false);

  const generateLessonJSON = () => {
    return JSON.stringify({
      id: lessonId,
      title: lessonTitle,
      type: type,
      xp: Number(xp),
      theory: theory,
      instructions: instructions,
      starterCode: starterCode,
      solutionCode: solutionCode,
      testCases: [
        { name: testName, check: testPattern }
      ]
    }, null, 2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateLessonJSON());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBackToCatalog} className="retro-btn retro-btn-blue">
          <ArrowLeft size={14} /> Back to Catalog
        </button>

        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#222638' }}>
          ⚡ Curriculum Authoring & Lesson Builder Studio
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '45% 55%', gap: '20px' }}>
        
        {/* Form Controls */}
        <div className="retro-window">
          <div className="retro-titlebar retro-titlebar-pink">
            <span>Draft Lesson Metadata</span>
            <div className="retro-controls">
              <span className="retro-win-box">_</span>
              <span className="retro-win-box">▢</span>
              <span className="retro-win-box">✕</span>
            </div>
          </div>

          <div style={{ padding: '20px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#222638' }}>TARGET COURSE ID:</label>
              <input
                type="text"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                style={{ width: '100%', padding: '6px 10px', marginTop: '4px', border: '2px solid #222638', borderRadius: '4px', fontFamily: 'var(--font-code)' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#222638' }}>LESSON ID:</label>
                <input
                  type="text"
                  value={lessonId}
                  onChange={(e) => setLessonId(e.target.value)}
                  style={{ width: '100%', padding: '6px 10px', marginTop: '4px', border: '2px solid #222638', borderRadius: '4px', fontFamily: 'var(--font-code)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#222638' }}>EXERCISE TYPE:</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  style={{ width: '100%', padding: '6px 10px', marginTop: '4px', border: '2px solid #222638', borderRadius: '4px', fontWeight: 'bold' }}
                >
                  <option value="code">Code Challenge</option>
                  <option value="web-preview">HTML/CSS Web Preview</option>
                  <option value="quiz">Interactive Quiz</option>
                  <option value="fill-blank">Fill in the Blank</option>
                  <option value="simulator">Interactive Simulator</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#222638' }}>LESSON TITLE:</label>
              <input
                type="text"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                style={{ width: '100%', padding: '6px 10px', marginTop: '4px', border: '2px solid #222638', borderRadius: '4px', fontWeight: 'bold' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#222638' }}>THEORY MARKDOWN:</label>
              <textarea
                rows={4}
                value={theory}
                onChange={(e) => setTheory(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', marginTop: '4px', border: '2px solid #222638', borderRadius: '4px', fontFamily: 'var(--font-code)', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#222638' }}>INSTRUCTIONS:</label>
              <input
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                style={{ width: '100%', padding: '6px 10px', marginTop: '4px', border: '2px solid #222638', borderRadius: '4px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#222638' }}>STARTER CODE:</label>
              <textarea
                rows={4}
                value={starterCode}
                onChange={(e) => setStarterCode(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', marginTop: '4px', border: '2px solid #222638', borderRadius: '4px', fontFamily: 'var(--font-code)', fontSize: '0.85rem' }}
              />
            </div>

          </div>
        </div>

        {/* JSON Export Output */}
        <div className="retro-window">
          <div className="retro-titlebar retro-titlebar-yellow">
            <span>Exported Lesson Schema (JSON)</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={handleCopy} className="retro-btn" style={{ padding: '2px 8px', fontSize: '0.72rem' }}>
                {copied ? <Check size={12} color="#16a34a" /> : <Copy size={12} />} {copied ? 'Copied!' : 'Copy JSON'}
              </button>
            </div>
          </div>

          <div style={{ padding: '20px', background: '#1e293b', color: '#38bdf8', fontFamily: 'var(--font-code)', fontSize: '0.88rem', height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
              {generateLessonJSON()}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
