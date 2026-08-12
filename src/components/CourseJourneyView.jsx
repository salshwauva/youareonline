import React from 'react';
import { useGame } from '../context/GameContext';
import { getCourseById } from '../data/courseRegistry';
import { ArrowLeft, CheckCircle2, Crown, Sparkles, BookOpen, Play, Lock, Code, Eye, HelpCircle, Puzzle, Cpu } from 'lucide-react';

export default function CourseJourneyView({ courseId, onSelectLesson, onBackToCatalog }) {
  const { completedQuests } = useGame();
  const course = getCourseById(courseId);

  // Compute course total metrics
  const allLessons = course.chapters.flatMap(ch => ch.lessons);
  const completedInCourse = allLessons.filter(l => completedQuests.includes(l.id));
  const progressPercent = Math.round((completedInCourse.length / allLessons.length) * 100) || 0;

  const renderTypeBadge = (type) => {
    switch (type) {
      case 'web-preview':
        return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#fbcfe8', color: '#831843', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}><Eye size={12} /> Web Preview</span>;
      case 'quiz':
        return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}><HelpCircle size={12} /> Quiz</span>;
      case 'fill-blank':
        return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#e0e7ff', color: '#3730a3', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}><Puzzle size={12} /> Code Puzzle</span>;
      case 'simulator':
        return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}><Cpu size={12} /> Sandbox</span>;
      default:
        return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}><Code size={12} /> Code Challenge</span>;
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Navigation Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBackToCatalog} className="retro-btn retro-btn-blue">
          <ArrowLeft size={14} /> Back to All Courses
        </button>

        <span className="retro-pill-btn retro-pill-btn-blue" style={{ fontSize: '0.8rem' }}>
          Domain: {course.domain}
        </span>
      </div>

      {/* Course Hero Banner Window */}
      <div className="retro-window">
        <div className="retro-titlebar retro-titlebar-pink">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{course.icon} Course Roadmap: {course.title}</span>
          </div>
          <div className="retro-controls">
            <span className="retro-win-box">_</span>
            <span className="retro-win-box">▢</span>
            <span className="retro-win-box">✕</span>
          </div>
        </div>

        <div style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div className="aura-gradient-box" style={{
              width: '90px',
              height: '90px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              flexShrink: 0,
              overflow: 'hidden'
            }}>
              {course.mascotImg ? (
                <img src={course.mascotImg} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
              ) : (
                course.icon
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                <span className="retro-pill-btn" style={{ fontSize: '0.72rem' }}>
                  {course.language}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 'bold' }}>
                  {course.difficulty}
                </span>
              </div>
              <h2 style={{ fontSize: '1.4rem', color: '#222638', marginBottom: '6px' }}>
                {course.title}
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.5 }}>
                {course.description}
              </p>
            </div>
          </div>

          {/* Progress Bar Widget */}
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '4px', border: '2px solid #222638', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 'bold', color: '#222638' }}>
              <span>COURSE PROGRESS</span>
              <span>{completedInCourse.length} of {allLessons.length} Completed ({progressPercent}%)</span>
            </div>

            <div style={{ height: '16px', background: '#ffffff', border: '2px solid #222638', borderRadius: '8px', overflow: 'hidden', padding: '2px' }}>
              <div style={{ height: '100%', width: `${progressPercent}%`, background: 'var(--pastel-pink-gradient)', borderRadius: '6px', transition: 'width 0.3s ease' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Chapters & Visual Node Roadmap */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {course.chapters.map((chapter, chIdx) => {
          const chCompletedCount = chapter.lessons.filter(l => completedQuests.includes(l.id)).length;
          const isChComplete = chCompletedCount === chapter.lessons.length;

          return (
            <div key={chapter.id} className="retro-window">
              <div className={`retro-titlebar ${chIdx % 2 === 0 ? '' : 'retro-titlebar-yellow'}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={16} />
                  <span>{chapter.title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 'bold' }}>
                    {chCompletedCount} / {chapter.lessons.length} Passed
                  </span>
                  <div className="retro-controls">
                    <span className="retro-win-box">_</span>
                    <span className="retro-win-box">▢</span>
                    <span className="retro-win-box">✕</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '20px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ fontSize: '0.88rem', color: '#4b5563' }}>
                  {chapter.description}
                </p>

                {/* Lesson Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                  {chapter.lessons.map((lesson, lessonIdx) => {
                    const isDone = completedQuests.includes(lesson.id);
                    const isBoss = lesson.isBoss;

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson.id)}
                        className="retro-window retro-window-interactive"
                        style={{
                          padding: '16px',
                          background: isBoss ? '#fff5f8' : isDone ? '#f0fdf4' : '#ffffff',
                          borderColor: isBoss ? '#ff69b4' : isDone ? '#22c55e' : '#222638',
                          borderWidth: isBoss ? '3px' : '2px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          {renderTypeBadge(lesson.type)}
                          <span style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#7c8cc6' }}>
                            +{lesson.xp} XP
                          </span>
                        </div>

                        <h4 style={{ fontSize: '0.98rem', color: '#222638', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {isBoss && <Crown size={18} color="#ff69b4" />}
                          <span>{lesson.title}</span>
                        </h4>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px' }}>
                          {isDone ? (
                            <span style={{ color: '#16a34a', fontSize: '0.78rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <CheckCircle2 size={16} /> PASSED
                            </span>
                          ) : (
                            <span style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 'bold' }}>
                              {isBoss ? '👑 CAPSTONE BOSS' : 'UNLOCKED'}
                            </span>
                          )}

                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectLesson(lesson.id);
                            }} 
                            className={`retro-btn ${isBoss ? 'retro-btn-pink' : 'retro-btn-blue'}`} 
                            style={{ padding: '4px 12px', fontSize: '0.78rem' }}
                          >
                            <Play size={12} /> {isDone ? 'Review' : 'Start'}
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
