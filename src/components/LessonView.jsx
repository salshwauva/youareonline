import React, { useState, useEffect } from 'react';
import { getLessonById, getAdjacentLessons } from '../data/courseRegistry';
import { useGame } from '../context/GameContext';
import CodeEditor from './CodeEditor';
import ConsoleOutput from './ConsoleOutput';
import WebPreview from './evaluators/WebPreview';
import QuizRunner from './evaluators/QuizRunner';
import FillBlankRunner from './evaluators/FillBlankRunner';

import RustMemoryVisualizer from './simulators/RustMemoryVisualizer';
import AlgorithmicTestBench from './simulators/AlgorithmicTestBench';
import SqlPlayground from './simulators/SqlPlayground';
import TerminalSimulator from './simulators/TerminalSimulator';
import CpuThreadsSimulator from './simulators/CpuThreadsSimulator';
import SyntheticDataGenerator from './simulators/SyntheticDataGenerator';

import { BookOpen, Cpu, CheckCircle2, Lightbulb, ArrowLeft, ArrowRight, Terminal, Eye, HelpCircle, Puzzle, EyeOff, RotateCcw } from 'lucide-react';
import { evaluateCodeExercise } from '../utils/evaluator';

export default function LessonView({ questId, onBackToMap, onNavigateLesson }) {
  const { completeQuest, completedQuests } = useGame();
  const { lesson, chapter, course } = getLessonById(questId);
  const { prevItem, nextItem, totalCount, currentIndex } = getAdjacentLessons(questId);

  const [code, setCode] = useState(lesson.starterCode || '');
  const [activeRightTab, setActiveRightTab] = useState('editor');
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setCode(lesson.starterCode || '');
    setOutput('');
    setTestResults([]);
    setExecutionTime(null);
    setShowHint(false);
    setShowSolution(false);
    setActiveRightTab('editor');
  }, [questId]);

  const handleRunCode = () => {
    setIsRunning(true);
    const startTime = performance.now();

    setTimeout(() => {
      const { tests, stdout, allPassed } = evaluateCodeExercise(code, lesson.testCases || [], course.language);
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);

      setOutput(stdout);
      setTestResults(tests);
      setExecutionTime(duration);
      setIsRunning(false);

      if (allPassed) {
        completeQuest(lesson.id, lesson.xp, lesson.badge);
      }
    }, 350);
  };

  const handleExercisePassed = () => {
    completeQuest(lesson.id, lesson.xp, lesson.badge);
  };

  const isQuestPassed = completedQuests.includes(lesson.id);

  const renderSimulator = () => {
    switch (lesson.simulatorType) {
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
        return <div style={{ padding: '20px', color: '#6b7280' }}>Interactive simulator active for this lesson.</div>;
    }
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Top Stepper Navigation Controls */}
      <div className="retro-window" style={{ padding: '10px 16px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBackToMap} className="retro-btn retro-btn-blue" style={{ fontSize: '0.78rem' }}>
            <ArrowLeft size={14} /> Course Roadmap
          </button>
          <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: '#222638' }}>
            {course.icon} {course.title} • {chapter.title}
          </span>
        </div>

        {/* Prev / Next Sequenced Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            disabled={!prevItem}
            onClick={() => prevItem && onNavigateLesson(prevItem.lesson.id)}
            className="retro-btn"
            style={{ fontSize: '0.78rem', padding: '4px 10px', opacity: prevItem ? 1 : 0.5, cursor: prevItem ? 'pointer' : 'not-allowed' }}
          >
            <ArrowLeft size={12} /> Prev Lesson
          </button>

          <span style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#7c8cc6', padding: '0 4px' }}>
            Lesson {currentIndex} of {totalCount}
          </span>

          <button
            disabled={!nextItem}
            onClick={() => nextItem && onNavigateLesson(nextItem.lesson.id)}
            className="retro-btn retro-btn-pink"
            style={{ fontSize: '0.78rem', padding: '4px 12px', opacity: nextItem ? 1 : 0.5, cursor: nextItem ? 'pointer' : 'not-allowed' }}
          >
            Next Lesson <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Main Split Screen View */}
      <div style={{ display: 'grid', gridTemplateColumns: '40% 60%', gap: '16px', minHeight: 'calc(100vh - 200px)' }}>
        
        {/* LEFT PANE: Theory & Instructions */}
        <div className="retro-window" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="retro-titlebar retro-titlebar-pink">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{lesson.title}</span>
            </div>
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
            
            {/* Theory Markdown Content */}
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '4px', border: '2px solid #222638', fontSize: '0.9rem', color: '#222638', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
              {lesson.theory}
            </div>

            {/* Objective & Instructions */}
            {lesson.instructions && (
              <div style={{ background: '#fbcfe8', padding: '14px', borderRadius: '4px', border: '2px solid #222638' }}>
                <h4 style={{ fontSize: '0.85rem', color: '#222638', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                  <BookOpen size={16} /> OBJECTIVE & INSTRUCTIONS ✨
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#222638', fontWeight: 500 }}>
                  {lesson.instructions}
                </p>
              </div>
            )}

            {/* Hint & Solution Toggles */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setShowHint(!showHint)}
                className="retro-btn"
                style={{ padding: '5px 12px', fontSize: '0.75rem' }}
              >
                <Lightbulb size={14} /> {showHint ? 'Hide Hint' : 'Need a Hint? 💡'}
              </button>

              {lesson.solutionCode && (
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="retro-btn retro-btn-blue"
                  style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                >
                  {showSolution ? <EyeOff size={14} /> : <Eye size={14} />} {showSolution ? 'Hide Solution' : 'View Solution'}
                </button>
              )}
            </div>

            {showHint && (
              <div style={{ padding: '10px', background: '#fef3c7', border: '2px solid #222638', borderRadius: '4px', fontSize: '0.8rem', color: '#92400e', fontWeight: 600 }}>
                💡 Tip: Check exact syntax signatures and verify edge cases in the solution code.
              </div>
            )}

            {showSolution && lesson.solutionCode && (
              <div style={{ padding: '12px', background: '#1e293b', color: '#38bdf8', border: '2px solid #222638', borderRadius: '4px', fontSize: '0.82rem', fontFamily: 'var(--font-code)' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 'bold', marginBottom: '4px' }}>SOLUTION REFERENCE:</div>
                <code>{lesson.solutionCode}</code>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT PANE: Dynamic Exercise Evaluators */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {lesson.type === 'web-preview' ? (
            <WebPreview code={code} testCases={lesson.testCases || []} onPass={handleExercisePassed} />
          ) : lesson.type === 'quiz' ? (
            <QuizRunner quizData={lesson.quizData} onPass={handleExercisePassed} />
          ) : lesson.type === 'fill-blank' ? (
            <FillBlankRunner fillData={lesson.fillData} onPass={handleExercisePassed} />
          ) : (
            <>
              {/* Code Editor or Simulator */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setActiveRightTab('editor')} 
                  className={`retro-btn ${activeRightTab === 'editor' ? 'retro-btn-pink' : ''}`}
                  style={{ fontSize: '0.78rem', padding: '6px 14px' }}
                >
                  <Terminal size={14} /> Code Editor
                </button>

                {lesson.simulatorType && (
                  <button 
                    onClick={() => setActiveRightTab('simulator')} 
                    className={`retro-btn ${activeRightTab === 'simulator' ? 'retro-btn-blue' : ''}`}
                    style={{ fontSize: '0.78rem', padding: '6px 14px' }}
                  >
                    <Cpu size={14} /> Sandbox ({lesson.simulatorType})
                  </button>
                )}
              </div>

              {activeRightTab === 'editor' ? (
                <div style={{ display: 'grid', gridTemplateRows: '58% 42%', gap: '12px', height: '100%' }}>
                  <CodeEditor 
                    code={code} 
                    onChange={setCode} 
                    onRun={handleRunCode} 
                    language={course.language.toLowerCase()} 
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
            </>
          )}

        </div>

      </div>
    </div>
  );
}
