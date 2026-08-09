import React from 'react';
import { useGame } from '../context/GameContext';
import { Volume2, VolumeX, Flame, Sparkles, Map, Heart, Star } from 'lucide-react';

export default function Navbar({ onOpenMap, currentView, setView }) {
  const { xp, level, currentXPInLevel, streak, soundMuted, toggleSound, resetProgress } = useGame();

  return (
    <header style={{
      background: 'rgba(255, 245, 248, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '2px solid var(--card-border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '12px 24px',
      boxShadow: '0 4px 15px rgba(244, 114, 182, 0.1)'
    }}>
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div 
          onClick={() => setView('map')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #ff69b4, #c084fc)',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(255, 105, 180, 0.4)',
            fontSize: '1.3rem'
          }}>
            🌸
          </div>
          <div>
            <h1 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, letterSpacing: '-0.5px' }}>
              YOU ARE <span style={{ color: 'var(--accent-pink-deep)' }}>ONLINE</span> 💕
            </h1>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-retro)' }}>
              KAWAII CS & PROGRAMMING QUESTS
            </div>
          </div>
        </div>

        {/* Navigation Mode */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setView('map')} 
            className={`pixel-btn ${currentView === 'map' ? 'pixel-btn-primary' : 'pixel-btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '6px 14px' }}
          >
            <Map size={14} /> Quest Map 🌸
          </button>
          <button 
            onClick={() => setView('lesson')} 
            className={`pixel-btn ${currentView === 'lesson' ? 'pixel-btn-primary' : 'pixel-btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '6px 14px' }}
          >
            <Sparkles size={14} /> Active Quest
          </button>
        </div>

        {/* Player Telemetry & Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          
          {/* Level Progress */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '130px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontFamily: 'var(--font-retro)', color: '#be185d', fontWeight: 700 }}>
              <span>LVL {level}</span>
              <span>{currentXPInLevel}/100 XP</span>
            </div>
            <div style={{ background: '#fce7f3', height: '10px', borderRadius: '5px', marginTop: '4px', overflow: 'hidden', border: '1px solid #fbcfe8' }}>
              <div style={{
                background: 'linear-gradient(90deg, #ff85a1, #ec4899)',
                height: '100%',
                width: `${currentXPInLevel}%`,
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Daily Streak */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: '#fff1f2',
            border: '1.5px solid #fda4af',
            padding: '4px 10px',
            borderRadius: '6px',
            color: '#e11d48',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-retro)',
            fontWeight: 700
          }}>
            <Flame size={16} fill="#f43f5e" />
            <span>{streak} DAY STREAK</span>
          </div>

          {/* Total XP Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: '#f3e8ff',
            border: '1.5px solid #d8b4fe',
            padding: '4px 10px',
            borderRadius: '6px',
            color: '#7e22ce',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-retro)',
            fontWeight: 700
          }}>
            <Star size={16} fill="#a855f7" />
            <span>{xp} XP</span>
          </div>

          {/* Sound Toggle */}
          <button 
            onClick={toggleSound}
            style={{
              background: '#fce7f3',
              border: '1px solid #fbcfe8',
              color: soundMuted ? 'var(--text-muted)' : 'var(--accent-pink-deep)',
              padding: '6px 10px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={soundMuted ? "Unmute Retro Audio" : "Mute Retro Audio"}
          >
            {soundMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
