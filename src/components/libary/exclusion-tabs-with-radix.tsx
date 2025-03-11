'use client';

import {
  ArchiveIcon,
  EnvelopeClosedIcon,
  GearIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import {animate, motion, useMotionTemplate, useMotionValue} from 'motion/react';
import {Tabs} from 'radix-ui';
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

  return {left: clipLeft, top: clipTop, right: clipRight};
}

export function ExclusionTabs() {
  const [isModified, setIsModified] = React.useState<boolean>(false);
  const [selectedTab, setSelectedTab] = React.useState<string>(TABS[0].name);

  const firstTabRef = React.useRef<HTMLButtonElement>(null);
  const activeTabRef = React.useRef<HTMLButtonElement>(null);

  const clipLeftValue = useMotionValue('0px');
  const clipRightValue = useMotionValue('0px');
  const clipTopValue = useMotionValue('0px');

  const clipPathTemplate = useMotionTemplate`inset(${clipTopValue} ${clipRightValue} calc(100% - (${clipTopValue} + 32px)) ${clipLeftValue} round var(--radius-5))`;

  // We style initial active tab with CSS so there's no flickering
  // Because of that we need to set clip path values for the first tab from the start
  // That way clip path transition will start from the active tab
  useLayoutEffect(() => {
    const firstTab = firstTabRef.current;

    if (firstTab) {
      const {left, right, top} = getClipValues(firstTab);

      clipLeftValue.jump(left);
      clipRightValue.jump(right);
      clipTopValue.jump(top);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const activeTab = activeTabRef.current;

    if (activeTab && isModified) {
      const newClipValues = getClipValues(activeTab);

      animate(clipLeftValue, newClipValues.left, {
        duration: DURATION,
      });
      animate(clipRightValue, newClipValues.right, {
        duration: DURATION,
      });
      animate(clipTopValue, newClipValues.top, {
        duration: DURATION,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab, isModified]);

  return (
    <Tabs.Root
      className={s.tabsWrapper}
      data-modified={isModified ? '' : undefined}
      value={selectedTab}
      onValueChange={(value) => {
        if (!isModified) {
          setIsModified(true);
        }

        setSelectedTab(value);
      }}
    >
      <Tabs.List className={s.tabs}>
        {TABS.map((tab) => (
          <Tabs.Trigger
            key={tab.name}
            value={tab.name}
            className={s.tab}
            ref={selectedTab === tab.name ? activeTabRef : undefined}
          >
            {tab.icon}
            {tab.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
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
        {TABS.map((tab, index) => (
          <button
            key={tab.name}
            type="button"
            className={s.tab}
            ref={index === 0 ? firstTabRef : undefined}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </motion.div>
    </Tabs.Root>
  );
}
