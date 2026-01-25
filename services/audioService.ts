
/**
 * Static Audio Service
 * Handles playback of local MP3/Opus files from the project directory.
 * Optimized for low latency and native browser caching.
 */

let activeAudio: HTMLAudioElement | null = null;

export const playSpeech = async (langId: string, type: 'significance' | 'donation') => {
  return new Promise((resolve, reject) => {
    try {
      // Stop any currently playing audio
      if (activeAudio) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
      }

      // Construct path based on your folder structure
      // Format: audio/[lang]/[type]/audio.mp3
      // You can change the extension to .opus if needed
      const audioPath = `./audio/${langId}/${type}/audio.mp3`;

      const audio = new Audio(audioPath);
      activeAudio = audio;

      audio.onended = () => {
        activeAudio = null;
        resolve(true);
      };

      audio.onerror = (e) => {
        console.error(`Failed to load audio at: ${audioPath}`, e);
        activeAudio = null;
        reject(new Error("Audio file not found or format unsupported"));
      };

      // Play the audio
      audio.play().catch(err => {
        console.warn("Autoplay blocked or playback failed:", err);
        reject(err);
      });
    } catch (error) {
      console.error("Playback error:", error);
      reject(error);
    }
  });
};

export const stopAudio = () => {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
};
