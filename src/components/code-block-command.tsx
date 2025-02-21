import * as CodeBlock from '~/components/code-block';
import * as Tabs from '~/components/primitives/tabs';

import s from './code-block-command.module.css';
import {CodeBlockCopyButton} from './code-block-copy-button';

const packageManagers = [
  {manager: 'pnpm', command: 'pnpm add'},
  {manager: 'npm', command: 'npm install'},
  {manager: 'yarn', command: 'yarn add'},
  {manager: 'bun', command: 'bun add'},
];

interface CodeBlockCommandProps extends React.ComponentProps<'div'> {
  dependencies: string;
}
export function CodeBlockCommand(props: CodeBlockCommandProps) {
  const {dependencies, ...codeBlockCommandProps} = props;

  if (!dependencies || typeof dependencies !== 'string') {
    throw new Error('Wrong dependencies');
  }

  const result = packageManagers.map(({manager, command}) => ({
    manager,
    command: `${command} ${dependencies}`,
  }));

  return (
    <CodeBlock.Root {...codeBlockCommandProps}>
      <Tabs.Root>
        <Tabs.List>
          {result.map(({manager}) => (
            <Tabs.Tab key={manager} id={manager}>
              {manager}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {result.map(({command, manager}) => (
          <Tabs.Panel className={s.panel} key={manager} id={manager}>
            <CodeBlock.Pre>
              <CodeBlock.Code lang="bash">{command}</CodeBlock.Code>
            </CodeBlock.Pre>
            <CodeBlockCopyButton className={s.copyButton} />
          </Tabs.Panel>
        ))}
      </Tabs.Root>
    </CodeBlock.Root>
  );
}
