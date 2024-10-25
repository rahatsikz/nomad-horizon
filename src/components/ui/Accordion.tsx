import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

type AccordionProps = {
  header: string;
  children: React.ReactNode;
  id: string;
};

export default function Accordion({ header, children, id }: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = (event: CustomEvent) => {
      if (event.detail !== id) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("accordion-toggle", handleClose as EventListener);

    return () =>
      window.removeEventListener(
        "accordion-toggle",
        handleClose as EventListener
      );
  }, [id]);

  const handleToggle = () => {
    setIsExpanded((prev) => {
      const newState = !prev;
      if (newState) {
        requestAnimationFrame(() => {
          const customEvent = new CustomEvent("accordion-toggle", {
            detail: id,
          });
          window.dispatchEvent(customEvent);
        });
      }
      return newState;
    });
  };

  return (
    <div ref={panelRef} className='w-full px-4 py-2'>
      <button
        onClick={handleToggle}
        className={cn(
          "flex items-center justify-between w-full font-medium tracking-wide cursor-pointer py-4 px-6 rounded  border-2 border-primary text-secondary",
          isExpanded && "rounded-b-none"
        )}
      >
        {header}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className={`w-4 h-4 transition-transform duration-500 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <path
            fillRule='evenodd'
            d='M10 13.707l-6.646-6.647a1 1 0 00-1.414 1.414l7.354 7.353a1 1 0 001.414 0l7.354-7.353a1 1 0 00-1.414-1.414L10 13.707z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <div
        className={cn(
          "grid transition-all duration-500 ease-in-out",
          isExpanded
            ? "grid-rows-[1fr] border-2 border-t-0 dark:border-neutral rounded rounded-t-none -mt-0.5 pb-4"
            : "grid-rows-[0fr]"
        )}
      >
        <div className='overflow-hidden'>
          <div className='pt-4 px-4'>{children}</div>
        </div>
      </div>
    </div>
  );
}
