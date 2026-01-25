
import React, { useState } from 'react';
import { Language } from '../types';
import { playSpeech, stopAudio } from '../services/audioService';

interface AudioScreenProps {
  language: Language;
  onBack: () => void;
}

const AudioScreen: React.FC<AudioScreenProps> = ({ language, onBack }) => {
  const [isPlaying, setIsPlaying] = useState<'significance' | 'donation' | null>(null);

  const handleAction = async (type: 'significance' | 'donation') => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(null);
      if (isPlaying === type) return; // Toggle off if clicking the same button
    }

    setIsPlaying(type);
    try {
      await playSpeech(language.id, type);
    } catch (err) {
      alert(`Audio file missing: audio/${language.id}/${type}/audio.mp3`);
    } finally {
      setIsPlaying(null);
    }
  };

  const goBack = () => {
    stopAudio();
    onBack();
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950">
      {/* Header Area */}
      <div className={`${language.color} p-6 pt-10 pb-12 flex flex-col items-center relative shadow-xl`}>
        <button 
          onClick={goBack}
          className="absolute top-4 left-4 bg-black/20 p-4 rounded-full text-white active:scale-90 transition-transform"
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        
        <h1 className="text-4xl font-black text-white tracking-tight">{language.name}</h1>
        <p className="text-white/70 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">{language.nativeName}</p>
      </div>

      {/* Static Audio Blocks */}
      <div className="flex-1 flex flex-col w-full bg-slate-950">
        <button
          onClick={() => handleAction('significance')}
          className={`flex-1 flex flex-col items-center justify-center transition-colors border-b border-slate-900/50 ${isPlaying === 'significance' ? 'bg-indigo-900/20' : 'active:bg-slate-900'}`}
        >
          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-4 transition-all ${isPlaying === 'significance' ? 'bg-indigo-500 text-white scale-110' : 'bg-indigo-500/10 text-indigo-400'}`}>
            {isPlaying === 'significance' ? (
              <div className="flex gap-1 items-end h-6">
                <div className="w-1.5 bg-white animate-[bounce_1s_infinite_0ms]"></div>
                <div className="w-1.5 bg-white animate-[bounce_1s_infinite_200ms]"></div>
                <div className="w-1.5 bg-white animate-[bounce_1s_infinite_400ms]"></div>
              </div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            )}
          </div>
          <span className="text-2xl font-black tracking-tight">Significance</span>
          <span className="text-slate-500 text-xs font-bold uppercase mt-1 tracking-widest">Historical Audio</span>
        </button>

        <button
          onClick={() => handleAction('donation')}
          className={`flex-1 flex flex-col items-center justify-center transition-colors ${isPlaying === 'donation' ? 'bg-emerald-900/20' : 'active:bg-slate-900'}`}
        >
          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-4 transition-all ${isPlaying === 'donation' ? 'bg-emerald-500 text-white scale-110' : 'bg-emerald-500/10 text-emerald-400'}`}>
            {isPlaying === 'donation' ? (
              <div className="flex gap-1 items-end h-6">
                <div className="w-1.5 bg-white animate-[bounce_1s_infinite_0ms]"></div>
                <div className="w-1.5 bg-white animate-[bounce_1s_infinite_200ms]"></div>
                <div className="w-1.5 bg-white animate-[bounce_1s_infinite_400ms]"></div>
              </div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <span className="text-2xl font-black tracking-tight">Donation</span>
          <span className="text-slate-500 text-xs font-bold uppercase mt-1 tracking-widest">Support Us</span>
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { height: 10px; }
          50% { height: 24px; }
        }
      `}</style>
    </div>
  );
};

export default AudioScreen;
