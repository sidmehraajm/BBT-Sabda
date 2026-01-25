
let activeAudio: HTMLAudioElement | null = null;

export const playSpeech = (langId: string, type: 'significance' | 'donation'): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    }

    // Following structure: audio/[lang]/[type]/audio.mp3
    const audioPath = `audio/${langId}/${type}/audio.mp3`;
    const audio = new Audio(audioPath);
    activeAudio = audio;

    audio.onended = () => {
      activeAudio = null;
      resolve();
    };

    audio.onerror = () => {
      activeAudio = null;
      reject(new Error(`Missing file: ${audioPath}`));
    };

    audio.play().catch(reject);
  });
};

export const stopAudio = () => {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
};
