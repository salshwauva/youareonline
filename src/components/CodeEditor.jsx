import React, { useState } from 'react';
import { Play, Copy, Code, Sparkles } from 'lucide-react';

export default function CodeEditor({ code, onChange, onRun, language = 'javascript' }) {
  const [copied, setCopied] = useState(false);

  const lines = code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#faf5ff',
      border: '2px solid #f0abfc',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(240, 171, 252, 0.2)'
    }}>
      {/* Editor Header */}
      <div style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        padding: '10px 16px',
        background: '#f3e8ff',
        borderBottom: '1.5px solid #e9d5ff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#7e22ce', fontFamily: 'var(--font-retro)', fontWeight: 700 }}>
          <Code size={16} /> CODE EDITOR 💕 ({language.toUpperCase()})
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleCopy} className="pixel-btn pixel-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.7rem' }}>
            <Copy size={12} /> {copied ? 'Copied 🌸' : 'Copy'}
          </button>
          <button onClick={onRun} className="pixel-btn pixel-btn-primary" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>
            <Play size={14} /> Run Code & Test ✨
          </button>
        </div>
      </div>

      {/* Editor Body with Line Numbers */}
      <div style={{ display: 'flex', flex: 1, position: 'relative', overflow: 'hidden' }}>
        
        {/* Line Numbers */}
        <div style={{
          width: '42px',
          background: '#f3e8ff',
          color: '#c084fc',
          padding: '12px 0',
          textAlign: 'right',
          paddingRight: '12px',
          fontFamily: 'var(--font-code)',
          fontSize: '0.85rem',
          fontWeight: 600,
          userSelect: 'none',
          borderRight: '1.5px solid #e9d5ff'
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
            color: '#3b0764',
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
