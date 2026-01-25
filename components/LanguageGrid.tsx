
import React from 'react';
import { LANGUAGES } from '../constants';
import { Language } from '../types';

interface LanguageGridProps {
  onSelect: (lang: Language) => void;
}

const LanguageGrid: React.FC<LanguageGridProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 h-screen w-full bg-slate-950 p-0.5 gap-0.5 overflow-y-auto">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onSelect(lang)}
          className={`${lang.color} flex flex-col items-center justify-center active:brightness-90 transition-all duration-75 relative`}
        >
          <span className="text-xl font-black text-white tracking-tight">
            {lang.name}
          </span>
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mt-1">
            {lang.nativeName}
          </span>
        </button>
      ))}
    </div>
  );
};

export default LanguageGrid;
