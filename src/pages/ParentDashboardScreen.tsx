import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  Lock,
  Unlock,
  Clock,
  Mail,
  Moon,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders,
  Bell
} from 'lucide-react';

export const ParentDashboardScreen: React.FC = () => {
  const {
    parentSettings,
    updateParentSettings,
    currentUser,
    playAudioCue
  } = useApp();

  const [enteredPin, setEnteredPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Local state for settings editing
  const [limitMinutes, setLimitMinutes] = useState(parentSettings.dailyScreenLimitMinutes);
  const [bedtimeHour, setBedtimeHour] = useState(parentSettings.bedtimeHour);
  const [email, setEmail] = useState(parentSettings.weeklyReportEmail);
  const [aiMonitoring, setAiMonitoring] = useState(parentSettings.aiDoubtMonitoring);

  const handlePinInput = (digit: string) => {
    playAudioCue('click');
    if (enteredPin.length < 4) {
      const nextPin = enteredPin + digit;
      setEnteredPin(nextPin);
      if (nextPin.length === 4) {
        if (nextPin === parentSettings.pin) {
          playAudioCue('success');
          setIsUnlocked(true);
          setPinError(false);
        } else {
          playAudioCue('click');
          setPinError(true);
          setTimeout(() => setEnteredPin(''), 600);
        }
      }
    }
  };

  const handleSave = () => {
    playAudioCue('success');
    updateParentSettings({
      dailyScreenLimitMinutes: limitMinutes,
      bedtimeHour,
      weeklyReportEmail: email,
      aiDoubtMonitoring: aiMonitoring
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] px-8 py-6 text-white select-none pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-white">Parental Dashboard & Guard</h1>
              <span className="text-[10px] bg-amber-950 text-amber-400 border border-amber-500/50 px-2 py-0.5 rounded font-mono uppercase">
                PIN PROTECTED
              </span>
            </div>
            <p className="text-xs text-gray-400">Manage Fire TV screen time limits, monitor attendance, and review AI doubt history</p>
          </div>
        </div>

        {isUnlocked && (
          <button
            onClick={() => {
              playAudioCue('click');
              setIsUnlocked(false);
              setEnteredPin('');
            }}
            className="tv-focusable px-3 py-1.5 bg-gray-900 border border-gray-700 hover:border-red-500 text-xs text-gray-300 hover:text-red-400 rounded-xl flex items-center space-x-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Dashboard</span>
          </button>
        )}
      </div>

      {!isUnlocked ? (
        /* PIN Lock Pad for Fire TV Remote */
        <div className="max-w-md mx-auto bg-[#121620]/90 border border-gray-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-full bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-cyan-400" />
          </div>

          <h2 className="text-xl font-black text-white mb-1">Enter 4-Digit Parent PIN</h2>
          <p className="text-xs text-gray-400 mb-6">
            Default demo PIN is <span className="font-mono text-cyan-300 font-bold">1 2 3 4</span>
          </p>

          {/* PIN Dots */}
          <div className="flex justify-center space-x-3 mb-6">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  enteredPin.length > i
                    ? 'bg-[#00d2ff] border-[#00a8e1] scale-110 shadow-[0_0_8px_#00d2ff]'
                    : pinError
                    ? 'border-red-500 bg-red-950'
                    : 'border-gray-700 bg-transparent'
                }`}
              />
            ))}
          </div>

          {pinError && (
            <p className="text-xs text-red-400 font-bold mb-4">Incorrect PIN. Try 1234.</p>
          )}

          {/* TV Numeric Grid (D-Pad navigation) */}
          <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto mb-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map(item => (
              <button
                key={item}
                onClick={() => {
                  if (item === 'C') {
                    playAudioCue('click');
                    setEnteredPin('');
                  } else if (item === '⌫') {
                    playAudioCue('click');
                    setEnteredPin(prev => prev.slice(0, -1));
                  } else {
                    handlePinInput(item);
                  }
                }}
                className="tv-focusable h-12 bg-gray-900/90 hover:bg-[#00a8e1] border border-gray-800 rounded-xl font-mono font-bold text-sm text-white hover:text-white transition cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Unlocked Parent Dashboard Content */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Controls & Limits (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Sliders className="w-4 h-4" />
                  <h3 className="font-bold text-xs uppercase tracking-wider">Fire TV Screen Controls</h3>
                </div>
                {savedSuccess && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1 animate-pulse">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Settings Updated</span>
                  </span>
                )}
              </div>

              {/* Screen Time Limit Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-200 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Daily Fire TV Study Limit</span>
                  </label>
                  <span className="text-sm font-mono font-black text-cyan-300">
                    {Math.floor(limitMinutes / 60)} hrs {limitMinutes % 60 > 0 ? `${limitMinutes % 60}m` : ''} ({limitMinutes} mins)
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="360"
                  step="30"
                  value={limitMinutes}
                  onChange={e => setLimitMinutes(Number(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00a8e1]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>1 hour</span>
                  <span>3 hours (Recommended)</span>
                  <span>6 hours</span>
                </div>
              </div>

              {/* Bedtime Lock */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-200 flex items-center space-x-2">
                    <Moon className="w-4 h-4 text-purple-400" />
                    <span>Bedtime Lock (TV Curfew)</span>
                  </label>
                  <span className="text-sm font-mono font-bold text-purple-300">
                    {bedtimeHour > 12 ? `${bedtimeHour - 12}:00 PM` : `${bedtimeHour}:00 AM`}
                  </span>
                </div>
                <select
                  value={bedtimeHour}
                  onChange={e => setBedtimeHour(Number(e.target.value))}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value={20}>8:00 PM</option>
                  <option value={21}>9:00 PM</option>
                  <option value={22}>10:00 PM (Standard)</option>
                  <option value={23}>11:00 PM</option>
                </select>
              </div>

              {/* Parent Email for Weekly PDF Reports */}
              <div>
                <label className="text-xs font-bold text-gray-200 block mb-1.5 flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Weekly Summary Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* AI Doubts Audit Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-2xl border border-gray-800">
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  <div>
                    <span className="text-xs font-bold text-white block">AI Doubt Monitoring</span>
                    <span className="text-[10px] text-gray-400">Audit questions asked to Bedrock AI assistant</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={aiMonitoring}
                  onChange={e => setAiMonitoring(e.target.checked)}
                  className="w-5 h-5 rounded accent-[#00a8e1] cursor-pointer"
                />
              </div>

              <button
                onClick={handleSave}
                className="tv-focusable w-full bg-[#00a8e1] hover:bg-[#0092c7] py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                Save Parental Safeguards
              </button>
            </div>
          </div>

          {/* Right Column: Attendance & Student Monitoring Summary */}
          <div className="space-y-4">
            <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-5 shadow-xl">
              <div className="flex items-center space-x-2 text-emerald-400 mb-3 pb-2 border-b border-gray-800">
                <CheckCircle2 className="w-4 h-4" />
                <h3 className="font-bold text-xs uppercase tracking-wider">Attendance & Compliance</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-2.5 bg-gray-900/60 rounded-xl">
                  <span className="text-gray-400">Student Profile:</span>
                  <span className="font-bold text-white">{currentUser.name}</span>
                </div>

                <div className="flex justify-between items-center p-2.5 bg-gray-900/60 rounded-xl">
                  <span className="text-gray-400">7-Day Attendance:</span>
                  <span className="font-bold text-emerald-400">100% (7 of 7 Days)</span>
                </div>

                <div className="flex justify-between items-center p-2.5 bg-gray-900/60 rounded-xl">
                  <span className="text-gray-400">Screen Time Today:</span>
                  <span className="font-bold text-cyan-300">{currentUser.todayMinutes} / {limitMinutes} Mins</span>
                </div>

                <div className="flex justify-between items-center p-2.5 bg-gray-900/60 rounded-xl">
                  <span className="text-gray-400">Late Night Violations:</span>
                  <span className="font-bold text-emerald-400">0 (Zero)</span>
                </div>
              </div>
            </div>

            {/* Alexa Voice Alert for Parents */}
            <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 rounded-3xl p-5">
              <div className="flex items-center space-x-2 text-amber-400 mb-1">
                <Bell className="w-4 h-4" />
                <h4 className="font-bold text-xs uppercase tracking-wider">Alexa Screen Notifications</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Fire TV will gently chime 15 minutes before the daily study limit expires to prevent eye strain.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
