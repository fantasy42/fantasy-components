'use client';

import * as React from 'react';
import {flushSync} from 'react-dom';

import {composeEventHandlers} from '~/lib/compose-event-handlers';
import {useComposedRefs} from '~/lib/hooks/use-composed-refs';
import {useLayoutEffect} from '~/lib/hooks/use-layout-effect';

interface CollapsibleContextType {
  contentId: string;
  isDisabled: boolean | undefined;
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CollapsibleContext = React.createContext<
  CollapsibleContextType | undefined
>(undefined);

export function useCollapsibleContext() {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      'useCollapsibleContext must be used within a CollapsibleProvider'
    );
  }
  return context;
}

interface CollapsibleTriggerProps<T extends HTMLElement> {
  onClick?: React.MouseEventHandler<T>;
}

export function useCollapsibleTrigger<T extends HTMLElement>(
  props?: CollapsibleTriggerProps<T>
) {
  const context = useCollapsibleContext();
  return {
    triggerProps: {
      ...props,
      'aria-controls': context.contentId,
      'aria-expanded': context.isOpen,
      'data-state': getCollapsibleState(context.isOpen),
      'data-disabled': context.isDisabled ? '' : undefined,
      isDisabled: context.isDisabled || undefined,
      onClick: composeEventHandlers(props?.onClick, () =>
        context.onOpenChange((previous) => !previous)
      ),
    } satisfies React.HTMLAttributes<T> & {[key in `data-${string}`]: any} & {
      isDisabled: boolean | undefined;
    },
  };
}

interface CollapsibleContentProps {
  forceMount?: boolean;
  style?: React.CSSProperties;
}

export function useCollapsibleContent<T extends HTMLElement>(
  props?: CollapsibleContentProps,
  forwardedRef?: React.Ref<T>
) {
  const {forceMount = false} = props ?? {};
  const context = useCollapsibleContext();
  const presence = usePresence(forceMount || context.isOpen);
  const [isPresent, setIsPresent] = React.useState(presence.isPresent);
  const ref = React.useRef<T>(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const heightRef = React.useRef<number | undefined>(0);
  const height = heightRef.current;
  const widthRef = React.useRef<number | undefined>(0);
  const width = widthRef.current;
  const isOpen = context.isOpen || isPresent;
  const isMountAnimationPreventedRef = React.useRef(isOpen);
  const originalStylesRef = React.useRef<Record<string, string>>(null);

  React.useEffect(() => {
    const rAF = requestAnimationFrame(
      () => (isMountAnimationPreventedRef.current = false)
    );
    return () => cancelAnimationFrame(rAF);
  }, []);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName,
      };
      // block any animations/transitions so the element renders at its full dimensions
      node.style.transitionDuration = '0s';
      node.style.animationName = 'none';

      // get width and height from full dimensions
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;

      // kick off any animations/transitions that were originally set up if it isn't the initial mount
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration =
          originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }

      setIsPresent(presence.isPresent);
    }
    /**
     * depends on `context.open` because it will change to `false`
     * when a close is triggered but `present` will be `false` on
     * animation end (so when close finishes). This allows us to
     * retrieve the dimensions *before* closing.
     */
  }, [context.isOpen, presence.isPresent]);

  return {
    ref: composedRefs,
    contentProps: {
      'data-state': getCollapsibleState(context.isOpen),
      'data-disabled': context.isDisabled ? '' : undefined,
      id: context.contentId,
      hidden: isOpen ? undefined : true,
      style: {
        [`--collapsible-content-height`]: height ? `${height}px` : undefined,
        [`--collapsible-content-width`]: width ? `${width}px` : undefined,
        ...props?.style,
      } as React.CSSProperties,
    } satisfies React.HTMLAttributes<T> & {[key in `data-${string}`]: any},
  };
}

function getCollapsibleState(open?: boolean) {
  return open ? 'open' : 'collapsed';
}

