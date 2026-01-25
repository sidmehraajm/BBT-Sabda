
import React, { useState } from 'react';
import { Language } from '../types';
import { playSpeech, stopAudio } from '../services/audioService';

interface AudioScreenProps {
  language: Language;
  onBack: () => void;
}

const AudioScreen: React.FC<AudioScreenProps> = ({ language, onBack }) => {
  const [playing, setPlaying] = useState<'significance' | 'donation' | null>(null);
  const [errorPath, setErrorPath] = useState<string | null>(null);

  const handlePlay = async (type: 'significance' | 'donation') => {
    setErrorPath(null);
    if (playing === type) {
      stopAudio();
      setPlaying(null);
      return;
    }

    stopAudio();
    setPlaying(type);
    try {
      await playSpeech(language.id, type);
    } catch (e: any) {
      setErrorPath(e.message);
    } finally {
      setPlaying(null);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-black">
      {/* Header */}
      <div className="h-14 bg-zinc-900 flex items-center px-4 shrink-0 border-b border-zinc-800">
        <button 
          onClick={() => { stopAudio(); onBack(); }}
          className="text-white flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="ml-auto text-white font-black uppercase text-xs tracking-widest opacity-50">
          {language.name}
        </div>
      </div>

      {/* Error Message if file is missing */}
      {errorPath && (
        <div className="bg-red-600 text-white p-3 text-[10px] font-mono leading-tight">
          FILE NOT FOUND: <br/> {errorPath} <br/>
          Ensure you uploaded the mp3 to this exact folder structure.
        </div>
      )}

      {/* Main Buttons */}
      <div className="flex-1 flex flex-col">
        <button
          onClick={() => handlePlay('significance')}
          className={`flex-1 flex flex-col items-center justify-center transition-colors ${playing === 'significance' ? 'bg-blue-600' : 'bg-black active:bg-zinc-900'} border-b border-zinc-900`}
        >
          <span className={`text-4xl font-black uppercase tracking-tighter ${playing === 'significance' ? 'text-white' : 'text-zinc-400'}`}>
            Significance
          </span>
          {playing === 'significance' && <span className="text-[10px] text-white/50 animate-pulse mt-2">PLAYING...</span>}
        </button>

        <button
          onClick={() => handlePlay('donation')}
          className={`flex-1 flex flex-col items-center justify-center transition-colors ${playing === 'donation' ? 'bg-emerald-600' : 'bg-black active:bg-zinc-900'}`}
        >
          <span className={`text-4xl font-black uppercase tracking-tighter ${playing === 'donation' ? 'text-white' : 'text-zinc-400'}`}>
            Donation
          </span>
          {playing === 'donation' && <span className="text-[10px] text-white/50 animate-pulse mt-2">PLAYING...</span>}
        </button>
      </div>
    </div>
  );
};

export default AudioScreen;
