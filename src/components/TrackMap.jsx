import React, { useState } from 'react';
import { ALL_COURSES, DOMAINS, searchLessons } from '../data/courseRegistry';
import { useGame } from '../context/GameContext';
import { CheckCircle2, Play, Award, Folder, Code, Zap, Flame, Star, Search, Compass, BookOpen, Layers } from 'lucide-react';

const LANGUAGES = [
  { id: 'ALL', name: 'ALL LANGUAGES', icon: '✨' },
  { id: 'JavaScript', name: 'JAVASCRIPT', icon: '⚡' },
  { id: 'Python', name: 'PYTHON', icon: '🐍' },
  { id: 'Next.js', name: 'NEXT.JS', icon: '▲' },
  { id: 'Vue', name: 'VUE', icon: '🟢' },
  { id: 'Svelte', name: 'SVELTE', icon: '🟠' },
  { id: 'Node/Express', name: 'EXPRESS', icon: '🟢' },
  { id: 'Python/FastAPI', name: 'FASTAPI', icon: '⚡' },
  { id: 'Python/Pandas', name: 'PANDAS', icon: '🐼' },
  { id: 'CSS/Tailwind', name: 'TAILWIND', icon: '🎨' },
  { id: 'TypeScript', name: 'TYPESCRIPT', icon: '🔷' },
  { id: 'Python/PyTorch', name: 'PYTORCH', icon: '🔥' },
  { id: 'HTML/CSS', name: 'HTML/CSS', icon: '🎨' },
  { id: 'Rust', name: 'RUST', icon: '🦀' },
  { id: 'SQL', name: 'SQL', icon: '💾' },
  { id: 'C++', name: 'C++', icon: '⚡' },
  { id: 'React', name: 'REACT', icon: '⚛️' },
  { id: 'Terminal & Git', name: 'GIT / CLI', icon: '🖥️' }
];

