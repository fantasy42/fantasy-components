// pnpm add moiton

'use client';

import type {HTMLMotionProps, MotionValue} from 'motion/react';

import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import {Link} from 'next-view-transitions';
import * as React from 'react';

import {composeEventHandlers} from '~/lib/compose-event-handlers';
import {useComposedRefs} from '~/lib/hooks/use-composed-refs';

const DISTANCE = 100;
const SPRING = {
  mass: 0.1,
  stiffness: 170,
  damping: 12,
};
const CLICK_TRANSITION = {
  stiffness: 180,
  damping: 18,
};
const MIN_SIZE = 40;
const MAX_SIZE = 80;

interface DockContextType {
  mouseLeft: MotionValue<number>;
}
const DockContext = React.createContext<DockContextType | undefined>(undefined);

function useDockContext() {
  const context = React.useContext(DockContext);
  if (!context) {
    throw new Error('Component must be used within a DockProvider');
  }
  return context;
}

interface MagnifiedDockRootProps extends HTMLMotionProps<'div'> {}
function MagnifiedDockRoot(props: MagnifiedDockRootProps) {
  const {onMouseMove, onMouseLeave, ...rootProps} = props;

  const mouseLeft = useMotionValue(-Infinity);

  return (
    <DockContext.Provider
      value={React.useMemo(() => ({mouseLeft}), [mouseLeft])}
    >
      <motion.div
        {...rootProps}
        onMouseMove={composeEventHandlers(onMouseMove, (event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          mouseLeft.set(event.clientX - rect.left);
        })}
        onMouseLeave={composeEventHandlers(onMouseLeave, () =>
          mouseLeft.set(-Infinity)
        )}
      />
    </DockContext.Provider>
  );
}

interface MagnifiedDockItemCommonProps {
  children: React.ReactNode;
}
interface MagnifiedDockItemImplProps extends MagnifiedDockItemCommonProps {
  as?: any;
  ref?: React.Ref<any> | undefined;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  style?: any | undefined;
}
function MagnifiedDockItemImpl(props: MagnifiedDockItemImplProps) {
  const {
    as: Component,
    ref: forwardedRef,
    style: propsStyle,
    onClick,
    ...itemImplProps
  } = props;

  const {mouseLeft} = useDockContext();

  const ref = React.useRef<HTMLElement>(null);
  const composedRefs = useComposedRefs(ref, forwardedRef);

  const y = useMotionValue(0);

  const distance = useTransform(() => {
    const bounds = ref.current
      ? {x: ref.current.offsetLeft, width: ref.current.offsetWidth}
      : {x: 0, width: 0};

    return mouseLeft.get() - bounds.x - bounds.width / 2;
  });
  const widthValue = useTransform(
    distance,
    [-DISTANCE, 0, DISTANCE],
    [MIN_SIZE, MAX_SIZE, MIN_SIZE]
  );
  const heightValue = useTransform(
    distance,
    [-DISTANCE, 0, DISTANCE],
    [MIN_SIZE, MAX_SIZE, MIN_SIZE]
  );

  const width = useSpring(widthValue, SPRING);
  const height = useSpring(heightValue, SPRING);

  return (
    <Component
      {...itemImplProps}
      style={{width, height, y, ...propsStyle}}
      onClick={composeEventHandlers(onClick, () => {
        animate(y, [0, -15, 0], CLICK_TRANSITION);
      })}
      ref={composedRefs}
    />
  );
}

interface MagnifiedDockButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'>,
    MagnifiedDockItemCommonProps {}
function MagnifiedDockButton(props: MagnifiedDockButtonProps) {
  const {children, ...buttonProps} = props;

  return (
    <MagnifiedDockItemImpl {...buttonProps} as={motion.button}>
      <div aria-hidden style={{display: 'contents'}}>
        {children}
      </div>
    </MagnifiedDockItemImpl>
  );
}

const MotionLink = motion.create(Link);
interface MagnifiedDockLinkInternalProps
  extends Omit<React.ComponentProps<typeof MotionLink>, 'children'>,
    MagnifiedDockItemCommonProps {}
function MagnifiedDockLinkInternal(props: MagnifiedDockLinkInternalProps) {
  const {children, ...linkProps} = props;

  return (
    <MagnifiedDockItemImpl {...linkProps} as={MotionLink}>
      <div aria-hidden style={{display: 'contents'}}>
        {children}
      </div>
    </MagnifiedDockItemImpl>
  );
}

interface MagnifiedDockLinkExternalProps
  extends Omit<HTMLMotionProps<'a'>, 'children'>,
    MagnifiedDockItemCommonProps {}
function MagnifiedDockLinkExternal(props: MagnifiedDockLinkExternalProps) {
  const {children, ...linkProps} = props;

  return (
    <MagnifiedDockItemImpl
      target="_blank"
      rel="noreferrer noopener"
      {...linkProps}
      as={motion.a}
    >
      <div aria-hidden style={{display: 'contents'}}>
        {children}
      </div>
    </MagnifiedDockItemImpl>
  );
}

interface MagnifiedDockSeparatorProps extends React.ComponentProps<'hr'> {}
function MagnifiedDockSeparator(props: MagnifiedDockSeparatorProps) {
  return <hr {...props} />;
}

export {
  MagnifiedDockButton as Button,
  MagnifiedDockLinkExternal as ExternalLink,
  MagnifiedDockLinkInternal as InternalLink,
  MagnifiedDockRoot as Root,
  MagnifiedDockSeparator as Separator,
};
