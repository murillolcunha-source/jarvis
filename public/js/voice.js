// 🎤 Voice Recognition Module

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
let isListening = false;

function startVoiceRecognition() {
  if (!SpeechRecognition) {
    alert('Seu navegador não suporta reconhecimento de voz');
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.interimResults = true;
  recognition.continuous = true;

  recognition.onstart = () => {
    isListening = true;
    voiceBtn.classList.add('active');
    voiceBtn.textContent = '🎤 Ouvindo...';
    transcript.textContent = 'Escutando...';
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript_text = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        processVoiceCommand(transcript_text.toLowerCase());
      } else {
        interimTranscript += transcript_text;
      }
    }

    transcript.textContent = interimTranscript;
  };

  recognition.onerror = (event) => {
    transcript.textContent = 'Erro: ' + event.error;
  };

  recognition.onend = () => {
    isListening = false;
    voiceBtn.classList.remove('active');
    voiceBtn.textContent = '🎤 Ativar Voz';
  };

  recognition.start();
}

function stopVoiceRecognition() {
  if (recognition) {
    recognition.stop();
  }
}

function processVoiceCommand(command) {
  transcript.textContent = 'Comando: ' + command;

  if (command.includes('play') || command.includes('toca')) {
    play();
    transcript.textContent = '✓ Tocando música';
  } else if (command.includes('pause') || command.includes('pausa')) {
    pause();
    transcript.textContent = '✓ Música pausada';
  } else if (command.includes('stop') || command.includes('para')) {
    stop();
    transcript.textContent = '✓ Música parada';
  } else if (command.includes('next') || command.includes('próxima')) {
    nextTrack();
    transcript.textContent = '✓ Próxima faixa';
  } else if (command.includes('previous') || command.includes('anterior')) {
    prevTrack();
    transcript.textContent = '✓ Faixa anterior';
  } else if (command.includes('volume')) {
    const match = command.match(/\d+/);
    if (match) {
      const volume = Math.min(100, Math.max(0, parseInt(match[0])));
      volumeSlider.value = volume;
      volumeValue.textContent = volume + '%';
      transcript.textContent = `✓ Volume: ${volume}%`;
    }
  } else {
    transcript.textContent = 'Comando não reconhecido';
  }
}