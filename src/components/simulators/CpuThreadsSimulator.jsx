import React, { useState } from 'react';
import { Cpu, Lock, Unlock, AlertCircle } from 'lucide-react';

export default function CpuThreadsSimulator() {
  const [mutexLocked, setMutexLocked] = useState(false);
  const [activeOwner, setActiveOwner] = useState(null);
  const [threads, setThreads] = useState([
    { id: 'Thread-1', core: 'Core 1', status: 'RUNNING', hasLock: false },
    { id: 'Thread-2', core: 'Core 2', status: 'WAITING', hasLock: false },
    { id: 'Thread-3', core: 'Core 3', status: 'IDLE', hasLock: false },
    { id: 'Thread-4', core: 'Core 4', status: 'IDLE', hasLock: false }
  ]);
  const [logs, setLogs] = useState([
    'CPU Scheduler initialized 4 physical cores.',
    'Thread-1 spawned on Core 1.'
  ]);

  const acquireMutex = (threadId) => {
    if (mutexLocked) {
      setLogs(prev => [`[LOCK CONTENTION] ${threadId} tried acquiring Mutex but it is HELD by ${activeOwner}! Thread ${threadId} BLOCKED.`, ...prev]);
    } else {
      setMutexLocked(true);
      setActiveOwner(threadId);
      setThreads(prev => prev.map(t => t.id === threadId ? { ...t, status: 'CRITICAL SECTION', hasLock: true } : t));
      setLogs(prev => [`[MUTEX ACQUIRED] ${threadId} acquired Mutex lock! Entered Critical Section.`, ...prev]);
    }
  };

  const releaseMutex = () => {
    if (!mutexLocked) return;
    const prevOwner = activeOwner;
    setMutexLocked(false);
    setActiveOwner(null);
    setThreads(prev => prev.map(t => t.id === prevOwner ? { ...t, status: 'RUNNING', hasLock: false } : t));
    setLogs(prev => [`[MUTEX RELEASED] ${prevOwner} released Mutex lock. Next waiting thread unblocked!`, ...prev]);
  };

  const triggerDeadlock = () => {
    setMutexLocked(true);
    setActiveOwner('Thread-1 & Thread-2 DEADLOCK');
    setThreads(prev => prev.map(t => ({ ...t, status: 'DEADLOCKED (WAITING FOR LOCK)' })));
    setLogs(prev => [
      'CRITICAL DEADLOCK DETECTED! Thread-1 holds Mutex A waiting for Mutex B; Thread-2 holds Mutex B waiting for Mutex A.',
      ...prev
    ]);
  };

  return (
    <div className="retro-window" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: '#222638', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
          <Cpu size={18} color="#7c8cc6" /> OS Threads & CPU Concurrency
        </h4>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={() => acquireMutex('Thread-2')} className="retro-btn retro-btn-blue" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
            <Lock size={12} /> Acquire Lock
          </button>
          <button onClick={releaseMutex} className="retro-btn" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
            <Unlock size={12} /> Release Lock
          </button>
          <button onClick={triggerDeadlock} className="retro-btn retro-btn-pink" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
            <AlertCircle size={12} /> Deadlock
          </button>
        </div>
      </div>

      {/* 4 CPU Cores Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {threads.map((t) => (
          <div key={t.id} style={{ 
            background: t.status.includes('DEADLOCK') ? '#fef2f2' : t.hasLock ? '#fbcfe8' : '#ffffff', 
            padding: '12px', 
            borderRadius: '4px', 
            border: '2px solid #222638'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 'bold' }}>{t.core}</div>
            <div style={{ fontSize: '0.85rem', color: '#222638', fontWeight: 'bold', marginTop: '4px' }}>
              {t.id}
            </div>
            <div style={{ fontSize: '0.75rem', marginTop: '6px', fontWeight: 'bold', color: t.hasLock ? '#222638' : t.status.includes('DEADLOCK') ? '#dc2626' : '#2563eb' }}>
              {t.status}
            </div>
          </div>
        ))}
      </div>

      {/* Shared Mutex Lock Primitive Status */}
      <div style={{ background: '#ffffff', padding: '12px', borderRadius: '4px', border: '2px solid #222638', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 'bold' }}>Global Mutex Lock Primitive (pthread_mutex_t)</div>
          <div style={{ fontSize: '0.88rem', color: mutexLocked ? '#dc2626' : '#16a34a', fontWeight: 'bold', marginTop: '2px' }}>
            State: {mutexLocked ? `LOCKED (Held by ${activeOwner})` : 'UNLOCKED (AVAILABLE)'}
          </div>
        </div>
      </div>

      {/* Scheduler Log */}
      <div style={{ background: '#222638', padding: '10px', borderRadius: '4px', border: '2px solid #222638', fontFamily: 'var(--font-code)', fontSize: '0.75rem', maxHeight: '100px', overflowY: 'auto' }}>
        {logs.map((log, idx) => (
          <div key={idx} style={{ color: log.includes('DEADLOCK') ? '#fca5a5' : log.includes('MUTEX ACQUIRED') ? '#a3c9f8' : '#eef3fc', marginBottom: '3px' }}>
            &gt; {log}
          </div>
        ))}
      </div>
    </div>
  );
}
