import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Trophy } from 'lucide-react';

export const SpaceshipGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Game configuration
  const shipSize = 30;
  const speed = 5;
  const spawnRate = 40; // Lower is faster spawning

  // Refs for game loop to avoid closure staleness
  const requestRef = useRef<number>(0);
  const scoreRef = useRef(0);
  const shipPosRef = useRef({ x: 0, y: 0 });
  const obstaclesRef = useRef<Array<{ x: number; y: number; type: 'manual' | 'auto'; speed: number; size: number }>>([]);
  const frameCountRef = useRef(0);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    scoreRef.current = 0;
    obstaclesRef.current = [];
    frameCountRef.current = 0;
    
    // Initial ship position
    if (canvasRef.current) {
        shipPosRef.current = { x: canvasRef.current.width / 2, y: canvasRef.current.height - 80 };
    }
  };

  const drawShip = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.save();
    ctx.translate(x, y);
    
    // Glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#3b82f6';
    
    // Body
    ctx.beginPath();
    ctx.moveTo(0, -shipSize);
    ctx.lineTo(shipSize / 1.5, shipSize);
    ctx.lineTo(0, shipSize / 1.5);
    ctx.lineTo(-shipSize / 1.5, shipSize);
    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.fill();
    
    // Engine Flame
    ctx.beginPath();
    ctx.moveTo(-shipSize/3, shipSize);
    ctx.lineTo(0, shipSize + (Math.random() * 20 + 10));
    ctx.lineTo(shipSize/3, shipSize);
    ctx.closePath();
    ctx.fillStyle = '#3b82f6';
    ctx.fill();

    ctx.restore();
  };

  const drawObstacle = (ctx: CanvasRenderingContext2D, obs: { x: number; y: number; type: string; size: number }) => {
    ctx.save();
    ctx.translate(obs.x, obs.y);
    
    if (obs.type === 'manual') {
      // Red "Manual Labor" Asteroid
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ef4444';
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      // Jagged shape
      const spikes = 8;
      const outerRadius = obs.size;
      const innerRadius = obs.size / 2;
      for (let i = 0; i < spikes; i++) {
        let x = Math.cos((Math.PI * 2 * i) / spikes) * outerRadius;
        let y = Math.sin((Math.PI * 2 * i) / spikes) * outerRadius;
        ctx.lineTo(x, y);
        x = Math.cos((Math.PI * 2 * i) / spikes + Math.PI / spikes) * innerRadius;
        y = Math.sin((Math.PI * 2 * i) / spikes + Math.PI / spikes) * innerRadius;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    } else {
      // Blue "Automation" Core
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#3b82f6';
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(0, 0, obs.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner white core
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(0, 0, obs.size / 3, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive Canvas
    const resizeCanvas = () => {
        const parent = canvas.parentElement;
        if(parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            // Reset ship pos on resize
            shipPosRef.current = { x: canvas.width / 2, y: canvas.height - 80 };
        }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
        if(gameState !== 'playing') return;
        const rect = canvas.getBoundingClientRect();
        shipPosRef.current.x = e.clientX - rect.left;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Touch handler
    const handleTouchMove = (e: TouchEvent) => {
        if(gameState !== 'playing') return;
        const rect = canvas.getBoundingClientRect();
        shipPosRef.current.x = e.touches[0].clientX - rect.left;
    };
    window.addEventListener('touchmove', handleTouchMove);

    const update = () => {
      if (gameState === 'playing') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Spawn Obstacles
        frameCountRef.current++;
        if (frameCountRef.current % spawnRate === 0) {
            const isGood = Math.random() > 0.7; // 30% chance of powerup
            obstaclesRef.current.push({
                x: Math.random() * canvas.width,
                y: -50,
                type: isGood ? 'auto' : 'manual',
                speed: speed + (scoreRef.current * 0.05), // Get faster over time
                size: isGood ? 15 : 20 + Math.random() * 10
            });
        }

        // Draw Ship
        drawShip(ctx, shipPosRef.current.x, shipPosRef.current.y);

        // Update & Draw Obstacles
        for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
            const obs = obstaclesRef.current[i];
            obs.y += obs.speed;
            
            drawObstacle(ctx, obs);

            // Collision Detection
            const dx = shipPosRef.current.x - obs.x;
            const dy = shipPosRef.current.y - obs.y; // approximate center of ship is slightly higher
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < shipSize + obs.size) {
                if (obs.type === 'manual') {
                    // Hit Bad Obstacle
                    setGameState('gameover');
                    if (scoreRef.current > highScore) setHighScore(scoreRef.current);
                } else {
                    // Collected Good Item
                    scoreRef.current += 10;
                    setScore(scoreRef.current);
                    obstaclesRef.current.splice(i, 1);
                }
            }

            // Remove if off screen
            if (obs.y > canvas.height + 50) {
                obstaclesRef.current.splice(i, 1);
                if (obs.type === 'manual') {
                    // Survived an obstacle
                    scoreRef.current += 1;
                    setScore(scoreRef.current);
                }
            }
        }
      }
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
        cancelAnimationFrame(requestRef.current);
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gameState, highScore]);

  return (
    <section className="py-20 bg-black/80 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <div className="mb-8">
                <span className="text-blue-500 font-bold uppercase tracking-widest text-xs">Mini-Game</span>
                <h2 className="text-4xl font-black text-white mb-2">HORIZON VELOCITY</h2>
                <p className="text-gray-400 text-sm max-w-lg mx-auto">
                    Pilot the Horizon Ship. Dodge "Manual Tasks" (Red). Collect "Automation Cores" (Blue).
                </p>
            </div>

            <div className="relative w-full aspect-video bg-gray-900/50 rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-blue-900/20">
                <canvas 
                    ref={canvasRef} 
                    className="w-full h-full cursor-none touch-none block"
                />

                {/* UI Overlay */}
                <div className="absolute top-6 left-6 flex gap-6">
                    <div className="text-left">
                        <div className="text-xs text-gray-500 uppercase font-bold">Score</div>
                        <div className="text-2xl font-mono font-bold text-white">{score}</div>
                    </div>
                    <div className="text-left">
                        <div className="text-xs text-gray-500 uppercase font-bold">Best</div>
                        <div className="text-2xl font-mono font-bold text-blue-500">{highScore}</div>
                    </div>
                </div>

                {/* Start Screen */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                        <button 
                            onClick={startGame}
                            className="group relative px-8 py-4 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform flex items-center gap-3"
                        >
                            <Play className="w-6 h-6 fill-black" />
                            LAUNCH SHIP
                        </button>
                    </div>
                )}

                {/* Game Over Screen */}
                {gameState === 'gameover' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-6">
                        <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
                        <h3 className="text-3xl font-bold text-white mb-2">SYSTEM OVERLOAD</h3>
                        <p className="text-gray-300 mb-6 max-w-xs leading-relaxed">
                            You processed <span className="text-white font-bold">{score}</span> tasks before manual labor overwhelmed you. 
                            <br/><span className="text-blue-400 font-bold block mt-2">Horizon AI does this in 0.04 seconds.</span>
                        </p>
                        <button 
                            onClick={startGame}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-colors flex items-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            TRY AGAIN
                        </button>
                    </div>
                )}
            </div>
        </div>
    </section>
  );
};
