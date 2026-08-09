import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Navbar from './components/Navbar';
import TrackMap from './components/TrackMap';
import LessonView from './components/LessonView';
import BadgeModal from './components/BadgeModal';

function MainApp() {
  const { currentTrack, activeQuestId, setActiveQuest, newBadgeUnlocked, clearNewBadgeModal } = useGame();
  const [view, setView] = useState('map'); // 'map', 'lesson'

  const handleSelectQuest = (questId) => {
    setActiveQuest(questId);
    setView('lesson');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
      <Navbar currentView={view} setView={setView} />
      
      <main style={{ flex: 1 }}>
        {view === 'map' ? (
          <TrackMap onSelectQuest={handleSelectQuest} />
        ) : (
          <LessonView questId={activeQuestId} onBackToMap={() => setView('map')} />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '16px',
        textAlign: 'center',
        background: '#050608',
        borderTop: '1px solid var(--card-border)',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-retro)'
      }}>
        YOU ARE ONLINE © 2026 • GAMIFIED CS & AUTOMATED SYNTHETIC DATA LEARNING PLATFORM
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
