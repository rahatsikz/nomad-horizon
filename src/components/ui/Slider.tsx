"use client";
import React, { useEffect, useState, useRef } from "react";

export const InfiniteSlider = ({
  cardArr,
}: {
  cardArr: React.ReactElement[];
}) => {
  const [translateX, setTranslateX] = useState(0);
  const [cardWidth, setCardWidth] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const speedRef = useRef<number>(0.09);

  useEffect(() => {
    const updateCardWidth = () => {
      const vw = window.innerWidth;
      let newCardWidth;
      if (vw < 640) {
        // Mobile devices
        newCardWidth = vw * 0.9;
      } else if (vw < 1024) {
        // Tablets
        newCardWidth = vw * 0.9;
      } else {
        // Desktops
        newCardWidth = 800;
      }
      setCardWidth(newCardWidth);
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !cardWidth) return;

    const scrollWidth = container.scrollWidth;

    const animate = (time: number) => {
      if (lastTimeRef.current != null) {
        const deltaTime = time - lastTimeRef.current;
        setTranslateX((prevTranslateX) => {
          const newTranslateX = prevTranslateX - speedRef.current * deltaTime;
          return newTranslateX <= -scrollWidth / 2 ? 0 : newTranslateX;
        });
      }
      lastTimeRef.current = time;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [cardArr, cardWidth]);

  // Add this new useEffect to handle speed adjustments
  useEffect(() => {
    const handleResize = () => {
      // Slow down the animation during resize
      speedRef.current = 0.01;

      // Set a timeout to return to normal speed after resizing is likely complete
      setTimeout(() => {
        speedRef.current = 0.09;
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='w-full overflow-hidden'>
      <div
        ref={containerRef}
        className='flex'
        style={{
          transform: `translateX(${translateX}px)`,
          width: `${cardArr.length * cardWidth}px`,
        }}
      >
        {cardArr}
      </div>
    </div>
  );
};