export default function TrackMap({ onSelectCourse, onSelectQuest }) {
  const { completedQuests, unlockedBadges, xp, level, streak } = useGame();
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');
  const [selectedDomain, setSelectedDomain] = useState('ALL DOMAINS');
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = searchQuery ? searchLessons(searchQuery) : [];

  const filteredCourses = ALL_COURSES.filter(course => {
    const matchLang = selectedLanguage === 'ALL' || course.language === selectedLanguage;
    const matchDomain = selectedDomain === 'ALL DOMAINS' || course.domain === selectedDomain;
    return matchLang && matchDomain;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Search & Filter Top Window */}
      <div className="retro-window">
        <div className="retro-titlebar retro-titlebar-pink">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={16} />
            <span>Framework & Language Curriculum Directory</span>
          </div>
          <div className="retro-controls">
            <span className="retro-win-box">_</span>
            <span className="retro-win-box">▢</span>
            <span className="retro-win-box">✕</span>
          </div>
        </div>

        <div style={{ padding: '16px 20px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Search Bar */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} color="#7c8cc6" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search frameworks & libraries (e.g. Next.js, FastAPI, Pandas, PyTorch, Express, Tailwind, Vue)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  border: '2px solid #222638',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-retro)',
                  boxShadow: 'inset 2px 2px 0px #eef3fc'
                }}
              />
            </div>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="retro-btn">
                Clear
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchQuery && (
            <div style={{ background: '#f8fafc', padding: '12px', border: '2px solid #222638', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#7c8cc6' }}>
                SEARCH RESULTS ({searchResults.length} matches found):
              </div>
              {searchResults.length > 0 ? (
                searchResults.map(({ lesson, course }) => (
                  <div
                    key={lesson.id}
                    onClick={() => onSelectQuest(lesson.id)}
                    style={{
                      padding: '8px 12px',
                      background: '#ffffff',
                      border: '1.5px solid #222638',
                      borderRadius: '4px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ff69b4', marginRight: '8px' }}>
                        [{course.title}]
                      </span>
                      <strong style={{ fontSize: '0.85rem', color: '#222638' }}>{lesson.title}</strong>
                    </div>
                    <button className="retro-btn retro-btn-blue" style={{ padding: '2px 8px', fontSize: '0.72rem' }}>
                      Launch
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>No matching lessons found for "{searchQuery}".</p>
              )}
            </div>
          )}

          {/* Category Domains Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#7c8cc6', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={14} /> FILTER BY DOMAIN:
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {DOMAINS.map((domain) => (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`retro-btn ${selectedDomain === domain ? 'retro-btn-pink' : ''}`}
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {/* Languages & Frameworks Filter Pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`retro-btn ${selectedLanguage === lang.id ? 'retro-btn-blue' : ''}`}
                style={{ padding: '3px 8px', fontSize: '0.72rem' }}
              >
                <span>{lang.icon}</span> <span>{lang.name}</span>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* User Overview Telemetry Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <div className="retro-window" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="retro-titlebar">
            <span>Engineer Telemetry</span>
            <div className="retro-controls">
              <span className="retro-win-box">_</span>
              <span className="retro-win-box">▢</span>
              <span className="retro-win-box">✕</span>
            </div>
          </div>
          
          <div style={{ padding: '16px 20px', background: '#ffffff', display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
            <div className="aura-gradient-box" style={{
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              flexShrink: 0
            }}>
              👨‍💻
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#222638' }}>
                Level {level} Engineer
              </div>
              <p style={{ fontSize: '0.82rem', color: '#4b5563', marginBottom: '6px' }}>
                Total XP: <strong>{xp}</strong> | Streak: <strong>{streak} Days</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Badges Inventory */}
        <div className="retro-window" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="retro-titlebar retro-titlebar-yellow">
            <span>Unlocked Badges ({unlockedBadges.length})</span>
            <div className="retro-controls">
              <span className="retro-win-box">_</span>
              <span className="retro-win-box">▢</span>
              <span className="retro-win-box">✕</span>
            </div>
          </div>

          <div style={{ padding: '12px 16px', background: '#ffffff', flex: 1, display: 'flex', gap: '8px', flexWrap: 'wrap', alignContent: 'center' }}>
            {unlockedBadges.map((b) => (
              <div 
                key={b.id} 
                title={`${b.title}: ${b.desc}`} 
                style={{
                  padding: '4px 10px',
                  background: '#eef3fc',
                  border: '1.5px solid #222638',
                  borderRadius: '4px',
                  boxShadow: '1.5px 1.5px 0px #222638',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
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

      {/* Framework & Library Courses Catalog Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {filteredCourses.map((course, idx) => {
          const allCourseLessons = course.chapters.flatMap(c => c.lessons);
          const completedCount = allCourseLessons.filter(l => completedQuests.includes(l.id)).length;
          const percent = Math.round((completedCount / allCourseLessons.length) * 100) || 0;

          return (
            <div key={course.id} className="retro-window" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className={`retro-titlebar ${idx % 3 === 1 ? 'retro-titlebar-pink' : idx % 3 === 2 ? 'retro-titlebar-yellow' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Folder size={16} />
                  <span>{course.title}</span>
                </div>
                <div className="retro-controls">
                  <span className="retro-win-box">_</span>
                  <span className="retro-win-box">▢</span>
                  <span className="retro-win-box">✕</span>
                </div>
              </div>

              <div style={{ padding: '20px', background: '#ffffff', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  {course.mascotImg && (
                    <img
                      src={course.mascotImg}
                      alt={course.title}
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '4px',
                        border: '2px solid #222638',
                        objectFit: 'contain',
                        mixBlendMode: 'multiply',
                        flexShrink: 0
                      }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="retro-pill-btn" style={{ fontSize: '0.72rem' }}>
                        {course.icon} {course.language}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#7c8cc6' }}>
                        {course.domain}
                      </span>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.5 }}>
                  {course.description}
                </p>

                {/* Progress bar */}
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '4px', border: '1.5px solid #222638' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 'bold', color: '#222638', marginBottom: '4px' }}>
                    <span>LESSON INFRASTRUCTURE</span>
                    <span>{completedCount}/{allCourseLessons.length} Completed</span>
                  </div>
                  <div style={{ height: '10px', background: '#ffffff', border: '1.5px solid #222638', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${percent}%`, background: 'var(--titlebar-pink)', transition: 'width 0.3s ease' }} />
                  </div>
                </div>

                {/* Action button */}
                <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => onSelectCourse(course.id)}
                    className="retro-btn retro-btn-pink"
                    style={{ flex: 1, padding: '8px', fontSize: '0.82rem' }}
                  >
                    <BookOpen size={14} /> Course Roadmap
                  </button>
                  <button
                    onClick={() => onSelectQuest(allCourseLessons[0].id)}
                    className="retro-btn retro-btn-blue"
                    style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                  >
                    <Play size={14} /> Launch
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
