
import React from 'react';
import { LANGUAGES } from '../constants';
import { Language } from '../types';

interface LanguageGridProps {
  onSelect: (lang: Language) => void;
}

const LanguageGrid: React.FC<LanguageGridProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full bg-black">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onSelect(lang)}
          className={`${lang.color} flex flex-col items-center justify-center p-4 active:brightness-90 transition-all outline-none`}
        >
          <span className="text-3xl font-black text-white uppercase tracking-tighter">
            {lang.name}
          </span>
          <span className="text-sm font-bold text-white/40 uppercase tracking-widest mt-2">
            {lang.nativeName}
          </span>
        </button>
      ))}
    </div>
  );
};

export default LanguageGrid;
