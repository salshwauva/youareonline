import React from 'react';
import { TRACKS_DATA } from '../data/coursesData';
import { useGame } from '../context/GameContext';
import { CheckCircle2, Play, Award, Sparkles, Heart } from 'lucide-react';

export default function TrackMap({ onSelectQuest }) {
  const { completedQuests, unlockedBadges, activeQuestId } = useGame();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Anime Sakura Banner */}
      <div className="pixel-box" style={{
        padding: '32px',
        background: 'linear-gradient(135deg, #fff0f6 0%, #f4e8ff 100%)',
        borderColor: '#fbcfe8',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ maxWidth: '650px' }}>
          <div className="badge-neon badge-pink" style={{ marginBottom: '12px' }}>
            <Sparkles size={12} /> 🌸 KAWAII QUEST MAP 🎀
          </div>
          <h2 style={{ fontSize: '1.6rem', color: '#4a0e2e', marginBottom: '8px' }}>
            SELECT YOUR PROGRAMMING & CS JOURNEY 💕
          </h2>
          <p style={{ color: '#9d4b6e', fontSize: '0.95rem' }}>
            Learn Rust Ownership, C++ Pointers, SQL Databases, Data Science, and Systems Architecture with automated synthetic data generators!
          </p>
        </div>

        {/* Badges Inventory Summary */}
        <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #fbcfe8', boxShadow: '0 4px 15px rgba(244, 114, 182, 0.15)' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-retro)', color: '#be185d', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
            <Award size={16} /> EARNED BADGES ({unlockedBadges.length}) ✨
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {unlockedBadges.map((b) => (
              <span key={b.id} title={`${b.title}: ${b.desc}`} style={{ fontSize: '1.3rem', padding: '4px 8px', background: '#fff0f6', borderRadius: '6px', border: '1px solid #fbcfe8' }}>
                {b.icon}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Track Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {TRACKS_DATA.map((track) => {
          const trackCompletedCount = track.quests.filter(q => completedQuests.includes(q.id)).length;

          return (
            <div key={track.id} className="pixel-box" style={{ padding: '24px', background: '#ffffff' }}>
              
              {/* Track Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1.5px solid #fbcfe8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '2.2rem' }}>{track.icon}</span>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: '#4a0e2e' }}>{track.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: '#9d4b6e' }}>{track.description}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="badge-neon badge-pink">
                    {trackCompletedCount} / {track.quests.length} COMPLETED 🌸
                  </span>
                </div>
              </div>

              {/* Quest Nodes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                {track.quests.map((quest, index) => {
                  const isCompleted = completedQuests.includes(quest.id);
                  const isActive = activeQuestId === quest.id;

                  return (
                    <div
                      key={quest.id}
                      onClick={() => onSelectQuest(quest.id)}
                      className="pixel-box pixel-box-interactive"
                      style={{
                        padding: '16px',
                        background: isActive ? '#fff0f6' : '#fffafd',
                        borderColor: isActive ? 'var(--accent-pink-deep)' : isCompleted ? 'var(--accent-green)' : '#fbcfe8'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-retro)', color: '#be185d', fontWeight: 700 }}>
                          QUEST #{index + 1} • {quest.xp} XP 💖
                        </span>
                        {isCompleted ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontSize: '0.75rem', fontWeight: 700 }}>
                            <CheckCircle2 size={16} /> PASSED
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {quest.difficulty}
                          </span>
                        )}
                      </div>

                      <h4 style={{ fontSize: '0.95rem', color: '#4a0e2e', marginBottom: '8px' }}>
                        {quest.title}
                      </h4>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {quest.simulatorType}
                        </span>
                        <button className="pixel-btn pixel-btn-primary" style={{ padding: '5px 12px', fontSize: '0.72rem' }}>
                          <Play size={12} /> Launch Quest 💕
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
