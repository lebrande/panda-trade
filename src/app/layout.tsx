import './globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { type ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'

import { getConfig } from '../wagmi'
import { Providers } from './providers'
import { Navbar } from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] })

// @ts-expect-error
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const metadata: Metadata = {
  title: 'Panda Trade',
  description: 'Panda Trade',
}

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get('cookie'),
  )
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers initialState={initialState}>
          <Navbar />
          {props.children}
        </Providers>
      </body>
    </html>
  )
}
