// Text-to-Speech utility for Vietnamese 4th Grade students

class SpeechService {
  private isSupported: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public speak(text: string, onEnd?: () => void) {
    if (!this.isSupported) {
      if (onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any ongoing speech

      const cleanText = text.replace(/[🤖✨🏆🌟💡🏷️•✓✗★]/g, '').trim();
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.95; // Slightly slower, clear cadence for grade 4
      utterance.pitch = 1.1; // Friendly and cheerful

      // Try finding a Vietnamese voice
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find((v) => v.lang.startsWith('vi') || v.lang.includes('VIE'));
      if (viVoice) {
        utterance.voice = viVoice;
      }

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }

  public stop() {
    if (this.isSupported) {
      try {
        window.speechSynthesis.cancel();
        this.currentUtterance = null;
      } catch {
        // Safe fallback
      }
    }
  }

  public isSpeaking(): boolean {
    if (!this.isSupported) return false;
    return window.speechSynthesis.speaking;
  }
}

export const speechService = new SpeechService();
