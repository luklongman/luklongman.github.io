const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

document.getElementById('playBtn').addEventListener('click', () => {
    const waveform = document.getElementById('waveform').value;
    const pitch = document.getElementById('pitch').value;
    const attack = parseFloat(document.getElementById('attack').value);
    const decay = parseFloat(document.getElementById('decay').value);
    const sustain = parseFloat(document.getElementById('sustain').value);
    const release = parseFloat(document.getElementById('release').value);

    playSynth(waveform, pitch, attack, decay, sustain, release);
});

function playSynth(waveform, pitch, attack, decay, sustain, release) {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = waveform;
    oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + attack);
    gainNode.gain.linearRampToValueAtTime(sustain, audioCtx.currentTime + attack + decay);
    gainNode.gain.setValueAtTime(sustain, audioCtx.currentTime + attack + decay);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + attack + decay + sustain + release);

    oscillator.connect(gainNode).connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + attack + decay + sustain + release);
}