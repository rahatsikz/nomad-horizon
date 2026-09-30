'use client';
import React, { useEffect, useState, useRef } from 'react';

const DRAG_THRESHOLD = 8;

const normalizeTranslateX = (translate: number, loopWidth: number) => {
  if (!loopWidth) return translate;

  const normalizedTranslate = translate % loopWidth;
  return normalizedTranslate > 0 ? normalizedTranslate - loopWidth : normalizedTranslate;
};

type AnimationState = {
  frameId?: number;
  lastTime?: number;
  speed: number;
};

type DragState = {
  pointerDown: boolean;
  dragging: boolean;
  startX: number;
  startPosition: number;
};

export const InfiniteSlider = ({ cardArr }: { cardArr: React.ReactElement[] }) => {
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const translateXRef = useRef(0);
  const animationRef = useRef<AnimationState>({ speed: 0.09 });
  const dragRef = useRef<DragState>({
    pointerDown: false,
    dragging: false,
    startX: 0,
    startPosition: 0,
  });

  const updateTranslateX = (translate: number) => {
    translateXRef.current = translate;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${translate}px)`;
    }
  };

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
    window.addEventListener('resize', updateCardWidth);

    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !cardWidth) return;

    const scrollWidth = container.scrollWidth;

    const animate = (time: number) => {
      const animation = animationRef.current;
      if (!dragRef.current.pointerDown && animation.lastTime != null) {
        const deltaTime = time - animation.lastTime;
        const newTranslateX = translateXRef.current - animation.speed * deltaTime;
        updateTranslateX(newTranslateX <= -scrollWidth / 2 ? 0 : newTranslateX);
      }
      animation.lastTime = time;
      animation.frameId = requestAnimationFrame(animate);
    };

    animationRef.current.frameId = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current.frameId) {
        cancelAnimationFrame(animationRef.current.frameId);
      }
    };
  }, [cardArr, cardWidth]);

  useEffect(() => {
    let speedResetTimeout: ReturnType<typeof setTimeout> | undefined;

    const handleResize = () => {
      animationRef.current.speed = 0.01;
      if (speedResetTimeout) clearTimeout(speedResetTimeout);
      speedResetTimeout = setTimeout(() => {
        animationRef.current.speed = 0.09;
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (speedResetTimeout) clearTimeout(speedResetTimeout);
    };
  }, []);

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.pointerDown = false;
    dragRef.current.dragging = false;
    animationRef.current.lastTime = undefined;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="w-full overflow-hidden py-4">
      <div
        ref={containerRef}
        className="flex cursor-grab select-none active:cursor-grabbing"
        onPointerDown={(event) => {
          if (event.pointerType === 'mouse' && event.button !== 0) return;

          dragRef.current.pointerDown = true;
          dragRef.current.startX = event.clientX;
          dragRef.current.startPosition = translateXRef.current;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const drag = dragRef.current;
          if (!drag.pointerDown) return;

          const dragDistance = event.clientX - drag.startX;
          if (!drag.dragging) {
            if (Math.abs(dragDistance) < DRAG_THRESHOLD) return;
            drag.dragging = true;
          }

          const loopWidth = event.currentTarget.scrollWidth / 2;
          updateTranslateX(normalizeTranslateX(drag.startPosition + dragDistance, loopWidth));
        }}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onDragStart={(event) => {
          event.preventDefault();
        }}
        style={{
          width: `${cardArr.length * cardWidth}px`,
          touchAction: 'pan-y',
        }}
      >
        {cardArr}
      </div>
    </div>
  );
};
