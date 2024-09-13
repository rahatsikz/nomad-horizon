import Image from "next/image";
import { HeaderText } from "../ui/Headers";

export function Overview() {
  return (
    <div>
      <HeaderText
        title='Overview'
        subtitle='Focus on your adventures and career without the worry of losing connectivity or facing tech issues'
      />
      <div className='flex max-lg:flex-col xl:gap-12 bg-nomadGray'>
        <Image
          src='https://images.pexels.com/photos/17767273/pexels-photo-17767273/free-photo-of-man-sitting-with-laptop-on-wooden-bench-on-meadow-under-tree.jpeg'
          alt='overview'
          width={100}
          height={100}
          sizes='30vw'
          style={{ width: "100%", height: "auto" }}
          className='aspect-[4/3] object-cover'
        />
        <div className='w-full flex flex-col max-2xl:gap-4 2xl:justify-between text-lg leading-relaxed text-secondary p-8'>
          <p className='max-lg:line-clamp-5'>
            At Nomad Horizon, we specialize in offering digital services that
            cater to the unique needs of nomads and remote workers. Our platform
            ensures that you can stay connected and efficient while traveling.
            From high-speed internet solutions to reliable mobile and laptop
            servicing, we are here to make your journey as seamless as possible.
            Wherever you go, we ensure you&apos;re always equipped with the
            tools to stay productive.
          </p>
          <p className='hidden xl:block'>
            Whether you&apos;re crossing borders or working from a new city,
            Nomad Horizon ensures that you have the support and technology
            needed to thrive. Our mission is to provide dependable services,
            from fast and secure internet access to quick device repairs. With
            us by your side.
          </p>
          <p className='hidden xl:block'>
            No matter where you are in the world, we help you stay online, stay
            productive, and stay ahead.
          </p>
        </div>
      </div>
    </div>
  );
}
