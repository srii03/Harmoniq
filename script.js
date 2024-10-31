let audioContext;
let oscillator;

// Function to play a tone at a specific frequency
function playTone(frequency) {
  // Initialize audio context if it's not already created
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  // Stop any currently playing tone
  if (oscillator) {
    oscillator.stop();
  }

  // Create an oscillator node (for generating tones)
  oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // You can change this to 'square', 'sawtooth', or 'triangle'
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Set frequency in Hz
  oscillator.connect(audioContext.destination);

  // Start the oscillator
  oscillator.start();

  // Stop the tone after 1 minute (60000 milliseconds)
  setTimeout(() => {
    oscillator.stop();
  }, 60000);
}
