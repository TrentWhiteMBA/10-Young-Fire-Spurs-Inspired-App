import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AVAILABLE_LAUNCH_TRACKS, LaunchTrackOption } from './src/data/launchTracks';
import { GOSPEL_STATIONS, RadioStation } from './src/data/radioStations';
import { SpursSanctuaryHero } from './src/components/SpursSanctuaryHero';
import { ImperialAtlas } from './src/components/ImperialAtlas';
import { FellowshipHub } from './src/components/FellowshipHub';
import { BottomNavBar } from './src/components/BottomNavBar';
import { BroadcastStingerWipe } from './src/components/BroadcastStingerWipe';
import { SettingsHUDModal, CurrentUser } from './src/components/SettingsHUDModal';
import { AuthSecurityPortal } from './src/components/AuthSecurityPortal';
import { PhysicalBibleTracker } from './src/components/PhysicalBibleTracker';
import { AIMentorCounselor } from './src/components/AIMentorCounselor';
import { KingdomVideoVault, VideoItem } from './src/components/KingdomVideoVault';
import { LiveVoiceSanctuary } from './src/components/LiveVoiceSanctuary';
import { AdminCMSModal } from './src/components/AdminCMSModal';
import { ReadingProgressModal } from './src/components/ReadingProgressModal';
import { ScriptureViewer } from './src/components/ScriptureViewer';
import { LiveRadioPlayer } from './src/components/LiveRadioPlayer';
import { FloatingVideoPlayer } from './src/components/FloatingVideoPlayer';
import { KingdomMediaView } from './src/components/KingdomMediaView';
import { SpotifyYouTubePlayer } from './src/components/SpotifyYouTubePlayer';
import { MemberRosterModal } from './src/components/MemberRosterModal';
import { ZoomMeetingModal } from './src/components/ZoomMeetingModal';
import { StudyNotesHUD } from './src/components/StudyNotesHUD';
import { ThemeHUDModal, APP_THEMES } from './src/components/ThemeHUDModal';
import { VersionUpdateNotifier } from './src/components/VersionUpdateNotifier';
import { WelcomeSanctuary } from './src/components/WelcomeSanctuary';
import { Radio, Volume2, VolumeX, Sparkles, BookOpen, Compass, Music, Bell, X, CheckCircle2, Headphones, Flame, Sliders, PenTool } from 'lucide-react';

interface ActiveAudioStream {
  id: string;
  name: string;
  genreOrArtist: string;
  streamUrl: string;
  isRadio: boolean;
  accentColor?: string;
}

