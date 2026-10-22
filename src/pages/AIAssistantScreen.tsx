import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  Mic,
  Send,
  Volume2,
  Sparkles,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Calculator,
  Flame,
  BrainCircuit
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  subject?: string;
  formula?: string;
  steps?: string[];
}

export const AIAssistantScreen: React.FC = () => {
  const { playAudioCue, setIsAlexaListening, addXP } = useApp();
  const [selectedSubject, setSelectedSubject] = useState('Physics');
  const [inputQuestion, setInputQuestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: "Hello Aarav! I am your SmartLearn TV AI Study Assistant, powered by Amazon Bedrock & Claude/GPT. Ask me any study question using your Fire TV voice remote or select a topic below.",
      timestamp: '17:40',
      subject: 'General'
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'Explain how Lenz’s Law relates to conservation of energy.',
      timestamp: '17:41',
      subject: 'Physics'
    },
    {
      id: 'm3',
      sender: 'ai',
      text: "Lenz’s Law states that the polarity of induced electromotive force (EMF) is such that it produces an electric current whose magnetic field opposes the change in magnetic flux that produces it.",
      timestamp: '17:41',
      subject: 'Physics',
      formula: 'ε = - dΦ / dt   [Faraday-Lenz Equation]',
      steps: [
        '1. If a North pole approaches a coil, an induced North pole faces it, generating repulsive force.',
        '2. The external agent must do mechanical work to push the magnet against this repulsion.',
        '3. This mechanical work is directly converted into electrical energy in the coil.',
        '4. If the induced pole were South (attracting), the magnet would accelerate without any external work, creating free energy—violating the First Law of Thermodynamics.'
      ]
    }
  ]);

  const presetDoubts = [
    { subject: 'Physics', q: 'Derive the magnetic field inside a long solenoid.' },
    { subject: 'Mathematics', q: 'How do you find local maxima and minima using the second derivative test?' },
    { subject: 'Chemistry', q: 'Explain why SN2 reactions result in complete inversion of configuration.' },
    { subject: 'Biology', q: 'What is the role of Cas9 endonuclease and guide RNA in CRISPR gene editing?' },
    { subject: 'Computer Science', q: 'Explain the Self-Attention mechanism in Transformer architecture.' }
  ];

  const handleAsk = (questionText?: string) => {
    const q = (questionText || inputQuestion).trim();
    if (!q) return;

    playAudioCue('select');
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subject: selectedSubject
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsGenerating(true);

    // AI Simulation response
    setTimeout(() => {
      let aiText = `Here is the comprehensive AI breakdown for your ${selectedSubject} question: "${q}".`;
      let formula = '';
      let steps: string[] = [];

      if (q.toLowerCase().includes('solenoid')) {
        formula = 'B = μ₀ · n · I  [Where n = N / L]';
        steps = [
          'Choose an Ampèrian loop of rectangular dimensions (abcd) half inside the solenoid.',
          'Line integral ∮ B · dl along path ab inside is B · L.',
          'Along bc and da, magnetic field is perpendicular, so B · dl = 0.',
          'Outside the solenoid, field B is approximately zero.',
          'By Ampère’s Circuital Law: ∮ B · dl = μ₀ · I_enclosed = μ₀ · (n · L · I) ⇒ B = μ₀ · n · I.'
        ];
      } else if (q.toLowerCase().includes('derivative')) {
        formula = "f''(x) < 0 ⇒ Local Maxima | f''(x) > 0 ⇒ Local Minima";
        steps = [
          'Find the first derivative f’(x) and solve f’(x) = 0 for critical points x = c.',
          'Calculate the second derivative f’’(x).',
          'Evaluate f’’(c): if negative, curve is concave down (Local Maximum).',
          'If f’’(c) > 0, curve is concave up (Local Minimum). If f’’(c) = 0, perform higher order tests.'
        ];
      } else {
        steps = [
          'Core Concept: Fundamental principle established from basic experimental laws.',
          'Mathematical derivation applies first-order conservation constraints.',
          'Key exam takeaway: Verify boundary conditions and dimensional consistency.'
        ];
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        subject: selectedSubject,
        formula,
        steps
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsGenerating(false);
      playAudioCue('success');
      addXP(50);
    }, 1000);
  };

  const speakMessage = (text: string) => {
    playAudioCue('alexa');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utt);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] px-8 py-6 text-white select-none pb-24">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00a8e1] to-[#00d2ff] flex items-center justify-center shadow-lg shadow-[#00a8e1]/40">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-white">AI Study Assistant</h1>
              <span className="text-[10px] bg-cyan-950 border border-cyan-500/50 text-cyan-300 px-2 py-0.5 rounded font-mono uppercase">
                AMAZON BEDROCK POWERED
              </span>
            </div>
            <p className="text-xs text-gray-400">Step-by-step doubt resolution, formulas, and Alexa voice explanations</p>
          </div>
        </div>

        {/* Subject Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {['Physics', 'Mathematics', 'Chemistry', 'Biology', 'Computer Science'].map(sub => (
            <button
              key={sub}
              onClick={() => {
                playAudioCue('click');
                setSelectedSubject(sub);
              }}
              className={`tv-focusable px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedSubject === sub
                  ? 'bg-[#00a8e1] text-white shadow-md shadow-[#00a8e1]/30'
                  : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Chat + Preset Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Conversational Chat Stream (2 Cols) */}
        <div className="lg:col-span-2 flex flex-col h-[580px] bg-[#121620]/90 border border-gray-800 rounded-3xl p-5 shadow-2xl">
          {/* Messages list */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 no-scrollbar">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-2xl rounded-2xl p-4.5 text-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#00a8e1] text-white rounded-tr-none'
                      : 'bg-gray-900/90 border border-gray-800 text-gray-200 rounded-tl-none shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 text-[10px] text-gray-400">
                    <span className="font-bold uppercase tracking-wider text-cyan-300">
                      {msg.sender === 'user' ? 'Student Doubt' : 'SmartLearn AI Assistant'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <p className="leading-relaxed text-xs md:text-sm">{msg.text}</p>

                  {/* Mathematical Formula Box */}
                  {msg.formula && (
                    <div className="mt-3 p-3 bg-black/60 rounded-xl border border-cyan-500/40 text-center font-mono text-cyan-300 font-bold text-sm tracking-wide shadow-inner">
                      {msg.formula}
                    </div>
                  )}

                  {/* Step by step breakdown */}
                  {msg.steps && msg.steps.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-800/80 space-y-2">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Step-by-step Whiteboard derivation:</span>
                      </span>
                      {msg.steps.map((st, i) => (
                        <p key={i} className="text-xs text-gray-300 bg-black/30 p-2 rounded-lg">
                          {st}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Audio Listen Button for AI Responses */}
                  {msg.sender === 'ai' && (
                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-800/60">
                      <button
                        onClick={() => speakMessage(msg.text)}
                        className="tv-focusable text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1.5 cursor-pointer font-bold"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen to Alexa audio</span>
                      </button>
                      <span className="text-[10px] text-emerald-400 font-mono">+50 XP Earned</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono p-3 bg-cyan-950/30 rounded-xl border border-cyan-500/30 animate-pulse">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>AI Assistant is deriving formulas & synthesizing solution...</span>
              </div>
            )}
          </div>

          {/* Bottom TV Input Bar */}
          <div className="pt-4 border-t border-gray-800 flex items-center space-x-3">
            <button
              onClick={() => {
                playAudioCue('alexa');
                setIsAlexaListening(true);
              }}
              className="tv-focusable p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 hover:bg-[#00a8e1] hover:text-white transition cursor-pointer"
              title="Voice Input (Alexa)"
            >
              <Mic className="w-5 h-5" />
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={inputQuestion}
                onChange={e => setInputQuestion(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAsk()}
                placeholder={`Ask any ${selectedSubject} question or doubt...`}
                className="w-full bg-black/50 border border-gray-700 rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              onClick={() => handleAsk()}
              className="tv-focusable bg-[#00a8e1] hover:bg-[#0092c7] px-6 py-3 rounded-2xl text-white font-bold text-sm flex items-center space-x-2 cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Solve</span>
            </button>
          </div>
        </div>

        {/* Right Column: Preset Doubts & AI Study Features */}
        <div className="space-y-4">
          <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center space-x-2 text-amber-400 mb-3">
              <Flame className="w-4 h-4" />
              <h3 className="font-bold text-xs uppercase tracking-wider">Frequently Asked on Fire TV</h3>
            </div>

            <div className="space-y-2.5">
              {presetDoubts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(item.q)}
                  className="tv-focusable w-full text-left p-3 rounded-xl bg-gray-900/60 hover:bg-cyan-950/40 border border-gray-800/80 hover:border-cyan-500/40 transition cursor-pointer group"
                >
                  <span className="text-[10px] font-bold text-cyan-400 block mb-1 uppercase">
                    {item.subject}
                  </span>
                  <p className="text-xs text-gray-300 group-hover:text-white line-clamp-2">
                    {item.q}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* AI Whiteboard Mode Info */}
          <div className="bg-gradient-to-tr from-cyan-950/40 to-blue-950/20 border border-cyan-500/30 rounded-3xl p-5">
            <div className="flex items-center space-x-2 text-cyan-300 mb-2">
              <Calculator className="w-4 h-4" />
              <h4 className="font-bold text-xs uppercase tracking-wider">Multi-Modal TV Engine</h4>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              SmartLearn TV automatically generates KaTeX mathematical equations, diagram structures, and step-by-step logic formatted for 10-foot viewing distances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
