/** Wayfinding pictograms — solid, geometric, 24×24, drawn in currentColor. */

type PictogramProps = { className?: string; title?: string };

function Svg({ className, title, children }: PictogramProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      fillRule="evenodd"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

export const ArrowPictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M3 10.6h12.6l-5.2-5.2L12.4 3.4 21 12l-8.6 8.6-2-2 5.2-5.2H3z" />
  </Svg>
);

export const PlanePictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </Svg>
);

export const WifiPictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M12 17.2a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2zM12 12.4c2 0 3.8.8 5.1 2.1l-1.8 1.8a4.7 4.7 0 0 0-6.6 0l-1.8-1.8A7.2 7.2 0 0 1 12 12.4zM12 7.7c3.3 0 6.3 1.3 8.5 3.5l-1.8 1.8a9.5 9.5 0 0 0-13.4 0l-1.8-1.8A12 12 0 0 1 12 7.7zM12 3c4.6 0 8.8 1.9 11.8 4.9L22 9.7A14.2 14.2 0 0 0 12 5.5 14.2 14.2 0 0 0 2 9.7L.2 7.9A16.7 16.7 0 0 1 12 3z" />
  </Svg>
);

export const LaptopPictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M4.5 4h15A1.5 1.5 0 0 1 21 5.5V16H3V5.5A1.5 1.5 0 0 1 4.5 4zM5.2 6.2v7.6h13.6V6.2zM0.5 17.2h23v.8A2 2 0 0 1 21.5 20h-19A2 2 0 0 1 .5 18z" />
  </Svg>
);

export const HomePictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M12 2.5 1.5 11.5H5V21h5.2v-6h3.6v6H19v-9.5h3.5z" />
  </Svg>
);

export const ServicesPictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M10.5 4.5h3V6a8.2 8.2 0 0 1 7 8.2V15h-17v-.8A8.2 8.2 0 0 1 10.5 6zM2 17h20v2.5H2z" />
  </Svg>
);

export const BaggagePictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M9 2.5h6A1.5 1.5 0 0 1 16.5 4v2H19a2 2 0 0 1 2 2v10.5a2 2 0 0 1-2 2h-.5V22h-2.2v-1.5H7.7V22H5.5v-1.5H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.5V4A1.5 1.5 0 0 1 9 2.5zm.7 2.2V6h4.6V4.7zM7.5 9v8.5h1.8V9zm7.2 0v8.5h1.8V9z" />
  </Svg>
);

export const NewspaperPictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M3 4h14v14.5A1.5 1.5 0 0 0 18.5 20H4.5A1.5 1.5 0 0 1 3 18.5zm2.2 2.2v4.3h5.3V6.2zm7 0v1.6h2.6V6.2zm0 3v1.3h2.6V9.2zM5.2 12.3v1.6h9.6v-1.6zm0 3.2v1.6h9.6v-1.6zM18.2 8H21v10.5a1.4 1.4 0 0 1-2.8 0z" />
  </Svg>
);

export const CheckInPictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M13 3h6.5A1.5 1.5 0 0 1 21 4.5v15a1.5 1.5 0 0 1-1.5 1.5H13v-2.3h5.7V5.3H13zM9.6 6.6 15 12l-5.4 5.4-1.6-1.6 2.6-2.7H2v-2.2h8.6L8 8.2z" />
  </Svg>
);

export const PersonPlusPictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M9 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 10c4.4 0 7.5 2.1 7.5 4.8V21h-15v-3.2C1.5 15.1 4.6 13 9 13zm9.3-6h2v2.5h2.5v2h-2.5V14h-2v-2.5h-2.5v-2h2.5z" />
  </Svg>
);

export const InfoPictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M12 1.5a10.5 10.5 0 1 1 0 21 10.5 10.5 0 0 1 0-21zM10.6 6h2.8v2.8h-2.8zm0 4.3h2.8V18h-2.8z" />
  </Svg>
);

export const CalendarPictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M6.5 2h2.2v2h6.6V2h2.2v2h1.8A1.7 1.7 0 0 1 21 5.7v14.6a1.7 1.7 0 0 1-1.7 1.7H4.7A1.7 1.7 0 0 1 3 20.3V5.7A1.7 1.7 0 0 1 4.7 4h1.8zM5.2 9.2v10.6h13.6V9.2zm2 2h4.3v4.3H7.2z" />
  </Svg>
);

export const SpeakerPictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M2.5 8.5h4.2L12 4v16l-5.3-4.5H2.5zM17.4 4.6A10.2 10.2 0 0 1 21.5 12c0 3-1.3 5.7-3.4 7.5l-1.5-1.6A8 8 0 0 0 19.3 12a8 8 0 0 0-3.4-6.5zm-2.7 3a5.7 5.7 0 0 1 2.4 4.4 5.7 5.7 0 0 1-2.1 4.4l-1.5-1.6A3.5 3.5 0 0 0 14.9 12a3.5 3.5 0 0 0-1.6-2.9z" />
  </Svg>
);

export const ArrivalPictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M2 19.5h20V22H2zM3.4 9.6l1.6-.4 2.4 2.7 4-1L7.8 3.1l2.1-.6 6.3 6.8 4.3-1.1a1.8 1.8 0 0 1 .9 3.4L4.7 15.8z" />
  </Svg>
);

export const SunPictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zM11 1h2v3h-2zm0 19h2v3h-2zM1 11h3v2H1zm19 0h3v2h-3zM4.2 2.8l2.1 2.1-1.4 1.4-2.1-2.1zm13.5 13.5 2.1 2.1-1.4 1.4-2.1-2.1zM2.8 19.8l2.1-2.1 1.4 1.4-2.1 2.1zM16.3 6.3l2.1-2.1 1.4 1.4-2.1 2.1z" />
  </Svg>
);

export const MoonPictogram = (p: PictogramProps) => (
  <Svg {...p}>
    <path d="M14.5 2a9.5 9.5 0 1 0 7.4 15.6A8.4 8.4 0 0 1 14.5 2z" />
  </Svg>
);
