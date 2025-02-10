import type {Metadata} from 'next';

import {clsx} from 'clsx';
import {ViewTransitions} from 'next-view-transitions';
import {JetBrains_Mono, Orbitron, Space_Grotesk} from 'next/font/google';

import {Header} from '~/components/layout/header';
import {absoluteUrl} from '~/lib/utils';

import s from './layout.module.css';
import {Providers} from './providers';

import '~/styles/reset.css';
import '~/styles/colors.css';
import '~/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--ff-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--ff-mono',
});

const orbitron = Orbitron({
  weight: ['500', '700'],
  subsets: ['latin'],
  variable: '--ff-orbitron',
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: 'Fantasy Components',
    template: '%s — Fantasy Components',
  },
  description: 'Browse ideas, inspiration and source code for you projects.',
  openGraph: {
    title: 'Fantasy Components',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fantasy Components',
    site: absoluteUrl(),
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={clsx(
          spaceGrotesk.variable,
          jetbrainsMono.variable,
          orbitron.variable
        )}
      >
        <body>
          <Providers>
            <Header />
            <div>
              <div className={s.bg} aria-hidden />
              <main className={s.main}>{children}</main>
            </div>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
