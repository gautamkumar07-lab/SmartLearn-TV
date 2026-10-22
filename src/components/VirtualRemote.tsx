import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mic,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Home,
  Menu,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2
} from 'lucide-react';

export const VirtualRemote: React.FC = () => {
  const {
    isVirtualRemoteOpen,
    setIsVirtualRemoteOpen,
    setIsAlexaListening,
    playAudioCue,
    setActivePage,
    soundEnabled,
    setSoundEnabled
  } = useApp();

  const [isPlaying, setIsPlaying] = useState(true);

  if (!isVirtualRemoteOpen) {
    return (
      <button
        onClick={() => {
          playAudioCue('click');
          setIsVirtualRemoteOpen(true);
        }}
        className="fixed bottom-5 right-5 z-40 bg-gradient-to-r from-gray-900 to-gray-800 text-cyan-400 border border-cyan-500/40 px-4 py-2.5 rounded-full shadow-2xl flex items-center space-x-2.5 hover:scale-105 transition-all cursor-pointer group"
        title="Open Fire TV Remote Simulator"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-xs font-bold tracking-wider text-white">FIRE TV REMOTE</span>
        <Maximize2 className="w-3.5 h-3.5 text-gray-400 group-hover:text-cyan-300" />
      </button>
    );
  }

  const simulateKey = (key: string) => {
    playAudioCue('click');
    window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 w-64 bg-[#121620]/95 backdrop-blur-xl border border-gray-700/80 rounded-3xl p-4 shadow-2xl shadow-black/80 text-white select-none transition-all duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-800 mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-[11px] font-black tracking-widest text-gray-300">FIRE TV REMOTE</span>
        </div>
        <button
          onClick={() => {
            playAudioCue('click');
            setIsVirtualRemoteOpen(false);
          }}
          className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 cursor-pointer"
        >
          <Minimize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Alexa Voice Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => {
            playAudioCue('alexa');
            setIsAlexaListening(true);
          }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d2ff] to-[#007ba7] flex items-center justify-center shadow-lg shadow-cyan-500/30 active:scale-95 transition hover:brightness-110 cursor-pointer"
          title="Press to talk to Alexa (Key 'A')"
        >
          <Mic className="w-6 h-6 text-black fill-black" />
        </button>
      </div>

      {/* Fire TV D-PAD Directional Ring */}
      <div className="relative w-44 h-44 mx-auto mb-4 bg-gray-900/90 rounded-full border-4 border-gray-700/60 shadow-inner flex items-center justify-center">
        {/* UP */}
        <button
          onClick={() => simulateKey('ArrowUp')}
          className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-10 flex items-center justify-center text-gray-400 hover:text-cyan-400 active:scale-90 transition cursor-pointer"
        >
          <ChevronUp className="w-6 h-6" />
        </button>

        {/* DOWN */}
        <button
          onClick={() => simulateKey('ArrowDown')}
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-10 flex items-center justify-center text-gray-400 hover:text-cyan-400 active:scale-90 transition cursor-pointer"
        >
          <ChevronDown className="w-6 h-6" />
        </button>

        {/* LEFT */}
        <button
          onClick={() => simulateKey('ArrowLeft')}
          className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-16 flex items-center justify-center text-gray-400 hover:text-cyan-400 active:scale-90 transition cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* RIGHT */}
        <button
          onClick={() => simulateKey('ArrowRight')}
          className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-16 flex items-center justify-center text-gray-400 hover:text-cyan-400 active:scale-90 transition cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* CENTER SELECT */}
        <button
          onClick={() => simulateKey('Enter')}
          className="w-18 h-18 rounded-full bg-gradient-to-b from-gray-700 to-gray-800 hover:from-[#00a8e1] hover:to-[#007ba7] border-2 border-gray-600 shadow-md flex items-center justify-center active:scale-95 transition cursor-pointer group"
          title="Select / Enter"
        >
          <span className="text-[10px] font-extrabold tracking-wider text-gray-300 group-hover:text-white uppercase">
            OK
          </span>
        </button>
      </div>

      {/* Nav Row: Back, Home, Menu */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <button
          onClick={() => simulateKey('Escape')}
          className="h-10 bg-gray-800/80 hover:bg-gray-700 rounded-xl flex items-center justify-center text-gray-300 active:scale-95 transition cursor-pointer"
          title="Back (Esc / Backspace)"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            playAudioCue('select');
            setActivePage('home');
          }}
          className="h-10 bg-gray-800/80 hover:bg-[#00a8e1] rounded-xl flex items-center justify-center text-gray-300 hover:text-white active:scale-95 transition cursor-pointer"
          title="Home"
        >
          <Home className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            playAudioCue('select');
            setActivePage('settings');
          }}
          className="h-10 bg-gray-800/80 hover:bg-gray-700 rounded-xl flex items-center justify-center text-gray-300 active:scale-95 transition cursor-pointer"
          title="Menu / Settings"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Media Controls: Rewind, Play/Pause, Fast Forward */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <button
          onClick={() => playAudioCue('click')}
          className="h-9 bg-gray-800/50 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 active:scale-95 transition cursor-pointer"
          title="Rewind"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => {
            setIsPlaying(!isPlaying);
            playAudioCue('select');
          }}
          className="h-9 bg-gray-800/70 hover:bg-[#ff9900] hover:text-black rounded-lg flex items-center justify-center text-gray-300 active:scale-95 transition cursor-pointer"
          title="Play / Pause"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={() => playAudioCue('click')}
          className="h-9 bg-gray-800/50 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 active:scale-95 transition cursor-pointer"
          title="Fast Forward"
        >
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Volume & Audio Feedback toggle */}
      <div className="flex items-center justify-between text-xs text-gray-400 px-1 pt-1 border-t border-gray-800/70">
        <span className="text-[10px] font-mono">D-Pad / Arrows</span>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center space-x-1 hover:text-cyan-400 cursor-pointer"
          title="Mute TV audio clicks"
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-red-400" />}
          <span className="text-[10px]">{soundEnabled ? 'Chimes ON' : 'Muted'}</span>
        </button>
      </div>
    </div>
  );
};
