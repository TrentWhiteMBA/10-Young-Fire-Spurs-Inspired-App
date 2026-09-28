import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Flame, Plus, Check, Trash2, Heart, 
  Sparkles, Users, UserCheck, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { CurrentUser } from './SettingsHUDModal';
import confetti from 'canvas-confetti';

export interface PrayedUser {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface PrayerItem {
  id: string;
  date: string;
  names: string[] | string;
  cause: string;
  status: string;
  completed?: boolean;
  authorId?: string;
  authorName?: string;
  intercessorsCount?: number;
  intercessors?: string[];
  prayedBy?: string[];
  prayedByUsers?: PrayedUser[];
}

interface PrayerDockProps {
  onBack?: () => void;
  currentUser?: CurrentUser | null;
}

const INITIAL_PRAYERS: PrayerItem[] = [
  {
    id: 'pr_1',
    date: '2026-09-24',
    names: 'Brothers in College & Trades',
    cause: 'Praying for unwavering spiritual focus, purity of mind, and financial breakthrough for young adult brothers facing secular pressures.',
    status: 'active',
    completed: false,
    authorName: 'Trent D. White',
    prayedBy: ['roster_trent', 'roster_caleb'],
    prayedByUsers: [
      { id: 'roster_trent', name: 'Trent D. White', avatarUrl: '/image_4.png' },
      { id: 'roster_caleb', name: 'Caleb Joshua Vance', avatarUrl: '/image_7.png' }
    ]
  },
  {
    id: 'pr_2',
    date: '2026-09-22',
    names: 'Sister Maya & Family',
    cause: 'Praising God for complete physical restoration after illness and open doors for church hospitality.',
    status: 'answered',
    completed: true,
    authorName: 'Whitney White',
    prayedBy: ['roster_whitney', 'roster_trent', 'roster_maya'],
    prayedByUsers: [
      { id: 'roster_whitney', name: 'Whitney White', avatarUrl: '/image_2.png' },
      { id: 'roster_trent', name: 'Trent D. White', avatarUrl: '/image_4.png' },
      { id: 'roster_maya', name: 'Maya Jordan Lewis', avatarUrl: '/image_5.png' }
    ]
  },
  {
    id: 'pr_3',
    date: '2026-09-20',
    names: 'YoungFire Sanctuary Outreach',
    cause: 'Unsaved youth across San Antonio to encounter Jesus Christ at upcoming living room discipleship and Spurs community events.',
    status: 'active',
    completed: false,
    authorName: 'Caleb Joshua Vance',
    prayedBy: ['roster_caleb', 'roster_whitney'],
    prayedByUsers: [
      { id: 'roster_caleb', name: 'Caleb Joshua Vance', avatarUrl: '/image_7.png' },
      { id: 'roster_whitney', name: 'Whitney White', avatarUrl: '/image_2.png' }
    ]
  }
];

export const PrayerDock: React.FC<PrayerDockProps> = ({ onBack, currentUser }) => {
  const [prayers, setPrayers] = useState<PrayerItem[]>(() => {
    try {
      const saved = localStorage.getItem('youngfire_prayer_dock_v2');
      if (saved) return JSON.parse(saved);
      // Migration from v1 if present
      const v1 = localStorage.getItem('youngfire_prayers_list');
      if (v1) {
        const parsed = JSON.parse(v1);
        return parsed.map((p: any) => ({
          ...p,
          prayedByUsers: p.prayedByUsers || [
            { id: 'roster_trent', name: 'Trent D. White', avatarUrl: '/image_4.png' }
          ]
        }));
      }
      return INITIAL_PRAYERS;
    } catch {
      return INITIAL_PRAYERS;
    }
  });

  const [prayerFilter, setPrayerFilter] = useState<'all' | 'active' | 'answered'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCause, setNewCause] = useState('');

  // Save to localStorage and state
  const savePrayers = (updated: PrayerItem[]) => {
    setPrayers(updated);
    try {
      localStorage.setItem('youngfire_prayer_dock_v2', JSON.stringify(updated));
      localStorage.setItem('youngfire_prayers_list', JSON.stringify(updated));
    } catch {}
  };

