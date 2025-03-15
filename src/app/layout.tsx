import clsx from 'clsx'
import { ReactNode } from 'react'
import { Raleway } from 'next/font/google'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import Image from 'next/image'

interface LayoutProps {
  children: ReactNode
}

const raleway = Raleway({ subsets: ['latin', 'cyrillic'] })

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={clsx(raleway.className, 'container', 'text-slate-900')}>
      <Header />

      <main className='px-13 py-8'>{children}</main>

      <aside className='banner flex flex-col gap-3 p-3 items-center border-l-1 border-neutral-200'>
        <Image src='/Banner.png' alt='banner' width={300} height={120} />
      </aside>

      <Footer />
    </div>
  )
}
