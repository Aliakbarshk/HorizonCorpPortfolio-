import React, { useState } from 'react';
import { Rocket, Clock, Zap, Shield, ChevronRight, Activity } from 'lucide-react';
import { soundManager } from '../utils/SoundManager';

// Custom Spaceship SVG for the background fleet
const FleetShip = ({ className, delay }: { className?: string, delay: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`absolute opacity-20 pointer-events-none animate-pulse ${className}`}
    style={{ animationDelay: delay }}
  >
    <path d="M50 0 L100 100 L50 80 L0 100 Z" fill="currentColor" />
  </svg>
);

const MethodologyCard = ({ 
    title, 
    subtitle, 
    description, 
    icon: Icon, 
    color,
    delay 
}: { 
    title: string, 
    subtitle: string, 
    description: string, 
    icon: any, 
    color: string,
    delay: number 
}) => {
    const [hover, setHover] = useState(false);

    return (
        <div 
            className="group relative h-full"
            onMouseEnter={() => {
                setHover(true);
                soundManager.playHover();
            }}
            onMouseLeave={() => setHover(false)}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* Hover Engine Glow Effect */}
            <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${color} opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500`}></div>
            
            <div className="relative h-full bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:border-white/30">
                
                {/* HUD Decoration Lines */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${hover ? 'scale-110 text-white' : 'text-gray-400'} transition-all duration-300`}>
                        <Icon className="w-8 h-8" />
                    </div>
                    {/* Animated Spaceship Icon on Hover */}
                    <div className={`transform transition-all duration-500 ${hover ? 'translate-x-0 opacity-100 rotate-45' : 'translate-x-10 opacity-0'}`}>
                        <Rocket className="w-6 h-6 text-white" />
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                        {subtitle}
                    </h4>
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-100 transition-colors">
                        {title}
                    </h3>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {description}
                </p>

                {/* Engine Exhaust Animation at bottom */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r ${color} blur-md transition-all duration-300 ${hover ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
            </div>
        </div>
    );
};

export const ProcessSection: React.FC = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-[#0a0a0a]">
            
            {/* Background Moving Fleet */}
            <div className="absolute inset-0 overflow-hidden">
                <FleetShip className="text-blue-900 w-24 h-24 top-20 left-10 animate-[float_10s_ease-in-out_infinite]" delay="0s" />
                <FleetShip className="text-purple-900 w-16 h-16 top-1/2 right-20 animate-[float_15s_ease-in-out_infinite_reverse]" delay="2s" />
                <FleetShip className="text-cyan-900 w-32 h-32 bottom-20 left-1/3 animate-[float_20s_ease-in-out_infinite]" delay="5s" />
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Section Title */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                        <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
                        <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">Mission Protocols</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
                        THE HORIZON <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">FLEET</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                        We don't just complete tasks; we execute missions. Our squadron is built on four core pillars of interstellar performance.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MethodologyCard 
                        delay={0}
                        icon={Shield}
                        subtitle="The Dreadnought"
                        title="Quality Work"
                        color="from-blue-500 to-cyan-500"
                        description="Uncompromising standards. We forge digital assets that withstand the test of time and scrutiny. Zero bugs, maximum impact."
                    />
                    <MethodologyCard 
                        delay={100}
                        icon={Clock}
                        subtitle="The Interceptor"
                        title="On Time Delivery"
                        color="from-green-500 to-emerald-500"
                        description="Speed is our currency. Our automated workflows ensure your project launches before the competition even wakes up."
                    />
                    <MethodologyCard 
                        delay={200}
                        icon={Rocket}
                        subtitle="The Mothership"
                        title="Infinite Scalability"
                        color="from-purple-500 to-pink-500"
                        description="Built to conquer galaxies. Our architectures are designed to handle millions of users without breaking a sweat."
                    />
                    <MethodologyCard 
                        delay={300}
                        icon={Zap}
                        subtitle="The Explorer"
                        title="Cost Efficiency"
                        color="from-yellow-500 to-orange-500"
                        description="Smart automation means lower overheads. We pass those savings to you, maximizing your ROI."
                    />
                </div>

                {/* Bottom Interactive Area */}
                <div className="mt-20 text-center">
                    <a href="#contact" className="inline-block group relative px-10 py-5 bg-white text-black font-black tracking-widest uppercase text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 clip-path-slant">
                        <span className="relative z-10 flex items-center gap-3">
                            Initialize Project <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-blue-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
                    </a>
                </div>

            </div>
        </section>
    );
};