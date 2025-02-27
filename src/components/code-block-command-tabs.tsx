'use client';

import * as React from 'react';

import * as CodeBlock from '~/components/code-block';
import * as Tabs from '~/components/primitives/tabs';
import {usePackageManager} from '~/context/package-manager';

interface CodeBlockCommandTabsProps extends React.ComponentProps<'div'> {}
export function CodeBlockCommandTabs(props: CodeBlockCommandTabsProps) {
  const {children, ...codeBlockCommandProps} = props;

  const [packageManager, setPackageManager] = usePackageManager();

  return (
    <CodeBlock.Root {...codeBlockCommandProps}>
      <Tabs.Root
        selectedKey={packageManager}
        onSelectionChange={(key) => setPackageManager(key as 'pnpm')}
      >
        {children}
      </Tabs.Root>
    </CodeBlock.Root>
  );
}
