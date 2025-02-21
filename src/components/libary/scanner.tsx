'use client';

import {
  motion,
  transform,
  useMotionTemplate,
  useSpring,
  useTransform,
} from 'motion/react';
import * as React from 'react';

import s from './scanner.module.css';

function getDefaultScanLinePosition(isPhone: boolean) {
  return isPhone ? 120 : 145;
}

export function Scanner() {
  const [isPhone, setIsPhone] = React.useState(false);

  const defaultScanLinePosition = getDefaultScanLinePosition(isPhone);
  const scannerHeight = isPhone ? 200 : 250;
  const scanLineBorderWidth = 2;
  const scanLineClipWidth = 2;

  // The initial value is the maximum possible height of the scanner
  // So it's not visible from the start, before we know user's viewport
  const scanLinePosition = useSpring(250, {
    bounce: 0.18,
  });
  const scannerClipPath = useTransform(
    () => scanLinePosition.get() + scanLineBorderWidth + scanLineClipWidth
  );

  React.useEffect(() => {
    let current = true;
    const mql = window.matchMedia('(max-width: 768px)');
    mql.addEventListener('change', handleChange);
    // Immediately animate default scan line position after media check
    scanLinePosition.set(getDefaultScanLinePosition(mql.matches));
    setIsPhone(mql.matches);
    return () => {
      current = false;
      mql.removeEventListener('change', handleChange);
    };
    function handleChange() {
      if (current) {
        // Change scan line position without animation after match media change
        scanLinePosition.jump(getDefaultScanLinePosition(mql.matches));
        setIsPhone(mql.matches);
      }
    }
  }, [scanLinePosition]);

  return (
    <div
      className={s.container}
      style={
        {
          '--sc-line-border-width': `${scanLineBorderWidth}px`,
          '--sc-line-clip-width': `${scanLineClipWidth}px`,
        } as React.CSSProperties
      }
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        scanLinePosition.set(
          transform(
            event.clientY - rect.top,
            [0, scannerHeight],
            [(scannerHeight / 100) * 15, (scannerHeight / 100) * 85]
          )
        );
      }}
      onMouseLeave={() => scanLinePosition.set(defaultScanLinePosition)}
    >
      <div className={s.text}>
        Stop wasting
        <br />
        your time
      </div>
      <motion.div
        className={s.scanLine}
        style={{top: scanLinePosition}}
        aria-hidden
      />
      <motion.div
        className={s.scanner}
        style={{
          clipPath: useMotionTemplate`inset(${scannerClipPath}px 0 0)`,
        }}
        aria-hidden
      >
        <div className={s.scannerBg} />
        <div className={s.text} data-outlined="">
          Stop wasting
          <br />
          your time
        </div>
      </motion.div>
    </div>
  );
}
