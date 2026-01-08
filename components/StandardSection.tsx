
import React from 'react';

interface StandardSectionProps {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  overlayColor?: string;
  reverse?: boolean;
}

const StandardSection: React.FC<StandardSectionProps> = ({ 
  id, title, subtitle, content, imageUrl, overlayColor = 'bg-indigo-900', reverse = false 
}) => {
  return (
    <section id={id} className="relative min-h-screen w-full flex items-center justify-center py-24 px-6 md:px-20 overflow-hidden">
      <div className={`max-w-7xl w-full flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}>
        <div className="flex-1 space-y-8 z-10">
          <div className="space-y-4">
            <span className="text-indigo-500 font-bold uppercase tracking-[0.3em] text-xs">
              {subtitle}
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
              {title}
            </h2>
          </div>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-xl">
            {content}
          </p>
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-indigo-500 hover:text-white transition-colors duration-300">
            Explore More
          </button>
        </div>
        
        <div className="flex-1 relative group">
          <div className={`absolute -inset-4 ${overlayColor} opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition-opacity duration-1000`}></div>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/5] md:aspect-square">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StandardSection;