function usePresence(present: boolean) {
  const [node, setNode] = React.useState<HTMLElement>();
  const stylesRef = React.useRef<CSSStyleDeclaration>({} as any);
  const previousPresentRef = React.useRef(present);
  const previousAnimationNameRef = React.useRef<string>('none');
  const initialState = present ? 'mounted' : 'unmounted';
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: 'unmounted',
      ANIMATION_OUT: 'unmountSuspended',
    },
    unmountSuspended: {
      MOUNT: 'mounted',
      ANIMATION_END: 'unmounted',
    },
    unmounted: {
      MOUNT: 'mounted',
    },
  });

  React.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    previousAnimationNameRef.current =
      state === 'mounted' ? currentAnimationName : 'none';
  }, [state]);

  useLayoutEffect(() => {
    const styles = stylesRef.current;
    const wasPresent = previousPresentRef.current;
    const hasPresentChanged = wasPresent !== present;

    if (hasPresentChanged) {
      const previousAnimationName = previousAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);

      if (present) {
        send('MOUNT');
      } else if (
        currentAnimationName === 'none' ||
        styles?.display === 'none'
      ) {
        // If there is no exit animation or the element is hidden, animations won't run
        // so we unmount instantly
        send('UNMOUNT');
      } else {
        /**
         * When `present` changes to `false`, we check changes to animation-name to
         * determine whether an animation has started. We chose this approach (reading
         * computed styles) because there is no `animationrun` event and `animationstart`
         * fires after `animation-delay` has expired which would be too late.
         */
        const isAnimating = previousAnimationName !== currentAnimationName;

        if (wasPresent && isAnimating) {
          send('ANIMATION_OUT');
        } else {
          send('UNMOUNT');
        }
      }

      previousPresentRef.current = present;
    }
  }, [present, send]);

  useLayoutEffect(() => {
    if (node) {
      /**
       * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
       * event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
       * make sure we only trigger ANIMATION_END for the currently active animation.
       */
      const handleAnimationEnd = (event: AnimationEvent) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(
          event.animationName
        );
        if (event.target === node && isCurrentAnimation) {
          // With React 18 concurrency this update is applied
          // a frame after the animation ends, creating a flash of visible content.
          // By manually flushing we ensure they sync within a frame, removing the flash.
          flushSync(() => send('ANIMATION_END'));
        }
      };
      const handleAnimationStart = (event: AnimationEvent) => {
        if (event.target === node) {
          // if animation occurred, store its name as the previous animation.
          previousAnimationNameRef.current = getAnimationName(
            stylesRef.current
          );
        }
      };
      node.addEventListener('animationstart', handleAnimationStart);
      node.addEventListener('animationcancel', handleAnimationEnd);
      node.addEventListener('animationend', handleAnimationEnd);
      return () => {
        node.removeEventListener('animationstart', handleAnimationStart);
        node.removeEventListener('animationcancel', handleAnimationEnd);
        node.removeEventListener('animationend', handleAnimationEnd);
      };
    } else {
      // Transition to the unmounted state if the node is removed prematurely.
      // We avoid doing so during cleanup as the node may change but still exist.
      send('ANIMATION_END');
    }
  }, [node, send]);

  return {
    isPresent: ['mounted', 'unmountSuspended'].includes(state),
    ref: React.useCallback((node: HTMLElement) => {
      if (node) {
        stylesRef.current = getComputedStyle(node);
      }
      setNode(node);
    }, []),
  };
}

interface Machine<S> {
  [k: string]: {[k: string]: S};
}
type MachineState<T> = keyof T;
type MachineEvent<T> = keyof UnionToIntersection<T[keyof T]>;
// 🤯 https://fettblog.eu/typescript-union-to-intersection/
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R
) => any
  ? R
  : never;

function useStateMachine<M>(
  initialState: MachineState<M>,
  machine: M & Machine<MachineState<M>>
) {
  return React.useReducer(
    (state: MachineState<M>, event: MachineEvent<M>): MachineState<M> => {
      const nextState = (machine[state] as any)[event];
      return nextState ?? state;
    },
    initialState
  );
}

function getAnimationName(styles?: CSSStyleDeclaration) {
  return styles?.animationName || 'none';
}
