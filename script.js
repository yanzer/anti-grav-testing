// script.js for Pong game
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

const paddleWidth = 10, paddleHeight = 100;
const ballRadius = 8;
let playerY = (canvas.height - paddleHeight) / 2;
let aiY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 2;
// Audio setup for beep sounds
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playBeep(paddleY) {
    const freq = 200 + (paddleY / canvas.height) * 600; // Map Y to 200-800Hz
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}
// Resume AudioContext on first user interaction (required by some browsers)
canvas.addEventListener('click', () => {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}, { once: true });
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 2 * (Math.random() > 0.5 ? 1 : -1);
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (
        ballX - ballRadius < paddleWidth &&
        ballY > playerY &&
        ballY < playerY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
        ballX = paddleWidth + ballRadius;
        playBeep(playerY);
    }

    if (
        ballX + ballRadius > canvas.width - paddleWidth &&
        ballY > aiY &&
        ballY < aiY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
        ballX = canvas.width - paddleWidth - ballRadius;
        playBeep(aiY);
    }

    if (ballX < 0 || ballX > canvas.width) {
        resetBall();
    }

    if (aiY + paddleHeight / 2 < ballY - 10) {
        aiY += 4;
    } else if (aiY + paddleHeight / 2 > ballY + 10) {
        aiY -= 4;
    }
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, '#1e293b');
    drawRect(0, playerY, paddleWidth, paddleHeight, '#58a6ff');
    drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, '#58a6ff');
    drawCircle(ballX, ballY, ballRadius, '#f38ba8');
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;
    playerY = y - paddleHeight / 2;
    if (playerY < 0) playerY = 0;
    if (playerY + paddleHeight > canvas.height) playerY = canvas.height - paddleHeight;
});
