
import React from 'react';
import { LANGUAGES } from '../constants';
import { Language } from '../types';

interface LanguageGridProps {
  onSelect: (lang: Language) => void;
}

const LanguageGrid: React.FC<LanguageGridProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col h-screen w-full bg-black overflow-y-auto">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onSelect(lang)}
          className={`${lang.color} flex-1 min-h-[120px] flex flex-col items-center justify-center p-6 active:brightness-90 transition-all outline-none border-b border-black/10`}
        >
          <span className="text-4xl font-black text-white uppercase tracking-tighter">
            {lang.name}
          </span>
          <span className="text-lg font-bold text-white/60 uppercase tracking-widest mt-1">
            {lang.nativeName}
          </span>
        </button>
      ))}
    </div>
  );
};

export default LanguageGrid;
