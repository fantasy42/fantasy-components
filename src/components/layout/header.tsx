import {GitHubLogoIcon} from '@radix-ui/react-icons';
import * as React from 'react';

import {Link} from '~/components/primitives/link';

import s from './header.module.css';

export function Header() {
  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <div className={s.links}>
          <Link href="/" variant="primary">
            Home
          </Link>
          <Link href="/components" variant="primary">
            Components
          </Link>
        </div>
        <div className={s.links}>
          <Link
            href="https://github.com/fantasy42/components"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            variant="primary"
          >
            <GitHubLogoIcon width={18} height={18} aria-hidden />
          </Link>
        </div>
      </header>
    </div>
  );
}