  // Sync with backend API
  useEffect(() => {
    fetch('/api/prayers')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.prayers) && data.prayers.length > 0) {
          // Merge server prayers with local additions
          setPrayers(prev => {
            const map = new Map<string, PrayerItem>();
            prev.forEach(p => map.set(p.id, p));
            data.prayers.forEach((sp: any) => {
              const existing = map.get(sp.id);
              if (existing) {
                map.set(sp.id, {
                  ...existing,
                  cause: sp.cause || existing.cause,
                  names: sp.names || existing.names,
                  status: sp.status || existing.status,
                  completed: sp.status === 'answered' || existing.completed,
                  intercessorsCount: sp.prayedCount || existing.intercessorsCount
                });
              } else {
                map.set(sp.id, {
                  id: sp.id,
                  date: sp.date || new Date().toISOString().split('T')[0],
                  names: sp.names || sp.requestedBy || 'Prayer Intercession',
                  cause: sp.cause || sp.description || '',
                  status: sp.status || 'active',
                  completed: sp.status === 'answered',
                  authorId: sp.authorId,
                  authorName: sp.requestedBy || sp.authorName || 'Fellow Disciple',
                  intercessorsCount: sp.prayedCount || 1,
                  prayedByUsers: [
                    { id: 'roster_trent', name: 'Trent D. White', avatarUrl: '/image_4.png' }
                  ]
                });
              }
            });
            return Array.from(map.values());
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleAddPrayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCause.trim()) return;

    const userAvatar = currentUser?.avatar || (currentUser as any)?.avatarUrl || '/image_4.png';
    const userName = currentUser?.name || 'Disciple';
    const userId = currentUser?.id || `user_${Date.now()}`;

    const newPrayer: PrayerItem = {
      id: `prayer_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      names: newName.trim() || 'Fellowship Intercession',
      cause: newCause.trim(),
      status: 'active',
      completed: false,
      authorId: userId,
      authorName: userName,
      prayedBy: [userId],
      prayedByUsers: [
        { id: userId, name: userName, avatarUrl: userAvatar }
      ]
    };

    savePrayers([newPrayer, ...prayers]);
    setNewName('');
    setNewCause('');
    setIsModalOpen(false);

    try {
      await fetch('/api/prayers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestedBy: userName,
          names: newPrayer.names,
          cause: newPrayer.cause,
          status: 'active'
        })
      });
    } catch {}
  };

  // "I Prayed For This" action
  const handleIPrayed = async (prayerId: string) => {
    const userId = currentUser?.id || 'current_user';
    const userName = currentUser?.name || 'Fellowship Intercessor';
    const userAvatar = currentUser?.avatar || (currentUser as any)?.avatarUrl || '/image_4.png';

    const updated = prayers.map(p => {
      if (p.id !== prayerId) return p;
      const currentList: PrayedUser[] = p.prayedByUsers || [];
      const alreadyPrayed = currentList.some(u => u.id === userId);

      let updatedList: PrayedUser[];
      if (alreadyPrayed) {
        // Toggle off if already prayed
        updatedList = currentList.filter(u => u.id !== userId);
      } else {
        // Append user to intercessors list
        updatedList = [...currentList, { id: userId, name: userName, avatarUrl: userAvatar }];
      }

      return {
        ...p,
        prayedByUsers: updatedList,
        prayedBy: updatedList.map(u => u.id)
      };
    });

    savePrayers(updated);

    // Call backend endpoint to increment prayer count
    try {
      await fetch(`/api/prayers/${prayerId}/pray`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, userName })
      });
    } catch {}

    // Minor celebratory micro-confetti on interceding
    try {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 }
      });
    } catch {}
  };

  const handleToggleAnswered = (prayerId: string) => {
    const updated = prayers.map(p => {
      if (p.id !== prayerId) return p;
      const willBeCompleted = !p.completed;
      if (willBeCompleted) {
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {}
      }
      return {
        ...p,
        completed: willBeCompleted,
        status: willBeCompleted ? 'answered' : 'active'
      };
    });
    savePrayers(updated);
  };

  // Permanent Delete restricted to prayer creators and administrators
  const handleDeletePrayer = async (prayerId: string) => {
    if (confirm('Permanently remove this prayer request from the dock?')) {
      const updated = prayers.filter(p => p.id !== prayerId);
      savePrayers(updated);
      try {
        await fetch(`/api/prayers/${prayerId}`, { method: 'DELETE' });
      } catch {}
    }
  };

  const filtered = prayers.filter(p => {
    if (prayerFilter === 'active') return !p.completed;
    if (prayerFilter === 'answered') return p.completed;
    return true;
  });

  return (
    <div className="space-y-6 select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-[#0B1329] border border-white/15 text-slate-200 hover:text-white cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              24/7 Intercession Watch & Praise Altar
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] uppercase text-white tracking-wide">
              The Prayer Dock
            </h2>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-emerald-500/20 self-start sm:self-auto cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Submit Prayer Request</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <button
          onClick={() => setPrayerFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer font-bold ${
            prayerFilter === 'all'
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
              : 'bg-[#0B1329] text-slate-300 border-white/10 hover:border-white/25'
          }`}
        >
          All Prayers ({prayers.length})
        </button>
        <button
          onClick={() => setPrayerFilter('active')}
          className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer font-bold ${
            prayerFilter === 'active'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
              : 'bg-[#0B1329] text-slate-300 border-white/10 hover:border-white/25'
          }`}
        >
          Active Intercession ({prayers.filter(p => !p.completed).length})
        </button>
        <button
          onClick={() => setPrayerFilter('answered')}
          className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer font-bold ${
            prayerFilter === 'answered'
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
              : 'bg-[#0B1329] text-slate-300 border-white/10 hover:border-white/25'
          }`}
        >
          Answered Praises ({prayers.filter(p => p.completed).length})
        </button>
      </div>

      {/* Submission Modal */}
      {isModalOpen && (
        <form onSubmit={handleAddPrayer} className="p-5 bg-[#0B1329] border border-emerald-500/40 rounded-3xl space-y-3 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h4 className="text-xs font-bold font-mono uppercase text-emerald-400 flex items-center gap-2">
              <Flame className="w-4 h-4 text-emerald-400" />
              <span>Place Burden onto 24/7 Prayer Dock</span>
            </h4>
            <span className="text-[10px] font-mono text-slate-400">James 5:16</span>
          </div>

          <input
            type="text"
            placeholder="Name of Believer / Family in Need"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full bg-[#070C1C] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
          />

          <textarea
            placeholder="What is the prayer request or spiritual burden? (Physical healing, salvation, family peace, spiritual armor, open doors...)"
            value={newCause}
            onChange={(e) => setNewCause(e.target.value)}
            rows={3}
            className="w-full bg-[#070C1C] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            required
          />

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-3.5 py-1.5 bg-white/10 hover:bg-white/15 text-slate-300 rounded-xl text-xs font-mono cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs font-mono cursor-pointer shadow-md"
            >
              Post to Dock
            </button>
          </div>
        </form>
      )}

      {/* Prayers List */}
      <div className="space-y-3.5">
        {filtered.length === 0 ? (
          <div className="p-8 bg-[#0B1329] border border-white/10 rounded-3xl text-center space-y-3">
            <Flame className="w-8 h-8 text-emerald-400 mx-auto opacity-70" />
            <h5 className="text-sm font-bold text-white font-['Outfit']">Prayer Dock Clean Slate</h5>
            <p className="text-xs text-slate-300 font-serif max-w-sm mx-auto">
              No requests in this filter. Tap <strong>Submit Prayer Request</strong> to bring a need before the body!
            </p>
          </div>
        ) : (
          filtered.map((prayer) => {
            const intercessors = prayer.prayedByUsers || [];
            const userHasPrayed = intercessors.some(u => u.id === (currentUser?.id || 'current_user'));
            const intercessorCount = intercessors.length;
            const isCreator = Boolean(
              (prayer.authorId && currentUser?.id && prayer.authorId === currentUser.id) ||
              (prayer.authorName && currentUser?.name && prayer.authorName.toLowerCase() === currentUser.name.toLowerCase())
            );
            const isAdmin = Boolean(
              currentUser?.isAdmin ||
              currentUser?.email?.toLowerCase().includes('trent') ||
              currentUser?.email?.toLowerCase().includes('whitney')
            );
            const canDelete = isCreator || isAdmin;

            return (
              <div 
                key={prayer.id}
                className={`p-4 sm:p-5 rounded-3xl border transition-all space-y-3 ${
                  prayer.completed
                    ? 'bg-emerald-950/25 border-emerald-500/50 shadow-lg'
                    : 'bg-[#0B1329] border-white/10 hover:border-emerald-500/30'
                }`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-black uppercase text-white font-['Outfit']">
                        {Array.isArray(prayer.names) ? prayer.names.join(', ') : prayer.names}
                      </h4>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                        prayer.completed
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}>
                        {prayer.completed ? 'Answered Praise ✨' : 'Active Intercession 🔥'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 font-serif leading-relaxed pt-0.5">
                      {prayer.cause}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 pt-1">
                      <span>Posted by {prayer.authorName || 'Disciple'}</span>
                      <span>&bull;</span>
                      <span>{prayer.date}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {/* Mark Answered Button */}
                    <button
                      onClick={() => handleToggleAnswered(prayer.id)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 text-xs font-mono font-bold ${
                        prayer.completed
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                          : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      }`}
                      title={prayer.completed ? 'Mark as active' : 'Mark as answered praise!'}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span className="hidden sm:inline">
                        {prayer.completed ? 'Answered' : 'Check Answered'}
                      </span>
                    </button>

                    {canDelete && (
                      <button
                        onClick={() => handleDeletePrayer(prayer.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer transition-colors"
                        title="Delete prayer from dock (Creator or Administrator)"
                        aria-label="Delete prayer request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* MODULE 4 REQUIREMENT: INTERACTIVE "I PRAYED" ENGINE & AVATARS STACK */}
                <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Avatar Stack + Live Count */}
                  <div className="flex items-center gap-2.5">
                    {intercessorCount > 0 ? (
                      <div className="flex -space-x-2 overflow-hidden">
                        {intercessors.slice(0, 5).map((user, idx) => (
                          <img
                            key={`${user.id}_${idx}`}
                            src={user.avatarUrl || '/image_4.png'}
                            alt={user.name}
                            title={`Intercessor: ${user.name}`}
                            className="inline-block w-6 h-6 rounded-full ring-2 ring-[#0B1329] object-cover bg-slate-800"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] text-slate-500">
                        🕊️
                      </div>
                    )}

                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      🕊️ {intercessorCount} {intercessorCount === 1 ? 'Intercessor' : 'Intercessors'} Standing in Faith
                    </span>
                  </div>

                  {/* "I Prayed For This" Interactive Button */}
                  <button
                    onClick={() => handleIPrayed(prayer.id)}
                    className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                      userHasPrayed
                        ? 'bg-amber-500 text-slate-950 shadow-amber-500/20'
                        : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    <span>🙏</span>
                    <span>{userHasPrayed ? 'You Prayed!' : 'I Prayed For This'}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
