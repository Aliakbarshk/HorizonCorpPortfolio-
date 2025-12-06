import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Automation', href: '#automation' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Founder', href: '#founder' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-4 group cursor-pointer select-none">
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* The Horizon Logo Ring */}
            <div className="absolute w-full h-full rounded-full border-2 border-white/20 group-hover:border-blue-500/50 transition-all duration-700 ease-in-out"></div>
            
            {/* The Dynamic Orbit Ring */}
            <div className="absolute w-[120%] h-[120%] rounded-full border-t-2 border-l-2 border-blue-500/80 rotate-45 animate-[spin_8s_linear_infinite] opacity-80"></div>
            
            {/* The "H" */}
            <div className="relative z-10 font-sans font-black text-2xl text-white tracking-tighter flex items-center justify-center">
                <span className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">H</span>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
          </div>
          
          <div className="flex flex-col">
             <span className="text-xl font-black tracking-[0.15em] text-white leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">HORIZON</span>
             <span className="text-[10px] tracking-[0.4em] text-gray-500 font-bold uppercase mt-1 group-hover:text-white transition-colors">Corp</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-xs uppercase font-bold tracking-widest text-gray-400 hover:text-white transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 bg-white text-black hover:bg-blue-600 hover:text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col justify-center items-center gap-8 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-3xl font-black text-white hover:text-blue-500 tracking-tight transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="w-12 h-1 bg-white/10 rounded-full my-4"></div>
          <a 
            href="#contact" 
            className="text-lg font-medium text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Start Your Project &rarr;
          </a>
      </div>
    </nav>
  );
};