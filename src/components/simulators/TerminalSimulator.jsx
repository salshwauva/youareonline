import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon } from 'lucide-react';

export default function TerminalSimulator() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { text: ':: Y2K DESKTOP UNIX SHELL v2.4 (x86_64-pc-linux-gnu)', type: 'system' },
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

    const newHistory = [...history, { text: `${currentDir} $ ${cmdLine}`, type: 'user' }];

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
          newHistory.push({ text: `Created directory '${newFolder}'`, type: 'output' });
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
          newHistory.push({ text: '# You Are Online\nWelcome to your Y2K Desktop CS learning environment!', type: 'output' });
        } else if (args[1] === 'main.rs') {
          newHistory.push({ text: 'fn main() {\n    println!("Hello human!");\n}', type: 'output' });
        } else {
          newHistory.push({ text: `cat: ${args[1] || ''}: No such file or directory`, type: 'error' });
        }
        break;
      case 'git':
        const subCmd = args[1];
        if (subCmd === 'init') {
          setGitState(prev => ({ ...prev, initialized: true }));
          newHistory.push({ text: 'Initialized empty Git repository in ' + currentDir + '/.git/', type: 'output' });
        } else if (subCmd === 'status') {
          if (!gitState.initialized) {
            newHistory.push({ text: 'fatal: not a git repository (or any of the parent directories): .git', type: 'error' });
          } else {
            newHistory.push({ text: 'On branch main\nNothing to commit, working tree clean', type: 'output' });
          }
        } else if (subCmd === 'commit') {
          newHistory.push({ text: '[main (root-commit) a1b2c3d] Initial commit', type: 'output' });
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
    <div className="retro-window" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: '#222638', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
          <TermIcon size={18} color="#7c8cc6" /> Unix CLI & Git Simulator
        </h4>
        <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 'bold' }}>Bash Terminal</span>
      </div>

      <div style={{ background: '#222638', padding: '14px', borderRadius: '4px', border: '2px solid #222638', height: '220px', overflowY: 'auto', fontFamily: 'var(--font-code)', fontSize: '0.82rem' }}>
        {history.map((line, idx) => (
          <div key={idx} style={{ 
            color: line.type === 'error' ? '#ef4444' : line.type === 'user' ? '#a3c9f8' : line.type === 'system' ? '#f7a3c3' : '#eef3fc',
            marginBottom: '4px',
            whiteSpace: 'pre-wrap'
          }}>
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommandSubmit} style={{ display: 'flex', gap: '8px' }}>
        <span style={{ fontFamily: 'var(--font-code)', color: '#222638', fontSize: '0.85rem', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
          {currentDir} $
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type git init, ls, cd, or help..."
          style={{
            flex: 1,
            background: '#ffffff',
            color: '#222638',
            fontFamily: 'var(--font-code)',
            fontSize: '0.85rem',
            padding: '8px 12px',
            border: '2px solid #222638',
            borderRadius: '4px',
            outline: 'none'
          }}
        />
        <button type="submit" className="retro-btn retro-btn-blue" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>
          Run
        </button>
      </form>
    </div>
  );
}
