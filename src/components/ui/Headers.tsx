export function HeaderText({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className='text-center max-w-xl mx-auto px-4 2xl:px-0 mb-8'>
      <h2 className='text-3xl text-secondary font-medium'>{title}</h2>
      <p className='text-neutral mt-1'>{subtitle}</p>
    </div>
  );
}
