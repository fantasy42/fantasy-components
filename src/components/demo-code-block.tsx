import type {BundledLanguage} from 'shiki/bundle/web';

import * as React from 'react';

import * as CodeBlock from '~/components/code-block';
import * as Tabs from '~/components/primitives/tabs';

import s from './demo-code-block.module.css';

export function DemoCodeBlock({children}: {children?: React.ReactNode}) {
  // eslint-disable-next-line react/no-children-to-array
  const snippets = React.Children.toArray(children)
    .map((snippet) => {
      if (snippet && typeof snippet === 'object' && 'props' in snippet) {
        const snippetProps = snippet.props as any;
        return {
          id: snippetProps.title as string,
          title: snippetProps.title as string,
          syntax: snippetProps.syntax as BundledLanguage,
          source: snippetProps.source as string,
        };
      }
    })
    .filter((v): v is NonNullable<typeof v> => !!v);

  return (
    <div className={s.container}>
      <Tabs.Root>
        <Tabs.List>
          {snippets.map((snippet) => (
            <Tabs.Tab key={snippet.title} id={snippet.title}>
              {snippet.title}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {snippets.map((snippet) => (
          <Tabs.Panel key={snippet.title} id={snippet.title}>
            <CodeBlock.Pre className={s.demoPre}>
              <CodeBlock.Code lang={snippet.syntax}>
                {snippet.source}
              </CodeBlock.Code>
            </CodeBlock.Pre>
          </Tabs.Panel>
        ))}
      </Tabs.Root>
    </div>
  );
}
