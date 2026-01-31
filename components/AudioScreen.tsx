
import React, { useState } from 'react';
import { Language } from '../types';
import { playSpeech, stopAudio } from '../services/audioService';

interface AudioScreenProps {
  language: Language;
  onBack: () => void;
}

const AudioScreen: React.FC<AudioScreenProps> = ({ language, onBack }) => {
  const [playing, setPlaying] = useState<'significance' | 'donation' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePlay = async (type: 'significance' | 'donation') => {
    if (playing === type) {
      stopAudio();
      setPlaying(null);
      return;
    }

    setError(null);
    setPlaying(type);
    
    try {
      await playSpeech(language.id, type);
    } catch (e: any) {
      console.error("Audio error:", e);
      setError(e.message);
    } finally {
      setPlaying(null);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-black">
      {/* Header */}
      <div className="h-16 bg-zinc-900 flex items-center px-6 shrink-0 border-b border-zinc-800">
        <button 
          onClick={() => { stopAudio(); onBack(); }}
          className="text-white flex items-center gap-2 font-bold uppercase tracking-widest text-xs py-2 pr-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="ml-auto text-right">
          <div className="text-white font-black uppercase text-sm tracking-tighter">
            {language.name}
          </div>
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">
            {language.nativeName}
          </div>
        </div>
      </div>

      {/* Main Buttons */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <button
          onClick={() => handlePlay('significance')}
          className={`flex-1 flex flex-col items-center justify-center transition-all duration-300 ${playing === 'significance' ? 'bg-indigo-600' : 'bg-black active:bg-zinc-900'} border-b border-zinc-900`}
        >
          <span className={`text-4xl sm:text-6xl font-black uppercase tracking-tighter ${playing === 'significance' ? 'text-white' : 'text-zinc-700'}`}>
            Significance
          </span>
          {playing === 'significance' && (
             <div className="mt-4 flex gap-1">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-1.5 h-6 bg-white animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
               ))}
             </div>
          )}
        </button>

        <button
          onClick={() => handlePlay('donation')}
          className={`flex-1 flex flex-col items-center justify-center transition-all duration-300 ${playing === 'donation' ? 'bg-emerald-600' : 'bg-black active:bg-zinc-900'}`}
        >
          <span className={`text-4xl sm:text-6xl font-black uppercase tracking-tighter ${playing === 'donation' ? 'text-white' : 'text-zinc-700'}`}>
            Donation
          </span>
          {playing === 'donation' && (
             <div className="mt-4 flex gap-1">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-1.5 h-6 bg-white animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
               ))}
             </div>
          )}
        </button>

        {/* Error Overlay */}
        {error && (
          <div className="absolute bottom-10 left-6 right-6 bg-red-600 p-4 rounded-xl shadow-2xl animate-bounce">
            <p className="text-white text-xs font-black uppercase tracking-widest text-center">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioScreen;
