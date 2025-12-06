// A self-contained procedural audio engine using Web Audio API
// No external assets required.

class SoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];

  constructor() {
    // Singleton instance
  }

  // Initialize the Audio Context (must be called after user interaction)
  init() {
    if (this.ctx) return;
    
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioContextClass();
    
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.25; // Moderate master volume
    this.masterGain.connect(this.ctx.destination);
    
    this.startAmbience();
  }

  private startAmbience() {
    if (!this.ctx || !this.masterGain) return;

    // Create a pleasant, warm "Lobby" atmosphere
    // Using a major 9th chord pad for a sophisticated, futuristic feel/hum
    // F3 (174.61), A3 (220), C4 (261.63), E4 (329.63) (F Major 7)
    const frequencies = [174.61, 220.00, 261.63, 329.63]; 

    const ambientGroupGain = this.ctx.createGain();
    ambientGroupGain.gain.value = 0.1; // Very soft base level
    ambientGroupGain.connect(this.masterGain);

    // Warm Lowpass Filter to remove any digital harshness
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800; // Softens the sound
    filter.connect(ambientGroupGain);

    frequencies.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = 'sine'; // Pure tone, no buzz/grit
        osc.frequency.value = freq;
        
        // Add slight drift to make it organic (not robotic)
        const drift = this.ctx!.createOscillator();
        drift.type = 'sine';
        drift.frequency.value = 0.05 + (Math.random() * 0.05); // Very slow drift
        const driftGain = this.ctx!.createGain();
        driftGain.gain.value = 1.5; // +/- 1.5Hz pitch drift
        drift.connect(driftGain);
        driftGain.connect(osc.frequency);
        drift.start();
        this.ambientOscillators.push(drift);

        // Individual volume per note (lower notes slightly louder for body)
        const noteGain = this.ctx!.createGain();
        noteGain.gain.value = 0.2 / (i + 1); 

        osc.connect(noteGain);
        noteGain.connect(filter);
        osc.start();
        this.ambientOscillators.push(osc);
    });

    // "Breathing" LFO for the whole texture
    // Makes the volume swell and fade gently like wind or breathing
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1; // 10 seconds per cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.03; // Modulate volume gently
    lfo.connect(lfoGain);
    lfoGain.connect(ambientGroupGain.gain);
    lfo.start();
    this.ambientOscillators.push(lfo);
  }

  // High-tech chirp for hover events (Softened)
  playHover() {
    if (!this.ctx || !this.masterGain) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    // Higher pitch but softer envelope
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1000, this.ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.02, this.ctx.currentTime); // Much quieter
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  // Satisfying "click" / "engage" sound
  playClick() {
    if (!this.ctx) this.init();
    
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // Softer click
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  // NEW: A majestic "Reverbed Ting" for special buttons
  playReverbTing() {
    if (!this.ctx) this.init();

    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    
    // 1. The Source (Crystal Bell)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // High C7 note, pure sine for that "ting"
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2093, t); 
    
    // Envelope: Instant attack, long exponential release
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 2.0);
    
    osc.connect(gain);

    // 2. The Reverb (Delay Network)
    const delay = this.ctx.createDelay();
    const feedback = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    delay.delayTime.value = 0.25; 
    feedback.gain.value = 0.4; 
    filter.type = 'lowpass';
    filter.frequency.value = 1200; 
    
    gain.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(filter);
    filter.connect(this.masterGain);

    gain.connect(this.masterGain);
    
    osc.start(t);
    osc.stop(t + 2.5);
  }

  // Cleanup method to prevent memory leaks when components unmount/remount
  stopAll() {
    this.ambientOscillators.forEach(osc => {
        try {
            osc.stop();
            osc.disconnect();
        } catch (e) {
            // Ignore errors if already stopped
        }
    });
    this.ambientOscillators = [];
  }
}

export const soundManager = new SoundManager();