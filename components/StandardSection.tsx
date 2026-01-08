
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
    <section id={id} className="relative h-[100dvh] w-full flex items-center justify-center px-6 md:px-20 overflow-hidden snap-start snap-always">
      <div className={`max-w-7xl w-full flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}>
        <div className="flex-1 space-y-4 md:space-y-8 z-10 text-center md:text-left">
          <div className="space-y-2 md:space-y-4">
            <span className="text-indigo-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
              {subtitle}
            </span>
            <h2 className="text-3xl md:text-7xl font-serif font-bold text-white leading-tight">
              {title}
            </h2>
          </div>
          <p className="text-sm md:text-xl text-neutral-400 leading-relaxed max-w-xl mx-auto md:mx-0">
            {content}
          </p>
          <button className="px-6 py-3 md:px-8 md:py-4 bg-white text-black font-semibold rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300 transform active:scale-95">
            Get Started
          </button>
        </div>
        
        <div className="flex-1 relative group w-full max-w-sm md:max-w-none">
          <div className={`absolute -inset-4 ${overlayColor} opacity-10 blur-3xl rounded-full`}></div>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[16/10] md:aspect-square">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover gpu"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StandardSection;
