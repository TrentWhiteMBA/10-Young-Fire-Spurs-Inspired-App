import React from 'react';

interface WheelNode {
  id: string;
  label: string;
  badge: string;
  accentColor: string;
  borderColor: string;
  bgGradient: string;
  glowColor: string;
  icon: React.ReactNode;
}

interface OrbitWheelHubProps {
  onSelectHub: (hubId: string) => void;
  activeHubId?: string;
}

export const OrbitWheelHub: React.FC<OrbitWheelHubProps> = ({ onSelectHub, activeHubId }) => {
  const hubs: WheelNode[] = [
    {
      id: 'youngfire',
      label: 'YoungFire Sanctuary',
      badge: 'Main Hub',
      accentColor: 'text-amber-400',
      borderColor: 'border-amber-400/50',
      bgGradient: 'bg-gradient-to-b from-amber-500/20 via-slate-900/90 to-[#070C1C]',
      glowColor: 'shadow-amber-500/30',
      // Authentic YoungFire Holy Flame Emblem with 3D drop filter
      icon: (
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 fill-amber-400 stroke-amber-300 [filter:drop-shadow(0_4px_6px_rgba(0,0,0,0.5))]" 
          strokeWidth="1.5"
        >
          <path d="M12 2c1.1 2.5 3 4.5 3 7 0 3-2 5-5 5-2.5 0-4-1.8-4-4.5 0-3 2.5-6 6-7.5zm0 9c.8 1.5 2 2.8 2 4.2 0 1.8-1.2 3.1-3 3.1-1.5 0-2.5-1.1-2.5-2.7 0-1.8 1.5-3.6 3.5-4.6z" />
          <path d="M17.5 10c.8 1.8 1.5 3.5 1.5 5 0 3.9-3.1 7-7 7s-7-3.1-7-7c0-2.2 1-4.2 2.5-5.8-.3 1.5.2 3.2 1.3 4.3 1.8 1.8 4.2 1.8 5.7 0 1.2-1.3 1.6-3 1.5-4.5.9.4 1.5.9 1.5 1z" />
        </svg>
      ),
    },
    {
      id: 'men_on_fire',
      label: 'Men On Fire',
      badge: 'Brotherhood',
      accentColor: 'text-orange-400',
      borderColor: 'border-orange-500/50',
      bgGradient: 'bg-gradient-to-b from-orange-500/20 via-slate-900/90 to-[#070C1C]',
      glowColor: 'shadow-orange-500/30',
      // Shield & Crossed Swords Emblem with 3D drop filter
      icon: (
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 fill-none stroke-orange-400 [filter:drop-shadow(0_4px_6px_rgba(0,0,0,0.5))]" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9.5 9l5 5M14.5 9l-5 5" />
        </svg>
      ),
    },
    {
      id: 'women_ignited',
      label: 'Women Ignited',
      badge: 'Sisterhood',
      accentColor: 'text-rose-400',
      borderColor: 'border-rose-400/50',
      bgGradient: 'bg-gradient-to-b from-rose-500/20 via-slate-900/90 to-[#070C1C]',
      glowColor: 'shadow-rose-500/30',
      // Crown & Flame / Lamp of Oil Emblem with 3D drop filter
      icon: (
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 fill-none stroke-rose-400 [filter:drop-shadow(0_4px_6px_rgba(0,0,0,0.5))]" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
          <path d="M12 18v3M9 21h6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full py-4 flex flex-col items-center select-none">
      <div className="grid grid-cols-3 gap-3.5 w-full max-w-lg px-2">
        {hubs.map((hub) => {
          const isActive = activeHubId === hub.id;
          return (
            <button
              key={hub.id}
              onClick={() => onSelectHub(hub.id)}
              className={`group relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl border-t border-white/30 border-x border-b transition-all duration-300 cursor-pointer shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.25)] hover:scale-[1.03] active:scale-[0.98] ${
                isActive
                  ? `${hub.bgGradient} ${hub.borderColor} ring-2 ring-white/30 shadow-2xl`
                  : 'bg-gradient-to-b from-slate-800/80 via-[#0B1329]/90 to-[#070C1C]/95 border-white/10 hover:border-white/25 hover:from-slate-700/80'
              }`}
            >
              {/* Metallic top glass rim highlight */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-2xl pointer-events-none" />

              {/* 3D Icon Container with athletic glass depth */}
              <div 
                className={`w-13 h-13 rounded-2xl flex items-center justify-center border-t border-white/40 border-x border-b border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.25)] mb-2.5 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? `${hub.bgGradient} ${hub.glowColor}` : 'bg-gradient-to-b from-slate-800/90 to-slate-950/90'
                }`}
              >
                {hub.icon}
              </div>

              {/* Node Typography */}
              <span className="text-[11px] sm:text-xs font-black text-white tracking-wide text-center line-clamp-1 font-['Outfit'] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {hub.label}
              </span>
              <span className={`text-[9px] font-mono font-bold uppercase tracking-widest mt-0.5 ${hub.accentColor} drop-shadow-sm`}>
                {hub.badge}
              </span>

              {/* Active glow indicator */}
              {isActive && (
                <div className="absolute -bottom-1 w-8 h-1 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
