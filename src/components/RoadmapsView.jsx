import React, { useState } from 'react';
import { ROADMAPS } from '../data/roadmapsData';
import { useGame } from '../context/GameContext';
import { Compass, Play, CheckCircle2, Award, Clock, Target, Layers, ArrowRight, ShieldCheck, Sparkles, BookOpen, Crown, ChevronRight } from 'lucide-react';

export default function RoadmapsView({ onSelectQuest, onSelectCourse }) {
  const { completedQuests } = useGame();
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(ROADMAPS[0].id);

  const activeRoadmap = ROADMAPS.find(r => r.id === selectedRoadmapId) || ROADMAPS[0];

  // Flatten all lessons in active roadmap
  const allRoadmapLessons = activeRoadmap.milestones.flatMap(m => m.lessons);
  const completedCount = allRoadmapLessons.filter(l => completedQuests.includes(l.id)).length;
  const progressPercent = Math.round((completedCount / allRoadmapLessons.length) * 100) || 0;
  const isRoadmapCompleted = progressPercent === 100 && allRoadmapLessons.length > 0;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner Header Window */}
      <div className="retro-window">
        <div className="retro-titlebar retro-titlebar-pink">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={16} />
            <span>Goal-Oriented Career Roadmaps</span>
          </div>
          <div className="retro-controls">
            <span className="retro-win-box">_</span>
            <span className="retro-win-box">▢</span>
            <span className="retro-win-box">✕</span>
          </div>
        </div>

        <div style={{ padding: '20px 24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: '#222638', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🎯 Target-Driven Engineering Paths <span className="sparkle-star">✦</span>
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.5, margin: 0 }}>
              Select a specialized engineering goal below. Each roadmap connects curated interactive lessons across multiple core languages and frameworks into a structured milestone journey.
            </p>
          </div>

          {/* Roadmap Selection Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '8px', borderTop: '1.5px dashed #cbd5e1' }}>
            {ROADMAPS.map((roadmap) => {
              const isSelected = roadmap.id === selectedRoadmapId;
              const roadmapLessons = roadmap.milestones.flatMap(m => m.lessons);
              const doneCount = roadmapLessons.filter(l => completedQuests.includes(l.id)).length;
              const rPercent = Math.round((doneCount / roadmapLessons.length) * 100) || 0;

              return (
                <button
                  key={roadmap.id}
                  onClick={() => setSelectedRoadmapId(roadmap.id)}
                  className={`retro-btn ${isSelected ? 'retro-btn-pink' : ''}`}
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: isSelected ? '3px 3px 0px #222638' : '2px 2px 0px #222638'
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{roadmap.icon}</span>
                  <span style={{ fontWeight: 'bold' }}>{roadmap.title}</span>
                  <span className="retro-pill-btn" style={{ fontSize: '0.68rem', padding: '1px 6px', background: isSelected ? '#ffffff' : '#e2e8f0', color: '#222638' }}>
                    {rPercent}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Roadmap Main Hero Card */}
      <div className="retro-window">
        <div className={`retro-titlebar ${activeRoadmap.colorTag === 'pink' ? 'retro-titlebar-pink' : activeRoadmap.colorTag === 'yellow' ? 'retro-titlebar-yellow' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{activeRoadmap.icon} Roadmap: {activeRoadmap.title}</span>
          </div>
          <div className="retro-controls">
            <span className="retro-win-box">_</span>
            <span className="retro-win-box">▢</span>
            <span className="retro-win-box">✕</span>
          </div>
        </div>

        <div style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* Big Mascot / Icon */}
            <div className="aura-gradient-box" style={{
              width: '88px',
              height: '88px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              flexShrink: 0
            }}>
              {activeRoadmap.icon}
            </div>

            {/* Info details */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <span className="retro-pill-btn retro-pill-btn-blue" style={{ fontSize: '0.72rem' }}>
                  <Target size={12} /> Target Role: {activeRoadmap.targetRole}
                </span>
                <span className="retro-pill-btn" style={{ fontSize: '0.72rem' }}>
                  <Clock size={12} /> {activeRoadmap.estimatedHours}
                </span>
                <span className="retro-pill-btn" style={{ fontSize: '0.72rem', background: '#fef3c7', color: '#92400e' }}>
                  Difficulty: {activeRoadmap.difficulty}
                </span>
              </div>

              <h3 style={{ fontSize: '1.35rem', color: '#222638', margin: '0 0 8px 0' }}>
                {activeRoadmap.title}
              </h3>
              
              <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.5, margin: 0 }}>
                {activeRoadmap.goal}
              </p>
            </div>

            {/* Goal Certificate Reward Box */}
            <div style={{
              padding: '14px 18px',
              background: isRoadmapCompleted ? '#f0fdf4' : '#f8fafc',
              border: isRoadmapCompleted ? '2.5px solid #22c55e' : '2px solid #222638',
              borderRadius: '6px',
              boxShadow: '3px 3px 0px #222638',
              minWidth: '220px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#7c8cc6', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Award size={14} /> CAREER CERTIFICATE REWARD:
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '2rem' }}>{activeRoadmap.badgeReward.icon}</span>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#222638' }}>
                    {activeRoadmap.badgeReward.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {isRoadmapCompleted ? 'Unlocked & Earned!' : 'Complete all roadmap nodes'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Roadmap Progress Meter */}
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '4px', border: '2px solid #222638', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 'bold', color: '#222638' }}>
              <span>ROADMAP MILESTONE PROGRESS</span>
              <span>{completedCount} of {allRoadmapLessons.length} Lessons Passed ({progressPercent}%)</span>
            </div>
            <div style={{ height: '14px', background: '#ffffff', border: '1.5px solid #222638', borderRadius: '6px', overflow: 'hidden', padding: '2px' }}>
              <div style={{ height: '100%', width: `${progressPercent}%`, background: 'var(--titlebar-pink)', borderRadius: '4px', transition: 'width 0.3s ease' }} />
            </div>
          </div>

        </div>
      </div>

      {/* Visual Roadmap Nodes & Milestones Tree */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ fontSize: '1.15rem', color: '#222638', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} color="#ff69b4" /> Sequential Learning Milestones & Lesson Nodes
        </h3>

        {activeRoadmap.milestones.map((milestone, mIdx) => {
          const mLessonsDone = milestone.lessons.filter(l => completedQuests.includes(l.id)).length;
          const isMilestoneDone = mLessonsDone === milestone.lessons.length;

          return (
            <div key={milestone.id} style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              
              {/* Retro Phase Card */}
              <div className="retro-window">
                <div className={`retro-titlebar ${mIdx % 2 === 0 ? '' : 'retro-titlebar-yellow'}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="retro-pill-btn" style={{ fontSize: '0.72rem', padding: '1px 6px' }}>
                      STEP {mIdx + 1}
                    </span>
                    <span>{milestone.title}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 'bold' }}>
                    {mLessonsDone}/{milestone.lessons.length} Passed
                  </div>
                </div>

                <div style={{ padding: '20px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ fontSize: '0.88rem', color: '#4b5563', margin: 0 }}>
                    {milestone.description}
                  </p>

                  {/* Nodes Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                    {milestone.lessons.map((node) => {
                      const isPassed = completedQuests.includes(node.id);

                      return (
                        <div
                          key={node.id}
                          className="retro-window retro-window-interactive"
                          style={{
                            padding: '16px',
                            background: isPassed ? '#f0fdf4' : node.isBoss ? '#fff5f8' : '#ffffff',
                            borderColor: isPassed ? '#22c55e' : node.isBoss ? '#ff69b4' : '#222638',
                            borderWidth: node.isBoss ? '3px' : '2px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 'bold', background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px', color: '#334155' }}>
                              {node.courseTitle}
                            </span>

                            {isPassed ? (
                              <span style={{ color: '#16a34a', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <CheckCircle2 size={14} /> PASSED
                              </span>
                            ) : (
                              <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: '#7c8cc6' }}>
                                {node.isBoss ? '👑 CAPSTONE BOSS' : 'READY TO START'}
                              </span>
                            )}
                          </div>

                          <div>
                            <h4 style={{ fontSize: '0.95rem', color: '#222638', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {node.isBoss && <Crown size={16} color="#ff69b4" />}
                              <span>{node.title}</span>
                            </h4>
                          </div>

                          <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', paddingTop: '8px', borderTop: '1px dashed #e2e8f0' }}>
                            <button
                              onClick={() => onSelectQuest(node.id)}
                              className={`retro-btn ${node.isBoss ? 'retro-btn-pink' : 'retro-btn-blue'}`}
                              style={{ flex: 1, padding: '6px 12px', fontSize: '0.78rem' }}
                            >
                              <Play size={12} /> {isPassed ? 'Review Lesson' : 'Launch Node'}
                            </button>

                            <button
                              onClick={() => onSelectCourse(node.courseId)}
                              className="retro-btn"
                              style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                              title="Open full course roadmap view"
                            >
                              <BookOpen size={12} />
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>

              {/* Milestone Down Arrow Connector */}
              {mIdx < activeRoadmap.milestones.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '2px solid #222638',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '2px 2px 0px #222638',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: '#ff69b4'
                  }}>
                    ↓
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Completion Trophy Placeholder Box */}
      <div className="retro-window" style={{ marginTop: '12px' }}>
        <div className="retro-titlebar retro-titlebar-yellow">
          <span>Goal Completion Telemetry</span>
          <div className="retro-controls">
            <span className="retro-win-box">_</span>
            <span className="retro-win-box">▢</span>
            <span className="retro-win-box">✕</span>
          </div>
        </div>

        <div style={{ padding: '24px', background: '#ffffff', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '3rem' }}>
            {isRoadmapCompleted ? '🎉' : '🗺️'}
          </div>

          <h3 style={{ fontSize: '1.2rem', color: '#222638', margin: 0 }}>
            {isRoadmapCompleted ? `Congratulations! You completed the ${activeRoadmap.title} Roadmap!` : `Keep Pushing Toward Your ${activeRoadmap.targetRole} Goal!`}
          </h3>

          <p style={{ fontSize: '0.88rem', color: '#4b5563', maxWidth: '600px', margin: 0 }}>
            {isRoadmapCompleted
              ? `You have mastered all milestones in ${activeRoadmap.title}. Your skill badge "${activeRoadmap.badgeReward.title}" has been recorded!`
              : `Complete each connected lesson node in sequence to earn your official ${activeRoadmap.title} certification badge.`}
          </p>
        </div>
      </div>

    </div>
  );
}
