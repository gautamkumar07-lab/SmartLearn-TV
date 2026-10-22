import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  BrainCircuit,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  Flame,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { Quiz } from '../types';

export const QuizCenterScreen: React.FC = () => {
  const { quizzes, leaderboard, playAudioCue, addXP } = useApp();
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz>(quizzes[0]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quizzes[0].timeLimitSeconds);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const currentQ = selectedQuiz.questions[currentQIndex];

  // Timer countdown
  useEffect(() => {
    let timer: any = null;
    if (isTimerActive && timeLeft > 0 && !quizFinished) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setQuizFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft, quizFinished]);

  const handleStartQuiz = (q: Quiz) => {
    playAudioCue('select');
    setSelectedQuiz(q);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setTimeLeft(q.timeLimitSeconds);
    setIsTimerActive(true);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    playAudioCue('click');
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctIndex;

    if (isCorrect) {
      playAudioCue('success');
      setScore(prev => prev + 1);
    } else {
      playAudioCue('click');
    }
  };

  const handleNextQuestion = () => {
    playAudioCue('select');
    if (currentQIndex + 1 < selectedQuiz.questions.length) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished Quiz!
      setQuizFinished(true);
      setIsTimerActive(false);
      const totalScorePercent = Math.round((score / selectedQuiz.questions.length) * 100);
      const xpEarned = Math.round((score / selectedQuiz.questions.length) * selectedQuiz.xpReward);
      addXP(xpEarned);

      if (totalScorePercent >= 60) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] px-8 py-6 text-white select-none pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ff9900] to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <BrainCircuit className="w-7 h-7 text-black" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-white">Interactive Quiz Center</h1>
              <span className="text-[10px] bg-amber-950 text-amber-400 border border-amber-500/50 px-2 py-0.5 rounded font-mono uppercase">
                SPEED & MASTERY
              </span>
            </div>
            <p className="text-xs text-gray-400">TV remote MCQ testing with instant explanations and XP awards</p>
          </div>
        </div>

        {/* Quiz Selectors */}
        <div className="flex items-center space-x-2">
          {quizzes.map(qz => (
            <button
              key={qz.id}
              onClick={() => handleStartQuiz(qz)}
              className={`tv-focusable px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedQuiz.id === qz.id
                  ? 'bg-[#00a8e1] text-white shadow-md'
                  : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {qz.subject}: {qz.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Quiz Runner (2 cols) + Leaderboard (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quiz Runner */}
        <div className="lg:col-span-2">
          {!quizFinished ? (
            <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-2xl relative flex flex-col justify-between min-h-[520px]">
              {/* Question Header & Timer Bar */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-[#ff9900] uppercase tracking-wider">
                      Question {currentQIndex + 1} of {selectedQuiz.questions.length}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className="text-xs text-cyan-400 font-mono capitalize">
                      {currentQ.difficulty} Difficulty
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 bg-black/40 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-mono text-cyan-300">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Question Statement */}
                <h2 className="text-xl md:text-2xl font-black text-white mb-6 leading-snug">
                  {currentQ.question}
                </h2>

                {/* Options List */}
                <div className="space-y-3 mb-6">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrectAnswer = isAnswerSubmitted && idx === currentQ.correctIndex;
                    const isWrongAnswer = isAnswerSubmitted && isSelected && idx !== currentQ.correctIndex;

                    const optionLetters = ['A', 'B', 'C', 'D'];

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                        className={`tv-focusable w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                          isCorrectAnswer
                            ? 'bg-emerald-950/80 border-emerald-400 text-white ring-2 ring-emerald-400'
                            : isWrongAnswer
                            ? 'bg-rose-950/80 border-rose-500 text-white ring-2 ring-rose-500'
                            : isSelected
                            ? 'bg-cyan-950/70 border-cyan-400 text-white ring-2 ring-cyan-400'
                            : 'bg-gray-900/80 border-gray-800 text-gray-300 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3.5">
                          <span
                            className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-xs shrink-0 ${
                              isSelected
                                ? 'bg-[#00a8e1] text-white'
                                : 'bg-black/50 text-gray-400 border border-gray-700'
                            }`}
                          >
                            {optionLetters[idx]}
                          </span>
                          <span className="text-sm font-medium">{opt}</span>
                        </div>

                        {isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                        {isWrongAnswer && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation & Action Footer */}
              <div>
                {isAnswerSubmitted && (
                  <div className="p-4 bg-gray-900/90 rounded-2xl border border-cyan-500/30 mb-4 animate-in fade-in duration-200">
                    <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>SmartLearn Explanation:</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{currentQ.explanation}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                  <span className="text-xs text-gray-400">
                    Use Remote Arrows to choose, OK to confirm
                  </span>

                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedOption === null}
                      className={`tv-focusable px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 cursor-pointer ${
                        selectedOption !== null
                          ? 'bg-[#ff9900] hover:bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                          : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <span>Submit Answer</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="tv-focusable bg-[#00a8e1] hover:bg-[#0092c7] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 cursor-pointer shadow-lg shadow-[#00a8e1]/30"
                    >
                      <span>
                        {currentQIndex + 1 < selectedQuiz.questions.length ? 'Next Question' : 'View Results'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-8 shadow-2xl text-center flex flex-col items-center justify-center min-h-[520px]">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center mb-4 shadow-xl shadow-amber-500/40 animate-bounce">
                <Trophy className="w-10 h-10 text-black" />
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Quiz Completed!</h2>
              <p className="text-xs text-gray-400 mb-6">
                You tested on <span className="text-cyan-400 font-bold">{selectedQuiz.title}</span>
              </p>

              <div className="grid grid-cols-3 gap-4 max-w-md w-full mb-8">
                <div className="bg-black/40 border border-gray-800 p-4 rounded-2xl">
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Accuracy</span>
                  <p className="text-xl font-black text-emerald-400">
                    {Math.round((score / selectedQuiz.questions.length) * 100)}%
                  </p>
                </div>
                <div className="bg-black/40 border border-gray-800 p-4 rounded-2xl">
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Score</span>
                  <p className="text-xl font-black text-cyan-300">
                    {score} / {selectedQuiz.questions.length}
                  </p>
                </div>
                <div className="bg-black/40 border border-gray-800 p-4 rounded-2xl">
                  <span className="text-[10px] text-gray-400 uppercase font-bold">XP Won</span>
                  <p className="text-xl font-black text-amber-400">
                    +{Math.round((score / selectedQuiz.questions.length) * selectedQuiz.xpReward)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleStartQuiz(selectedQuiz)}
                  className="tv-focusable bg-[#00a8e1] hover:bg-[#0092c7] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 cursor-pointer shadow-lg shadow-[#00a8e1]/30"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>

                <button
                  onClick={() => {
                    const nextQ = quizzes.find(q => q.id !== selectedQuiz.id) || quizzes[0];
                    handleStartQuiz(nextQ);
                  }}
                  className="tv-focusable bg-gray-800 hover:bg-gray-700 text-gray-200 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  <span>Next Subject Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Global & Regional Leaderboard */}
        <div className="space-y-4">
          <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
              <div className="flex items-center space-x-2 text-amber-400">
                <Trophy className="w-4 h-4" />
                <h3 className="font-bold text-xs uppercase tracking-wider">Fire TV Leaderboard</h3>
              </div>
              <span className="text-[10px] bg-black/50 text-cyan-400 px-2 py-0.5 rounded font-mono">
                All-India / Regional
              </span>
            </div>

            <div className="space-y-2.5">
              {leaderboard.map(entry => (
                <div
                  key={entry.rank}
                  className={`p-3 rounded-2xl border flex items-center justify-between ${
                    entry.isCurrentUser
                      ? 'bg-[#162030] border-[#00a8e1] shadow-md shadow-cyan-500/20'
                      : 'bg-gray-900/60 border-gray-800/80'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                        entry.rank === 1
                          ? 'bg-amber-400 text-black'
                          : entry.rank === 2
                          ? 'bg-gray-300 text-black'
                          : entry.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'text-gray-500 font-mono'
                      }`}
                    >
                      {entry.rank}
                    </span>

                    <img
                      src={entry.avatar}
                      alt={entry.userName}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-cyan-500/40"
                    />

                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
                        <span>{entry.userName}</span>
                        {entry.isCurrentUser && (
                          <span className="text-[9px] bg-[#00a8e1] text-white px-1.5 py-0.2 rounded font-mono">
                            YOU
                          </span>
                        )}
                      </h4>
                      <span className="text-[10px] text-gray-400">{entry.badge}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-amber-400 block">{entry.xp} XP</span>
                    <span className="text-[10px] text-gray-400">🔥 {entry.streak}d</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
