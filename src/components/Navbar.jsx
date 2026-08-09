import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Volume2, VolumeX, Flame, Map, Star, Sparkles, Monitor, Folder, Check } from 'lucide-react';

export default function Navbar({ currentView, setView }) {
  const { xp, level, currentXPInLevel, streak, soundMuted, toggleSound } = useGame();

  // Calculate 10 progress blocks
  const filledBlocks = Math.floor((currentXPInLevel / 100) * 10);

  return (
    <header style={{ display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, zIndex: 100, padding: '12px 20px 0 20px' }}>
      <div className="retro-window" style={{ maxWidth: '1300px', margin: '0 auto', width: '100%' }}>
        
        {/* Retro Window Titlebar */}
        <div className="retro-titlebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Monitor size={16} />
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              YOU ARE ONLINE <span className="status-light-green" title="Status: Online & Operational" /> • Y2K DESKTOP OS [V2.0]
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '0.78rem', color: '#fbcfe8', fontWeight: 'bold' }}>Positive vibes! ✦</span>
            <div className="retro-controls">
              <span className="retro-win-box">_</span>
              <span className="retro-win-box">▢</span>
              <span className="retro-win-box">✕</span>
            </div>
          </div>
        </div>

        {/* Main Navbar Bar */}
        <div style={{
          padding: '12px 20px',
          background: '#ffffff',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          
          {/* Logo & Branding */}
          <div 
            onClick={() => setView('map')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div className="aura-gradient-box" style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem'
            }}>
              ✨
            </div>
            <div>
              <h1 style={{ fontSize: '1.25rem', color: '#222638', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                YOU ARE ONLINE <span className="status-light-green" title="System Status: Online" /> <span className="sparkle-star">✦</span>
              </h1>
            </div>
          </div>

          {/* Navigation View Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setView('map')} 
              className={`retro-btn ${currentView === 'map' ? 'retro-btn-pink' : ''}`}
            >
              <Folder size={14} /> Desktop Map
            </button>
            <button 
              onClick={() => setView('lesson')} 
              className={`retro-btn ${currentView === 'lesson' ? 'retro-btn-blue' : ''}`}
            >
              <Sparkles size={14} /> Active Quest
            </button>
          </div>

          {/* Level Progress & Telemetry Stats */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
            {/* Retro Loading Meter Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '140px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#222638', fontWeight: 'bold' }}>
                <span>LVL {level}</span>
                <span>{currentXPInLevel}/100 XP</span>
              </div>
              <div className="retro-progress-container" style={{ marginTop: '2px' }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <span 
                    key={i} 
                    className={i < filledBlocks ? 'retro-progress-block' : 'retro-progress-block-empty'} 
                  />
                ))}
              </div>
            </div>

            {/* Streak Pill */}
            <span className="retro-pill-btn retro-pill-btn-blue">
              <Flame size={14} fill="#ffffff" /> {streak} STREAK
            </span>

            {/* XP Pill */}
            <span className="retro-pill-btn">
              <Star size={14} fill="#ffffff" /> {xp} XP
            </span>

            {/* Audio Toggle */}
            <button 
              onClick={toggleSound}
              className="retro-btn"
              style={{ padding: '6px 10px' }}
              title={soundMuted ? "Unmute Retro Audio" : "Mute Retro Audio"}
            >
              {soundMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
