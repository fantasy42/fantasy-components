'use client';

import * as React from 'react';

import * as CodeBlock from '~/components/code-block';
import * as Collapsible from '~/components/primitives/collapsible';

import s from './code-block-collapsible.module.css';
import {CodeBlockCopyButton} from './code-block-copy-button';

interface CodeBlockCollapsibleProps {
  children: string;
}
export function CodeBlockCollapsible({children}: CodeBlockCollapsibleProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Content forceMount>
        <CodeBlock.Root>
          <CodeBlock.Pre
            className={s.pre}
            data-state={open ? 'open' : 'collapsed'}
          >
            {children}
          </CodeBlock.Pre>

          <CodeBlockCopyButton />
          <div className={s.triggerWrapper}>
            <Collapsible.Trigger>
              {open ? 'Collapse Code' : 'Expand Code'}
            </Collapsible.Trigger>
          </div>
        </CodeBlock.Root>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
