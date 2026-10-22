import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LanguageCode } from '../types';
import {
  Settings,
  Languages,
  Mic,
  Volume2,
  HardDrive,
  Eye,
  Tv,
  Subtitles,
  Trash2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const {
    language,
    setLanguage,
    soundEnabled,
    setSoundEnabled,
    highContrast,
    setHighContrast,
    downloadedVideos,
    playAudioCue
  } = useApp();

  const [voiceRate, setVoiceRate] = useState(1.0);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [resolution, setResolution] = useState('4K Ultra HD (Auto)');
  const [cacheCleared, setCacheCleared] = useState(false);

  const languagesList: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English (US/UK)' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी (Hindi)' },
    { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা (Bengali)' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ் (Tamil)' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు (Telugu)' }
  ];

  const handleClearCache = () => {
    playAudioCue('success');
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] px-8 py-6 text-white select-none pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center shadow-lg">
            <Settings className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-white">System Settings & Preferences</h1>
              <span className="text-[10px] bg-gray-800 text-gray-300 border border-gray-700 px-2 py-0.5 rounded font-mono uppercase">
                FIRE TV CONFIG
              </span>
            </div>
            <p className="text-xs text-gray-400">Configure language, Alexa voice responsiveness, 4K video resolution, and accessibility</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Multi-language Support */}
        <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-cyan-400 pb-2 border-b border-gray-800">
            <Languages className="w-4 h-4" />
            <h3 className="font-bold text-xs uppercase tracking-wider">Multi-Language Support</h3>
          </div>

          <p className="text-xs text-gray-400">
            Select your preferred regional language for TV UI, audio narrations, and AI doubts.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {languagesList.map(lang => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    playAudioCue('select');
                    setLanguage(lang.code);
                  }}
                  className={`tv-focusable p-3 rounded-2xl border text-left cursor-pointer transition ${
                    isSelected
                      ? 'bg-[#162030] border-[#00a8e1] ring-2 ring-[#00d2ff]'
                      : 'bg-gray-900/80 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <span className="text-xs font-bold text-white block">{lang.native}</span>
                  <span className="text-[10px] text-gray-400">{lang.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Alexa Voice & Audio Feedback */}
        <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-cyan-400 pb-2 border-b border-gray-800">
            <Mic className="w-4 h-4" />
            <h3 className="font-bold text-xs uppercase tracking-wider">Alexa Voice & Audio Options</h3>
          </div>

          {/* Voice rate */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-bold text-gray-200">Alexa Speech Rate</span>
              <span className="font-mono text-cyan-300 font-bold">{voiceRate}x Speed</span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.5"
              step="0.25"
              value={voiceRate}
              onChange={e => setVoiceRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00a8e1]"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>0.75x (Relaxed)</span>
              <span>1.0x (Standard)</span>
              <span>1.5x (Speedy)</span>
            </div>
          </div>

          {/* Audio Chimes */}
          <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-2xl border border-gray-800">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-xs font-bold text-white block">Fire TV Remote Chimes</span>
                <span className="text-[10px] text-gray-400">Audio feedback on D-Pad navigation</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={e => {
                playAudioCue('click');
                setSoundEnabled(e.target.checked);
              }}
              className="w-5 h-5 rounded accent-[#00a8e1] cursor-pointer"
            />
          </div>
        </div>

        {/* Section 3: Display & Accessibility */}
        <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-amber-400 pb-2 border-b border-gray-800">
            <Eye className="w-4 h-4" />
            <h3 className="font-bold text-xs uppercase tracking-wider">Display & TV Accessibility</h3>
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-2xl border border-gray-800">
            <div>
              <span className="text-xs font-bold text-white block">High Contrast / Large TV Text</span>
              <span className="text-[10px] text-gray-400">Enhance readability for 10-foot viewing</span>
            </div>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={e => {
                playAudioCue('click');
                setHighContrast(e.target.checked);
              }}
              className="w-5 h-5 rounded accent-[#00a8e1] cursor-pointer"
            />
          </div>

          {/* Subtitles */}
          <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-2xl border border-gray-800">
            <div className="flex items-center space-x-3">
              <Subtitles className="w-5 h-5 text-cyan-400" />
              <div>
                <span className="text-xs font-bold text-white block">Closed Captions (CC)</span>
                <span className="text-[10px] text-gray-400">Always display subtitles on videos</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={subtitlesEnabled}
              onChange={e => setSubtitlesEnabled(e.target.checked)}
              className="w-5 h-5 rounded accent-[#00a8e1] cursor-pointer"
            />
          </div>

          {/* Video Resolution */}
          <div>
            <label className="text-xs font-bold text-gray-200 block mb-1.5 flex items-center space-x-2">
              <Tv className="w-4 h-4 text-cyan-400" />
              <span>Fire TV Stream Quality</span>
            </label>
            <select
              value={resolution}
              onChange={e => setResolution(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="4K Ultra HD (Auto)">4K Ultra HD (Auto-detected)</option>
              <option value="1080p Full HD">1080p Full HD (Save Bandwidth)</option>
              <option value="720p HD">720p HD (Low Data / Rural)</option>
            </select>
          </div>
        </div>

        {/* Section 4: Offline Content & Storage Management */}
        <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-cyan-400 pb-2 border-b border-gray-800">
            <HardDrive className="w-4 h-4" />
            <h3 className="font-bold text-xs uppercase tracking-wider">Storage & Offline Cache</h3>
          </div>

          <div className="p-3.5 bg-black/40 rounded-2xl border border-gray-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Fire TV Internal Storage:</span>
              <span className="font-mono text-cyan-300 font-bold">1.4 GB / 16.0 GB Used</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div className="bg-[#00a8e1] h-full rounded-full w-[12%]" />
            </div>
            <div className="flex justify-between text-[10px] text-gray-500">
              <span>{downloadedVideos.length} Saved Lessons</span>
              <span>14.6 GB Available</span>
            </div>
          </div>

          {cacheCleared ? (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl flex items-center space-x-2 text-emerald-400 text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Local storage cache flushed successfully!</span>
            </div>
          ) : (
            <button
              onClick={handleClearCache}
              className="tv-focusable w-full py-2.5 bg-gray-900 border border-gray-700 hover:border-rose-500 text-xs font-bold text-gray-300 hover:text-rose-400 rounded-xl flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Temporary Video Cache</span>
            </button>
          )}

          <div className="text-[11px] text-gray-500">
            SmartLearn TV Version 2.4.0 (Fire OS 8 Build 2026-Oct).
          </div>
        </div>
      </div>
    </div>
  );
};
