'use client';

import * as React from 'react';

import * as CodeBlock from '~/components/code-block';
import * as Collapsible from '~/components/primitives/collapsible';
import * as Tabs from '~/components/primitives/tabs';

import s from './code-block-collapsible.module.css';
import {CodeBlockCopyButton} from './code-block-copy-button';
import {useCollapsibleContext} from './primitives/collapsible-context';

interface CollapsibleCodeTabsRootProps {
  children: React.ReactNode;
  tabList: string[];
}
export function CollapsibleCodeTabsRoot(props: CollapsibleCodeTabsRootProps) {
  const {children, tabList} = props;
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Content forceMount>
        <Tabs.Root
          defaultSelectedKey={tabList[0]}
          onSelectionChange={() => setOpen(true)}
        >
          <Tabs.List>
            {tabList.map((key) => (
              <Tabs.Tab key={key} id={key}>
                {key}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {children}
        </Tabs.Root>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

interface CollapsibleCodeTabsPanelProps {
  children: React.ReactNode;
  id: string;
}
function CollapsibleCodeTabsPanel(props: CollapsibleCodeTabsPanelProps) {
  const {children, id} = props;
  const {isOpen} = useCollapsibleContext();

  return (
    <Tabs.Panel id={id}>
      <CodeBlock.Root>
        <CodeBlock.Pre
          className={s.pre}
          data-state={isOpen ? 'open' : 'collapsed'}
        >
          {children}
        </CodeBlock.Pre>

        <CodeBlockCopyButton />
        <div className={s.triggerWrapper}>
          <Collapsible.Trigger>
            {isOpen ? 'Collapse Code' : 'Expand Code'}
          </Collapsible.Trigger>
        </div>
      </CodeBlock.Root>
    </Tabs.Panel>
  );
}

export {CollapsibleCodeTabsPanel as Panel, CollapsibleCodeTabsRoot as Root};
