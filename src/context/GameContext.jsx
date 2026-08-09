import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundFX } from '../utils/sound';

const GameContext = createContext();

const STORAGE_KEY = 'you_are_online_progress';

const DEFAULT_STATE = {
  xp: 250,
  streak: 3,
  completedQuests: ['rust-101'],
  unlockedBadges: [
    { id: 'first_quest', title: 'Hello World', desc: 'Completed your first quest!', icon: '⚡' }
  ],
  currentTrack: 'systems',
  activeQuestId: 'rust-memory',
  soundMuted: false
};

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to parse saved game state:', e);
    }
    return DEFAULT_STATE;
  });

  const [newBadgeUnlocked, setNewBadgeUnlocked] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        xp: gameState.xp,
        streak: gameState.streak,
        completedQuests: gameState.completedQuests,
        unlockedBadges: gameState.unlockedBadges,
        currentTrack: gameState.currentTrack,
        activeQuestId: gameState.activeQuestId,
        soundMuted: gameState.soundMuted
      }));
    } catch (e) {
      console.warn('Failed to save state to localStorage:', e);
    }
  }, [gameState]);

  const level = Math.floor(gameState.xp / 100) + 1;
  const currentXPInLevel = gameState.xp % 100;

  const addXP = (amount) => {
    setGameState(prev => {
      const newXP = prev.xp + amount;
      const oldLevel = Math.floor(prev.xp / 100) + 1;
      const newLevel = Math.floor(newXP / 100) + 1;

      if (newLevel > oldLevel) {
        soundFX.playLevelUp();
      }

      return { ...prev, xp: newXP };
    });
  };

  const completeQuest = (questId, xpReward = 50, badgeToUnlock = null) => {
    setGameState(prev => {
      const isAlreadyCompleted = prev.completedQuests.includes(questId);
      const newCompleted = isAlreadyCompleted ? prev.completedQuests : [...prev.completedQuests, questId];
      
      let newBadges = [...prev.unlockedBadges];
      if (badgeToUnlock && !newBadges.some(b => b.id === badgeToUnlock.id)) {
        newBadges.push(badgeToUnlock);
        setNewBadgeUnlocked(badgeToUnlock);
        soundFX.playBadgeUnlock();
      } else {
        soundFX.playSuccess();
      }

      const xpEarned = isAlreadyCompleted ? Math.round(xpReward * 0.2) : xpReward;
      const newXP = prev.xp + xpEarned;

      return {
        ...prev,
        xp: newXP,
        completedQuests: newCompleted,
        unlockedBadges: newBadges
      };
    });
  };

  const setTrack = (trackId) => {
    soundFX.playBlip();
    setGameState(prev => ({ ...prev, currentTrack: trackId }));
  };

  const setActiveQuest = (questId) => {
    soundFX.playBlip();
    setGameState(prev => ({ ...prev, activeQuestId: questId }));
  };

  const toggleSound = () => {
    const isMuted = soundFX.toggleMute();
    setGameState(prev => ({ ...prev, soundMuted: isMuted }));
  };

  const resetProgress = () => {
    setGameState(DEFAULT_STATE);
    localStorage.removeItem(STORAGE_KEY);
    soundFX.playBlip();
  };

  return (
    <GameContext.Provider value={{
      ...gameState,
      level,
      currentXPInLevel,
      addXP,
      completeQuest,
      setTrack,
      setActiveQuest,
      toggleSound,
      resetProgress,
      newBadgeUnlocked,
      clearNewBadgeModal: () => setNewBadgeUnlocked(null)
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
