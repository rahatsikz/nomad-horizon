type RangeSlideProps = {
  value: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  label: string;
};

export function RangeSlide({
  value,
  handleChange,
  min = 100,
  max = 900,
  label,
}: RangeSlideProps) {
  return (
    <div className='flex flex-col '>
      <div className='flex justify-between items-center mb-0.5'>
        <span className='text-secondary text-sm'> {label} </span>
        <span className='text-neutral'>{value} </span>
      </div>
      <input
        type='range'
        min={min}
        max={max}
        step={100}
        value={value}
        onChange={handleChange}
        className='w-full h-4 rounded-full bg-gradient-to-r from-neutral to-primary appearance-none focus:outline-none'
      />
    </div>
  );
}
