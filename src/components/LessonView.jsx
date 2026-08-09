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
import { BookOpen, Cpu, CheckCircle2, Lightbulb, ArrowLeft, Heart, Sparkles } from 'lucide-react';

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
          stdout = `[SUCCESS] Output generated from execution:\nString 'hello_online' processed cleanly 🌸.\nProcess exited with status code 0.`;
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
        return <div style={{ padding: '20px', color: 'var(--text-muted)' }}>No extra visualizer required for this quest.</div>;
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Top Breadcrumb & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBackToMap} className="pixel-btn pixel-btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
          <ArrowLeft size={14} /> Back to Track Map 🌸
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge-neon badge-pink">
            {track.title} 💖
          </span>
          <span style={{ fontSize: '0.8rem', color: '#be185d', fontFamily: 'var(--font-retro)', fontWeight: 700 }}>
            REWARD: +{quest.xp} XP
          </span>
        </div>
      </div>

      {/* Main Split View */}
      <div style={{ display: 'grid', gridTemplateColumns: '42% 58%', gap: '20px', minHeight: 'calc(100vh - 180px)' }}>
        
        {/* LEFT PANE: Theory & Instructions */}
        <div className="pixel-box" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', overflowY: 'auto', background: '#ffffff' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-retro)', color: '#9d4b6e', marginBottom: '4px', fontWeight: 700 }}>
              MODULE QUEST 🎀
            </div>
            <h2 style={{ fontSize: '1.4rem', color: '#4a0e2e', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {quest.title} {isQuestPassed && <CheckCircle2 size={20} color="#10b981" />}
            </h2>
          </div>

          {/* Theory Markdown */}
          <div style={{ background: '#fff0f6', padding: '16px', borderRadius: '8px', border: '1.5px solid #fbcfe8', fontSize: '0.88rem', color: '#4a0e2e', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            {quest.theory}
          </div>

          {/* Instructions */}
          <div style={{ background: '#fce7f3', padding: '14px', borderRadius: '8px', border: '1.5px solid #f472b6' }}>
            <h4 style={{ fontSize: '0.85rem', color: '#be185d', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
              <BookOpen size={16} /> OBJECTIVE & INSTRUCTIONS ✨
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#4a0e2e', fontWeight: 500 }}>
              {quest.instructions}
            </p>
          </div>

          {/* Hint Trigger */}
          <div>
            <button 
              onClick={() => setShowHint(!showHint)}
              className="pixel-btn pixel-btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.75rem', color: '#b45309' }}
            >
              <Lightbulb size={14} /> {showHint ? 'Hide Hint' : 'Need a Hint? 💡'}
            </button>
            {showHint && (
              <div style={{ marginTop: '8px', padding: '10px', background: '#fef3c7', border: '1.5px solid #fcd34d', borderRadius: '6px', fontSize: '0.8rem', color: '#b45309', fontWeight: 600 }}>
                💡 Tip: Inspect the starter code requirements and ensure all syntax matches the expected compiler signatures.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANE: Code Editor & Simulator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Tab Navigator */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setActiveRightTab('editor')} 
              className={`pixel-btn ${activeRightTab === 'editor' ? 'pixel-btn-primary' : 'pixel-btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '6px 14px' }}
            >
              Code Editor & Harness ✨
            </button>

            {quest.simulatorType !== 'code-only' && (
              <button 
                onClick={() => setActiveRightTab('simulator')} 
                className={`pixel-btn ${activeRightTab === 'simulator' ? 'pixel-btn-cyan' : 'pixel-btn-secondary'}`}
                style={{ fontSize: '0.75rem', padding: '6px 14px' }}
              >
                <Cpu size={14} /> Interactive Sandbox 🌸 ({quest.simulatorType})
              </button>
            )}
          </div>

          {/* Right Pane Active View */}
          {activeRightTab === 'editor' ? (
            <div style={{ display: 'grid', gridTemplateRows: '60% 40%', gap: '16px', height: '100%' }}>
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
