import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PageId } from '../types';
import {
  Tv,
  Mic,
  Home,
  BookOpen,
  Bot,
  BrainCircuit,
  BarChart3,
  Calendar,
  Compass,
  Shield,
  Settings,
  Wifi,
  Flame,
  Award
} from 'lucide-react';

export const FireTVHeader: React.FC = () => {
  const {
    activePage,
    setActivePage,
    currentUser,
    isAlexaListening,
    setIsAlexaListening,
    playAudioCue,
    t
  } = useApp();

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(
        d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t('home'), icon: <Home className="w-4 h-4" /> },
    { id: 'learning', label: t('learning'), icon: <BookOpen className="w-4 h-4" /> },
    { id: 'ai-assistant', label: t('aiAssistant'), icon: <Bot className="w-4 h-4" /> },
    { id: 'quiz', label: t('quiz'), icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'analytics', label: t('analytics'), icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'planner', label: t('planner'), icon: <Calendar className="w-4 h-4" /> },
    { id: 'career', label: t('career'), icon: <Compass className="w-4 h-4" /> },
    { id: 'parent', label: t('parent'), icon: <Shield className="w-4 h-4" /> },
    { id: 'settings', label: t('settings'), icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0b0e14]/90 backdrop-blur-md border-b border-gray-800/80 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div
            onClick={() => {
              playAudioCue('select');
              setActivePage('home');
            }}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00a8e1] to-[#00d2ff] flex items-center justify-center shadow-lg shadow-[#00a8e1]/30 group-hover:scale-105 transition-transform">
              <Tv className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white">SmartLearn</span>
                <span className="text-xs px-1.5 py-0.5 rounded font-black tracking-widest bg-[#ff9900] text-black">
                  FIRE TV
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium">AI-Powered 10-Foot Education</p>
            </div>
          </div>

          <button
            onClick={() => {
              playAudioCue('click');
              setActivePage('landing');
            }}
            className="hidden sm:inline-flex text-[11px] font-bold text-gray-400 hover:text-cyan-300 bg-gray-900/60 hover:bg-gray-800 border border-gray-800 px-2.5 py-1 rounded-lg cursor-pointer transition"
          >
            Web Tour
          </button>
        </div>

        {/* TV Top Navigation Bar */}
        <nav className="flex items-center space-x-1">
          {navItems.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playAudioCue('select');
                  setActivePage(item.id);
                }}
                className={`tv-focusable flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#00a8e1] text-white shadow-md shadow-[#00a8e1]/40 ring-2 ring-[#00d2ff]'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{item.icon}</span>
                <span className="tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Status: Alexa Button, Streak & Profile */}
        <div className="flex items-center space-x-4">
          {/* Alexa Voice Trigger Button */}
          <button
            onClick={() => {
              playAudioCue('alexa');
              setIsAlexaListening(!isAlexaListening);
            }}
            className={`tv-focusable flex items-center space-x-2 px-3 py-1.5 rounded-full border cursor-pointer transition-all ${
              isAlexaListening
                ? 'bg-gradient-to-r from-[#00d2ff] to-[#00a8e1] text-black border-cyan-300 alexa-glow'
                : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 hover:border-cyan-400'
            }`}
            title="Press 'A' on keyboard or Click to speak to Alexa"
          >
            <div className={`w-2.5 h-2.5 rounded-full ${isAlexaListening ? 'bg-white animate-ping' : 'bg-cyan-400'}`} />
            <Mic className="w-3.5 h-3.5" />
            <span className="text-xs font-bold tracking-wider">ALEXA</span>
          </button>

          {/* Daily Streak Indicator */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full text-amber-400 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{currentUser.streakDays}d Streak</span>
          </div>

          {/* XP & Level */}
          <div className="hidden xl:flex items-center space-x-1.5 bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 rounded-full text-blue-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <span>Lv.{currentUser.level} ({currentUser.xp} XP)</span>
          </div>

          {/* User Profile Pill */}
          <button
            onClick={() => {
              playAudioCue('select');
              setActivePage('profile');
            }}
            className="tv-focusable flex items-center space-x-2 p-1 pl-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-full border border-gray-700 transition cursor-pointer"
          >
            <span className="text-xs font-semibold text-gray-200 max-w-[90px] truncate">
              {currentUser.name.split(' ')[0]}
            </span>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-[#00a8e1]"
            />
          </button>

          {/* TV Status & Clock */}
          <div className="flex items-center space-x-2 text-gray-400 text-xs pl-1 border-l border-gray-800">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-gray-300 font-semibold">{currentTime}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
