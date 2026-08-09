import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon } from 'lucide-react';

export default function TerminalSimulator() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { text: '🌸 YOU ARE ONLINE Kawaii CLI v2.4 🎀', type: 'system' },
    { text: 'Type "help" for available commands.', type: 'system' }
  ]);
  const [currentDir, setCurrentDir] = useState('~/project');
  const [files, setFiles] = useState({
    '~/project': ['main.rs', 'Cargo.toml', 'README.md']
  });
  const [gitState, setGitState] = useState({ initialized: false, staged: [] });

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const cmdLine = inputVal.trim();
    const args = cmdLine.split(' ');
    const mainCmd = args[0].toLowerCase();

    const newHistory = [...history, { text: `🌸 ${currentDir} $ ${cmdLine}`, type: 'user' }];

    switch (mainCmd) {
      case 'help':
        newHistory.push({ text: 'Available commands: ls, pwd, mkdir <dir>, cd <dir>, cat <file>, git init, git status, git commit -m "<msg>", clear', type: 'output' });
        break;
      case 'ls':
        const dirContent = files[currentDir] || [];
        newHistory.push({ text: dirContent.join('  ') || '(empty directory)', type: 'output' });
        break;
      case 'pwd':
        newHistory.push({ text: currentDir, type: 'output' });
        break;
      case 'mkdir':
        if (!args[1]) {
          newHistory.push({ text: 'mkdir: missing operand', type: 'error' });
        } else {
          const newFolder = args[1];
          setFiles(prev => ({
            ...prev,
            [currentDir]: [...(prev[currentDir] || []), `${newFolder}/`]
          }));
          newHistory.push({ text: `Created directory '${newFolder}' ✨`, type: 'output' });
        }
        break;
      case 'cd':
        if (!args[1] || args[1] === '~') {
          setCurrentDir('~/project');
        } else {
          setCurrentDir(`${currentDir}/${args[1]}`);
        }
        break;
      case 'cat':
        if (args[1] === 'README.md') {
          newHistory.push({ text: '# You Are Online 💕\nWelcome to your kawaii CS learning environment!', type: 'output' });
        } else if (args[1] === 'main.rs') {
          newHistory.push({ text: 'fn main() {\n    println!("Hello from Rust! 🌸");\n}', type: 'output' });
        } else {
          newHistory.push({ text: `cat: ${args[1] || ''}: No such file or directory`, type: 'error' });
        }
        break;
      case 'git':
        const subCmd = args[1];
        if (subCmd === 'init') {
          setGitState(prev => ({ ...prev, initialized: true }));
          newHistory.push({ text: 'Initialized empty Git repository in ' + currentDir + '/.git/ 🎀', type: 'output' });
        } else if (subCmd === 'status') {
          if (!gitState.initialized) {
            newHistory.push({ text: 'fatal: not a git repository (or any of the parent directories): .git', type: 'error' });
          } else {
            newHistory.push({ text: 'On branch main\nNothing to commit, working tree clean 🌸', type: 'output' });
          }
        } else if (subCmd === 'commit') {
          newHistory.push({ text: '[main (root-commit) a1b2c3d] Initial commit 💕', type: 'output' });
        } else {
          newHistory.push({ text: 'git: command not recognized', type: 'error' });
        }
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        newHistory.push({ text: `zsh: command not found: ${mainCmd}`, type: 'error' });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', background: '#fff0f6', borderRadius: '12px', border: '2px solid #fbcfe8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: '#be185d', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
          <TermIcon size={18} /> UNIX CLI & GIT SIMULATOR 🌸
        </h4>
        <span style={{ fontSize: '0.75rem', color: '#9d4b6e', fontWeight: 600 }}>ZSH Kawaii Terminal</span>
      </div>

      <div style={{ background: '#2a081a', padding: '14px', borderRadius: '8px', border: '2px solid #f472b6', height: '220px', overflowY: 'auto', fontFamily: 'var(--font-code)', fontSize: '0.82rem' }}>
        {history.map((line, idx) => (
          <div key={idx} style={{ 
            color: line.type === 'error' ? '#f43f5e' : line.type === 'user' ? '#ff77a9' : line.type === 'system' ? '#f472b6' : '#fbcfe8',
            marginBottom: '4px',
            whiteSpace: 'pre-wrap'
          }}>
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommandSubmit} style={{ display: 'flex', gap: '8px' }}>
        <span style={{ fontFamily: 'var(--font-code)', color: '#be185d', fontSize: '0.85rem', display: 'flex', alignItems: 'center', fontWeight: 700 }}>
          🌸 {currentDir} $
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type git init, ls, cd, or help..."
          style={{
            flex: 1,
            background: '#ffffff',
            color: '#4a0e2e',
            fontFamily: 'var(--font-code)',
            fontSize: '0.85rem',
            padding: '8px 12px',
            border: '1.5px solid #fbcfe8',
            borderRadius: '6px',
            outline: 'none'
          }}
        />
        <button type="submit" className="pixel-btn pixel-btn-primary" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>
          Run ✨
        </button>
      </form>
    </div>
  );
}
