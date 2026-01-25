
import React, { useState } from 'react';
import { Language } from '../types';
import { playSpeech, stopAudio } from '../services/audioService';

interface AudioScreenProps {
  language: Language;
  onBack: () => void;
}

const AudioScreen: React.FC<AudioScreenProps> = ({ language, onBack }) => {
  const [playing, setPlaying] = useState<'significance' | 'donation' | null>(null);

  const handlePlay = async (type: 'significance' | 'donation') => {
    if (playing === type) {
      stopAudio();
      setPlaying(null);
      return;
    }

    stopAudio();
    setPlaying(type);
    try {
      await playSpeech(language.id, type);
    } catch (e) {
      console.error(e);
    } finally {
      setPlaying(null);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-black">
      {/* Small header for back button */}
      <div className="h-16 bg-zinc-900 flex items-center px-4 shrink-0">
        <button 
          onClick={() => { stopAudio(); onBack(); }}
          className="text-white flex items-center gap-2 font-bold uppercase tracking-widest text-xs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="ml-auto text-white/50 font-black uppercase text-sm tracking-tighter">
          {language.name}
        </div>
      </div>

      {/* Two huge buttons */}
      <div className="flex-1 flex flex-col">
        <button
          onClick={() => handlePlay('significance')}
          className={`flex-1 flex flex-col items-center justify-center transition-colors ${playing === 'significance' ? 'bg-zinc-800' : 'bg-zinc-950 active:bg-zinc-900'} border-b border-zinc-900`}
        >
          <div className={`mb-4 w-16 h-16 rounded-full flex items-center justify-center ${playing === 'significance' ? 'bg-blue-500 animate-pulse' : 'bg-zinc-800'}`}>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
             </svg>
          </div>
          <span className="text-3xl font-black text-white uppercase italic tracking-tighter">Significance</span>
        </button>

        <button
          onClick={() => handlePlay('donation')}
          className={`flex-1 flex flex-col items-center justify-center transition-colors ${playing === 'donation' ? 'bg-zinc-800' : 'bg-zinc-950 active:bg-zinc-900'}`}
        >
          <div className={`mb-4 w-16 h-16 rounded-full flex items-center justify-center ${playing === 'donation' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-800'}`}>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          <span className="text-3xl font-black text-white uppercase italic tracking-tighter">Donation</span>
        </button>
      </div>
    </div>
  );
};

export default AudioScreen;
