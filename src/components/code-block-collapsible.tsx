'use client';

import * as React from 'react';

import * as CodeBlock from '~/components/code-block';
import * as Collapsible from '~/components/primitives/collapsible';
import {useCollapsibleContext} from '~/components/primitives/collapsible-context';

import s from './code-block-collapsible.module.css';
import {CodeBlockCopyButton} from './code-block-copy-button';

interface CodeBlockCollapsibleProps {
  children: string;
}
export function CodeBlockCollapsible({children}: CodeBlockCollapsibleProps) {
  const {isOpen} = useCollapsibleContext();

  return (
    <CodeBlock.Root>
      <CodeBlock.Pre className={s.pre} data-expanded={isOpen}>
        {children}
      </CodeBlock.Pre>

      <CodeBlockCopyButton />
      <div className={s.triggerWrapper}>
        <Collapsible.Trigger>
          {isOpen ? 'Collapse Code' : 'Expand Code'}
        </Collapsible.Trigger>
      </div>
    </CodeBlock.Root>
  );
}
