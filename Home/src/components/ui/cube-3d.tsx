import React, { useState, useEffect } from 'react';

export const InteractiveCube3D: React.FC = () => {
  const [rotation, setRotation] = useState({ x: -20, y: 35 });
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);

  useEffect(() => {
    if (!isAutoSpinning) return;
    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: (prev.x + 0.3) % 360,
        y: (prev.y + 0.6) % 360,
      }));
    }, 25);
    return () => clearInterval(interval);
  }, [isAutoSpinning]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsAutoSpinning(false);
    const startX = e.clientX;
    const startY = e.clientY;
    const startRotX = rotation.x;
    const startRotY = rotation.y;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      setRotation({
        x: startRotX - deltaY * 0.5,
        y: startRotY + deltaX * 0.5,
      });
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      setTimeout(() => setIsAutoSpinning(true), 3000);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const size = 90; // cube edge in px
  const half = size / 2;

  const faceStyle = (transform: string, bg: string, border: string) => ({
    position: 'absolute' as const,
    width: `${size}px`,
    height: `${size}px`,
    transform,
    background: bg,
    border: `1px solid ${border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold' as const,
    fontSize: '11px',
    color: '#fff',
    backfaceVisibility: 'visible' as const,
    boxShadow: 'inset 0 0 15px rgba(249, 115, 22, 0.3)',
  });

  return (
    <div
      className="relative flex flex-col items-center justify-center p-4 select-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      style={{ perspective: '800px' }}
    >
      <div
        className="relative"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isAutoSpinning ? 'none' : 'transform 0.05s linear',
        }}
      >
        {/* Front */}
        <div style={faceStyle(`translateZ(${half}px)`, 'rgba(249, 115, 22, 0.25)', '#f97316')}>
          <span className="font-mono text-orange-300">UNITY 3D</span>
        </div>
        {/* Back */}
        <div style={faceStyle(`rotateY(180deg) translateZ(${half}px)`, 'rgba(14, 165, 233, 0.25)', '#0ea5e9')}>
          <span className="font-mono text-cyan-300">C# SCRIPT</span>
        </div>
        {/* Right */}
        <div style={faceStyle(`rotateY(90deg) translateZ(${half}px)`, 'rgba(168, 85, 247, 0.25)', '#a855f7')}>
          <span className="font-mono text-purple-300">RUNNER</span>
        </div>
        {/* Left */}
        <div style={faceStyle(`rotateY(-90deg) translateZ(${half}px)`, 'rgba(234, 179, 8, 0.25)', '#eab308')}>
          <span className="font-mono text-yellow-300">PHYSICS</span>
        </div>
        {/* Top */}
        <div style={faceStyle(`rotateX(90deg) translateZ(${half}px)`, 'rgba(16, 185, 129, 0.25)', '#10b981')}>
          <span className="font-mono text-emerald-300">60 FPS</span>
        </div>
        {/* Bottom */}
        <div style={faceStyle(`rotateX(-90deg) translateZ(${half}px)`, 'rgba(239, 68, 68, 0.25)', '#ef4444')}>
          <span className="font-mono text-rose-300">SPAWN</span>
        </div>
      </div>
      <span className="mt-6 text-[10px] uppercase font-mono tracking-widest text-orange-400/80 animate-pulse">
        Interactive 3D Engine • Drag to Rotate
      </span>
    </div>
  );
};
