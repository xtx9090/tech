
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Advanced Neural Lattice Background Effect
const initNeuralLattice = () => {
  const canvas = document.getElementById("Snow") as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let particles: any[] = [];
  const particleCount = 120;
  let mouse = { x: -100, y: -100, radius: 150 };
  
  const init = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 2, // Layering
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        color: Math.random() > 0.9 ? '#bc00ff' : '#00f3ff',
      });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Deep Space Background
    ctx.fillStyle = "#050b15";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Grid Lines (Static Overlay)
    ctx.strokeStyle = "rgba(0, 243, 255, 0.02)";
    ctx.lineWidth = 1;
    for(let i=0; i<canvas.width; i+=100) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }

    particles.forEach((p, i) => {
      // Movement
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Mouse Interaction
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        p.x -= dx * force * 0.02;
        p.y -= dy * force * 0.02;
      }

      // Draw Connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx2 = p.x - p2.x;
        const dy2 = p.y - p2.y;
        const dist2 = Math.sqrt(dx2*dx2 + dy2*dy2);
        if (dist2 < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 243, 255, ${0.1 * (1 - dist2/120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Draw Particle
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.6;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", init);
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  init();
  draw();
};

initNeuralLattice();
