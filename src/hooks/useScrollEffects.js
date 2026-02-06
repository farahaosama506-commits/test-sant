import { useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

export const useScrollEffects = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-element');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardTilt = useCallback((event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  }, []);

  const resetCardTilt = useCallback((event) => {
    const card = event.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  }, []);

  return { handleCardTilt, resetCardTilt };
};

export const useAnimateOnScroll = (options = {}) => {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options;
  
  const [ref, inView] = useInView({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  return { ref, inView };
};