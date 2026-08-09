import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Navbar from './components/Navbar';
import TrackMap from './components/TrackMap';
import LessonView from './components/LessonView';
import BadgeModal from './components/BadgeModal';

function MainApp() {
  const { activeQuestId, setActiveQuest, newBadgeUnlocked, clearNewBadgeModal } = useGame();
  const [view, setView] = useState('map'); // 'map', 'lesson'

  const handleSelectQuest = (questId) => {
    setActiveQuest(questId);
    setView('lesson');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--pastel-sky)' }}>
      <Navbar currentView={view} setView={setView} />
      
      <main style={{ flex: 1 }}>
        {view === 'map' ? (
          <TrackMap onSelectQuest={handleSelectQuest} />
        ) : (
          <LessonView questId={activeQuestId} onBackToMap={() => setView('map')} />
        )}
      </main>

      {/* Retro OS Desktop Footer */}
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
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', color: '#7c8cc6' }}>
          <span style={{ cursor: 'pointer' }}>Hello human!</span> •
          <span style={{ cursor: 'pointer' }}>Positive vibes!</span> •
          <span style={{ cursor: 'pointer' }}>Today is a great day!</span> •
          <span style={{ cursor: 'pointer' }}>Don't forget to take a nap!</span>
        </div>
        <div>
          YOU ARE ONLINE © 2000-2026 • PASTEL RETRO Y2K OS LEARNING PLATFORM
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
