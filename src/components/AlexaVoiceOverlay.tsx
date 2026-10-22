import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Mic, X, Volume2, Sparkles, Send } from 'lucide-react';

export const AlexaVoiceOverlay: React.FC = () => {
  const {
    isAlexaListening,
    setIsAlexaListening,
    alexaTranscript,
    alexaResponse,
    triggerAlexaCommand,
    playAudioCue
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  // Quick preset voice prompts tailored for TV remote users
  const quickVoicePrompts = [
    'Alexa, start Physics speed quiz',
    'Alexa, explain Faraday’s Law and induced EMF',
    'Alexa, what is my study schedule today?',
    'Alexa, show my weak topics in Math',
    'Alexa, recommend high-paying AI engineering careers',
    'Alexa, resume my Chemistry reaction mechanism lesson'
  ];

  // Try real browser Web Speech API for voice recognition
  useEffect(() => {
    let recognition: any = null;
    if (isAlexaListening && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      try {
        const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognition = new SpeechRec();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsRecording(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('');
          setInputVal(transcript);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };

        recognition.start();
      } catch (err) {
        console.warn('Speech recognition unavailable or permission denied:', err);
      }
    }

    return () => {
      if (recognition) {
        try {
          recognition.abort();
        } catch {}
      }
    };
  }, [isAlexaListening]);

  if (!isAlexaListening && !alexaResponse) {
    return null;
  }

  const handleSend = () => {
    if (!inputVal.trim()) return;
    triggerAlexaCommand(inputVal);
    setInputVal('');
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center pointer-events-auto">
      {/* Alexa Fire TV Cyan Light Bar */}
      <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent shadow-[0_0_20px_#00d2ff] animate-pulse" />

      {/* Main Alexa Drawer Modal */}
      <div className="w-full max-w-4xl mx-auto bg-[#0d121c]/95 border-t border-x border-cyan-500/40 rounded-t-3xl shadow-2xl shadow-cyan-900/50 backdrop-blur-xl p-6 mb-0 text-white transition-all transform animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-[#00d2ff] flex items-center justify-center alexa-glow shadow-md">
              <Mic className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-lg text-cyan-300">Alexa on Fire TV</h3>
                <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-500/50 px-2 py-0.5 rounded-full font-mono uppercase">
                  {isRecording ? 'Listening live...' : 'Ready'}
                </span>
              </div>
              <p className="text-xs text-gray-400">Ask study questions, launch quizzes, or navigate hands-free</p>
            </div>
          </div>

          <button
            onClick={() => {
              playAudioCue('click');
              setIsAlexaListening(false);
            }}
            className="tv-focusable p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Voice Soundwaves */}
        <div className="flex items-center justify-center space-x-1.5 h-10 mb-4 bg-black/40 rounded-xl py-2">
          <div className="w-1.5 bg-cyan-400 rounded-full animate-wave-1" />
          <div className="w-1.5 bg-cyan-300 rounded-full animate-wave-2" />
          <div className="w-1.5 bg-[#00a8e1] rounded-full animate-wave-3" />
          <div className="w-1.5 bg-blue-400 rounded-full animate-wave-4" />
          <div className="w-1.5 bg-cyan-200 rounded-full animate-wave-5" />
          <span className="ml-3 text-xs text-cyan-300 font-mono tracking-wide">
            {isRecording ? 'Speak now into Fire TV Remote...' : 'Tap prompt or speak'}
          </span>
        </div>

        {/* Transcribed or entered query */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Speak via microphone or type 'Alexa, start physics quiz'..."
              className="w-full bg-gray-900/90 border border-cyan-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>
          <button
            onClick={handleSend}
            className="tv-focusable bg-[#00a8e1] hover:bg-[#0092c7] px-5 py-3 rounded-xl font-bold text-sm text-white flex items-center space-x-2 cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            <Send className="w-4 h-4" />
            <span>Ask</span>
          </button>
        </div>

        {/* Alexa Spoken Response Display */}
        {alexaResponse && (
          <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-xl p-3 mb-4 flex items-start space-x-3">
            <Volume2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
            <div className="text-sm">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Alexa Response:
              </span>
              <p className="text-gray-200 leading-relaxed">{alexaResponse}</p>
            </div>
          </div>
        )}

        {/* Quick Voice Suggestions Chips */}
        <div>
          <div className="flex items-center space-x-1.5 text-xs text-gray-400 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Try asking on Fire TV Remote:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickVoicePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playAudioCue('select');
                  triggerAlexaCommand(prompt);
                }}
                className="tv-focusable bg-gray-900/80 hover:bg-cyan-900/40 border border-gray-700/80 hover:border-cyan-500/50 text-xs px-3 py-1.5 rounded-lg text-gray-300 hover:text-cyan-200 transition text-left cursor-pointer"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
