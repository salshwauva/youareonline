import React from 'react';
import { Terminal, CheckCircle2, XCircle, Clock, Sparkles } from 'lucide-react';

export default function ConsoleOutput({ output, testResults, isRunning, executionTime }) {
  const allTestsPassed = testResults && testResults.length > 0 && testResults.every(t => t.passed);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#fff0f5',
      border: '2px solid #fbcfe8',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(251, 207, 232, 0.2)'
    }}>
      {/* Console Header */}
      <div style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        padding: '10px 16px',
        background: '#fce7f3',
        borderBottom: '1.5px solid #fbcfe8'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#be185d', fontFamily: 'var(--font-retro)', fontWeight: 700 }}>
          <Terminal size={16} /> TEST HARNESS CONSOLE 🎀
        </div>
        
        {executionTime !== null && (
          <div style={{ fontSize: '0.7rem', color: '#9d4b6e', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <Clock size={12} /> {executionTime}ms
          </div>
        )}
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
        gap: '12px'
      }}>
        {isRunning ? (
          <div style={{ color: '#be185d', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
            <Sparkles size={16} className="animate-spin" /> Compiling & running test harness against synthetic data... ✨
          </div>
        ) : (
          <>
            {/* Standard Output */}
            {output && (
              <div>
                <div style={{ color: '#9d4b6e', fontSize: '0.7rem', marginBottom: '4px', fontWeight: 600 }}>// STDOUT LOGS</div>
                <pre style={{ color: '#831843', background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #fbcfe8', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {output}
                </pre>
              </div>
            )}

            {/* Test Results */}
            {testResults && testResults.length > 0 && (
              <div>
                <div style={{ color: '#9d4b6e', fontSize: '0.7rem', marginBottom: '6px', fontWeight: 600 }}>// ASSERTION TEST RESULTS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {testResults.map((test, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      background: test.passed ? '#ecfdf5' : '#fff1f2',
                      border: `1.5px solid ${test.passed ? '#10b981' : '#f43f5e'}`,
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      {test.passed ? <CheckCircle2 size={16} color="#10b981" /> : <XCircle size={16} color="#f43f5e" />}
                      <span style={{ color: test.passed ? '#065f46' : '#9f1239' }}>
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
                background: 'linear-gradient(135deg, #fce7f3, #f3e8ff)',
                border: '2px solid #f472b6',
                borderRadius: '8px',
                textAlign: 'center',
                fontFamily: 'var(--font-retro)',
                color: '#be185d',
                fontSize: '0.85rem'
              }}>
                🎉 QUEST PASSED! +XP EARNED! 🌸
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
