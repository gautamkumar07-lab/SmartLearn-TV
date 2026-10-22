import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Award,
  Flame,
  Coins,
  Sparkles,
  CheckCircle2,
  Tv,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookMarked
} from 'lucide-react';
import { UserRole } from '../types';

export const ProfileScreen: React.FC = () => {
  const {
    currentUser,
    setCurrentUser,
    users,
    playAudioCue,
    setActivePage
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'certifications'>('overview');

  const allBadges = [
    { id: 'b1', name: 'Quantum Leap', desc: 'Solved 50 Advanced Physics Doubts with AI', icon: '⚛️', unlocked: true },
    { id: 'b2', name: 'Night Scholar', desc: 'Studied past 10 PM on Fire TV 5 days in a row', icon: '🦉', unlocked: true },
    { id: 'b3', name: 'Lightning Solver', desc: 'Finished 10 quiz questions in under 3 minutes', icon: '⚡', unlocked: true },
    { id: 'b4', name: 'Voice Pioneer', desc: 'Executed 25 Alexa study voice commands', icon: '🎙️', unlocked: true },
    { id: 'b5', name: 'Math Prodigy', desc: 'Scored 100% on Differential Calculus drill', icon: '📐', unlocked: true },
    { id: 'b6', name: 'Streak Legend', desc: 'Maintained 30 continuous learning streak days', icon: '🔥', unlocked: false },
    { id: 'b7', name: 'Offline Master', desc: 'Completed 15 downloaded modules with no Wi-Fi', icon: '🌾', unlocked: false },
    { id: 'b8', name: 'Grand Scholar', desc: 'Reached Level 20 in SmartLearn Fire TV', icon: '👑', unlocked: false }
  ];

  const certifications = [
    {
      id: 'c1',
      title: 'Electromagnetic Field Theory & Induction Mastery',
      issuedBy: 'SmartLearn TV & National Science Olympiad AI',
      date: 'Oct 2026',
      grade: 'Grade A+ (Distinction)'
    },
    {
      id: 'c2',
      title: 'Differential Calculus & Optimization Certification',
      issuedBy: 'SmartLearn TV & Ramanujan Mathematical Society',
      date: 'Sept 2026',
      grade: 'Grade A'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0e14] px-8 py-6 text-white select-none pb-24">
      {/* Profile Header Hero */}
      <div className="bg-gradient-to-r from-[#121620] via-[#162030] to-[#121620] border border-gray-800 rounded-3xl p-8 mb-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-[#00a8e1] shadow-2xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-[#ff9900] text-black font-black text-xs px-2 py-0.5 rounded-lg shadow">
              Lv.{currentUser.level}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white">{currentUser.name}</h1>
                <p className="text-cyan-400 font-bold text-xs mt-0.5 flex items-center justify-center md:justify-start space-x-2">
                  <span>{currentUser.gradeOrTarget}</span>
                  <span>•</span>
                  <span className="capitalize">{currentUser.role} Stream</span>
                </p>
              </div>

              {/* Quick Switch Profile Button */}
              <button
                onClick={() => {
                  playAudioCue('select');
                  setActivePage('auth');
                }}
                className="tv-focusable bg-gray-900 border border-gray-700 hover:border-cyan-400 text-xs text-gray-300 hover:text-white px-4 py-2 rounded-xl font-bold cursor-pointer transition"
              >
                Switch Student Profile
              </button>
            </div>

            {/* Level XP Progress Bar */}
            <div className="mt-5 max-w-xl">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-gray-400 font-bold">Level {currentUser.level} Scholar</span>
                <span className="font-mono text-cyan-300 font-bold">{currentUser.xp} / {currentUser.level * 400} XP</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#00a8e1] to-[#00d2ff] h-full rounded-full"
                  style={{ width: `${Math.min(100, (currentUser.xp % 400) / 4)}%` }}
                />
              </div>
            </div>

            {/* Gamification Stats Ribbon */}
            <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-gray-800 text-xs">
              <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>{currentUser.streakDays} Days Unbroken Streak</span>
              </div>
              <div className="flex items-center space-x-1.5 text-yellow-400 font-bold">
                <Coins className="w-4 h-4" />
                <span>{currentUser.coins} SmartCoins</span>
              </div>
              <div className="flex items-center space-x-1.5 text-cyan-400 font-bold">
                <Zap className="w-4 h-4" />
                <span>{currentUser.todayMinutes} Mins Studied Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-3 mb-6">
        <button
          onClick={() => {
            playAudioCue('click');
            setActiveTab('overview');
          }}
          className={`tv-focusable px-5 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#00a8e1] text-white shadow-lg'
              : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          Learning Status
        </button>

        <button
          onClick={() => {
            playAudioCue('click');
            setActiveTab('badges');
          }}
          className={`tv-focusable px-5 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'badges'
              ? 'bg-[#00a8e1] text-white shadow-lg'
              : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          Achievement Badges ({allBadges.filter(b => b.unlocked).length} Unlocked)
        </button>

        <button
          onClick={() => {
            playAudioCue('click');
            setActiveTab('certifications');
          }}
          className={`tv-focusable px-5 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'certifications'
              ? 'bg-[#00a8e1] text-white shadow-lg'
              : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          TV Certifications
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-cyan-400">Account & Cloud Sync</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-3 bg-black/40 rounded-xl">
                <span className="text-gray-400">Fire TV Device ID:</span>
                <span className="font-mono text-white">AMZN-FTV-4K-9281-IN</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/40 rounded-xl">
                <span className="text-gray-400">Amazon Account Linked:</span>
                <span className="text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Student</span>
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/40 rounded-xl">
                <span className="text-gray-400">Cloud Storage Sync:</span>
                <span className="text-cyan-300 font-mono">Real-time Firestore Sync</span>
              </div>
            </div>
          </div>

          <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amber-400">SmartCoins Redemption</h3>
            <p className="text-xs text-gray-400">
              Redeem your coins for mock exam passes, personalized 1-on-1 AI masterclasses, or Amazon Kindle vouchers!
            </p>
            <div className="p-4 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Available SmartCoins</span>
                <span className="text-2xl font-black text-amber-400 font-mono">{currentUser.coins} Coins</span>
              </div>
              <button
                onClick={() => playAudioCue('success')}
                className="tv-focusable bg-[#ff9900] hover:bg-amber-500 text-black px-4 py-2 rounded-xl text-xs font-black uppercase cursor-pointer"
              >
                Claim Rewards
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {allBadges.map(badge => (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all text-center flex flex-col items-center justify-between ${
                badge.unlocked
                  ? 'bg-[#121620]/90 border-[#00a8e1]/40 shadow-lg'
                  : 'bg-black/30 border-gray-800/60 opacity-40'
              }`}
            >
              <div>
                <span className="text-4xl block mb-2">{badge.icon}</span>
                <h4 className="font-bold text-xs text-white mb-1">{badge.name}</h4>
                <p className="text-[10px] text-gray-400 leading-snug">{badge.desc}</p>
              </div>

              <span
                className={`mt-4 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                  badge.unlocked
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                {badge.unlocked ? 'Unlocked' : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'certifications' && (
        <div className="space-y-4">
          {certifications.map(cert => (
            <div
              key={cert.id}
              className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00a8e1] to-[#00d2ff] flex items-center justify-center shrink-0">
                  <BookMarked className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{cert.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{cert.issuedBy} • {cert.date}</p>
                  <span className="inline-block mt-2 text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    {cert.grade}
                  </span>
                </div>
              </div>

              <button
                onClick={() => playAudioCue('select')}
                className="tv-focusable bg-[#00a8e1] hover:bg-[#0092c7] px-4 py-2 rounded-xl text-xs font-bold text-white cursor-pointer"
              >
                View on TV Screen
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
