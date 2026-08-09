import React, { useState } from 'react';
import { Play, Copy, Code } from 'lucide-react';

export default function CodeEditor({ code, onChange, onRun, language = 'javascript' }) {
  const [copied, setCopied] = useState(false);

  const lines = code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="retro-window" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Editor Header Bar */}
      <div className="retro-titlebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
          <Code size={16} /> CODE EDITOR [{language.toUpperCase()}]
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={handleCopy} className="retro-btn" style={{ padding: '3px 8px', fontSize: '0.72rem' }}>
            <Copy size={12} /> {copied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={onRun} className="retro-btn retro-btn-pink" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
            <Play size={14} /> Run Code
          </button>
          <div className="retro-controls">
            <span className="retro-win-box">_</span>
            <span className="retro-win-box">▢</span>
            <span className="retro-win-box">✕</span>
          </div>
        </div>
      </div>

      {/* Editor Body */}
      <div style={{ display: 'flex', flex: 1, position: 'relative', overflow: 'hidden', background: '#222638' }}>
        
        {/* Line Numbers */}
        <div style={{
          width: '42px',
          background: '#1a1d2b',
          color: '#94a3b8',
          padding: '12px 0',
          textAlign: 'right',
          paddingRight: '10px',
          fontFamily: 'var(--font-code)',
          fontSize: '0.85rem',
          fontWeight: 600,
          userSelect: 'none',
          borderRight: '1px solid #33394f'
        }}>
          {lines.map((_, i) => (
            <div key={i} style={{ height: '22px', lineHeight: '22px' }}>{i + 1}</div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          style={{
            flex: 1,
            background: 'transparent',
            color: '#fbcfe8',
            fontFamily: 'var(--font-code)',
            fontSize: '0.88rem',
            fontWeight: 500,
            lineHeight: '22px',
            padding: '12px',
            border: 'none',
            outline: 'none',
            resize: 'none',
            whiteSpace: 'pre',
            tabSize: 4
          }}
        />
      </div>
    </div>
  );
}
