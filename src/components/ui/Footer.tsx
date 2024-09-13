import Logo from "@/assets/svgs/logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className='bg-nomadGray w-full px-4 2xl:px-0'>
      <div className='container mx-auto py-16 max-xl:space-y-8 md:flex justify-between items-center'>
        <div className='flex-1'>
          <Logo />
          <div className='text-sm text-neutral mt-2 space-y-1'>
            <p>Phone: +1 (123) 456-7890 </p>
            <p>Address: 123 Street, Virginia, USA</p>
            <p>
              © {new Date().getFullYear()} Nomad Horizon. All rights reserved.
            </p>
          </div>
        </div>
        <div className='flex justify-between flex-1'>
          <div>
            <h2 className='text-lg text-secondary'>Important Links</h2>
            <div className='text-sm text-neutral space-y-1 mt-2'>
              <Link href='/' className='block hover:text-primary'>
                About Us
              </Link>
              <Link href='/' className='block hover:text-primary'>
                Contact Us
              </Link>
              <Link href='/' className='block hover:text-primary'>
                Privacy Policy
              </Link>
              <Link href='/' className='block hover:text-primary'>
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div>
            <h2 className='text-lg text-secondary'>Social Links</h2>
            <div className='text-sm text-neutral space-y-1 mt-2'>
              <Link href='/' className='block hover:text-primary'>
                Facebook
              </Link>
              <Link href='/' className='block hover:text-primary'>
                Twitter
              </Link>
              <Link href='/' className='block hover:text-primary'>
                Instagram
              </Link>
              <Link href='/' className='block hover:text-primary'>
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
