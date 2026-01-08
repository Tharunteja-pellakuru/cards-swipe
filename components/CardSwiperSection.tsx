
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

  // Function to handle index changes with animation lock
  const moveToIndex = useCallback((newIndex: number) => {
    if (isTransitioningRef.current) return;
    
    isTransitioningRef.current = true;
    setActiveIndex(newIndex);
    
    // Smooth cooldown to prevent accidental skipping
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 600);
  }, []);

  // Intersection Observer to detect when the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting && entry.intersectionRatio >= 0.8);
      },
      {
        threshold: [0, 0.5, 0.8, 1.0],
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll Interception Logic
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isIntersecting) return;

      const delta = e.deltaY;
      
      // Case 1: At the very first card and scrolling UP
      if (activeIndex === 0 && delta < 0) {
        // Allow natural scroll up (no preventDefault)
        return;
      }

      // Case 2: At the very last card and scrolling DOWN
      if (activeIndex === cards.length - 1 && delta > 0) {
        // Allow natural scroll down (no preventDefault)
        return;
      }

      // Case 3: Inside the sequence, lock scroll and switch cards
      e.preventDefault();
      
      if (Math.abs(delta) > 10) { // Filter out micro-scrolls
        if (delta > 0 && activeIndex < cards.length - 1) {
          moveToIndex(activeIndex + 1);
        } else if (delta < 0 && activeIndex > 0) {
          moveToIndex(activeIndex - 1);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isIntersecting || touchStartRef.current === null) return;

      const touchEnd = e.touches[0].clientY;
      const delta = touchStartRef.current - touchEnd;

      // Case 1: First card, swiping DOWN (scroll UP)
      if (activeIndex === 0 && delta < -10) {
        return;
      }

      // Case 2: Last card, swiping UP (scroll DOWN)
      if (activeIndex === cards.length - 1 && delta > 10) {
        return;
      }

      // Intercept touch for card navigation
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isIntersecting || touchStartRef.current === null) return;

      const touchEnd = e.changedTouches[0].clientY;
      const delta = touchStartRef.current - touchEnd;

      if (Math.abs(delta) > 50) { // Threshold for swipe
        if (delta > 0 && activeIndex < cards.length - 1) {
          moveToIndex(activeIndex + 1);
        } else if (delta < 0 && activeIndex > 0) {
          moveToIndex(activeIndex - 1);
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
    <div 
      id={id}
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-neutral-900"
    >
      {/* Background Cards Layer */}
      <div className="absolute inset-0 flex items-center justify-center p-6 md:p-20">
        <div className="relative w-full max-w-6xl h-full flex flex-col md:flex-row items-center gap-12">
          
          {/* Content side */}
          <div className="flex-1 z-10 space-y-6">
            <h3 className="text-indigo-400 font-semibold tracking-widest uppercase text-sm">
              {subheading}
            </h3>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              {heading}
            </h2>
            <div className="h-24 md:h-32 overflow-hidden relative">
              {cards.map((card, idx) => (
                <div 
                  key={card.id}
                  className={`absolute top-0 transition-all duration-700 ease-in-out ${
                    idx === activeIndex 
                      ? 'translate-y-0 opacity-100' 
                      : idx < activeIndex ? '-translate-y-full opacity-0' : 'translate-y-full opacity-0'
                  }`}
                >
                  <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Pagination Indicators */}
            <div className="flex gap-4 pt-4">
              {cards.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1 transition-all duration-500 rounded-full ${
                    idx === activeIndex ? 'w-12 bg-indigo-500' : 'w-4 bg-neutral-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Visual side */}
          <div className="flex-1 w-full h-[300px] md:h-full relative overflow-hidden rounded-3xl shadow-2xl">
            {cards.map((card, idx) => (
              <div 
                key={card.id}
                className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  idx === activeIndex 
                    ? 'translate-y-0 opacity-100 scale-100 rotate-0' 
                    : idx < activeIndex 
                      ? '-translate-y-full opacity-0 scale-110 -rotate-3' 
                      : 'translate-y-full opacity-0 scale-110 rotate-3'
                }`}
              >
                <div className={`absolute inset-0 opacity-40 bg-gradient-to-t from-black to-transparent z-10`}></div>
                <img 
                  src={card.imageUrl} 
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-8 left-8 right-8 z-20">
                   <h4 className="text-3xl md:text-4xl font-bold">{card.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress vertical text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 text-neutral-600 font-mono text-xs tracking-tighter">
        <span>01</span>
        <div className="w-px h-24 bg-neutral-800 relative overflow-hidden">
           <div 
            className="absolute top-0 left-0 w-full bg-indigo-500 transition-all duration-500" 
            style={{ height: `${((activeIndex + 1) / cards.length) * 100}%` }}
           />
        </div>
        <span>0{cards.length}</span>
      </div>
    </div>
  );
};

export default CardSwiperSection;
