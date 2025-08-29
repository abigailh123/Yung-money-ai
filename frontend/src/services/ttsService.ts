const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5020';

export interface TTSRequest {
  text: string;
  voice_id?: string;
}

export class TTSService {
  private static instance: TTSService;
  private audioCache = new Map<string, string>();

  public static getInstance(): TTSService {
    if (!TTSService.instance) {
      TTSService.instance = new TTSService();
    }
    return TTSService.instance;
  }

  async generateSpeech(text: string, voiceId: string = "pNInz6obpgDQGcFmaJgB"): Promise<string> {
    // Create cache key
    const cacheKey = `${text}_${voiceId}`;
    
    // Check cache first
    if (this.audioCache.has(cacheKey)) {
      return this.audioCache.get(cacheKey)!;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice_id: voiceId,
        }),
      });

      if (!response.ok) {
        throw new Error(`TTS API error: ${response.status} ${response.statusText}`);
      }

      // Get the audio blob
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Cache the URL
      this.audioCache.set(cacheKey, audioUrl);

      return audioUrl;
    } catch (error) {
      console.error('Error generating speech:', error);
      throw new Error('Failed to generate speech. Please try again.');
    }
  }

  async playAudio(text: string, voiceId?: string): Promise<void> {
    try {
      const audioUrl = await this.generateSpeech(text, voiceId);
      
      return new Promise((resolve, reject) => {
        const audio = new Audio(audioUrl);
        
        audio.onended = () => resolve();
        audio.onerror = () => reject(new Error('Audio playback failed'));
        
        audio.play().catch(reject);
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      throw error;
    }
  }

  // Clean up cached URLs to prevent memory leaks
  clearCache(): void {
    this.audioCache.forEach((url) => {
      URL.revokeObjectURL(url);
    });
    this.audioCache.clear();
  }
}

export const ttsService = TTSService.getInstance();

