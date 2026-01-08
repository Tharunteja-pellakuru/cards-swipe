
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CardData } from '../types';

interface CardSwiperSectionProps {
  id: string;
  cards: CardData[];
  heading: string;
  subheading: string;
}

const CardSwiperSection: React.FC<CardSwiperSectionProps> = ({ id, cards, heading, subheading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const touchStartRef = useRef<number | null>(null);
  const lastScrollTimeRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // High threshold for mobile focus
        setIsIntersecting(entry.isIntersecting && entry.intersectionRatio > 0.8);
      },
      { threshold: [0, 0.5, 0.8, 1.0] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const moveToIndex = useCallback((newIndex: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setActiveIndex(newIndex);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 700); // Faster transition for mobile responsiveness
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isIntersecting) return;
      const delta = e.deltaY;
      const direction = delta > 0 ? 'down' : 'up';
      const now = Date.now();

      if (now - lastScrollTimeRef.current < 60) return;

      // Direct boundary scroll
      if (activeIndex === 0 && direction === 'up') return;
      if (activeIndex === cards.length - 1 && direction === 'down') return;

      e.preventDefault();
      if (Math.abs(delta) > 25 && !isTransitioningRef.current) {
        lastScrollTimeRef.current = now;
        if (direction === 'down' && activeIndex < cards.length - 1) {
          moveToIndex(activeIndex + 1);
        } else if (direction === 'up' && activeIndex > 0) {
          moveToIndex(activeIndex - 1);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isIntersecting || touchStartRef.current === null) return;
      const delta = touchStartRef.current - e.touches[0].clientY;
      const direction = delta > 0 ? 'down' : 'up';

      // If we are at the edge, allow the standard scroll to handle snapping
      if (activeIndex === 0 && direction === 'up') return;
      if (activeIndex === cards.length - 1 && direction === 'down') return;

      if (e.cancelable) e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isIntersecting || touchStartRef.current === null) return;
      const delta = touchStartRef.current - e.changedTouches[0].clientY;
      const direction = delta > 0 ? 'down' : 'up';

      // Threshold for swipe: 40px
      if (Math.abs(delta) > 40 && !isTransitioningRef.current) {
        if (!(activeIndex === 0 && direction === 'up') && !(activeIndex === cards.length - 1 && direction === 'down')) {
          if (direction === 'down' && activeIndex < cards.length - 1) {
            moveToIndex(activeIndex + 1);
          } else if (direction === 'up' && activeIndex > 0) {
            moveToIndex(activeIndex - 1);
          }
        }
      }
      touchStartRef.current = null;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeIndex, isIntersecting, cards.length, moveToIndex]);

  return (
    <section 
      id={id}
      ref={sectionRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-neutral-900 snap-start snap-always"
    >
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-20">
        <div className="relative w-full max-w-6xl h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
          
          {/* Content Area - Responsive Stacking */}
          <div className="w-full md:flex-1 z-10 space-y-4 md:space-y-8 text-center md:text-left">
            <div className="space-y-2 md:space-y-4">
              <h3 className="text-indigo-400 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
                {subheading}
              </h3>
              <h2 className="text-3xl md:text-6xl font-serif leading-tight text-white px-4 md:px-0">
                {heading}
              </h2>
            </div>
            
            <div className="h-20 md:h-40 overflow-hidden relative">
              {cards.map((card, idx) => (
                <div 
                  key={card.id}
                  className={`absolute top-0 w-full transition-all duration-700 gpu cubic-bezier(0.16, 1, 0.3, 1) ${
                    idx === activeIndex 
                      ? 'translate-y-0 opacity-100' 
                      : idx < activeIndex 
                        ? '-translate-y-4 opacity-0' 
                        : 'translate-y-4 opacity-0'
                  }`}
                >
                  <p className="text-sm md:text-2xl text-neutral-400 leading-relaxed font-light px-6 md:px-0">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <div className="flex gap-1.5">
                {cards.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1 transition-all duration-500 rounded-full ${
                      idx === activeIndex ? 'w-8 bg-indigo-500' : 'w-2 bg-neutral-800'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono text-neutral-600">
                {activeIndex + 1} / {cards.length}
              </span>
            </div>
          </div>

          {/* Image Canvas - Responsive Height */}
          <div className="w-full md:flex-1 h-[40vh] md:h-[70vh] relative overflow-hidden rounded-2xl md:rounded-[2.5rem] shadow-2xl bg-black">
            {cards.map((card, idx) => (
              <div 
                key={card.id}
                className={`absolute inset-0 transition-all duration-[800ms] gpu cubic-bezier(0.16, 1, 0.3, 1) ${
                  idx === activeIndex 
                    ? 'translate-y-0 opacity-100 scale-100 rotate-0' 
                    : idx < activeIndex 
                      ? '-translate-y-full opacity-0 scale-110' 
                      : 'translate-y-full opacity-0 scale-110'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10"></div>
                <img 
                  src={card.imageUrl} 
                  alt={card.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 z-20">
                   <h4 className="text-xl md:text-4xl font-bold tracking-tight text-white">
                    {card.title}
                   </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Line - Desktop Only */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-8 text-neutral-700 font-mono text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-lr]">
        <span>Discovery</span>
        <div className="w-px h-32 bg-neutral-800 relative">
           <div 
            className="absolute top-0 left-0 w-full bg-indigo-500 transition-all duration-700" 
            style={{ height: `${((activeIndex + 1) / cards.length) * 100}%` }}
           />
        </div>
        <span>Focus</span>
      </div>
    </section>
  );
};

export default CardSwiperSection;
