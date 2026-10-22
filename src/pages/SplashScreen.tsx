import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Tv, Sparkles, ArrowRight } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setActivePage, playAudioCue } = useApp();
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    playAudioCue('alexa');
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setActivePage('auth');
          }, 400);
          return 100;
        }
        return prev + 20;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [playAudioCue, setActivePage]);

  return (
    <div className="relative min-h-screen bg-[#0b0e14] flex flex-col items-center justify-center p-8 overflow-hidden select-none">
      {/* Background radial spotlight */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-[#00a8e1]/15 to-[#00d2ff]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Fire TV Logo animation */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#00a8e1] via-[#00d2ff] to-[#ff9900] p-1 shadow-2xl shadow-[#00a8e1]/50 animate-bounce">
            <div className="w-full h-full bg-[#0d1117] rounded-[22px] flex items-center justify-center">
              <Tv className="w-12 h-12 text-[#00d2ff]" />
            </div>
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-7 h-7 text-[#ff9900] animate-spin" />
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">SmartLearn</h1>
          <span className="text-sm px-2.5 py-1 rounded-md font-black tracking-widest bg-[#ff9900] text-black">
            FIRE TV
          </span>
        </div>

        <p className="text-gray-400 text-lg mb-8 max-w-md font-medium">
          Transforming your Television into an AI-Powered Personalized Learning Hub
        </p>

        {/* Loading Progress Bar */}
        <div className="w-80 bg-gray-800/80 rounded-full h-2.5 p-0.5 border border-gray-700/80 mb-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00a8e1] to-[#00d2ff] rounded-full transition-all duration-300 shadow-[0_0_12px_#00d2ff]"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>

        <p className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-8">
          Loading AI Modules & Alexa Voice Engine ({loadingProgress}%)...
        </p>

        {/* Skip button for quick remote navigation */}
        <button
          onClick={() => {
            playAudioCue('select');
            setActivePage('auth');
          }}
          className="tv-focusable flex items-center space-x-2 bg-gray-900/90 hover:bg-[#00a8e1] border border-gray-700 text-gray-300 hover:text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer"
        >
          <span>Press OK / Enter to Start</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Fire TV OS Footnote */}
      <div className="absolute bottom-6 flex items-center space-x-6 text-gray-500 text-xs">
        <span>Amazon Fire TV Edition OS</span>
        <span>•</span>
        <span>Alexa Built-in</span>
        <span>•</span>
        <span>Bedrock AI Verified</span>
      </div>
    </div>
  );
};
