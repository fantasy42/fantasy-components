'use client';

import {clsx} from 'clsx';
import * as React from 'react';
import {Link as AriaLink} from 'react-aria-components';

import s from './link.module.css';

interface LinkProps extends React.ComponentProps<typeof AriaLink> {
  variant?: 'primary';
}
export function Link({className, variant, ...linkProps}: LinkProps) {
  return (
    <AriaLink
      className={clsx(s.link, className)}
      data-variant={variant}
      {...linkProps}
    />
  );
}