export default function App() {
  // 1. Authentication State (Device-isolated session under youngfire_device_session_v1)
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    try {
      const saved = localStorage.getItem('youngfire_device_session_v1') || localStorage.getItem('youngfire_user_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.gender) {
          parsed.gender = parsed.email?.toLowerCase().includes('whitney') ? 'female' : 'male';
        }
        return parsed;
      }
      return null; // Purge hardcoded login - individual devices must authenticate
    } catch {
      return null;
    }
  });

  // Welcome Gate state for unauthenticated devices ('welcome' | 'auth')
  const [unauthStage, setUnauthStage] = useState<'welcome' | 'auth'>('welcome');

  // Permanent Welcome Hub modal for authenticated disciples
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(false);

  // 2. Navigation State ('sanctuary' | 'word' | 'fellowship' | 'mentor' | 'bibletracker' | 'tv' | 'radio')
  const [activeTab, setActiveTab] = useState<string>('sanctuary');
  const [wordSubView, setWordSubView] = useState<'bible' | 'atlas'>('bible');
  const [scripturePassage, setScripturePassage] = useState<{ bookId: string; chapter: number }>({
    bookId: 'EPH',
    chapter: 4
  });
  const [fellowshipInitialDrillDown, setFellowshipInitialDrillDown] = useState<string | null>(null);

  // Broadcast Stinger Wipe
  const [stingerActive, setStingerActive] = useState<boolean>(false);
  const [pendingTab, setPendingTab] = useState<string | null>(null);

  // New Global Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isVoiceSanctuaryOpen, setIsVoiceSanctuaryOpen] = useState<boolean>(false);
  const [isProgressOpen, setIsProgressOpen] = useState<boolean>(false);
  const [isAdminCMSOpen, setIsAdminCMSOpen] = useState<boolean>(false);
  const [isRosterOpen, setIsRosterOpen] = useState<boolean>(false);
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isThemeOpen, setIsThemeOpen] = useState<boolean>(false);
  const [currentThemeId, setCurrentThemeId] = useState<string>(() => {
    return localStorage.getItem('youngfire_theme_id') || 'spurs-silver';
  });

  // Module 2: Persistent 24/7 Gospel Radio & Gospel Praise Docks
  const [isMusicDockOpen, setIsMusicDockOpen] = useState<boolean>(false);
  const [isRadioDockOpen, setIsRadioDockOpen] = useState<boolean>(false);

  // Meeting Alerts Beacon state (Module 2)
  const [hasMeetingAlert, setHasMeetingAlert] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('youngfire_calendar_overrides');
      if (saved) {
        const obj = JSON.parse(saved);
        return Object.values(obj).some((v: any) => v.status === 'canceled' || v.status === 'rescheduled');
      }
    } catch {}
    return false;
  });

  const [meetingAlertText, setMeetingAlertText] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem('youngfire_calendar_overrides');
      if (saved) {
        const obj = JSON.parse(saved);
        const alert = Object.values(obj).find((v: any) => v.status === 'canceled' || v.status === 'rescheduled') as any;
        if (alert) {
          return alert.status === 'canceled'
            ? `⚠️ Meeting Update: Gathering Canceled by Facilitators (${alert.updateNote || 'See calendar for details'}).`
            : `⚠️ Meeting Update: Gathering Rescheduled to ${alert.rescheduleDate || 'new date'} at ${alert.rescheduleTime || '7:00 PM CST'}.`;
        }
      }
    } catch {}
    return null;
  });

  const activeTheme = useMemo(() => {
    return APP_THEMES.find(t => t.id === currentThemeId) || APP_THEMES[0];
  }, [currentThemeId]);

  // Synchronize color palette across app, localStorage, and CSS custom properties
  useEffect(() => {
    const handleThemeApplied = (e: Event) => {
      const customEv = e as CustomEvent<{ themeId: string }>;
      if (customEv?.detail?.themeId) {
        setCurrentThemeId(customEv.detail.themeId);
      }
    };
    window.addEventListener('yf_theme_applied', handleThemeApplied);
    return () => window.removeEventListener('yf_theme_applied', handleThemeApplied);
  }, []);

  useEffect(() => {
    if (activeTheme) {
      document.documentElement.style.setProperty('--theme-bg', activeTheme.bgHex);
      document.documentElement.style.setProperty('--theme-card', activeTheme.cardHex);
      document.documentElement.style.setProperty('--theme-accent', activeTheme.accentHex);
      document.documentElement.style.setProperty('--theme-border', activeTheme.borderHex);
      document.body.style.backgroundColor = activeTheme.bgHex;
    }
  }, [activeTheme]);

  // Floating Mini-Player for Kingdom Videos
  const [floatingVideo, setFloatingVideo] = useState<VideoItem | null>(null);
  const [activeTheaterVideo, setActiveTheaterVideo] = useState<VideoItem | null>(null);

  // Notification Banner
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Sound Controls
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState<boolean>(false);
  const [masterVolume, setMasterVolume] = useState<number>(0.85);

  // Contemporary Worship Radio Station
  const contemporaryStation = useMemo(() => {
    return GOSPEL_STATIONS.find(s => s.id === 'worship-lift') || GOSPEL_STATIONS[0];
  }, []);

  // 3. Centralized Audio Stream State (Default to Contemporary Worship Radio on sanctuary entrance)
  const [selectedLaunchTrack, setSelectedLaunchTrack] = useState<LaunchTrackOption>(() => {
    return AVAILABLE_LAUNCH_TRACKS[0];
  });

  const [activeAudio, setActiveAudio] = useState<ActiveAudioStream>(() => {
    const contemporary = GOSPEL_STATIONS.find(s => s.id === 'worship-lift') || GOSPEL_STATIONS[0];
    return {
      id: contemporary.id,
      name: contemporary.name,
      genreOrArtist: `${contemporary.genre} • ${contemporary.location}`,
      streamUrl: contemporary.streamUrl,
      isRadio: true,
      accentColor: contemporary.accentColor || '#0EA5E9'
    };
  });

  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Helper to start contemporary worship radio stream
  const startContemporaryWorshipAutoplay = () => {
    const station = GOSPEL_STATIONS.find(s => s.id === 'worship-lift') || GOSPEL_STATIONS[0];
    setActiveAudio({
      id: station.id,
      name: station.name,
      genreOrArtist: `${station.genre} • ${station.location}`,
      streamUrl: station.streamUrl,
      isRadio: true,
      accentColor: station.accentColor
    });
    if (audioRef.current) {
      audioRef.current.src = station.streamUrl;
      audioRef.current.loop = false;
      audioRef.current.play()
        .then(() => setIsAudioPlaying(true))
        .catch(() => {
          // If browser blocks without gesture, trigger on first tap/click in sanctuary
          const unlockAudio = () => {
            if (audioRef.current) {
              audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(() => {});
            }
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
          };
          window.addEventListener('click', unlockAudio, { once: true });
          window.addEventListener('touchstart', unlockAudio, { once: true });
        });
    }
  };

  // Initialize and synchronize persistent background audio
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(activeAudio.streamUrl);
      audioRef.current.loop = !activeAudio.isRadio;
    } else {
      audioRef.current.src = activeAudio.streamUrl;
      audioRef.current.loop = !activeAudio.isRadio;
      if (isAudioPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
    audioRef.current.volume = masterVolume;
  }, [activeAudio.streamUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = masterVolume;
    }
  }, [masterVolume]);

  // Autoplay handler: ONLY play AFTER the user signs in or registers; NOT on welcome or register screens.
  useEffect(() => {
    if (!currentUser) {
      // Unauthenticated: explicitly ensure audio is stopped
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsAudioPlaying(false);
      return;
    }

    let triggered = false;
    const startLaunchAudio = () => {
      if (!triggered && audioRef.current) {
        startContemporaryWorshipAutoplay();
        triggered = true;
        window.removeEventListener('click', startLaunchAudio);
        window.removeEventListener('touchstart', startLaunchAudio);
      }
    };

    const timer = setTimeout(startLaunchAudio, 700);
    window.addEventListener('click', startLaunchAudio);
    window.addEventListener('touchstart', startLaunchAudio);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', startLaunchAudio);
      window.removeEventListener('touchstart', startLaunchAudio);
    };
  }, [currentUser?.id]);

  // Listen to Global Custom Events
  useEffect(() => {
    const handleOpenRoster = () => setIsRosterOpen(true);
    const handleOpenZoom = () => setIsZoomOpen(true);
    const handleOpenNotes = () => setIsNotesOpen(true);
    const handleOpenTheme = () => setIsThemeOpen(true);
    const handleNotifications = () => {
      if (hasMeetingAlert && meetingAlertText) {
        setNotificationToast(meetingAlertText);
      } else {
        setNotificationToast("🔔 YoungFire Sanctuary Alert: Small Group meets every other Monday at 7:00 PM CST (In-Person & Zoom). 2026 Theme: Rebuilding Better Together (Ephesians 4:16).");
      }
      setTimeout(() => setNotificationToast(null), 7000);
    };

    const handleMeetingStatusUpdate = (e: any) => {
      const detail = e.detail;
      if (detail && detail.count > 0) {
        setHasMeetingAlert(true);
        setMeetingAlertText(detail.message);
        setNotificationToast(detail.message);
      } else {
        setHasMeetingAlert(false);
        setMeetingAlertText(null);
      }
    };

    const handleNavigateScripture = (e: any) => {
      if (e.detail?.bookId && e.detail?.chapter) {
        handleDeepLinkToScripture(e.detail.bookId, e.detail.chapter);
      }
    };

    const handleToggleMusic = () => setIsMusicDockOpen(prev => !prev);
    const handleToggleRadio = () => setIsRadioDockOpen(prev => !prev);
    const handleOpenWelcome = () => setIsWelcomeModalOpen(true);

    const handleStopRadio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsAudioPlaying(false);
    };

    window.addEventListener('yf_stop_radio', handleStopRadio);
    window.addEventListener('yf_open_welcome', handleOpenWelcome);
    window.addEventListener('yf_open_roster', handleOpenRoster);
    window.addEventListener('yf_open_zoom', handleOpenZoom);
    window.addEventListener('yf_open_study_notes', handleOpenNotes);
    window.addEventListener('yf_open_notes_hud', handleOpenNotes);
    window.addEventListener('yf_open_theme_hud', handleOpenTheme);
    window.addEventListener('yf_open_notifications', handleNotifications);
    window.addEventListener('yf_meeting_status_updated', handleMeetingStatusUpdate);
    window.addEventListener('yf_navigate_scripture', handleNavigateScripture);
    window.addEventListener('yf_toggle_music_dock', handleToggleMusic);
    window.addEventListener('yf_toggle_radio_dock', handleToggleRadio);

    return () => {
      window.removeEventListener('yf_stop_radio', handleStopRadio);
      window.removeEventListener('yf_open_welcome', handleOpenWelcome);
      window.removeEventListener('yf_open_roster', handleOpenRoster);
      window.removeEventListener('yf_open_zoom', handleOpenZoom);
      window.removeEventListener('yf_open_study_notes', handleOpenNotes);
      window.removeEventListener('yf_open_notes_hud', handleOpenNotes);
      window.removeEventListener('yf_open_theme_hud', handleOpenTheme);
      window.removeEventListener('yf_open_notifications', handleNotifications);
      window.removeEventListener('yf_meeting_status_updated', handleMeetingStatusUpdate);
      window.removeEventListener('yf_navigate_scripture', handleNavigateScripture);
      window.removeEventListener('yf_toggle_music_dock', handleToggleMusic);
      window.removeEventListener('yf_toggle_radio_dock', handleToggleRadio);
    };
  }, []);

  // Audio Ducking (for Video Vault, AI Voice Mentor, or Scripture Narration)
  const handleAudioDucking = (shouldDuck: boolean) => {
    if (!audioRef.current) return;
    if (shouldDuck) {
      audioRef.current.volume = 0.1;
    } else {
      audioRef.current.volume = masterVolume;
    }
  };

  // Toggle Audio Playback
  const handleToggleAudio = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      // Dual-stream mutual exclusion: pause active video & praise dock when radio starts
      setFloatingVideo(null);
      window.dispatchEvent(new CustomEvent('yf_pause_video'));
      window.dispatchEvent(new CustomEvent('yf_pause_praise_dock'));

      audioRef.current.play()
        .then(() => setIsAudioPlaying(true))
        .catch(() => {});
    }
  };

  // Switch Radio Station (keeps playing across all tabs)
  const handleSelectRadioStation = (station: RadioStation) => {
    // Dual-stream mutual exclusion: pause active video & praise dock when radio starts
    setFloatingVideo(null);
    window.dispatchEvent(new CustomEvent('yf_pause_video'));
    window.dispatchEvent(new CustomEvent('yf_pause_praise_dock'));

    setActiveAudio({
      id: station.id,
      name: station.name,
      genreOrArtist: `${station.genre} • ${station.location}`,
      streamUrl: station.streamUrl,
      isRadio: true,
      accentColor: station.accentColor
    });
    if (audioRef.current) {
      audioRef.current.src = station.streamUrl;
      audioRef.current.loop = false;
      audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(() => {});
    }
  };

  // Stinger Wipe Navigation Transition
  const handleNavigateWithStinger = (targetTab: string, subView?: 'bible' | 'atlas') => {
    if (targetTab === activeTab && !subView) return;
    if (subView) setWordSubView(subView);

    // Background Video Playback (PiP): Retain video in floating window when navigating away from tv
    if (activeTab === 'tv' && targetTab !== 'tv' && activeTheaterVideo && !floatingVideo) {
      setFloatingVideo(activeTheaterVideo);
    }

    if (targetTab === 'bibletracker' || (activeTab === 'word' && targetTab === 'word')) {
      setActiveTab(targetTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setPendingTab(targetTab);
    setStingerActive(true);
  };

  const handleStingerComplete = () => {
    if (pendingTab) {
      setActiveTab(pendingTab);
      setPendingTab(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setStingerActive(false);
  };

  // Direct Scripture Deep-Linking
  const handleDeepLinkToScripture = (bookId: string, chapter: number) => {
    setScripturePassage({ bookId, chapter });
    setWordSubView('bible');
    setActiveTab('word');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // User Authentication Logout
  const handleLogout = () => {
    localStorage.removeItem('youngfire_device_session_v1');
    localStorage.removeItem('youngfire_user_session');
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsAudioPlaying(false);
    setCurrentUser(null);
    setIsSettingsOpen(false);
    setUnauthStage('welcome');
  };

  // If not logged in, render Welcome Center and Security Login screen before entering sanctuary
  if (!currentUser) {
    if (unauthStage === 'welcome') {
      return (
        <WelcomeSanctuary
          onEnterSanctuary={() => setUnauthStage('auth')}
          onOpenRoster={() => setUnauthStage('auth')}
          isAuthenticated={false}
        />
      );
    }
    return (
      <AuthSecurityPortal
        onAuthenticated={(user) => {
          localStorage.setItem('youngfire_device_session_v1', JSON.stringify(user));
          localStorage.setItem('youngfire_user_session', JSON.stringify(user));
          setCurrentUser(user);
          // Only play the auto play after the user signs in or registers; default to contemporary worship radio
          setTimeout(() => {
            startContemporaryWorshipAutoplay();
          }, 350);
        }}
        onBackToWelcome={() => setUnauthStage('welcome')}
      />
    );
  }

  return (
    <div 
      className="min-h-screen text-white flex flex-col relative overflow-x-hidden selection:bg-amber-500 selection:text-black font-['Outfit'] transition-colors duration-500"
      style={{ backgroundColor: activeTheme.bgHex }}
    >
      {/* Dynamic Ambient Theme Glow: shifts hue smoothly based on the active liturgical color palette */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[420px] pointer-events-none z-0 opacity-25 blur-3xl transition-all duration-700"
        style={{ 
          background: `radial-gradient(circle at 50% 10%, ${activeTheme.accentHex} 0%, ${activeTheme.cardHex} 50%, transparent 80%)` 
        }}
      />
      
      {/* 0. Global Deployment Auto-Refresh & Cache Busting Listener */}
      <VersionUpdateNotifier />

      {/* 1. Notification Toast */}
      {notificationToast && (
        <div className="fixed top-4 inset-x-4 max-w-lg mx-auto z-50 p-4 rounded-2xl bg-[#0B1329] border border-amber-500/60 text-white shadow-2xl flex items-start justify-between gap-3 animate-slideDown">
          <div className="flex items-start gap-2.5">
            <Bell className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs font-mono text-slate-200 leading-relaxed">{notificationToast}</p>
          </div>
          <button
            onClick={() => setNotificationToast(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1.5. Meeting Update Pulsing Notification Beacon */}
      {hasMeetingAlert && (
        <div 
          onClick={() => {
            setActiveTab('fellowship');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="mx-3 sm:mx-6 mt-3 max-w-5xl mx-auto p-3.5 sm:p-4 rounded-2xl bg-amber-950/90 border-2 border-amber-500 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl cursor-pointer hover:bg-amber-900/90 transition-all animate-pulse relative z-30"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold flex-shrink-0 shadow-lg shadow-amber-500/30">
              <Bell className="w-5 h-5 text-slate-950 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-amber-300 block tracking-widest">
                ⚠️ MEETING UPDATE NOTIFICATION BEACON
              </span>
              <p className="text-xs sm:text-sm font-bold text-white">
                {meetingAlertText || "Gathering Canceled or Rescheduled by Facilitators"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className="text-xs font-mono font-bold text-amber-300 underline">
              Open Sanctuary Calendar &rarr;
            </span>
          </div>
        </div>
      )}

      {/* 2. Spurs-Style Full Screen Broadcast Stinger Wipe */}
      <BroadcastStingerWipe 
        show={stingerActive} 
        onComplete={handleStingerComplete} 
      />

      {/* 2.5. Dedicated Top Header Bar with Radio Tower & Headphones/Flame Docks */}
      <header className="sticky top-0 z-30 bg-[#070C1C]/90 backdrop-blur-xl border-b border-white/10 px-3 sm:px-6 py-2.5 transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div 
            onClick={() => handleNavigateWithStinger('sanctuary')} 
            className="flex items-center gap-2.5 cursor-pointer group"
            title="YoungFire Sanctuary Home"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/20 border border-amber-300/30 group-hover:scale-105 transition-transform flex-shrink-0">
              <Flame className="w-4 h-4 text-slate-950 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-black tracking-widest uppercase font-['Outfit'] text-white">
                  YOUNG<span className="text-amber-400">FIRE</span>
                </h1>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase hidden xs:inline-block">
                  {activeTab === 'sanctuary' ? 'SANCTUARY' : activeTab === 'tv' ? 'WORSHIP TV' : activeTab.toUpperCase()}
                </span>
              </div>
              <p className="text-[9px] text-slate-400 font-mono tracking-wider uppercase hidden sm:block">
                Joshua House of Worship &bull; SA, TX
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Radio Tower Icon: Toggles 24/7 Gospel Radio Dock */}
            <button
              onClick={() => setIsRadioDockOpen(prev => !prev)}
              className={`px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isRadioDockOpen || (isAudioPlaying && activeAudio.isRadio)
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/20'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="Toggle 24/7 Gospel Radio Dock"
              aria-label="Toggle 24/7 Gospel Radio Dock"
            >
              <Radio className={`w-3.5 h-3.5 ${isAudioPlaying && activeAudio.isRadio ? 'animate-pulse text-amber-400' : 'text-slate-400'}`} />
              <span className="hidden xs:inline text-[11px] font-bold">Radio Tower</span>
            </button>

            {/* Headphones / Flame Icon: Expands bottom persistent Gospel Track Dock */}
            <button
              onClick={() => setIsMusicDockOpen(prev => !prev)}
              className={`px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isMusicDockOpen
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 font-black'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="Toggle Gospel Track Dock (200+ Praise Anthems)"
              aria-label="Toggle Gospel Track Dock"
            >
              <Headphones className={`w-3.5 h-3.5 ${isMusicDockOpen ? 'text-slate-950' : 'text-amber-400'}`} />
              <span className="hidden xs:inline text-[11px] font-bold">Praise Dock</span>
            </button>

            {/* Sticky Minimized Notes Pen Icon: Opens Global Study Notes HUD */}
            <button
              onClick={() => setIsNotesOpen(true)}
              className={`px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isNotesOpen
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 font-black'
                  : 'bg-white/5 border-white/10 text-amber-300 hover:text-white hover:bg-white/10'
              }`}
              title="Open Floating Study Notes & Revelation HUD"
              aria-label="Open Study Notes"
            >
              <PenTool className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xs:inline text-[11px] font-bold">Notes</span>
            </button>

            {/* Permanent Welcome Sanctuary Hub Button */}
            <button
              onClick={() => setIsWelcomeModalOpen(true)}
              className={`px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isWelcomeModalOpen
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 font-black'
                  : 'bg-white/5 border-white/10 text-amber-300 hover:text-white hover:bg-white/10'
              }`}
              title="Open Welcome Sanctuary & Connect Hub"
              aria-label="Welcome Hub"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xs:inline text-[11px] font-bold">Welcome</span>
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Sanctuary Settings & Voice"
              aria-label="Settings"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Main Content Views */}
      <main className="flex-1 pb-36">
        {/* PILLAR 1: SANCTUARY (HOME) */}
        {activeTab === 'sanctuary' && (
          <SpursSanctuaryHero
            onOpenWelcome={() => setIsWelcomeModalOpen(true)}
            onNavigate={(dest) => {
              if (dest === 'bibletracker') setActiveTab('bibletracker');
              else if (dest === 'maps') {
                setWordSubView('atlas');
                handleNavigateWithStinger('word');
              } else if (dest === 'counselor') {
                handleNavigateWithStinger('mentor');
              } else if (dest === 'tv') {
                setActiveTab('tv');
              } else if (dest === 'radio') {
                setActiveTab('radio');
              } else if (dest === 'men') {
                if (currentUser?.isAdmin || currentUser?.gender === 'male') {
                  setFellowshipInitialDrillDown('men');
                  handleNavigateWithStinger('fellowship');
                } else {
                  alert("Men On Fire is a consecrated space for brothers.");
                }
              } else if (dest === 'women') {
                if (currentUser?.isAdmin || currentUser?.gender === 'female') {
                  setFellowshipInitialDrillDown('women');
                  handleNavigateWithStinger('fellowship');
                } else {
                  alert("Women Ignited is a sacred space for sisters.");
                }
              } else if (dest === 'hub' || dest === 'groups') {
                setFellowshipInitialDrillDown(null);
                handleNavigateWithStinger('fellowship');
              } else {
                handleNavigateWithStinger(dest);
              }
            }}
            onOpenSettings={() => setIsSettingsOpen(true)}
            isRadioPlaying={isAudioPlaying}
            onToggleRadio={handleToggleAudio}
            onOpenRoster={() => setIsRosterOpen(true)}
            onOpenZoom={() => setIsZoomOpen(true)}
            onToggleRadioDock={() => setIsRadioDockOpen(prev => !prev)}
            onToggleMusicDock={() => setIsMusicDockOpen(prev => !prev)}
          />
        )}

        {/* PILLAR 2: WORD & MAP (Scripture Reader & Imperial Atlas) */}
        {activeTab === 'word' && (
          <div className="p-3 sm:p-5 space-y-4 max-w-5xl mx-auto">
            {/* Top 2-Way Switcher: [ 📖 66-Book Scripture ] | [ 🗺️ Imperial Atlas ] */}
            <div className="flex bg-[#0B1329] p-1.5 rounded-2xl border border-white/10 shadow-lg">
              <button
                onClick={() => setWordSubView('bible')}
                className={`flex-1 py-2 text-xs font-black rounded-xl transition-all font-['Outfit'] uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 ${
                  wordSubView === 'bible'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>📖 66-Book Scripture</span>
              </button>
              <button
                onClick={() => setWordSubView('atlas')}
                className={`flex-1 py-2 text-xs font-black rounded-xl transition-all font-['Outfit'] uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 ${
                  wordSubView === 'atlas'
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>🗺️ Imperial Atlas</span>
              </button>
            </div>

            {/* Sub-view: 66-Book Scripture Reader */}
            {wordSubView === 'bible' ? (
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white text-slate-900">
                <ScriptureViewer
                  initialBookId={scripturePassage.bookId}
                  initialChapter={scripturePassage.chapter}
                  onBack={() => setActiveTab('sanctuary')}
                />
              </div>
            ) : (
              /* Sub-view: Imperial Atlas */
              <ImperialAtlas
                onBack={() => setActiveTab('sanctuary')}
                onNavigateToScripture={handleDeepLinkToScripture}
              />
            )}
          </div>
        )}

        {/* PILLAR 3: FELLOWSHIP (Hubs & Sister Ministries) */}
        {activeTab === 'fellowship' && (
          <div className="p-3 sm:p-5 max-w-5xl mx-auto">
            <FellowshipHub
              onNavigate={(dest, subView) => {
                if (dest === 'tv') setActiveTab('tv');
                else if (dest === 'radio') setActiveTab('radio');
                else if (dest === 'bibletracker') setActiveTab('bibletracker');
                else if (dest === 'mentor') setActiveTab('mentor');
                else handleNavigateWithStinger(dest, subView);
              }}
              onBack={() => {
                setFellowshipInitialDrillDown(null);
                setActiveTab('sanctuary');
              }}
              initialDrillDown={fellowshipInitialDrillDown}
              currentUser={currentUser}
            />
          </div>
        )}

        {/* PILLAR 4: COUNSEL (AI Young Adult Mentor) */}
        {activeTab === 'mentor' && (
          <div className="p-3 sm:p-5 max-w-3xl mx-auto">
            <AIMentorCounselor
              onBack={() => setActiveTab('sanctuary')}
              onAudioDucking={handleAudioDucking}
              onNavigateToScripture={handleDeepLinkToScripture}
            />
          </div>
        )}

        {/* DIRECT SUB-VIEW: PHYSICAL BIBLE TRACKER */}
        {activeTab === 'bibletracker' && (
          <div className="p-4 max-w-lg mx-auto">
            <PhysicalBibleTracker onBack={() => setActiveTab('sanctuary')} />
          </div>
        )}

        {/* DIRECT SUB-VIEW: KINGDOM VIDEO VAULT & TV (PERSISTENT PIP PLAYBACK) */}
        {(activeTab === 'tv' || activeTheaterVideo !== null) && (
          <div className={activeTab === 'tv' ? "p-3 sm:p-5 max-w-5xl mx-auto" : "contents"}>
            <KingdomMediaView
              isPiP={activeTab !== 'tv'}
              onExpandToTheater={() => setActiveTab('tv')}
              onCloseVideo={() => setActiveTheaterVideo(null)}
              onBack={() => setActiveTab('sanctuary')}
              onAudioDucking={handleAudioDucking}
              onFloatVideo={(video: any) => {
                setActiveTheaterVideo(video);
                setActiveTab('sanctuary');
              }}
              onActiveVideoChange={(video: any) => setActiveTheaterVideo(video as any)}
              onNavigateToScripture={handleDeepLinkToScripture}
              onPlayTrackInDock={(video: any) => {
                if (audioRef.current) audioRef.current.pause();
                setIsAudioPlaying(false);
                setIsMusicDockOpen(true);
                window.dispatchEvent(new CustomEvent('yf_play_dock_track', { 
                  detail: { track: video, autoPlay: true } 
                }));
              }}
            />
          </div>
        )}

        {/* DIRECT SUB-VIEW: 24/7 GOSPEL RADIO ECOSYSTEM (8 STATIONS) */}
        {activeTab === 'radio' && (
          <div className="p-3 sm:p-5 max-w-4xl mx-auto">
            <LiveRadioPlayer
              onBack={() => setActiveTab('sanctuary')}
              onAudioDucking={handleAudioDucking}
              activeStationId={activeAudio.isRadio ? activeAudio.id : undefined}
              isPlaying={isAudioPlaying}
              onTogglePlay={handleToggleAudio}
              onSelectStation={handleSelectRadioStation}
              volume={masterVolume}
              onVolumeChange={setMasterVolume}
            />
          </div>
        )}
      </main>

      {/* 4. Persistent SpotifyYouTubePlayer Dock (Mounted outside active router) */}
      <SpotifyYouTubePlayer
        isOpen={isMusicDockOpen}
        onToggleOpen={() => setIsMusicDockOpen(prev => !prev)}
        onNavigateToScripture={handleDeepLinkToScripture}
        isDucked={false}
        masterVolume={masterVolume}
        onMasterVolumeChange={setMasterVolume}
        onSwitchToRadio={() => {
          setIsMusicDockOpen(false);
          setIsRadioDockOpen(true);
        }}
      />

      {/* 5.5. Persistent 24/7 Gospel Radio Dock (Mounted outside active router) */}
      {isRadioDockOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
          onClick={() => setIsRadioDockOpen(false)}
        >
          <div 
            className="w-full max-w-2xl bg-[#070B18] border border-amber-500/50 rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-4 sm:p-6 text-white animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-amber-400 animate-pulse" />
                <h3 className="text-base font-black uppercase font-['Outfit'] text-white">
                  24/7 GOSPEL RADIO TOWER DOCK
                </h3>
              </div>
              <button 
                onClick={() => setIsRadioDockOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <LiveRadioPlayer
              onBack={() => setIsRadioDockOpen(false)}
              onAudioDucking={handleAudioDucking}
              activeStationId={activeAudio.isRadio ? activeAudio.id : undefined}
              isPlaying={isAudioPlaying}
              onTogglePlay={handleToggleAudio}
              onSelectStation={handleSelectRadioStation}
              volume={masterVolume}
              onVolumeChange={setMasterVolume}
            />
          </div>
        </div>
      )}

      {/* 5. Persistent Background Radio / Music Player Dock (Positioned cleanly above bottom nav bar) */}
      {!stingerActive && (
        <div className="fixed bottom-[calc(76px+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 max-w-md w-[94%] pb-[env(safe-area-inset-bottom)] bg-[#0B1329]/95 border border-amber-500/50 rounded-2xl p-2.5 backdrop-blur-xl shadow-2xl flex items-center justify-between z-30 select-none border-t border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
          <div 
            onClick={() => setActiveTab('radio')}
            className="flex items-center gap-2.5 truncate cursor-pointer group flex-1 mr-2"
            title="Open 24/7 Gospel Radio Player"
          >
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-950 flex-shrink-0 group-hover:scale-105 transition-transform"
              style={{ backgroundColor: activeAudio.accentColor || '#F59E0B' }}
            >
              <Radio className={`w-4 h-4 ${isAudioPlaying ? 'animate-pulse' : ''}`} />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5 truncate">
                <h5 className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors font-['Outfit']">
                  {activeAudio.name}
                </h5>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0">
                  24/7 Live
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono truncate">
                {activeAudio.genreOrArtist} &bull; Tap for Radio Hub
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Animated Equalizer: 4-bar animated gold equalizer whenever audio is playing */}
            {isAudioPlaying ? (
              <div className="flex items-end gap-0.5 h-3 px-1" title="Broadcasting 24/7 Praise">
                <span className="w-0.5 bg-amber-400 animate-[bounce_1s_infinite_100ms] h-full"></span>
                <span className="w-0.5 bg-amber-400 animate-[bounce_1s_infinite_300ms] h-2/3"></span>
                <span className="w-0.5 bg-amber-400 animate-[bounce_1s_infinite_200ms] h-4/5"></span>
                <span className="w-0.5 bg-amber-400 animate-[bounce_1s_infinite_400ms] h-1/2"></span>
              </div>
            ) : (
              <div className="flex items-end gap-0.5 h-3 px-1 opacity-40">
                <span className="w-0.5 bg-slate-500 h-1"></span>
                <span className="w-0.5 bg-slate-500 h-2"></span>
                <span className="w-0.5 bg-slate-500 h-1.5"></span>
                <span className="w-0.5 bg-slate-500 h-1"></span>
              </div>
            )}

            {/* Play/Pause Button */}
            <button 
              onClick={handleToggleAudio}
              className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center text-xs font-bold cursor-pointer transition-colors shadow-md active:scale-95"
              title={isAudioPlaying ? 'Pause Audio' : 'Play Audio'}
            >
              {isAudioPlaying ? '❚❚' : '▶'}
            </button>
          </div>
        </div>
      )}

      {/* 6. Sticky 4-Pill Bottom Navigation Bar */}
      {!stingerActive && (
        <BottomNavBar 
          currentTab={activeTab === 'tv' || activeTab === 'bibletracker' || activeTab === 'radio' ? 'sanctuary' : activeTab} 
          onSelectTab={handleNavigateWithStinger} 
          onOpenNotes={() => setIsNotesOpen(true)}
        />
      )}

      {/* 7. Solid Settings HUD Modal */}
      <SettingsHUDModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentUser={currentUser}
        selectedTrack={selectedLaunchTrack}
        onSelectTrack={(t) => {
          setSelectedLaunchTrack(t);
          localStorage.setItem('youngfire_launch_track_id', t.id);
          setActiveAudio({
            id: t.id,
            name: t.title,
            genreOrArtist: t.artist,
            streamUrl: t.audioUrl,
            isRadio: true,
            accentColor: '#F59E0B'
          });
          if (audioRef.current) {
            audioRef.current.src = t.audioUrl;
            audioRef.current.loop = false;
            audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(() => {});
          }
        }}
        appVolume={masterVolume}
        onVolumeChange={setMasterVolume}
        soundEnabled={soundEffectsEnabled}
        onToggleSound={setSoundEffectsEnabled}
        onOpenVoiceSanctuary={() => setIsVoiceSanctuaryOpen(true)}
        onOpenProgress={() => setIsProgressOpen(true)}
        onOpenAdminCMS={() => setIsAdminCMSOpen(true)}
        onOpenWelcome={() => setIsWelcomeModalOpen(true)}
        onUpdateUser={(updated: any) => setCurrentUser(updated)}
        onLogout={handleLogout}
      />

      {/* 8. Relocated Modal: Live Voice Sanctuary */}
      <LiveVoiceSanctuary
        isOpen={isVoiceSanctuaryOpen}
        onClose={() => setIsVoiceSanctuaryOpen(false)}
        onAudioDucking={handleAudioDucking}
      />

      {/* 9. Relocated Modal: Discipleship Reading Progress */}
      <ReadingProgressModal
        isOpen={isProgressOpen}
        onClose={() => setIsProgressOpen(false)}
        onNavigateToBook={(bId) => {
          handleDeepLinkToScripture(bId, 1);
        }}
      />

      {/* 10. Relocated Modal: Admin CMS Portal (For Administrators Only) */}
      <AdminCMSModal
        isOpen={isAdminCMSOpen}
        onClose={() => setIsAdminCMSOpen(false)}
        currentUser={currentUser}
      />

      {/* 11. Member Roster Modal */}
      <MemberRosterModal
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        currentUser={currentUser}
      />

      {/* 12. Zoom Meeting Modal */}
      <ZoomMeetingModal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        currentUser={currentUser}
      />

      {/* 13. Study Notes & Journal HUD Modal (Accessible across all tabs with z-[9999]) */}
      <StudyNotesHUD
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        onOpen={() => setIsNotesOpen(true)}
        onNavigateToScripture={handleDeepLinkToScripture}
      />

      {/* 14. Theme HUD Modal (Visual Color Palettes) */}
      <ThemeHUDModal
        isOpen={isThemeOpen}
        onClose={() => setIsThemeOpen(false)}
        currentThemeId={currentThemeId}
        onSelectTheme={(id) => setCurrentThemeId(id)}
      />

      {/* 15. Permanent Welcome Sanctuary Modal Overlay (Accessible at all times) */}
      {isWelcomeModalOpen && (
        <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl overflow-y-auto animate-fadeIn">
          <WelcomeSanctuary
            onClose={() => setIsWelcomeModalOpen(false)}
            onEnterSanctuary={() => setIsWelcomeModalOpen(false)}
            isAuthenticated={true}
            onOpenRoster={() => {
              setIsWelcomeModalOpen(false);
              setIsRosterOpen(true);
            }}
          />
        </div>
      )}

    </div>
  );
}
