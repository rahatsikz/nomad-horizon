'use client';
import { ServiceProps } from '@/types/common';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addingToCart } from '@/redux/slice/cart/cartSlice';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLoggedUserInfo } from '@/hooks/useLoggedUser';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Wordmark } from './Wordmark';

/** Service "poster" for the services index: 3:4 still, title in the lower third, cart action. */
export function CardVariantThree({ data, index }: { data: ServiceProps; index?: number }) {
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const { accessToken } = user;
  const { user: loggedUser } = useLoggedUserInfo(accessToken);
  const dispatch = useAppDispatch();

  const isAlreadyAdded = cart.find(
    (item) => item.service === data.id && item.user === loggedUser?.data?.id,
  )
    ? true
    : false;

  const handleAddToCart = () => {
    dispatch(
      addingToCart({
        user: loggedUser?.data?.id,
        service: data?.id,
      }),
    );
    toast.success('Added.. Go to cart to checkout');
  };

  return (
    <article className="group relative flex flex-col overflow-hidden bg-film text-cream">
      <Link
        href={`/services/${data.id}`}
        className="relative block aspect-[4/5] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
      >
        <Image
          src={data?.image}
          alt={data?.serviceName}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover brightness-[0.62] saturate-[0.85] transition duration-[900ms] ease-out group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-film via-film/45 via-45% to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-[10px] font-medium uppercase tracking-[0.3em] text-cream/80">
          <span>{typeof index === 'number' ? `No. ${String(index + 1).padStart(2, '0')}` : 'Now showing'}</span>
          {data.category && <span>{data.category}</span>}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-amber">
            ${data?.price} <span className="text-cream/70">USD</span>
          </p>
          <h3 className="mt-3 font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-[-0.03em] sm:text-3xl">
            {data?.serviceName}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm font-light leading-relaxed text-cream/80">{data?.content}</p>
        </div>
      </Link>
      <div className="flex items-center justify-between gap-3 border-t border-cream/10 px-6 py-4">
        <Link
          href={`/services/${data.id}`}
          className="relative pb-1 text-sm after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-amber after:transition-transform after:duration-700 hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
        >
          Details <span aria-hidden="true">→</span>
        </Link>
        <button
          type="button"
          disabled={isAlreadyAdded}
          onClick={handleAddToCart}
          className={cn(
            'rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber',
            isAlreadyAdded
              ? 'cursor-not-allowed border-cream/20 text-cream/60'
              : 'border-amber bg-amber text-film hover:bg-transparent hover:text-amber',
          )}
        >
          {isAlreadyAdded ? 'In your cart' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
}

const authScenes = {
  login: {
    image: 'https://images.pexels.com/photos/31415635/pexels-photo-31415635.jpeg',
    label: 'Built for the moving life',
    title: 'Welcome back,',
    accent: 'traveller',
  },
  register: {
    image: 'https://images.pexels.com/photos/7893092/pexels-photo-7893092.jpeg',
    label: 'Your next chapter starts here',
    title: 'Every road needs a',
    accent: 'good crew',
  },
};

export function AuthLayoutCard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/login';
  const scene = isLogin ? authScenes.login : authScenes.register;

  return (
    <section className="relative grid min-h-screen bg-canvas font-light text-fg lg:grid-cols-2">
      <div aria-hidden="true" className="nh-grain" />

      {/* photographic half */}
      <div className={cn('relative hidden overflow-hidden bg-film text-cream lg:block', !isLogin && 'lg:order-2')}>
        <Image src={scene.image} alt="" fill priority sizes="50vw" className="nh-kenburns object-cover object-[50%_45%]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-film via-film/40 to-film/30" />
        <div aria-hidden="true" className="nh-vignette absolute inset-0" />
        <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
          <Wordmark className="w-fit text-xl text-cream" />
          <div className="nh-fade-up" style={{ animationDelay: '300ms' }}>
            <p className="nh-label flex items-center gap-4 text-amber">
              <span className="h-px w-12 bg-amber" />
              {scene.label}
            </p>
            <p className="mt-6 font-display text-[clamp(2.75rem,4.8vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.045em]">
              {scene.title}{' '}
              <span className="font-accent font-normal normal-case italic tracking-[-0.01em] text-amber">
                {scene.accent}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* form half */}
      <div className="relative isolate flex items-center justify-center overflow-hidden px-4 py-16 sm:px-10">
        <div aria-hidden="true" className="nh-glow absolute -right-[30vw] -top-[30vw] -z-10 size-[60vw] lg:-right-[20vw]" />
        <div className="w-full max-w-md">{children}</div>
      </div>
    </section>
  );
}
