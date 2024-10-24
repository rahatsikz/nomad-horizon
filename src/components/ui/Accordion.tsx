import React, { useState, useEffect } from "react";

type AccordionProps = {
  header: string;
  children: React.ReactNode;
  isOpen?: boolean;
};

export default function Accordion({
  header,
  children,
  isOpen = false,
}: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  useEffect(() => {
    setIsExpanded(isOpen);
  }, [isOpen]);

  return (
    <div className='w-full p-4'>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex items-center justify-between w-full font-medium tracking-wide cursor-pointer py-4 px-6 rounded border-2 border-primary text-secondary'
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
        className={`grid transition-all duration-500 ease-in-out ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className='overflow-hidden'>
          <div className='pt-4 px-4'>{children}</div>
        </div>
      </div>
    </div>
  );
}
