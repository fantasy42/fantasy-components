// pnpm add motion

'use client';

import {
  ArchiveIcon,
  EnvelopeClosedIcon,
  GearIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import {animate, motion, useMotionTemplate, useMotionValue} from 'motion/react';
import * as React from 'react';

import {useLayoutEffect} from '~/lib/hooks/use-layout-effect';

import s from './exclusion-tabs.module.css';

const DURATION = 0.16;
const TABS = [
  {
    name: 'Mail',
    icon: <EnvelopeClosedIcon />,
  },
  {
    name: 'Archive',
    icon: <ArchiveIcon />,
  },
  {
    name: 'Settings',
    icon: <GearIcon />,
  },
  {
    name: 'Profile',
    icon: <PersonIcon />,
  },
];

function getClipValues(element: HTMLButtonElement) {
  const {offsetLeft, offsetWidth, offsetTop} = element;

  const clipLeft = `${offsetLeft}px`;
  const clipTop = `${offsetTop}px`;
  const clipRight = `calc(100% - (${offsetLeft}px + ${offsetWidth}px))`;

  return [clipLeft, clipRight, clipTop];
}

export function ExclusionTabs() {
  const [isModified, setIsModified] = React.useState<boolean>(false);
  const [selectedTab, setSelectedTab] = React.useState<string>(TABS[0].name);

  const firstButtonRef = React.useRef<HTMLButtonElement>(null);

  const clipLeftValue = useMotionValue('0px');
  const clipRightValue = useMotionValue('0px');
  const clipTopValue = useMotionValue('0px');

  const clipPathTemplate = useMotionTemplate`inset(${clipTopValue} ${clipRightValue} calc(100% - (${clipTopValue} + 32px)) ${clipLeftValue} round var(--radius-5))`;

  function animateClipValues(newClipValues: string[]) {
    for (const [newValue, motionValue] of [
      [newClipValues[0], clipLeftValue],
      [newClipValues[1], clipRightValue],
      [newClipValues[2], clipTopValue],
    ]) {
      animate(motionValue, newValue, {
        duration: DURATION,
      });
    }
  }

  // We style initial active tab with CSS so there's no flickering
  // Because of that we need to set clip path values for the first tab from the start
  // That way clip path transition will start from the active tab
  useLayoutEffect(() => {
    const firstButton = firstButtonRef.current;

    if (firstButton) {
      const [clipLeft, clipRight, clipTop] = getClipValues(firstButton);
      clipLeftValue.jump(clipLeft);
      clipRightValue.jump(clipRight);
      clipTopValue.jump(clipTop);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.tabsWrapper} data-modified={isModified ? '' : undefined}>
      <div className={s.tabs}>
        {TABS.map((tab, index) => (
          <button
            key={tab.name}
            type="button"
            className={s.tab}
            data-selected={selectedTab === tab.name}
            ref={index === 0 ? firstButtonRef : undefined}
            onClick={(event) => {
              if (!isModified) {
                setIsModified(true);
              }
              if (selectedTab === tab.name) {
                return;
              }

              setSelectedTab(tab.name);
              animateClipValues(getClipValues(event.currentTarget));
            }}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>
      <motion.div
        className={s.tabs}
        // Add clip path style after first active tab change
        style={{
          clipPath: isModified ? clipPathTemplate : undefined,
        }}
        data-tabs-hidden=""
        aria-hidden
        inert
      >
        {TABS.map((tab) => (
          <button key={tab.name} type="button" className={s.tab}>
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
