"use client"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'


const LiftSidebar = () => {
  const pathname = usePathname();
  const route = useRouter();

  return (
    <section className='left_sidebar'>
        <nav className='flex flex-col gap-6 '>
            <Link  className='flex gap-1 cursor-pointer items-center pb-10 max-lg:justify-center' href={`/`}>
                {/* <Image src='/icons/logo.svg' alt='logo' width={23} height={27}/> */}
                <h1 className='text-24 font-extrabold text-white max-lg:hidden'>Podcastr</h1>
            </Link>
            {sidebarLinks.map(({route, label, imgURL}) => {
              const isActive = pathname === route || pathname.startsWith(`${route}/`) ;
              return(
               <Link key={route} href={route} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center",{'bg-nav-focus border-r-4 border-orange-1' : isActive})}>
                {/* <Image src={imgURL} width={24} height={24}/> */}
                <p>{label}</p>
              </Link>)}
            )
            }
        </nav>
    </section>
  )
}

export default LiftSidebar