'use client';

import {clsx} from 'clsx';
import {useInView} from 'motion/react';
import * as React from 'react';

import {Link} from '~/components/primitives/link';

import s from './video-item.module.css';

interface ComponentItemOwnProps {
  name: string;
  aspectRatio: number;
  fallbackSrc: string;
  videoSrc: string;
}
interface ComponentItemProps
  extends ComponentItemOwnProps,
    React.ComponentProps<typeof Link> {}
export function VideoItem(props: ComponentItemProps) {
  const {
    name,
    aspectRatio,
    fallbackSrc,
    videoSrc,
    className,
    ...videoItemProps
  } = props;
  const linkRef = React.useRef<HTMLAnchorElement>(null);
  const isInView = useInView(linkRef, {
    once: false,
  });

  return (
    <Link
      className={clsx(s.item, className)}
      aria-label={name}
      {...videoItemProps}
      ref={linkRef}
    >
      <div className={s.content}>
        <div style={{aspectRatio: `${aspectRatio} / 1`, position: 'relative'}}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fallbackSrc} aria-hidden alt="" className={s.fallback} />

          {isInView && (
            <video
              className={s.video}
              src={videoSrc}
              playsInline
              loop
              muted
              autoPlay
            />
          )}
        </div>

        <div className={s.info}>
          <span>{name}</span>
        </div>
      </div>
    </Link>
  );
}
