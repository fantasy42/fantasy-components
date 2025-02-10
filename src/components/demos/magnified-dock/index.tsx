import {
  BookmarkIcon,
  GearIcon,
  GitHubLogoIcon,
  HomeIcon,
  PersonIcon,
  SpeakerLoudIcon,
  SunIcon,
} from '@radix-ui/react-icons';

import * as MagnifiedDock from '~/components/libary/magnified-dock';

import styles from './styles.module.css';

function MagnifiedDockDemo() {
  return (
    <MagnifiedDock.Root className={styles.root}>
      <div className={styles.dock}>
        {[
          {
            children: <HomeIcon />,
            label: 'Home',
          },
          {
            children: <PersonIcon />,
            label: 'Profile',
          },
          {
            children: <BookmarkIcon />,
            label: 'Bookmark',
          },
          {
            children: <GearIcon />,
            label: 'Settings',
          },
        ].map((item) => (
          <MagnifiedDock.InternalLink
            key={item.label}
            href="#"
            className={styles.button}
            aria-label={item.label}
          >
            {item.children}
          </MagnifiedDock.InternalLink>
        ))}

        <MagnifiedDock.Separator className={styles.separator} />

        <MagnifiedDock.Button
          className={styles.button}
          aria-label="Toggle Sound"
        >
          <SpeakerLoudIcon />
        </MagnifiedDock.Button>

        <MagnifiedDock.Button
          className={styles.button}
          aria-label="Toggle Theme"
        >
          <SunIcon />
        </MagnifiedDock.Button>

        <MagnifiedDock.Separator className={styles.separator} />

        <MagnifiedDock.ExternalLink
          href="https://github.com/fantasy42/components"
          className={styles.button}
          aria-label="Github"
        >
          <GitHubLogoIcon />
        </MagnifiedDock.ExternalLink>
      </div>
    </MagnifiedDock.Root>
  );
}

export default MagnifiedDockDemo;
