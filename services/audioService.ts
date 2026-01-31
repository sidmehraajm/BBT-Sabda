
/**
 * LOCAL AUDIO PLAYER SERVICE
 * 
 * Plays audio from: ./audio/[langId]/[type]/audio.mp3
 */

let activeAudio: HTMLAudioElement | null = null;

export const stopAudio = () => {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
};

export const playSpeech = async (
  langId: string, 
  type: 'significance' | 'donation'
): Promise<void> => {
  stopAudio();

  const audioPath = `./audio/${langId}/${type}/audio.mp3`;
  
  return new Promise<void>((resolve, reject) => {
    const audio = new Audio(audioPath);
    activeAudio = audio;

    audio.oncanplaythrough = () => {
      audio.play().catch(reject);
    };

    audio.onended = () => {
      activeAudio = null;
      resolve();
    };

    audio.onerror = () => {
      activeAudio = null;
      reject(new Error(`File not found: ${audioPath}`));
    };
  });
};
