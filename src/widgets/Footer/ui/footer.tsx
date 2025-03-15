import Link from 'next/link'
import { FacebookIcon } from '@/shared/ui/icons/FacebookIcon'
import { VkIcon } from '@/shared/ui/icons/VkIcon'
import { InstagramIcon } from '@/shared/ui/icons/InstagramIcon'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className='bg-neutral-200 py-8 px-12'>
      <div className='flex flex-wrap lg:justify-between justify-center gap-8'>
        <Link href='/' className='font-bold text-4xl'>
          React
        </Link>

        <div className='flex flex-col items-center lg:items-start gap-3 lg:ml-auto'>
          <h3>Присоединяйтесь к нам</h3>
          <nav>
            <ul>
              <li className='flex gap-4 text-blue-600'>
                <Link href='#'>
                  <FacebookIcon className='hover:text-blue-500' w={28} h={28} />
                </Link>
                <Link href='#'>
                  <VkIcon className='hover:text-blue-500' w={28} h={28} />
                </Link>
                <Link href='#'>
                  <InstagramIcon className='hover:text-blue-500' w={28} h={28} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className='flex flex-col gap-3'>
          <h3>Устанавливайте приложение</h3>
          <nav>
            <ul className='flex gap-4'>
              <li>
                <Link href='#'>
                  <Image src='/App Store.png' alt='google play' width={104} height={32} />
                </Link>
              </li>
              <li>
                <Link href='#'>
                  <Image src='/Google Play.png' alt='app store' width={104} height={32} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className='flex flex-wrap justify-center gap-5 mt-8 text-neutral-500'>
        <p>© Sionic</p>
        <p>Правовая информация</p>
        <p>Политика конфиденциальности</p>
      </div>
    </footer>
  )
}
