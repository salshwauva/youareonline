import React, { useState } from 'react';
import { ArrowRight, Lock, Unlock, Zap, Layers, Cpu } from 'lucide-react';

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
      `BORROW: Created &s2 (Immutable Reference). Multiple read-only borrows allowed! ✨`,
      ...prev
    ]);
  };

  const handleBorrowMutable = () => {
    setBorrowMode('mutable');
    setLog(prev => [
      `MUTABLE BORROW: Created &mut s2.`,
      `MUTEX RULE: Only ONE mutable reference allowed at a time. No other borrows permitted! ✨`,
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
    <div className="retro-window" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: '#222638', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
          <Cpu size={18} color="#7c8cc6" /> Rust Memory & Ownership Sandbox
        </h4>
        <button onClick={handleReset} className="retro-btn" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>Reset</button>
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <button 
          onClick={handleMoveOwnership} 
          disabled={s1State === 'moved'} 
          className="retro-btn retro-btn-pink" 
          style={{ fontSize: '0.75rem', opacity: s1State === 'moved' ? 0.5 : 1 }}
        >
          <Zap size={14} /> Move Ownership (s1 ➔ s2)
        </button>
        <button 
          onClick={handleBorrowImmutable} 
          className="retro-btn retro-btn-blue" 
          style={{ fontSize: '0.75rem' }}
        >
          <Unlock size={14} /> Borrow &s2 (Immutable)
        </button>
        <button 
          onClick={handleBorrowMutable} 
          className="retro-btn" 
          style={{ fontSize: '0.75rem' }}
        >
          <Lock size={14} /> Borrow &mut s2 (Mutable)
        </button>
      </div>

      {/* Stack vs Heap Visualizer Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        
        {/* STACK */}
        <div style={{ background: '#eef3fc', padding: '14px', borderRadius: '4px', border: '2px solid #222638' }}>
          <h5 style={{ color: '#7c8cc6', fontSize: '0.82rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={14} /> STACK MEMORY (LIFO)
          </h5>

          {/* Variable s1 */}
          <div style={{ 
            padding: '10px', 
            borderRadius: '4px', 
            marginBottom: '10px', 
            background: s1State === 'moved' ? '#fef2f2' : '#ffffff', 
            border: `2px solid ${s1State === 'moved' ? '#ef4444' : '#222638'}` 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ fontWeight: 'bold', color: s1State === 'moved' ? '#dc2626' : '#222638' }}>
                var s1 {s1State === 'moved' && '(INVALIDATED)'}
              </span>
              <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>Addr: 0x7fff5fb0</span>
            </div>
            {s1State === 'owned' && (
              <div style={{ fontSize: '0.75rem', color: '#7c8cc6', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                ptr ➔ Heap [0x00A1] <ArrowRight size={12} />
              </div>
            )}
          </div>

          {/* Variable s2 */}
          <div style={{ 
            padding: '10px', 
            borderRadius: '4px', 
            background: s2State === 'owned' ? '#fbcfe8' : '#ffffff', 
            border: '2px solid #222638' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ fontWeight: 'bold', color: '#222638' }}>
                var s2 {s2State === 'owned' && '(SOLE OWNER)'}
              </span>
              <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>Addr: 0x7fff5fb8</span>
            </div>
            {s2State === 'owned' && (
              <div style={{ fontSize: '0.75rem', color: '#7c8cc6', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                ptr ➔ Heap [0x00A1] <ArrowRight size={12} />
              </div>
            )}
          </div>
        </div>

        {/* HEAP */}
        <div style={{ background: '#eef3fc', padding: '14px', borderRadius: '4px', border: '2px solid #222638' }}>
          <h5 style={{ color: '#222638', fontSize: '0.82rem', marginBottom: '10px' }}>
            DYNAMIC HEAP MEMORY (0x00A1)
          </h5>
          
          <div style={{ padding: '14px', background: '#ffffff', borderRadius: '4px', border: '2px dashed #7c8cc6' }}>
            <div style={{ fontSize: '0.75rem', color: '#7c8cc6', fontWeight: 'bold' }}>Heap Buffer Allocation</div>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.95rem', color: '#222638', fontWeight: 'bold', marginTop: '4px' }}>
              "hello_online"
            </div>
            <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '6px' }}>
              Capacity: 12 bytes | Len: 12 bytes
            </div>
            <div style={{ marginTop: '8px', fontSize: '0.75rem', fontWeight: 'bold', color: borrowMode === 'mutable' ? '#ef4444' : borrowMode === 'immutable' ? '#2563eb' : '#6b7280' }}>
              Active Ref: {borrowMode === 'mutable' ? '&mut s2 (EXCLUSIVE WRITE)' : borrowMode === 'immutable' ? '&s2 (SHARED READ)' : 'No Borrowers'}
            </div>
          </div>
        </div>
      </div>

      {/* Compiler Log Console */}
      <div style={{ background: '#222638', padding: '10px', borderRadius: '4px', border: '2px solid #222638', fontFamily: 'var(--font-code)', fontSize: '0.75rem', maxHeight: '100px', overflowY: 'auto' }}>
        <div style={{ color: '#f7a3c3', marginBottom: '4px', fontWeight: 'bold' }}>// RUST BORROW CHECKER TELEMETRY LOGS</div>
        {log.map((item, idx) => (
          <div key={idx} style={{ color: item.includes('WARNING') ? '#fca5a5' : item.includes('MOVE') ? '#fcd34d' : '#93c5fd' }}>
            &gt; {item}
          </div>
        ))}
      </div>
    </div>
  );
}
