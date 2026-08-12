import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, X } from 'lucide-react';

export default function BadgeModal({ badge, onClose }) {
  useEffect(() => {
    if (badge) {
      try {
        confetti({
          particleCount: 140,
          spread: 90,
          colors: ['#7c8cc6', '#f7a3c3', '#f7c873', '#a3c9f8', '#ffffff'],
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
      background: 'rgba(34, 38, 56, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="retro-window" style={{ maxWidth: '420px', width: '100%', position: 'relative' }}>
        
        {/* Modal Window Header */}
        <div className="retro-titlebar retro-titlebar-pink">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={16} /> New Badge Unlocked
          </span>
          <div className="retro-controls">
            <span className="retro-win-box" onClick={onClose}>✕</span>
          </div>
        </div>

        <div style={{ padding: '28px 24px', textAlign: 'center', background: '#ffffff' }}>
          <div style={{ fontSize: '3.6rem', marginBottom: '12px' }}>
            {badge.icon}
          </div>

          <h3 style={{ fontSize: '1.4rem', color: '#222638', marginBottom: '8px' }}>
            {badge.title}
          </h3>

          <p style={{ color: '#4b5563', fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.5 }}>
            {badge.desc}
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={onClose} className="retro-btn retro-btn-pink" style={{ padding: '8px 24px', fontSize: '0.88rem' }}>
              Claim Badge
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
