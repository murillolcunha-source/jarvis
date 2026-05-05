// 🎵 Audio Visualization

const canvas = document.getElementById('audioCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Draw visualizer
function drawVisualizer() {
  // Clear canvas
  ctx.fillStyle = 'rgba(5, 10, 18, 0.8)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw gradient background
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'rgba(0, 212, 255, 0.1)');
  gradient.addColorStop(1, 'rgba(0, 153, 204, 0.1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw animated bars
  const barWidth = (canvas.width / 30);
  let barHeight;
  let x = 0;

  for (let i = 0; i < 30; i++) {
    barHeight = (Math.random() * canvas.height) * 0.6;

    // Gradient for bars
    const barGradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
    barGradient.addColorStop(0, '#00d4ff');
    barGradient.addColorStop(1, '#0099cc');
    ctx.fillStyle = barGradient;

    ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);

    // Glow effect
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, canvas.height - barHeight, barWidth - 2, barHeight);

    x += barWidth;
  }

  requestAnimationFrame(drawVisualizer);
}

drawVisualizer();