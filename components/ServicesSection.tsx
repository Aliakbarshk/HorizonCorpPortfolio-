import React, { useRef, useState } from 'react';
import { Video, Youtube, Clapperboard, Monitor, Palette, Music, ArrowUpRight } from 'lucide-react';
import { Service } from '../types';
import { soundManager } from '../utils/SoundManager';

const services: Service[] = [
  {
    id: 'yt-automation',
    title: 'Bulk Automation',
    description: 'Dominance at scale. We produce 30-40 high-quality tutorial videos daily, ensuring your channel never sleeps.',
    icon: Youtube,
    gradient: 'from-red-500 to-orange-600'
  },
  {
    id: 'ai-animation',
    title: '3D AI Animation',
    description: 'Pixar-grade visuals with custom sound. From catchy nursery rhymes to cinematic shorts, we animate the impossible.',
    icon: Clapperboard,
    gradient: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'web-dev',
    title: 'Premium Web Design',
    description: 'Interactive, high-performance websites built with React & Three.js. We build digital experiences that convert.',
    icon: Monitor,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'High-CTR thumbnails and branding. We design visuals that stop the scroll and demand attention.',
    icon: Palette,
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'video-editing',
    title: 'Pro Video Editing',
    description: 'Turning raw footage into gold. Expert pacing, color grading, and motion graphics for maximum viewer retention.',
    icon: Video,
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'creative-content',
    title: 'Rhymes & Content',
    description: 'Engaging content for all ages. We create original rhymes, stories, and educational scripts that resonate.',
    icon: Music,
    gradient: 'from-amber-500 to-yellow-500'
  }
];

const TiltCard: React.FC<{ service: Service }> = ({ service }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -12; 
        const rotateY = ((x - centerX) / centerX) * 12;

        setRotation({ x: rotateX, y: rotateY });
        setGlowPos({ x, y });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        soundManager.playHover();
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div 
            className="perspective-1000 w-full h-full"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div 
                ref={cardRef}
                className="relative h-full p-8 rounded-3xl bg-white/5 border border-white/10 transition-all duration-300 ease-out transform-style-3d overflow-hidden group hover:border-white/30"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
                }}
            >
                {/* Dynamic Spotlight Glow */}
                <div 
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle 250px at ${glowPos.x}px ${glowPos.y}px, rgba(255,255,255,0.1), transparent)`,
                        opacity: isHovered ? 1 : 0
                    }}
                />

                {/* Background Gradient Blob */}
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${service.gradient} opacity-10 blur-[60px] -z-10 transition-all duration-500 group-hover:opacity-30 group-hover:scale-150`} />

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300`}>
                            <service.icon className="w-7 h-7 text-white" />
                        </div>
                        
                        {/* Interactive Arrow */}
                        <a 
                            href="#contact"
                            className={`p-2 rounded-full bg-white/10 text-white transform transition-all duration-300 ${isHovered ? 'rotate-45 bg-white/20 scale-110' : ''}`}
                        >
                            <ArrowUpRight className="w-5 h-5" />
                        </a>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">
                        {service.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed text-sm font-medium group-hover:text-gray-300 mb-8">
                        {service.description}
                    </p>

                    {/* Action Button that appears on hover */}
                    <div className="mt-auto overflow-hidden">
                        <a 
                            href="#contact"
                            onClick={() => soundManager.playClick()}
                            className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 transform ${isHovered ? 'translate-y-0 opacity-100 bg-white text-black' : 'translate-y-10 opacity-0'}`}
                        >
                            Select Service
                        </a>
                    </div>
                </div>
                
                {/* Bottom Border Highlight */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.gradient} transition-all duration-500 ease-out ${isHovered ? 'w-full' : 'w-0'}`} />
            </div>
        </div>
    );
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative py-32 bg-transparent overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 text-center md:text-left">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-2 block animate-pulse">Our Expertise</span>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Dominance</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            We merge artistic creativity with industrial-grade automation to deliver results at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <TiltCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};