'use client';

import * as React from 'react';

import {composeEventHandlers} from '~/lib/compose-event-handlers';
import {useControllableState} from '~/lib/hooks/use-controllable-state';

import {Button} from './button';
import {
  CollapsibleContext,
  useCollapsibleContent,
  useCollapsibleContext,
  useCollapsibleTrigger,
} from './collapsible-context';

interface CollapsibleRootProps
  extends Omit<React.ComponentProps<'div'>, 'children'> {
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
  defaultOpen?: boolean;
  isDisabled?: boolean;
  children?:
    | ((props: {
        isOpen: boolean;
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
      }) => React.ReactNode)
    | React.ReactNode;
}
export function CollapsibleRoot(props: CollapsibleRootProps) {
  const {
    isDisabled,
    children,
    open,
    onOpenChange,
    defaultOpen = false,
    ...collapsibleRootProps
  } = props;
  const [internalState, setInternalState] = React.useState(defaultOpen);
  const [isOpen, setIsOpen] = useControllableState({
    controlledValue: open,
    internalState,
    onChange: onOpenChange,
    setInternalState,
  });

  const contentId = React.useId();

  return (
    <CollapsibleContext.Provider
      value={React.useMemo(
        () => ({
          contentId,
          isDisabled,
          isOpen,
          onOpenChange: setIsOpen,
        }),
        [contentId, isDisabled, isOpen, setIsOpen]
      )}
    >
      <div
        data-state={isOpen ? 'open' : 'collapsed'}
        data-disabled={isDisabled ? '' : undefined}
        {...collapsibleRootProps}
      >
        {typeof children === 'function'
          ? children({isOpen, setIsOpen})
          : children}
      </div>
    </CollapsibleContext.Provider>
  );
}

interface CollapsibleTriggerProps extends React.ComponentProps<typeof Button> {}
function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  const {onPress, ...collapsibleTriggerProps} = props;
  const context = useCollapsibleContext();
  const {
    triggerProps: {onClick, ...triggerProps},
  } = useCollapsibleTrigger<HTMLButtonElement>();

  return (
    <Button
      onPress={composeEventHandlers(onPress, () =>
        context.onOpenChange((previous) => !previous)
      )}
      {...triggerProps}
      {...collapsibleTriggerProps}
    />
  );
}

interface CollapsibleContentProps extends React.ComponentProps<'div'> {
  forceMount?: boolean;
}
function CollapsibleContent(props: CollapsibleContentProps) {
  const {
    forceMount,
    style,
    ref: forwardedRef,
    ...collapsibleContentProps
  } = props;

  const {contentProps, ref} = useCollapsibleContent<HTMLDivElement>(
    {
      forceMount,
      style,
    },
    forwardedRef
  );

  return (
    <div
      data-collapsible-content=""
      {...contentProps}
      {...collapsibleContentProps}
      ref={ref}
    />
  );
}

export {
  CollapsibleContent as Content,
  CollapsibleRoot as Root,
  CollapsibleTrigger as Trigger,
};
