import React from 'react';
import { ExternalLink, PlayCircle } from 'lucide-react';

const projects = [
    {
        title: "Neon Cyberpunk Ad",
        category: "3D Animation",
        image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=800&auto=format&fit=crop",
        stats: "1.2M Views"
    },
    {
        title: "FinTech Dashboard",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        stats: "300% Engagement"
    },
    {
        title: "SpaceX Tribute",
        category: "Video Editing",
        image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=800&auto=format&fit=crop",
        stats: "Viral Campaign"
    }
];

export const ProjectsSection: React.FC = () => {
    return (
        <section id="portfolio" className="py-24 relative bg-black/20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <span className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-2 block">Selected Works</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Deployments</span></h2>
                    </div>
                    <a href="#contact" className="hidden md:flex items-center gap-2 text-sm font-bold text-white border border-white/20 rounded-full px-6 py-3 hover:bg-white/10 transition-colors group">
                        VIEW ALL <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <a href="#contact" key={index} className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer block">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                            
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                    <PlayCircle className="w-8 h-8 text-white" />
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">{project.category}</div>
                                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs text-gray-300 border border-white/5">
                                    {project.stats}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
                
                <div className="mt-8 text-center md:hidden">
                    <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-white border border-white/20 rounded-full px-6 py-3 hover:bg-white/10 transition-colors">
                        VIEW ALL <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
};