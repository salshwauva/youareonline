import React from 'react';
import { Terminal, CheckCircle2, XCircle, Clock, Activity } from 'lucide-react';

export default function ConsoleOutput({ output, testResults, isRunning, executionTime }) {
  const allTestsPassed = testResults && testResults.length > 0 && testResults.every(t => t.passed);

  return (
    <div className="retro-window" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Console Header Bar */}
      <div className="retro-titlebar retro-titlebar-yellow">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
          <Terminal size={16} /> Console Output & Test Harness
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {executionTime !== null && (
            <div style={{ fontSize: '0.72rem', color: '#222638', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
              <Clock size={12} /> {executionTime}ms
            </div>
          )}
          <div className="retro-controls">
            <span className="retro-win-box">_</span>
            <span className="retro-win-box">▢</span>
            <span className="retro-win-box">✕</span>
          </div>
        </div>
      </div>

      {/* Output Console Log */}
      <div style={{
        flex: 1,
        padding: '12px 16px',
        fontFamily: 'var(--font-code)',
        fontSize: '0.82rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: '#222638'
      }}>
        {isRunning ? (
          <div style={{ color: '#fbcfe8', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
            <Activity size={16} className="animate-spin" /> Running test harness...
          </div>
        ) : (
          <>
            {/* Standard Output */}
            {output && (
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginBottom: '4px', fontWeight: 'bold' }}>// STDOUT LOGS</div>
                <pre style={{ color: '#a7f3d0', background: '#1a1d2b', padding: '10px', borderRadius: '4px', border: '1px solid #33394f', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {output}
                </pre>
              </div>
            )}

            {/* Test Results */}
            {testResults && testResults.length > 0 && (
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginBottom: '6px', fontWeight: 'bold' }}>// ASSERTION TEST RESULTS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {testResults.map((test, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      background: test.passed ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      border: `1.5px solid ${test.passed ? '#22c55e' : '#ef4444'}`,
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {test.passed ? <CheckCircle2 size={16} color="#22c55e" /> : <XCircle size={16} color="#ef4444" />}
                      <span style={{ color: test.passed ? '#4ade80' : '#f87171' }}>
                        {test.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {allTestsPassed && (
              <div style={{
                marginTop: '8px',
                padding: '12px',
                background: '#fbcfe8',
                border: '2px solid #222638',
                borderRadius: '4px',
                textAlign: 'center',
                color: '#222638',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                boxShadow: '2px 2px 0px #222638'
              }}>
                🎉 QUEST PASSED! +XP EARNED & BADGE UNLOCKED! ✨
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
