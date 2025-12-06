import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { soundManager } from '../utils/SoundManager';
import { ArrowRight } from 'lucide-react';

const WireframeSaturn = () => {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (planetRef.current) {
        planetRef.current.rotation.y = t * 0.5;
    }
    if (ringRef.current) {
        ringRef.current.rotation.z = t * 0.2;
        ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group scale={1.5}>
      {/* Planet Body */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="white" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Glowing Core */}
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>

      {/* Ring System */}
      <mesh ref={ringRef} rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.8, 0.2, 2, 32]} />
        <meshBasicMaterial color="white" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

interface LoaderProps {
    onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let mounted = true;
        let val = 0;

        const interval = setInterval(() => {
            if (!mounted) return;
            
            // Deterministic loading: Reaches 100% in approx 2 seconds
            val += 2; 
            
            if (val >= 100) {
                val = 100;
                setProgress(100);
                setReady(true);
                clearInterval(interval);
            } else {
                setProgress(val);
            }
        }, 30);

        return () => {
            mounted = false;
            clearInterval(interval);
        };
    }, []);

    const handleEnter = () => {
        soundManager.init();
        soundManager.playClick();
        onComplete();
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
            {/* 3D Visualizer */}
            <div className="w-full h-[50vh] relative">
                <Canvas camera={{ position: [0, 0, 6] }} dpr={[1, 1.5]}>
                    <Suspense fallback={null}>
                        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
                            <WireframeSaturn />
                        </Float>
                        <ambientLight intensity={0.5} />
                    </Suspense>
                </Canvas>
                
                {/* HTML Text Overlay (Instant Render) */}
                <div className="absolute inset-0 flex items-end justify-center pb-10 pointer-events-none">
                     <p className="text-white font-mono tracking-[0.3em] text-sm animate-pulse">
                        SYSTEM INITIALIZING...
                     </p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-6 mt-8">
                {!ready ? (
                    <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-blue-500 transition-all duration-75 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                ) : (
                    <button 
                        onClick={handleEnter}
                        onMouseEnter={() => soundManager.playHover()}
                        className="group relative px-8 py-3 bg-white text-black font-bold tracking-widest uppercase text-sm rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 animate-in fade-in zoom-in duration-300 cursor-pointer pointer-events-auto"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Enter Horizon <ArrowRight size={16} />
                        </span>
                        <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-0"></div>
                        <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             Enter Horizon <ArrowRight size={16} />
                        </span>
                    </button>
                )}
                
                <div className="text-gray-500 text-xs font-mono tracking-widest">
                    {ready ? 'SYSTEM READY' : `LOADING ASSETS ${progress}%`}
                </div>
            </div>
        </div>
    );
};