import React, { useState, useRef, useEffect } from 'react';
import { Rocket, Target, Globe, Linkedin, Twitter, Github, User, Cpu, Code, Brain, Zap, Terminal, ChevronRight, Fingerprint, Activity } from 'lucide-react';
import { soundManager } from '../utils/SoundManager';

const HoloCard = ({ children }: { children?: React.ReactNode }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Intensity of tilt
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;

        setRotation({ x: rotateX, y: rotateY });
    };

    return (
        <div 
            className="perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
                setIsHovered(true);
                soundManager.playHover();
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                setRotation({ x: 0, y: 0 });
            }}
        >
            <div 
                ref={cardRef}
                className={`relative transition-transform duration-100 ease-out transform-style-3d ${isHovered ? 'scale-105' : 'scale-100'}`}
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
            >
                {children}
            </div>
        </div>
    );
};

const StatBar = ({ label, value, color }: { label: string, value: string, color: string }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        // Animate bar on mount
        const timeout = setTimeout(() => setWidth(parseInt(value)), 200);
        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <div className="mb-4 group cursor-help">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-1 text-gray-400 group-hover:text-white transition-colors">
                <span>{label}</span>
                <span className={`text-${color}-400`}>{value}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
                <div 
                    className={`h-full bg-gradient-to-r from-${color}-600 to-${color}-400 shadow-[0_0_10px_rgba(var(--tw-gradient-to),0.5)] transition-all duration-1000 ease-out`}
                    style={{ width: `${width}%` }}
                ></div>
                {/* Shimmer effect */}
                <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
        </div>
    );
};

