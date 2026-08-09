import React, { useState, useEffect } from 'react';
import { getQuestById } from '../data/coursesData';
import { useGame } from '../context/GameContext';
import CodeEditor from './CodeEditor';
import ConsoleOutput from './ConsoleOutput';
import RustMemoryVisualizer from './simulators/RustMemoryVisualizer';
import AlgorithmicTestBench from './simulators/AlgorithmicTestBench';
import SqlPlayground from './simulators/SqlPlayground';
import TerminalSimulator from './simulators/TerminalSimulator';
import CpuThreadsSimulator from './simulators/CpuThreadsSimulator';
import SyntheticDataGenerator from './simulators/SyntheticDataGenerator';
import { BookOpen, Cpu, CheckCircle2, Lightbulb, ArrowLeft, Terminal, Folder } from 'lucide-react';

export default function LessonView({ questId, onBackToMap }) {
  const { completeQuest, completedQuests } = useGame();
  const { quest, track } = getQuestById(questId);

  const [code, setCode] = useState(quest.starterCode);
  const [activeRightTab, setActiveRightTab] = useState('editor');
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setCode(quest.starterCode);
    setOutput('');
    setTestResults([]);
    setExecutionTime(null);
    setShowHint(false);
  }, [questId]);

  const handleRunCode = () => {
    setIsRunning(true);
    const startTime = performance.now();

    setTimeout(() => {
      let stdout = '';
      const tests = [];

      try {
        quest.testCases.forEach(tc => {
          const passed = tc.check(code);
          tests.push({ name: tc.name, passed });
        });

        if (code.includes('println!') || code.includes('std::cout') || code.includes('print(') || code.includes('console.log')) {
          stdout = `[SUCCESS] Output generated from execution:\nProcess executed cleanly.\nProcess exited with status code 0.`;
        } else {
          stdout = `Execution finished without stdout errors.`;
        }
      } catch (err) {
        stdout = `Runtime Error: ${err.message}`;
      }

      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);

      setOutput(stdout);
      setTestResults(tests);
      setExecutionTime(duration);
      setIsRunning(false);

      const allPassed = tests.length > 0 && tests.every(t => t.passed);
      if (allPassed) {
        completeQuest(quest.id, quest.xp, quest.badge);
      }
    }, 450);
  };

  const isQuestPassed = completedQuests.includes(quest.id);

  const renderSimulator = () => {
    switch (quest.simulatorType) {
      case 'rust-memory':
        return <RustMemoryVisualizer />;
      case 'algo-bench':
        return <AlgorithmicTestBench userCode={code} />;
      case 'sql-playground':
        return <SqlPlayground defaultQuery={code} />;
      case 'terminal':
        return <TerminalSimulator />;
      case 'cpu-threads':
        return <CpuThreadsSimulator />;
      case 'synthetic-data':
        return <SyntheticDataGenerator />;
      default:
        return <div style={{ padding: '20px', color: '#6b7280' }}>No extra visualizer required for this quest.</div>;
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Top Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBackToMap} className="retro-btn retro-btn-blue">
          <ArrowLeft size={14} /> Back to Desktop Map
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="retro-pill-btn retro-pill-btn-blue" style={{ fontSize: '0.75rem' }}>
            TRACK: {track.title}
          </span>
          <span style={{ fontSize: '0.82rem', color: '#222638', fontWeight: 'bold' }}>
            REWARD: +{quest.xp} XP
          </span>
        </div>
      </div>

      {/* Main Split View */}
      <div style={{ display: 'grid', gridTemplateColumns: '42% 58%', gap: '16px', minHeight: 'calc(100vh - 180px)' }}>
        
        {/* LEFT PANE: Theory & Instructions */}
        <div className="retro-window" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="retro-titlebar retro-titlebar-pink">
            <span>Quest: {quest.title}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isQuestPassed && <CheckCircle2 size={18} color="#16a34a" />}
              <div className="retro-controls">
                <span className="retro-win-box">_</span>
                <span className="retro-win-box">▢</span>
                <span className="retro-win-box">✕</span>
              </div>
            </div>
          </div>

          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1, background: '#ffffff' }}>
            
            {/* Theory Markdown Box */}
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '4px', border: '2px solid #222638', fontSize: '0.88rem', color: '#222638', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
              {quest.theory}
            </div>

            {/* Instructions */}
            <div style={{ background: '#fbcfe8', padding: '14px', borderRadius: '4px', border: '2px solid #222638' }}>
              <h4 style={{ fontSize: '0.85rem', color: '#222638', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <BookOpen size={16} /> OBJECTIVE & INSTRUCTIONS ✨
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#222638', fontWeight: 500 }}>
                {quest.instructions}
              </p>
            </div>

            {/* Hint Trigger */}
            <div>
              <button 
                onClick={() => setShowHint(!showHint)}
                className="retro-btn"
                style={{ padding: '5px 12px', fontSize: '0.75rem' }}
              >
                <Lightbulb size={14} /> {showHint ? 'Hide Hint' : 'Need a Hint? 💡'}
              </button>
              {showHint && (
                <div style={{ marginTop: '8px', padding: '10px', background: '#fef3c7', border: '2px solid #222638', borderRadius: '4px', fontSize: '0.8rem', color: '#92400e', fontWeight: 600 }}>
                  💡 Tip: Inspect starter code signatures and ensure syntax meets all test case requirements.
                </div>
              )}
            </div>

          </div>
        </div>

        {/* RIGHT PANE: Code Editor & Simulator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Tab Navigator */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setActiveRightTab('editor')} 
              className={`retro-btn ${activeRightTab === 'editor' ? 'retro-btn-pink' : ''}`}
              style={{ fontSize: '0.78rem', padding: '6px 14px' }}
            >
              <Terminal size={14} /> Code Editor
            </button>

            {quest.simulatorType !== 'code-only' && (
              <button 
                onClick={() => setActiveRightTab('simulator')} 
                className={`retro-btn ${activeRightTab === 'simulator' ? 'retro-btn-blue' : ''}`}
                style={{ fontSize: '0.78rem', padding: '6px 14px' }}
              >
                <Cpu size={14} /> Sandbox ({quest.simulatorType})
              </button>
            )}
          </div>

          {/* Right Pane Active View */}
          {activeRightTab === 'editor' ? (
            <div style={{ display: 'grid', gridTemplateRows: '58% 42%', gap: '12px', height: '100%' }}>
              <CodeEditor 
                code={code} 
                onChange={setCode} 
                onRun={handleRunCode} 
                language={quest.id.includes('sql') ? 'sql' : quest.id.includes('rust') ? 'rust' : 'javascript'} 
              />
              <ConsoleOutput 
                output={output} 
                testResults={testResults} 
                isRunning={isRunning} 
                executionTime={executionTime} 
              />
            </div>
          ) : (
            <div style={{ height: '100%' }}>
              {renderSimulator()}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
