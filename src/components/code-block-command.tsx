import * as React from 'react';

import * as CodeBlock from '~/components/code-block';
import {CodeBlockCommandTabs} from '~/components/code-block-command-tabs';
import {CodeBlockCopyButton} from '~/components/code-block-copy-button';
import * as Tabs from '~/components/primitives/tabs';
import {PackageManagers, packageManagersCommandRecord} from '~/lib/constants';

import s from './code-block-command.module.css';

interface CodeBlockCommandProps extends React.ComponentProps<'div'> {
  dependencies: string;
}
export function CodeBlockCommand(props: CodeBlockCommandProps) {
  const {dependencies, ...codeBlockCommandProps} = props;

  if (!dependencies || typeof dependencies !== 'string') {
    throw new Error('Wrong dependencies');
  }

  return (
    <CodeBlockCommandTabs {...codeBlockCommandProps}>
      <Tabs.List>
        {PackageManagers.map((pm) => (
          <Tabs.Tab key={pm} id={pm}>
            {pm}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {PackageManagers.map((pm) => (
        <Tabs.Panel className={s.panel} key={pm} id={pm}>
          <CodeBlock.Pre>
            <CodeBlock.Code lang="bash">
              {`${packageManagersCommandRecord[pm]} ${dependencies}`}
            </CodeBlock.Code>
          </CodeBlock.Pre>
          <CodeBlockCopyButton className={s.copyButton} />
        </Tabs.Panel>
      ))}
    </CodeBlockCommandTabs>
  );
}
