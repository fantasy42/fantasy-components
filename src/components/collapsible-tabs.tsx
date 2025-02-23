'use client';

import type {Key} from 'react-aria-components';

import * as React from 'react';

import * as Collapsible from '~/components/primitives/collapsible';
import * as Tabs from '~/components/primitives/tabs';

interface CollapsibleTabsProps {
  children: React.ReactNode;
  defaultSelectedKey: Key;
}
export function CollapsibleTabs({
  children,
  defaultSelectedKey,
}: CollapsibleTabsProps) {
  const [open, setOpen] = React.useState(false);

  if (!defaultSelectedKey) {
    throw new Error('Please specify `defaultSelectedKey`');
  }

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Content forceMount>
        <Tabs.Root
          defaultSelectedKey={defaultSelectedKey}
          onSelectionChange={() => setOpen(true)}
        >
          {children}
        </Tabs.Root>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
