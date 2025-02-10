'use client';

import {clsx} from 'clsx';
import * as React from 'react';
import {Button} from 'react-aria-components';

import s from './icon-button.module.css';

interface IconButtonProps extends React.ComponentProps<typeof Button> {
  variant?: 'outline' | 'primary';
}
export function IconButton(props: IconButtonProps) {
  const {className, variant = 'primary', ...buttonProps} = props;
  return (
    <Button
      className={clsx(s.base, s.button, className)}
      data-variant={variant}
      {...buttonProps}
    />
  );
}
