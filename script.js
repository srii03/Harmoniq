let audioContext;

// Function to play a tone with specified frequency and waveform
function playTone(frequency, type) {
  // Initialize audio context if not already created
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  // Create an oscillator node
  const oscillator = audioContext.createOscillator();
  oscillator.type = type; // 'sine', 'square', 'sawtooth', or 'triangle'
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

  // Create a gain node to control the volume and fade out
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);

  // Connect oscillator to gain node and gain node to audio context
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Start and stop the oscillator
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1); // Plays for 1 second
}
