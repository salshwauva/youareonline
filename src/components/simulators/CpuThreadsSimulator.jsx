import React, { useState } from 'react';
import { Cpu, Lock, Unlock, AlertCircle } from 'lucide-react';

export default function CpuThreadsSimulator() {
  const [mutexLocked, setMutexLocked] = useState(false);
  const [activeOwner, setActiveOwner] = useState(null);
  const [threads, setThreads] = useState([
    { id: 'Thread-1 🌸', core: 'Core 1', status: 'RUNNING', hasLock: false },
    { id: 'Thread-2 🎀', core: 'Core 2', status: 'WAITING', hasLock: false },
    { id: 'Thread-3 🍡', core: 'Core 3', status: 'IDLE', hasLock: false },
    { id: 'Thread-4 ✨', core: 'Core 4', status: 'IDLE', hasLock: false }
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
      setLogs(prev => [`[MUTEX ACQUIRED] ${threadId} acquired Mutex lock! Entered Critical Section. ✨`, ...prev]);
    }
  };

  const releaseMutex = () => {
    if (!mutexLocked) return;
    const prevOwner = activeOwner;
    setMutexLocked(false);
    setActiveOwner(null);
    setThreads(prev => prev.map(t => t.id === prevOwner ? { ...t, status: 'RUNNING', hasLock: false } : t));
    setLogs(prev => [`[MUTEX RELEASED] ${prevOwner} released Mutex lock. Next waiting thread unblocked! 🌸`, ...prev]);
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', background: '#fff0f6', borderRadius: '12px', border: '2px solid #fbcfe8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: '#be185d', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
          <Cpu size={18} /> OS PROCESS THREADS & CPU CONCURRENCY 🌸
        </h4>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={() => acquireMutex('Thread-2 🎀')} className="pixel-btn pixel-btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
            <Lock size={12} /> Acquire Lock
          </button>
          <button onClick={releaseMutex} className="pixel-btn pixel-btn-cyan" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
            <Unlock size={12} /> Release Lock
          </button>
          <button onClick={triggerDeadlock} className="pixel-btn pixel-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem', borderColor: '#f43f5e', color: '#e11d48' }}>
            <AlertCircle size={12} /> Deadlock
          </button>
        </div>
      </div>

      {/* 4 CPU Cores Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {threads.map((t) => (
          <div key={t.id} style={{ 
            background: t.status.includes('DEADLOCK') ? '#fff1f2' : t.hasLock ? '#fce7f3' : '#ffffff', 
            padding: '12px', 
            borderRadius: '8px', 
            border: `1.5px solid ${t.status.includes('DEADLOCK') ? '#f43f5e' : t.hasLock ? '#ec4899' : '#fbcfe8'}` 
          }}>
            <div style={{ fontSize: '0.7rem', color: '#9d4b6e', fontWeight: 600 }}>{t.core}</div>
            <div style={{ fontFamily: 'var(--font-retro)', fontSize: '0.82rem', color: '#4a0e2e', marginTop: '4px' }}>
              {t.id}
            </div>
            <div style={{ fontSize: '0.75rem', marginTop: '6px', fontWeight: 700, color: t.hasLock ? '#be185d' : t.status.includes('DEADLOCK') ? '#e11d48' : '#b45309' }}>
              {t.status}
            </div>
          </div>
        ))}
      </div>

      {/* Shared Mutex Lock Primitive Status */}
      <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1.5px solid #fbcfe8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#9d4b6e', fontWeight: 600 }}>Global Mutex Lock Primitive (pthread_mutex_t) 🎀</div>
          <div style={{ fontFamily: 'var(--font-retro)', fontSize: '0.9rem', color: mutexLocked ? '#be185d' : '#10b981', marginTop: '2px' }}>
            State: {mutexLocked ? `LOCKED (Held by ${activeOwner})` : 'UNLOCKED (AVAILABLE)'}
          </div>
        </div>
      </div>

      {/* Scheduler Log */}
      <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1.5px solid #fbcfe8', fontFamily: 'var(--font-code)', fontSize: '0.75rem', maxHeight: '100px', overflowY: 'auto' }}>
        {logs.map((log, idx) => (
          <div key={idx} style={{ color: log.includes('DEADLOCK') ? '#e11d48' : log.includes('MUTEX ACQUIRED') ? '#be185d' : '#831843', marginBottom: '3px' }}>
            &gt; {log}
          </div>
        ))}
      </div>
    </div>
  );
}
