import type {Metadata} from 'next';

import fs from 'node:fs';
import * as React from 'react';

import {VideoItem} from '~/components/video-item';

import s from './components.module.css';

export const metadata: Metadata = {
  title: 'Components',
  description: 'Search for desired components from the list.',
};

export default function Page() {
  return (
    <div className={s.main}>
      <h1 className="sr-only">Components</h1>
      <div className={s.grid}>
        <div className={s.gridColumn}>
          <VideoItem
            videoSrc="/videos/scanner.mp4"
            fallbackSrc={base64EncodeImage('/fallbacks/scanner.jpg')}
            aspectRatio={700 / 394}
            href="/components/scanner"
            name="Scanner"
          />
          <VideoItem
            videoSrc="/videos/decrypt-text.mp4"
            fallbackSrc={base64EncodeImage('/fallbacks/decrypt-text.jpg')}
            aspectRatio={720 / 250}
            href="/components/decrypt-text"
            name="Decrypt Text Reveal"
          />
        </div>
        <div className={s.gridColumn}>
          <VideoItem
            videoSrc="/videos/magnified-dock.mp4"
            fallbackSrc={base64EncodeImage('/fallbacks/magnified-dock.jpg')}
            aspectRatio={632 / 254}
            href="/components/magnified-dock"
            name="Magnified Dock"
          />
          <VideoItem
            videoSrc="/videos/exclusion-tabs.mp4"
            fallbackSrc={base64EncodeImage('/fallbacks/exclusion-tabs.jpg')}
            aspectRatio={620 / 180}
            href="/components/exclusion-tabs"
            name="Exclusion Tabs"
          />
        </div>
        <div className={s.gridColumn}>
          <VideoItem
            videoSrc="/videos/tilt-card.mp4"
            fallbackSrc={base64EncodeImage('/fallbacks/tilt-card.jpg')}
            aspectRatio={404 / 388}
            href="/components/tilt-card"
            name="Tilt Card"
          />
        </div>
      </div>
    </div>
  );
}

function base64EncodeImage(url: string) {
  return `data:image/jpg;base64,${fs.readFileSync(
    `${process.cwd()}/public${url}`,
    'base64'
  )}`;
}
