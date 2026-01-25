
import React, { useState } from 'react';
import { Language, AppScreen } from './types';
import LanguageGrid from './components/LanguageGrid';
import AudioScreen from './components/AudioScreen';

const App: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [screen, setScreen] = useState<AppScreen>('LANGUAGE_GRID');

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    setScreen('AUDIO_SELECTION');
  };

  const handleBackToGrid = () => {
    setScreen('LANGUAGE_GRID');
    setSelectedLanguage(null);
  };

  return (
    <main className="w-screen h-screen overflow-hidden bg-slate-950 text-slate-50 relative selection:bg-indigo-500">
      <div className={`absolute inset-0 transition-transform duration-300 ease-out ${screen === 'LANGUAGE_GRID' ? 'translate-x-0' : '-translate-x-full'}`}>
        <LanguageGrid onSelect={handleLanguageSelect} />
      </div>

      <div className={`absolute inset-0 transition-transform duration-300 ease-out ${screen === 'AUDIO_SELECTION' ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedLanguage && (
          <AudioScreen 
            language={selectedLanguage} 
            onBack={handleBackToGrid} 
          />
        )}
      </div>
    </main>
  );
};

export default App;
