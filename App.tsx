
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

  const handleBack = () => {
    setScreen('LANGUAGE_GRID');
    setSelectedLanguage(null);
  };

  return (
    <div className="w-screen h-screen bg-black overflow-hidden font-sans select-none touch-none">
      {screen === 'LANGUAGE_GRID' ? (
        <LanguageGrid onSelect={handleLanguageSelect} />
      ) : (
        selectedLanguage && (
          <AudioScreen 
            language={selectedLanguage} 
            onBack={handleBack} 
          />
        )
      )}
    </div>
  );
};

export default App;
