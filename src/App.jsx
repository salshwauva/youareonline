import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Navbar from './components/Navbar';
import TrackMap from './components/TrackMap';
import CourseJourneyView from './components/CourseJourneyView';
import LessonView from './components/LessonView';
import LessonAuthorStudio from './components/LessonAuthorStudio';
import RoadmapsView from './components/RoadmapsView';
import BadgeModal from './components/BadgeModal';

function MainApp() {
  const { activeQuestId, setActiveQuest, newBadgeUnlocked, clearNewBadgeModal } = useGame();
  const [view, setView] = useState('map'); // 'map' | 'roadmaps' | 'journey' | 'lesson' | 'studio'
  const [selectedCourseId, setSelectedCourseId] = useState('javascript-course');

  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId);
    setView('journey');
  };

  const handleSelectQuest = (questId) => {
    setActiveQuest(questId);
    setView('lesson');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--pastel-sky)' }}>
      <Navbar currentView={view} setView={setView} />
      
      <main style={{ flex: 1 }}>
        {view === 'map' ? (
          <TrackMap onSelectCourse={handleSelectCourse} onSelectQuest={handleSelectQuest} />
        ) : view === 'roadmaps' ? (
          <RoadmapsView
            onSelectQuest={handleSelectQuest}
            onSelectCourse={handleSelectCourse}
          />
        ) : view === 'journey' ? (
          <CourseJourneyView
            courseId={selectedCourseId}
            onSelectLesson={handleSelectQuest}
            onBackToCatalog={() => setView('map')}
          />
        ) : view === 'studio' ? (
          <LessonAuthorStudio onBackToCatalog={() => setView('map')} />
        ) : (
          <LessonView
            questId={activeQuestId}
            onBackToMap={() => setView('journey')}
            onNavigateLesson={handleSelectQuest}
          />
        )}
      </main>

      {/* Desktop Footer */}
      <footer style={{
        padding: '16px',
        textAlign: 'center',
        background: '#ffffff',
        borderTop: '2px solid var(--border-dark)',
        fontSize: '0.78rem',
        color: 'var(--border-dark)',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <div>
          YOU ARE ONLINE © 2026
        </div>
      </footer>

      {/* Badge Unlock Celebration Modal */}
      <BadgeModal badge={newBadgeUnlocked} onClose={clearNewBadgeModal} />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <MainApp />
    </GameProvider>
  );
}
