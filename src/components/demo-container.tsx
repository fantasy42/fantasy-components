import {clsx} from 'clsx';
import * as React from 'react';

import s from './demo-container.module.css';

interface DemoContainerProps extends React.ComponentProps<'div'> {
  isRounded?: boolean;
}
export function DemoContainer(props: DemoContainerProps) {
  const {className, isRounded = false, ...demoContainerProps} = props;

  return (
    <div
      className={clsx(s.root, className)}
      role="presentation"
      data-demo=""
      data-rounded={isRounded ? '' : undefined}
      {...demoContainerProps}
    />
  );
}
