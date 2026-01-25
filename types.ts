
export interface Language {
  id: string;
  name: string;
  nativeName: string;
  color: string;
  voiceName: 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr';
}

export type AppScreen = 'LANGUAGE_GRID' | 'AUDIO_SELECTION';

export interface LanguageState {
  currentLanguage: Language | null;
  currentScreen: AppScreen;
}
