import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial, PerspectiveCamera, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Rig that moves camera based on mouse parallax
const CameraRig = () => {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();
  
  useFrame(() => {
    // Smooth camera movement for parallax depth
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, 14), 0.05);
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

// The Fluid Saturn Component
const FluidSaturn = () => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Animate the group based on mouse interaction (Tilting effect)
    if (groupRef.current) {
        // Base rotation
        const targetRotationX = (mouse.y * viewport.height) / 100;
        const targetRotationY = (mouse.x * viewport.width) / 100;
        
        // Smoothly interpolate current rotation to target rotation based on mouse
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX + 0.2, 0.1);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY + (t * 0.1), 0.1);
    }

    // Spin the ring independently for dynamic effect
    if (ringRef.current) {
       ringRef.current.rotation.z = t * -0.2;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0.2]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        
        {/* The Planet - Fluid Sphere (Optimized Geometry) */}
        <mesh ref={planetRef} scale={1.8}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color="#2563eb" // Horizon Blue
            emissive="#1d4ed8"
            emissiveIntensity={0.2}
            roughness={0.2}
            metalness={0.9}
            distort={0.4} // The "Fluid" effect strength
            speed={2} // Speed of the fluid ripple
          />
        </mesh>

        {/* The Ring - Fluid Torus (Optimized Geometry) */}
        <mesh ref={ringRef} rotation-x={Math.PI / 1.8}>
          <torusGeometry args={[3, 0.4, 32, 64]} />
          <MeshDistortMaterial
            color="#a855f7" // Purple/Pink Hue for contrast
            emissive="#000000"
            roughness={0.1}
            metalness={1}
            distort={0.3} // Slightly less distortion for the ring to keep shape
            speed={3}
          />
        </mesh>

        {/* Outer Orbit Particle Ring (Subtle) */}
        <mesh rotation-x={Math.PI / 1.8}>
           <torusGeometry args={[4.5, 0.02, 16, 100]} />
           <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>

      </Float>
    </group>
  );
};

export const BackgroundScene: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
      {/* Cap Pixel Ratio at 1.5 to prevent lag on 4K/Retina screens */}
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={45} />
        
        <CameraRig />

        {/* Cinematic Lighting */}
        <ambientLight intensity={0.3} />
        <spotLight position={[15, 15, 15]} angle={0.4} penumbra={1} intensity={2} color="#3b82f6" />
        <spotLight position={[-15, -10, 10]} angle={0.4} penumbra={1} intensity={2} color="#f43f5e" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
        
        <Suspense fallback={null}>
            <FluidSaturn />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Environment preset="city" />
        </Suspense>

        {/* Floating dust particles for depth */}
        <Sparkles count={150} scale={20} size={2} speed={0.4} opacity={0.5} color="#cbd5e1" />
        
        <fog attach="fog" args={['#050505', 10, 40]} />
      </Canvas>
      
      {/* Vignette Overlay for focus */}
      <div className="absolute inset-0 bg-radial-gradient-center from-transparent to-black/60 pointer-events-none" />
    </div>
  );
};