export const FounderSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bio' | 'stats'>('bio');

  const switchTab = (tab: 'bio' | 'stats') => {
      if (activeTab !== tab) {
          soundManager.playClick();
          setActiveTab(tab);
      }
  };

  return (
    <section id="founder" className="relative py-32 overflow-hidden bg-[#050505]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_70%)] animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* LEFT: Holographic Avatar */}
          <div className="w-full lg:w-5/12 flex justify-center">
            <HoloCard>
                <div className="relative w-80 h-96 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden shadow-[0_0_60px_-10px_rgba(37,99,235,0.3)] group">
                    
                    {/* Hologram Emitter Top */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_#3b82f6] z-20"></div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        {/* Avatar Circle */}
                        <div className="relative w-40 h-40 mb-8">
                             <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                             <div className="relative w-full h-full rounded-full border-2 border-blue-400/50 flex items-center justify-center bg-black/50 overflow-hidden">
                                <User className="w-20 h-20 text-blue-200 drop-shadow-[0_0_10px_rgba(191,219,254,0.8)]" />
                                {/* Scanning Line */}
                                <div className="absolute w-full h-1 bg-blue-400/50 top-0 animate-[scan_2s_linear_infinite] shadow-[0_0_15px_#60a5fa]"></div>
                             </div>
                             
                             {/* Orbiting tech rings */}
                             <div className="absolute -inset-4 border border-dashed border-blue-500/30 rounded-full animate-[spin_8s_linear_infinite]"></div>
                             <div className="absolute -inset-8 border border-dotted border-purple-500/30 rounded-full animate-[spin_12s_linear_infinite_reverse]"></div>
                        </div>

                        <h3 className="text-3xl font-black text-white tracking-tight mb-2 group-hover:text-blue-400 transition-colors">SHAIKH ALIAKBAR</h3>
                        <div className="px-3 py-1 rounded bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-[0.2em] uppercase">
                            Founder // CEO
                        </div>
                    </div>

                    {/* Grid Overlay for Holo effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-0"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-50"></div>
                </div>
            </HoloCard>
          </div>

          {/* RIGHT: Interactive Dashboard */}
          <div className="w-full lg:w-7/12">
            
            {/* Header with Mode Switcher */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-2">
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">ARCHITECT</span>
                    </h2>
                    <p className="text-gray-400 text-sm font-mono tracking-widest">SYSTEM_ID: FOUNDER_01</p>
                </div>

                {/* Cyber Switch */}
                <div className="flex bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md">
                    <button 
                        onClick={() => switchTab('bio')}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'bio' ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]' : 'text-gray-500 hover:text-white'}`}
                    >
                        Bio_Data
                    </button>
                    <button 
                        onClick={() => switchTab('stats')}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'stats' ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]' : 'text-gray-500 hover:text-white'}`}
                    >
                        Sys_Stats
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[300px]">
                {activeTab === 'bio' ? (
                    <div className="animate-fade-in space-y-8">
                        <div className="relative pl-6 border-l-2 border-blue-500/30">
                            <p className="text-xl text-gray-300 leading-relaxed font-light mb-6">
                                <span className="text-blue-400 font-bold">&lt;Init&gt;</span> Hello, I'm <strong className="text-white">Shaikh Aliakbar</strong>. I founded Horizon Corp to dismantle the barrier between imagination and industrial-scale execution. <span className="text-blue-400 font-bold">&lt;/Init&gt;</span>
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                I don't just build software; I engineer <span className="text-white font-medium">ecosystems</span>. From AI-driven content pipelines to high-performance web architectures, my mission is to automate the mundane so humanity can focus on the extraordinary.
                            </p>
                        </div>

                        {/* Interactive Chips */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: Brain, label: "Visionary", color: "text-rose-400", border: "hover:border-rose-500/50" },
                                { icon: Code, label: "Full Stack", color: "text-blue-400", border: "hover:border-blue-500/50" },
                                { icon: Cpu, label: "AI Architect", color: "text-purple-400", border: "hover:border-purple-500/50" },
                                { icon: Zap, label: "Disruptor", color: "text-yellow-400", border: "hover:border-yellow-500/50" }
                            ].map((trait, idx) => (
                                <div 
                                    key={idx}
                                    onMouseEnter={() => soundManager.playHover()}
                                    className={`p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-default group ${trait.border}`}
                                >
                                    <trait.icon className={`w-6 h-6 ${trait.color} transition-transform group-hover:rotate-12`} />
                                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">{trait.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in p-6 bg-black/40 border border-white/10 rounded-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Activity className="w-5 h-5 text-green-500 animate-pulse" />
                            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Real-time Performance Metrics</h4>
                        </div>
                        
                        <div className="space-y-6">
                            <StatBar label="Innovation Output" value="98" color="blue" />
                            <StatBar label="Risk Tolerance" value="85" color="purple" />
                            <StatBar label="Execution Speed" value="100" color="rose" />
                            <StatBar label="Caffeine Levels" value="92" color="yellow" />
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                                <Terminal className="w-4 h-4" />
                                <span>SERVER_STATUS: ONLINE</span>
                            </div>
                            <div className="text-xs text-green-500 font-mono animate-pulse">
                                ● SYSTEM OPTIMAL
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer / Connect */}
            <div className="mt-12 flex flex-col sm:flex-row gap-6 items-center border-t border-white/5 pt-8">
                <a 
                    href="#contact"
                    onMouseEnter={() => soundManager.playHover()}
                    onClick={() => soundManager.playClick()}
                    className="group relative px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-sm rounded-full overflow-hidden hover:scale-105 transition-transform"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Initiate Protocol <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-blue-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="absolute inset-0 z-20 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Connect Now <ChevronRight className="w-4 h-4" />
                    </span>
                </a>

                <div className="flex gap-4">
                    {[
                        { Icon: Linkedin, href: "#contact", color: "hover:text-blue-500" },
                        { Icon: Twitter, href: "#contact", color: "hover:text-cyan-400" },
                        { Icon: Github, href: "#contact", color: "hover:text-purple-500" },
                        { Icon: Fingerprint, href: "#contact", color: "hover:text-rose-500" }
                    ].map((social, idx) => (
                        <a 
                            key={idx}
                            href={social.href}
                            onMouseEnter={() => soundManager.playHover()}
                            className={`p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] ${social.color}`}
                        >
                            <social.Icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};