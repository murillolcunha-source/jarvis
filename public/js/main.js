// 🎩 JARVIS - Main JavaScript

const playlist = [
  { title: 'Sweet Child o\'Mine', artist: 'Guns N\'Roses', duration: '5:56', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { title: 'Welcome to the Jungle', artist: 'Guns N\'Roses', duration: '4:34', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { title: 'November Rain', artist: 'Guns N\'Roses', duration: '5:28', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { title: 'Paradise City', artist: 'Guns N\'Roses', duration: '6:46', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
];

let currentTrackIndex = 0;
let isPlaying = false;
let audioContext;
let analyser;
let dataArray;

// DOM Elements
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const stopBtn = document.getElementById('stopBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const playlistContainer = document.getElementById('playlistContainer');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const clapDetectorBtn = document.getElementById('clapDetectorBtn');
const voiceBtn = document.getElementById('voiceBtn');
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatSection = document.getElementById('chatSection');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const clapStatus = document.getElementById('clapStatus');
const transcript = document.getElementById('transcript');

// Initialize
function init() {
  renderPlaylist();
  setupEventListeners();
  updateSongInfo();
  initAudioContext();
}

function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
  }
}

// Render Playlist
function renderPlaylist() {
  playlistContainer.innerHTML = '';
  playlist.forEach((song, index) => {
    const item = document.createElement('div');
    item.className = `playlist-item ${index === currentTrackIndex ? 'active' : ''}`;
    item.innerHTML = `
      <div class="playlist-item-info">
        <div class="playlist-item-title">${song.title}</div>
        <div class="playlist-item-artist">${song.artist}</div>
      </div>
      <div class="playlist-item-duration">${song.duration}</div>
    `;
    item.addEventListener('click', () => {
      currentTrackIndex = index;
      updateSongInfo();
      play();
    });
    playlistContainer.appendChild(item);
  });
}

// Update Song Info
function updateSongInfo() {
  const song = playlist[currentTrackIndex];
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  renderPlaylist();
}

// Play
function play() {
  isPlaying = true;
  playBtn.classList.add('playing');
  playBtn.textContent = '⏸';
  // Simular reprodução
  console.log('Tocando:', playlist[currentTrackIndex].title);
}

// Pause
function pause() {
  isPlaying = false;
  playBtn.classList.remove('playing');
  playBtn.textContent = '▶';
}

// Stop
function stop() {
  pause();
  progressBar.style.width = '0%';
  currentTimeEl.textContent = '0:00';
}

// Next
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  updateSongInfo();
  play();
}

// Previous
function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  updateSongInfo();
  play();
}

// Setup Event Listeners
function setupEventListeners() {
  // Player Controls
  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  });

  nextBtn.addEventListener('click', nextTrack);
  prevBtn.addEventListener('click', prevTrack);
  stopBtn.addEventListener('click', stop);

  // Volume
  volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value;
    volumeValue.textContent = volume + '%';
  });

  // Clap Detector
  clapDetectorBtn.addEventListener('click', () => {
    initClapDetector();
    clapDetectorBtn.textContent = '⏹ Parar Detector';
    clapDetectorBtn.classList.add('active');
  });

  // Voice Recognition
  voiceBtn.addEventListener('click', () => {
    if (voiceBtn.classList.contains('active')) {
      stopVoiceRecognition();
    } else {
      startVoiceRecognition();
    }
  });

  // Chat
  chatToggleBtn.addEventListener('click', () => {
    chatSection.style.display = chatSection.style.display === 'none' ? 'block' : 'none';
  });

  sendBtn.addEventListener('click', sendChatMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });
}

// Chat Functions
function sendChatMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  // Add user message
  addChatMessage(message, 'user');
  chatInput.value = '';

  // Simulate Jarvis response
  setTimeout(() => {
    const response = getJarvisResponse(message);
    addChatMessage(response, 'jarvis');
  }, 500);
}

function addChatMessage(text, sender) {
  const msgEl = document.createElement('div');
  msgEl.className = `message ${sender}-msg`;
  msgEl.textContent = text;
  chatMessages.appendChild(msgEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getJarvisResponse(message) {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('olá') || lowerMsg.includes('oi')) {
    return 'Bom dia! Como posso ajudá-lo?';
  }
  if (lowerMsg.includes('como você está')) {
    return 'Estou funcionando perfeitamente, obrigado por perguntar.';
  }
  if (lowerMsg.includes('toque') || lowerMsg.includes('play')) {
    play();
    return 'Tocando a música agora.';
  }
  if (lowerMsg.includes('pause')) {
    pause();
    return 'Música pausada.';
  }
  return 'Entendi sua mensagem. Como posso auxiliá-lo?';
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}