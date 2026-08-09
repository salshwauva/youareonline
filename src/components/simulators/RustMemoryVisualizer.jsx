import React, { useState } from 'react';
import { ArrowRight, Lock, Unlock, Zap, Layers, Cpu, Sparkles } from 'lucide-react';

export default function RustMemoryVisualizer() {
  const [s1State, setS1State] = useState('owned');
  const [s2State, setS2State] = useState('empty');
  const [borrowMode, setBorrowMode] = useState('none');
  const [log, setLog] = useState(['Memory initialized. String "hello_online" allocated on Heap at 0x7fff5fb.']);

  const handleMoveOwnership = () => {
    setS1State('moved');
    setS2State('owned');
    setBorrowMode('none');
    setLog(prev => [
      `MOVE: Ownership of "hello_online" transferred s1 ➔ s2.`,
      `STACK WARNING: Variable 's1' is now INVALID. Accessing s1 will trigger Rust Compile Error E0382!`,
      ...prev
    ]);
  };

  const handleBorrowImmutable = () => {
    if (s1State === 'moved' && s2State === 'empty') return;
    setBorrowMode('immutable');
    setLog(prev => [
      `BORROW: Created &s2 (Immutable Reference). Multiple read-only borrows allowed! 🌸`,
      ...prev
    ]);
  };

  const handleBorrowMutable = () => {
    setBorrowMode('mutable');
    setLog(prev => [
      `MUTABLE BORROW: Created &mut s2.`,
      `MUTEX RULE: Only ONE mutable reference allowed at a time. No other borrows permitted! 🎀`,
      ...prev
    ]);
  };

  const handleReset = () => {
    setS1State('owned');
    setS2State('empty');
    setBorrowMode('none');
    setLog(['Reset memory layout to initial state.']);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', background: '#fff0f6', borderRadius: '12px', border: '2px solid #fbcfe8', boxShadow: '0 4px 15px rgba(251, 207, 232, 0.2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: '#be185d', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
          <Cpu size={18} /> 🌸 RUST MEMORY & OWNERSHIP SANDBOX 💕
        </h4>
        <button onClick={handleReset} className="pixel-btn pixel-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>Reset</button>
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <button 
          onClick={handleMoveOwnership} 
          disabled={s1State === 'moved'} 
          className="pixel-btn pixel-btn-primary" 
          style={{ fontSize: '0.75rem', opacity: s1State === 'moved' ? 0.5 : 1 }}
        >
          <Zap size={14} /> Move Ownership (s1 ➔ s2)
        </button>
        <button 
          onClick={handleBorrowImmutable} 
          className="pixel-btn pixel-btn-cyan" 
          style={{ fontSize: '0.75rem' }}
        >
          <Unlock size={14} /> Borrow &s2 (Immutable)
        </button>
        <button 
          onClick={handleBorrowMutable} 
          className="pixel-btn pixel-btn-secondary" 
          style={{ fontSize: '0.75rem', borderColor: '#f43f5e', color: '#e11d48' }}
        >
          <Lock size={14} /> Borrow &mut s2 (Mutable)
        </button>
      </div>

      {/* Stack vs Heap Visualizer Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        
        {/* STACK */}
        <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1.5px solid #fbcfe8' }}>
          <h5 style={{ color: '#7e22ce', fontSize: '0.8rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={14} /> STACK MEMORY (LIFO) 🎀
          </h5>

          {/* Variable s1 */}
          <div style={{ 
            padding: '10px', 
            borderRadius: '6px', 
            marginBottom: '10px', 
            background: s1State === 'moved' ? '#fff1f2' : '#f3e8ff', 
            border: `1.5px solid ${s1State === 'moved' ? '#f43f5e' : '#c084fc'}` 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ fontWeight: 700, color: s1State === 'moved' ? '#e11d48' : '#6b21a8' }}>
                var s1 {s1State === 'moved' && '(INVALIDATED / DROPPED)'}
              </span>
              <span style={{ fontSize: '0.7rem', color: '#9d4b6e' }}>Addr: 0x7fff5fb0</span>
            </div>
            {s1State === 'owned' && (
              <div style={{ fontSize: '0.75rem', color: '#ec4899', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                ptr ➔ Heap [0x00A1] <ArrowRight size={12} />
              </div>
            )}
          </div>

          {/* Variable s2 */}
          <div style={{ 
            padding: '10px', 
            borderRadius: '6px', 
            background: s2State === 'owned' ? '#fce7f3' : '#faf5ff', 
            border: `1.5px solid ${s2State === 'owned' ? '#ec4899' : '#e9d5ff'}` 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ fontWeight: 700, color: s2State === 'owned' ? '#be185d' : '#9333ea' }}>
                var s2 {s2State === 'owned' && '(SOLE OWNER)'}
              </span>
              <span style={{ fontSize: '0.7rem', color: '#9d4b6e' }}>Addr: 0x7fff5fb8</span>
            </div>
            {s2State === 'owned' && (
              <div style={{ fontSize: '0.75rem', color: '#ec4899', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                ptr ➔ Heap [0x00A1] <ArrowRight size={12} />
              </div>
            )}
          </div>
        </div>

        {/* HEAP */}
        <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1.5px solid #fbcfe8' }}>
          <h5 style={{ color: '#0284c7', fontSize: '0.8rem', marginBottom: '10px' }}>
            DYNAMIC HEAP MEMORY (0x00A1) 🌸
          </h5>
          
          <div style={{ padding: '14px', background: '#e0f2fe', borderRadius: '6px', border: '1.5px dashed #0284c7' }}>
            <div style={{ fontSize: '0.75rem', color: '#0369a1', fontWeight: 600 }}>Heap Buffer Allocation</div>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.95rem', color: '#b45309', fontWeight: 700, marginTop: '4px' }}>
              "hello_online"
            </div>
            <div style={{ fontSize: '0.7rem', color: '#0284c7', marginTop: '6px' }}>
              Capacity: 12 bytes | Len: 12 bytes
            </div>
            <div style={{ marginTop: '8px', fontSize: '0.75rem', fontWeight: 700, color: borrowMode === 'mutable' ? '#e11d48' : borrowMode === 'immutable' ? '#0284c7' : '#9d4b6e' }}>
              Active Ref: {borrowMode === 'mutable' ? '&mut s2 (EXCLUSIVE WRITE)' : borrowMode === 'immutable' ? '&s2 (SHARED READ)' : 'No Borrowers'}
            </div>
          </div>
        </div>
      </div>

      {/* Compiler Log Console */}
      <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1.5px solid #fbcfe8', fontFamily: 'var(--font-code)', fontSize: '0.75rem', maxHeight: '100px', overflowY: 'auto' }}>
        <div style={{ color: '#be185d', marginBottom: '4px', fontWeight: 700 }}>// RUST BORROW CHECKER TELEMETRY LOGS 💕</div>
        {log.map((item, idx) => (
          <div key={idx} style={{ color: item.includes('WARNING') ? '#e11d48' : item.includes('MOVE') ? '#b45309' : '#831843' }}>
            &gt; {item}
          </div>
        ))}
      </div>
    </div>
  );
}
