// 👏 Clap Detection Module

let clapAudioContext;
let clapAnalyser;
let clapDataArray;
let clapStream;
let isClapDetecting = false;
const CLAP_THRESHOLD = 0.2;
const CLAP_FREQUENCY_MIN = 2000;
const CLAP_FREQUENCY_MAX = 8000;
let lastClapTime = 0;
const CLAP_DEBOUNCE = 500; // milliseconds

async function initClapDetector() {
  if (!clapAudioContext) {
    clapAudioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (isClapDetecting) {
    stopClapDetection();
    return;
  }

  try {
    clapStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = clapAudioContext.createMediaStreamSource(clapStream);
    clapAnalyser = clapAudioContext.createAnalyser();
    clapAnalyser.fftSize = 256;
    source.connect(clapAnalyser);

    clapDataArray = new Uint8Array(clapAnalyser.frequencyBinCount);
    isClapDetecting = true;

    clapStatus.textContent = '✓ Detectando palmas...';
    clapStatus.style.color = '#00ff00';

    detectClap();
  } catch (error) {
    clapStatus.textContent = '✗ Erro ao acessar microfone';
    clapStatus.style.color = '#ff0000';
  }
}

function detectClap() {
  if (!isClapDetecting) return;

  clapAnalyser.getByteFrequencyData(clapDataArray);

  // Analyze frequency data
  let sum = 0;
  let clapFreqEnergy = 0;

  for (let i = 0; i < clapDataArray.length; i++) {
    sum += clapDataArray[i];
    // Focus on clap frequencies (2kHz - 8kHz)
    if (i > 20 && i < 100) {
      clapFreqEnergy += clapDataArray[i];
    }
  }

  const average = sum / clapDataArray.length;
  const clapEnergy = clapFreqEnergy / 80;

  // Detect clap if energy spikes
  if (clapEnergy > CLAP_THRESHOLD * 255 && average > 30) {
    const now = Date.now();
    if (now - lastClapTime > CLAP_DEBOUNCE) {
      onClapDetected();
      lastClapTime = now;
    }
  }

  requestAnimationFrame(detectClap);
}

function onClapDetected() {
  clapStatus.textContent = '👏 Palma detectada! Tocando...';
  clapStatus.style.color = '#00ff00';

  // Flash effect
  document.body.style.backgroundColor = 'rgba(0, 212, 255, 0.3)';
  setTimeout(() => {
    document.body.style.backgroundColor = '';
  }, 200);

  // Play beep
  playBeep();

  // Play first song (Sweet Child o' Mine)
  currentTrackIndex = 0;
  updateSongInfo();
  play();

  setTimeout(() => {
    clapStatus.textContent = '✓ Detectando palmas...';
  }, 2000);
}

function stopClapDetection() {
  isClapDetecting = false;
  if (clapStream) {
    clapStream.getTracks().forEach(track => track.stop());
  }
  clapDetectorBtn.textContent = '👏 Ativar Detector';
  clapDetectorBtn.classList.remove('active');
  clapStatus.textContent = '';
}

function playBeep() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.value = 1000;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.1);
}