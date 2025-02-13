// pnpm add motion

'use client';

import {HeartFilledIcon} from '@radix-ui/react-icons';
import {motion, useMotionTemplate, useMotionValue} from 'motion/react';

import s from './tilt-card.module.css';

interface Offest {
  x: number;
  y: number;
}

function clamp(number_: number, start: number, end: number) {
  return Math.min(Math.max(number_, start), end);
}

function getOffest(
  position: {x: number; y: number},
  target: EventTarget & HTMLDivElement
): Offest {
  const rect = target.getBoundingClientRect();

  const xValue = clamp(position.x, rect.left, rect.right);
  const yValue = clamp(position.y, rect.top, rect.bottom);

  const x = (xValue - rect.left) / rect.width;
  const y = (yValue - rect.top) / rect.height;

  return {x, y};
}

export function TiltCard() {
  const tiltReverse = false;
  const tiltMaxAngleX = 20;
  const tiltMaxAngleY = 20;

  const cardRotateX = useMotionValue(0);
  const cardRotateY = useMotionValue(0);
  const glareOpacity = useMotionValue(0);
  const glareTranslateX = useMotionValue(0);
  const glareTranslateY = useMotionValue(0);

  function animateCard(offsets: Offest) {
    let angleX = -(offsets.y - 0.5) * 2 * tiltMaxAngleX;
    let angleY = (offsets.x - 0.5) * 2 * tiltMaxAngleY;

    if (tiltReverse) {
      angleX = -angleX;
      angleY = -angleY;
    }

    cardRotateX.set(angleX);
    cardRotateY.set(angleY);
  }

  function animateSpotGlare(offsets: Offest) {
    const opacity = Number(
      (
        Math.max(Math.abs(offsets.x - 0.5) * 2, Math.abs(offsets.y - 0.5) * 2) *
        0.5
      ).toFixed(2)
    );

    const translateX = (offsets.x - 0.5) * 50;
    const translateY = (offsets.y - 0.5) * 50;

    glareOpacity.set(opacity);
    glareTranslateX.set(translateX);
    glareTranslateY.set(translateY);
  }

  function resetValues() {
    for (const value of [
      cardRotateX,
      cardRotateY,
      glareOpacity,
      glareTranslateX,
      glareTranslateY,
    ]) {
      value.set(0);
    }
  }

  return (
    <div
      className={s.root}
      onMouseMove={(event) => {
        const offsets = getOffest(
          {x: event.clientX, y: event.clientY},
          event.currentTarget
        );
        animateCard(offsets);
        animateSpotGlare(offsets);
      }}
      onMouseLeave={() => resetValues()}
      onTouchMove={(event) => {
        const touch = event.changedTouches[0];
        if (touch) {
          const offsets = getOffest(
            {x: touch.clientX, y: touch.clientY},
            event.currentTarget
          );
          animateCard(offsets);
          animateSpotGlare(offsets);
        }
      }}
      onTouchEnd={() => resetValues()}
    >
      <motion.div
        className={s.card}
        style={{
          transform: useMotionTemplate`rotateX(${cardRotateX}deg) rotateY(${cardRotateY}deg) scale3d(1,1,1)`,
        }}
      >
        <div className={s.content}>
          <HeartFilledIcon className={s.heart} aria-hidden />
          <span className={s.text}>
            Don't Forget
            <br />
            To Forget Me
          </span>
        </div>
        <div className={s.effects}>
          <motion.div
            className={s.glare}
            style={{
              opacity: glareOpacity,
              transform: useMotionTemplate`translateX(${glareTranslateX}%) translateY(${glareTranslateY}%)`,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
