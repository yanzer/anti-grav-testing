# Tidal Andromeda Pong 🎮

A simple **Pong** game built with vanilla HTML, CSS, and JavaScript.  
It now features a **dynamic beep sound** whose pitch varies based on the vertical position of the paddle that the ball collides with.

## Features
- Classic Pong gameplay with player‑controlled left paddle (mouse) and AI right paddle.
- Responsive canvas that fills the browser window.
- **Audio feedback** on paddle collisions using the Web Audio API.
- Pitch mapping: higher paddle positions produce higher‑frequency beeps (200 Hz → 800 Hz).
- Automatic resume of the `AudioContext` on the first user click (required by modern browsers).

## How to Run
1. Make sure you have **Python** (or any static‑file server) installed.
2. From the project root, start a local server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open your browser and navigate to `http://localhost:8000`.
4. Click anywhere on the canvas to enable audio, then enjoy the game!

## Project Structure
```
├── index.html      # HTML skeleton with the canvas element
├── style.css       # Basic styling for the page
├── script.js       # Game logic + audio implementation
└── README.md       # You are reading it now!
```

## Development
- Open `script.js` to tweak physics, AI speed, or audio parameters.
- The beep frequency is calculated as:
  ```js
  const freq = 200 + (paddleY / canvas.height) * 600;
  ```
  Adjust the `200` and `600` values to change the frequency range.

## License
This is a personal learning project. Feel free to fork, modify, and share!
