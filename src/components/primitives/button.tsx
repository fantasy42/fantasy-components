'use client';

import {clsx} from 'clsx';
import {Button as ReactAriaButton} from 'react-aria-components';

import s from './button.module.css';

interface ButtonProps extends React.ComponentProps<typeof ReactAriaButton> {
  variant?: 'outline' | 'primary';
}
export function Button(props: ButtonProps) {
  const {className, variant = 'primary', ...buttonProps} = props;

  return (
    <ReactAriaButton
      className={clsx(s.base, s.button, className)}
      data-variant={variant}
      {...buttonProps}
    />
  );
}
