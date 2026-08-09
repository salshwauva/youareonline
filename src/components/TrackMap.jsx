import React, { useState } from 'react';
import { TRACKS_DATA } from '../data/coursesData';
import { useGame } from '../context/GameContext';
import { CheckCircle2, Play, Award, Folder, Monitor, Sparkles, Heart, Smile, Code } from 'lucide-react';

const LANGUAGES = [
  { id: 'ALL', name: 'ALL COURSES', icon: '✨' },
  { id: 'Rust', name: 'RUST', icon: '🦀' },
  { id: 'Python', name: 'PYTHON', icon: '🐍' },
  { id: 'SQL', name: 'SQL', icon: '💾' },
  { id: 'Java', name: 'JAVA', icon: '☕' },
  { id: 'C++', name: 'C++', icon: '⚡' },
  { id: 'C#', name: 'C#', icon: '🎯' },
  { id: 'C', name: 'C', icon: '⚙️' }
];

export default function TrackMap({ onSelectQuest }) {
  const { completedQuests, unlockedBadges, activeQuestId, xp, level, streak } = useGame();
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');

  const filteredTracks = selectedLanguage === 'ALL'
    ? TRACKS_DATA
    : TRACKS_DATA.filter(track => track.languages.includes(selectedLanguage));

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Hero Section: Desktop Workspace with CRT Monitor & Note Dialogs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'stretch' }}>
        
        {/* CRT Monitor Component: "Hello human!" */}
        <div className="retro-window" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="retro-titlebar">
            <span>CRT Monitor • System Output</span>
            <div className="retro-controls">
              <span className="retro-win-box">_</span>
              <span className="retro-win-box">▢</span>
              <span className="retro-win-box">✕</span>
            </div>
          </div>
          
          <div style={{ padding: '24px', background: '#f8fafc', display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
            {/* CRT Monitor Illustration Frame */}
            <div style={{
              width: '130px',
              height: '110px',
              background: '#7c8cc6',
              border: '2px solid #222638',
              borderRadius: '8px',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '3px 3px 0px #222638'
            }}>
              <div className="aura-gradient-box" style={{
                width: '100%',
                height: '75px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '6px',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                color: '#ffffff',
                textShadow: '1px 1px 2px rgba(0,0,0,0.4)'
              }}>
                Hello human!
              </div>
              <div style={{ width: '30px', height: '4px', background: '#222638', marginTop: '6px', borderRadius: '2px' }} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#222638', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Welcome to CS Desktop <span className="sparkle-star">✦</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.4, marginBottom: '12px' }}>
                Select a programming language filter or quest folder below to master Rust, Python, SQL, Java, C++, C#, and C!
              </p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span className="retro-pill-btn retro-pill-btn-blue" style={{ fontSize: '0.72rem' }}>
                  <Smile size={12} /> Positive vibes!
                </span>
                <span className="retro-pill-btn" style={{ fontSize: '0.72rem' }}>
                  Level {level} Engineer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Note Dialog Box: "Don't forget to take a nap!" */}
        <div className="retro-window" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="retro-titlebar retro-titlebar-pink">
            <span>Note</span>
            <div className="retro-controls">
              <span className="retro-win-box">_</span>
              <span className="retro-win-box">▢</span>
              <span className="retro-win-box">✕</span>
            </div>
          </div>

          <div style={{ padding: '20px', background: '#ffffff', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#222638', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Today is a great day! <span className="sparkle-star">✨</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.5 }}>
                "Don't forget to take a nap, drink water, and write clean algorithm test harnesses!"
              </p>
            </div>

            {/* Dialog buttons: [ thanks ] [ later ] */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button className="retro-btn retro-btn-pink">thanks</button>
              <button className="retro-btn">later</button>
            </div>
          </div>
        </div>

        {/* Earned Badges Inventory Window */}
        <div className="retro-window" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="retro-titlebar retro-titlebar-yellow">
            <span>Memories • Badges Inventory ({unlockedBadges.length})</span>
            <div className="retro-controls">
              <span className="retro-win-box">_</span>
              <span className="retro-win-box">▢</span>
              <span className="retro-win-box">✕</span>
            </div>
          </div>

          <div style={{ padding: '16px', background: '#ffffff', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#222638', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={16} color="#f7a3c3" /> UNLOCKED DESKTOP BADGES
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', flex: 1, alignContent: 'flex-start' }}>
              {unlockedBadges.map((b) => (
                <div 
                  key={b.id} 
                  title={`${b.title}: ${b.desc}`} 
                  style={{
                    padding: '8px 12px',
                    background: '#eef3fc',
                    border: '2px solid #222638',
                    borderRadius: '4px',
                    boxShadow: '2px 2px 0px #222638',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 'bold'
                  }}
                >
                  <span>{b.icon}</span>
                  <span>{b.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Language Selection Filter Bar (Y2K Desktop Control Box) */}
      <div className="retro-window" style={{ padding: '14px 18px', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.88rem', fontWeight: 'bold', color: '#222638' }}>
          <Code size={18} color="#7c8cc6" />
          <span>FILTER COURSES BY LANGUAGE:</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`retro-btn ${isSelected ? 'retro-btn-pink' : ''}`}
                style={{
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  borderColor: isSelected ? '#222638' : '#222638'
                }}
              >
                <span>{lang.icon}</span>
                <span>{lang.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Track Windows Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredTracks.map((track, trackIdx) => {
          const trackCompletedCount = track.quests.filter(q => completedQuests.includes(q.id)).length;
          
          // Alternate titlebar colors like in the reference images: blue, pink, yellow
          const titlebarClass = trackIdx % 3 === 1 ? 'retro-titlebar-pink' : trackIdx % 3 === 2 ? 'retro-titlebar-yellow' : '';

          return (
            <div key={track.id} className="retro-window">
              
              {/* Window Titlebar */}
              <div className={`retro-titlebar ${titlebarClass}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Folder size={16} />
                  <span>Folder: {track.title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 'bold' }}>
                    {trackCompletedCount} / {track.quests.length} Completed
                  </span>
                  <div className="retro-controls">
                    <span className="retro-win-box">_</span>
                    <span className="retro-win-box">▢</span>
                    <span className="retro-win-box">✕</span>
                  </div>
                </div>
              </div>

              {/* Window Content */}
              <div style={{ padding: '20px', background: '#ffffff' }}>
                <p style={{ fontSize: '0.88rem', color: '#4b5563', marginBottom: '16px' }}>
                  {track.description}
                </p>

                {/* Quest Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '16px' }}>
                  {track.quests.map((quest, index) => {
                    const isCompleted = completedQuests.includes(quest.id);
                    const isActive = activeQuestId === quest.id;

                    return (
                      <div
                        key={quest.id}
                        onClick={() => onSelectQuest(quest.id)}
                        className="retro-window retro-window-interactive"
                        style={{
                          padding: '16px',
                          background: isActive ? '#eef3fc' : '#ffffff',
                          borderColor: isActive ? '#7c8cc6' : isCompleted ? '#22c55e' : '#222638'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#7c8cc6' }}>
                            QUEST #{index + 1} • {quest.xp} XP
                          </span>
                          {isCompleted ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16a34a', fontSize: '0.75rem', fontWeight: 'bold' }}>
                              <CheckCircle2 size={16} /> PASSED
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 'bold' }}>
                              {quest.difficulty}
                            </span>
                          )}
                        </div>

                        <h4 style={{ fontSize: '0.95rem', color: '#222638', marginBottom: '6px' }}>
                          {quest.title}
                        </h4>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
                          <span style={{ fontSize: '0.75rem', color: '#6b7280', fontFamily: 'var(--font-code)' }}>
                            {quest.simulatorType}
                          </span>
                          <button className="retro-btn retro-btn-blue" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                            <Play size={12} /> Launch Quest
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
