
/**
 * LOCAL STATIC AUDIO PLAYER
 * 
 * EXPECTED FOLDER STRUCTURE:
 * /index.html
 * /audio/
 *    /[language-id]/
 *       /significance/
 *          audio.mp3
 *       /donation/
 *          audio.mp3
 */

let activeAudio: HTMLAudioElement | null = null;

export const playSpeech = (langId: string, type: 'significance' | 'donation'): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 1. Stop any current playback
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    }

    // 2. Construct path (using ./ for GitHub Pages compatibility)
    const audioPath = `./audio/${langId}/${type}/audio.mp3`;
    
    // 3. Initialize native browser audio
    const audio = new Audio(audioPath);
    activeAudio = audio;

    audio.onended = () => {
      activeAudio = null;
      resolve();
    };

    audio.onerror = () => {
      activeAudio = null;
      reject(new Error(audioPath)); // Pass path to error for UI debugging
    };

    audio.play().catch((err) => {
      activeAudio = null;
      reject(new Error(audioPath));
    });
  });
};

export const stopAudio = () => {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
};
