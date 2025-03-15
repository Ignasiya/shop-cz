import '@/app/styles/globals.css'
import type { AppProps } from 'next/app'
import { enableStaticRendering } from 'mobx-react-lite'
import Layout from '@/app/layout'

enableStaticRendering(typeof window === 'undefined')

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
