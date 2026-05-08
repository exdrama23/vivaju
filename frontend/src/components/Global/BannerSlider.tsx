import { useRef, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface BannerSliderProps {
  items: ReactNode[];
}

export default function BannerSlider({ items }: BannerSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number((entry.target as HTMLElement).dataset.index));
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6,
      }
    );

    const currentSlideRefs = slideRefs.current;
    currentSlideRefs.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => {
      currentSlideRefs.forEach((slide) => {
        if (slide) observer.unobserve(slide);
      });
    };
  }, [items]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      <div
        ref={containerRef}
        className="w-full flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => (slideRefs.current[index] = el)}
            data-index={index}
            className="flex-none w-[88%] snap-center"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-[6px] mt-3">
        {items.map((_, index) => (
          <div
            key={index}
            className={`h-[6px] rounded-full transition-all duration-300 ${
              activeIndex === index ? 'w-[6px] bg-[#555555] scale-125' : 'w-[6px] bg-[#E0E0E0]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
