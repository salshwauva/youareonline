import React, { useState, useEffect, useRef } from 'react';
import { Eye, RefreshCw, Terminal, CheckCircle2, XCircle } from 'lucide-react';

export default function WebPreview({ code, testCases = [], onPass }) {
  const iframeRef = useRef(null);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'tests'

  useEffect(() => {
    runPreview();
  }, [code]);

  const runPreview = () => {
    setConsoleLogs([]);
    const tests = [];

    // Evaluate code against test cases (e.g. check if code includes specific CSS or HTML tags)
    testCases.forEach((tc, idx) => {
      let passed = false;
      try {
        if (typeof tc.check === 'function') {
          passed = Boolean(tc.check(code));
        } else if (typeof tc.check === 'string') {
          const regex = new RegExp(tc.check, 'i');
          passed = regex.test(code);
        }
      } catch (err) {
        passed = false;
      }
      tests.push({ id: idx, name: tc.name, passed });
    });

    setTestResults(tests);

    const allPassed = tests.length > 0 && tests.every(t => t.passed);
    if (allPassed && onPass) {
      onPass();
    }

    // Build iframe HTML wrapper with captured console log
    const fullDocument = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: 'Trebuchet MS', sans-serif; padding: 16px; margin: 0; background: #ffffff; color: #222638; }
          </style>
        </head>
        <body>
          ${code}
          <script>
            (function() {
              const _log = console.log;
              console.log = function(...args) {
                _log.apply(console, args);
                window.parent.postMessage({ type: 'CONSOLE_LOG', text: args.join(' ') }, '*');
              };
              window.onerror = function(msg) {
                window.parent.postMessage({ type: 'CONSOLE_LOG', text: 'Error: ' + msg }, '*');
              };
            })();
          </script>
        </body>
      </html>
    `;

    if (iframeRef.current) {
      iframeRef.current.srcdoc = fullDocument;
    }
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'CONSOLE_LOG') {
        setConsoleLogs(prev => [...prev, event.data.text]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="retro-window" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="retro-titlebar retro-titlebar-pink">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Eye size={16} />
          <span>Live Web Sandbox & DOM Inspector</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={runPreview} className="retro-btn" style={{ padding: '2px 8px', fontSize: '0.72rem' }}>
            <RefreshCw size={12} /> Refresh
          </button>
          <div className="retro-controls">
            <span className="retro-win-box">_</span>
            <span className="retro-win-box">▢</span>
            <span className="retro-win-box">✕</span>
          </div>
        </div>
      </div>

      {/* Sub tabs */}
      <div style={{ display: 'flex', background: '#f1f5f9', borderBottom: '2px solid #222638', padding: '6px 12px', gap: '8px' }}>
        <button
          onClick={() => setActiveTab('preview')}
          className={`retro-btn ${activeTab === 'preview' ? 'retro-btn-pink' : ''}`}
          style={{ fontSize: '0.75rem', padding: '4px 10px' }}
        >
          🌐 Live Browser View
        </button>
        <button
          onClick={() => setActiveTab('tests')}
          className={`retro-btn ${activeTab === 'tests' ? 'retro-btn-blue' : ''}`}
          style={{ fontSize: '0.75rem', padding: '4px 10px' }}
        >
          🧪 DOM Test Assertions ({testResults.filter(t => t.passed).length}/{testResults.length})
        </button>
      </div>

      <div style={{ flex: 1, position: 'relative', background: '#ffffff' }}>
        {activeTab === 'preview' ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <iframe
              ref={iframeRef}
              title="Web Preview Sandbox"
              style={{ flex: 1, width: '100%', border: 'none', background: '#ffffff' }}
              sandbox="allow-scripts"
            />
            {consoleLogs.length > 0 && (
              <div style={{ background: '#1e293b', color: '#38bdf8', padding: '8px 12px', fontSize: '0.75rem', fontFamily: 'var(--font-code)', borderTop: '2px solid #222638', maxHeight: '100px', overflowY: 'auto' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Terminal size={12} /> Browser Console:
                </div>
                {consoleLogs.map((log, i) => (
                  <div key={i}>&gt; {log}</div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '0.88rem', color: '#222638' }}>DOM & Code Validation Requirements:</h4>
            {testResults.map((t) => (
              <div
                key={t.id}
                style={{
                  padding: '10px 14px',
                  borderRadius: '4px',
                  border: '2px solid #222638',
                  background: t.passed ? '#f0fdf4' : '#fef2f2',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: t.passed ? '#15803d' : '#b91c1c'
                }}
              >
                {t.passed ? <CheckCircle2 size={18} color="#16a34a" /> : <XCircle size={18} color="#dc2626" />}
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
