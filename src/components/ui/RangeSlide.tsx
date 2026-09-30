type RangeSlideProps = {
  value: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  label: string;
  step?: number;
};

export function RangeSlide({
  value,
  handleChange,
  min = 100,
  max = 900,
  step,
  label,
}: RangeSlideProps) {
  const fill = ((value - min) / (max - min)) * 100;

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <label htmlFor={`range-${label}`} className='nh-label text-fgMuted'>
          {label}
        </label>
        <span className='font-display text-lg font-bold text-fg'>
          <span className='text-sm text-fgMuted'>up to </span>${value}
        </span>
      </div>
      <input
        id={`range-${label}`}
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className='nh-range w-full rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber'
        style={{ ["--nh-range-fill" as string]: `${fill}%` }}
      />
    </div>
  );
}
