/* eslint-disable react-refresh/only-export-components */
import {ImageResponse} from 'next/og';
import fs from 'node:fs/promises';
import path from 'node:path';

import {absoluteUrl} from '~/lib/utils';

export const contentType = 'image/png';
export const alt = 'Fantasy Components';
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  const font = await fs.readFile(
    path.join(process.cwd(), 'public', 'fonts', 'Orbitron-Bold.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          background:
            'linear-gradient(to top right, #87E7B7, #00F1A3, #00824E)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          overflowY: 'clip',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',

            position: 'absolute',
            inset: 0,

            filter: 'brightness(100%) contrast(150%)',
            opacity: 0.1,
            backgroundImage: `url(${absoluteUrl('/noise_og.svg')})`,
            backgroundRepeat: 'repeat',
          }}
        />

        <div
          style={{
            height: '100%',
            width: '100%',
            inset: 0,
            position: 'absolute',
            backgroundImage: `url('${getGrid()}')`,
            maskImage: `radial-gradient(rgba(0, 0, 0) 0%, rgba(0, 0, 0, 0) 80%)`,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <div
              style={{
                fontSize: 70,
                fontWeight: 700,
                color: '#0d281b',
                letterSpacing: '-0.025em',
              }}
            >
              Fantasy Components
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Orbitron',
          data: font,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}

function getGrid() {
  return `data:image/svg+xml;base64,${btoa(`<svg
xmlns="http://www.w3.org/2000/svg"
width="48"
height="48"
viewBox="0 0 48 48"
>
<g fill="none" opacity="0.5">
  <path d="M48 47.5001L0 47.5001" stroke="#0d281b"></path>
  <path d="M47.5 0V48" stroke="#0d281b"></path>
</g>
</svg>
`)}`;
}
