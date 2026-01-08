
import React, { useEffect } from 'react';
import StandardSection from './components/StandardSection';
import CardSwiperSection from './components/CardSwiperSection';
import { CardData } from './types';

const SECTION_2_CARDS: CardData[] = [
  {
    id: 's2-1',
    title: 'Precision Craft',
    description: 'Experience the harmony of pixel-perfect design and seamless user flows.',
    imageUrl: 'https://picsum.photos/seed/design1/800/1000',
    color: 'indigo'
  },
  {
    id: 's2-2',
    title: 'Infinite Motion',
    description: 'Every interaction is a performance, choreographed for clarity and delight.',
    imageUrl: 'https://picsum.photos/seed/motion2/800/1000',
    color: 'blue'
  },
  {
    id: 's2-3',
    title: 'Neural Logic',
    description: 'Built on powerful architectures that respond to your touch with intent.',
    imageUrl: 'https://picsum.photos/seed/logic3/800/1000',
    color: 'violet'
  }
];

const SECTION_4_CARDS: CardData[] = [
  {
    id: 's4-1',
    title: 'Eco System',
    description: 'Sustainable tech solutions that breathe life into digital environments.',
    imageUrl: 'https://picsum.photos/seed/eco1/800/1000',
    color: 'emerald'
  },
  {
    id: 's4-2',
    title: 'Global Scale',
    description: 'Reaching across borders with distributed networks that never sleep.',
    imageUrl: 'https://picsum.photos/seed/global2/800/1000',
    color: 'cyan'
  },
  {
    id: 's4-3',
    title: 'Future Proof',
    description: 'Adaptive interfaces designed to evolve alongside emerging technologies.',
    imageUrl: 'https://picsum.photos/seed/future3/800/1000',
    color: 'fuchsia'
  },
  {
    id: 's4-4',
    title: 'Deep Insight',
    description: 'Data-driven experiences that learn from your unique digital footprint.',
    imageUrl: 'https://picsum.photos/seed/data4/800/1000',
    color: 'rose'
  }
];

const App: React.FC = () => {
  // Smooth scroll behavior for internal anchor links (optional)
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId) {
          document.querySelector(targetId)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="relative no-scrollbar">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference">
        <div className="text-2xl font-serif font-bold tracking-tighter">OMNI.</div>
        <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <a href="#section-1" className="hover:text-white transition-colors">Intro</a>
          <a href="#section-2" className="hover:text-white transition-colors">Identity</a>
          <a href="#section-3" className="hover:text-white transition-colors">Process</a>
          <a href="#section-4" className="hover:text-white transition-colors">Impact</a>
          <a href="#section-5" className="hover:text-white transition-colors">Connect</a>
        </div>
        <button className="md:hidden w-8 h-px bg-white relative after:content-[''] after:absolute after:w-full after:h-px after:bg-white after:top-2 before:content-[''] before:absolute before:w-full before:h-px before:bg-white before:-top-2"></button>
      </nav>

      {/* SECTION 1: Standard Hero */}
      <StandardSection 
        id="section-1"
        subtitle="The New Standard"
        title="Experience Depth in Every Scroll"
        content="Welcome to OmniScroll, where we redefine how stories are told in the browser. Navigate through our curated journey of interaction and discovery."
        imageUrl="https://picsum.photos/seed/hero/1200/1200"
        overlayColor="bg-blue-900"
      />

      {/* SECTION 2: Swipe-Card Interception (Sticky Experience) */}
      <CardSwiperSection 
        id="section-2"
        heading="Our core identity is built on three pillars."
        subheading="01. Identity"
        cards={SECTION_2_CARDS}
      />

      {/* SECTION 3: Standard Mid-section */}
      <StandardSection 
        id="section-3"
        subtitle="The Methodology"
        title="Strategic Precision Meets Art"
        content="We bridge the gap between complex engineering and emotional design. Our process is iterative, transparent, and focused on delivering high-impact results."
        imageUrl="https://picsum.photos/seed/strat/1200/1200"
        overlayColor="bg-amber-900"
        reverse={true}
      />

      {/* SECTION 4: Swipe-Card Interception (Sticky Gallery) */}
      <CardSwiperSection 
        id="section-4"
        heading="Exploring the impact of modern ecosystems."
        subheading="02. Vision"
        cards={SECTION_4_CARDS}
      />

      {/* SECTION 5: Final Standard Section / Footer */}
      <StandardSection 
        id="section-5"
        subtitle="Join the Journey"
        title="Start Your Project With Omni."
        content="Ready to elevate your digital presence? We are currently accepting new partnerships for the upcoming season. Let's create something timeless together."
        imageUrl="https://picsum.photos/seed/end/1200/1200"
        overlayColor="bg-rose-900"
      />

      {/* Footer minimal info */}
      <footer className="w-full bg-neutral-950 py-12 px-20 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-neutral-600 text-sm">
        <p>&copy; 2024 OmniScroll Labs. All rights reserved.</p>
        <div className="flex gap-8 mt-6 md:mt-0">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Twitter</a>
        </div>
      </footer>
      
      {/* Scroll Down Hint */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 mix-blend-difference opacity-50">
        <div className="w-px h-12 bg-white animate-bounce"></div>
      </div>
    </div>
  );
};

export default App;
