import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, X } from 'lucide-react';

export default function BadgeModal({ badge, onClose }) {
  useEffect(() => {
    if (badge) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          colors: ['#ff69b4', '#ec4899', '#c084fc', '#f472b6', '#38bdf8'],
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log('Confetti failed to trigger:', e);
      }
    }
  }, [badge]);

  if (!badge) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(74, 14, 46, 0.5)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="pixel-box animate-glow" style={{
        maxWidth: '420px',
        width: '100%',
        padding: '32px',
        textAlign: 'center',
        background: '#ffffff',
        borderColor: '#f472b6',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'none',
            border: 'none',
            color: '#9d4b6e',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ fontSize: '3.8rem', marginBottom: '12px' }}>
          {badge.icon}
        </div>

        <div className="badge-neon badge-pink" style={{ marginBottom: '12px' }}>
          <Sparkles size={12} /> 🌸 KAWAII BADGE UNLOCKED! 🎀
        </div>

        <h3 style={{ fontSize: '1.4rem', color: '#4a0e2e', marginBottom: '8px' }}>
          {badge.title}
        </h3>

        <p style={{ color: '#9d4b6e', fontSize: '0.9rem', marginBottom: '24px' }}>
          {badge.desc}
        </p>

        <button onClick={onClose} className="pixel-btn pixel-btn-primary" style={{ width: '100%' }}>
          Claim Reward & Continue ✨
        </button>
      </div>
    </div>
  );
}
