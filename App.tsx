
import React from 'react';
import StandardSection from './components/StandardSection';
import CardSwiperSection from './components/CardSwiperSection';
import { CardData } from './types';

const SECTION_2_CARDS: CardData[] = [
  {
    id: 's2-1',
    title: 'Precision Craft',
    description: 'Experience the harmony of pixel-perfect design and seamless user flows.',
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800&h=1000',
    color: 'indigo'
  },
  {
    id: 's2-2',
    title: 'Infinite Motion',
    description: 'Every interaction is a performance, choreographed for clarity and delight.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=1000',
    color: 'blue'
  },
  {
    id: 's2-3',
    title: 'Neural Logic',
    description: 'Built on powerful architectures that respond to your touch with intent.',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800&h=1000',
    color: 'violet'
  }
];

const SECTION_4_CARDS: CardData[] = [
  {
    id: 's4-1',
    title: 'Eco System',
    description: 'Sustainable tech solutions that breathe life into digital environments.',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800&h=1000',
    color: 'emerald'
  },
  {
    id: 's4-2',
    title: 'Global Scale',
    description: 'Reaching across borders with distributed networks that never sleep.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=1000',
    color: 'cyan'
  },
  {
    id: 's4-3',
    title: 'Future Proof',
    description: 'Adaptive interfaces designed to evolve alongside emerging technologies.',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800&h=1000',
    color: 'fuchsia'
  },
  {
    id: 's4-4',
    title: 'Deep Insight',
    description: 'Data-driven experiences that learn from your unique digital footprint.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=1000',
    color: 'rose'
  }
];

const App: React.FC = () => {
  return (
    <main className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black scroll-smooth">
      {/* Navigation - Better touch targets for mobile */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="text-xl md:text-2xl font-serif font-bold tracking-tighter pointer-events-auto cursor-pointer">OMNI.</div>
        <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest text-neutral-300 pointer-events-auto">
          <a href="#section-1" className="hover:text-white transition-colors">Intro</a>
          <a href="#section-2" className="hover:text-white transition-colors">Identity</a>
          <a href="#section-3" className="hover:text-white transition-colors">Process</a>
          <a href="#section-4" className="hover:text-white transition-colors">Impact</a>
          <a href="#section-5" className="hover:text-white transition-colors">Connect</a>
        </div>
        <div className="md:hidden p-2 pointer-events-auto">
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </div>
      </nav>

      {/* Sections with dvh to avoid mobile UI issues */}
      <StandardSection 
        id="section-1"
        subtitle="The New Standard"
        title="Depth in Every Scroll"
        content="Welcome to OmniScroll. A curated journey of interaction and discovery designed for the modern web."
        imageUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200"
        overlayColor="bg-blue-900"
      />

      <CardSwiperSection 
        id="section-2"
        heading="Built on three core pillars."
        subheading="01. Identity"
        cards={SECTION_2_CARDS}
      />

      <StandardSection 
        id="section-3"
        subtitle="The Methodology"
        title="Strategic Precision"
        content="Bridging engineering and art through iterative, transparent, and focused design processes."
        imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
        overlayColor="bg-amber-900"
        reverse={true}
      />

      <CardSwiperSection 
        id="section-4"
        heading="Impact of modern ecosystems."
        subheading="02. Vision"
        cards={SECTION_4_CARDS}
      />

      <StandardSection 
        id="section-5"
        subtitle="Join Us"
        title="Start Your Project."
        content="Accepting new partnerships for the upcoming season. Let's create something together."
        imageUrl="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200"
        overlayColor="bg-rose-900"
      />

      <div className="snap-start min-h-[30dvh] bg-neutral-950 p-10 md:p-20 border-t border-neutral-900 flex flex-col items-center justify-center text-neutral-600 text-xs text-center space-y-4">
        <p>&copy; 2024 OmniScroll Labs.</p>
        <div className="flex gap-6 uppercase tracking-widest">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Twitter</a>
        </div>
      </div>
      
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden opacity-30 animate-pulse pointer-events-none">
        <div className="text-[10px] tracking-[0.4em] uppercase text-white mb-2">Scroll</div>
        <div className="w-px h-8 bg-white mx-auto"></div>
      </div>
    </main>
  );
};

export default App;
