import type {BundledLanguage} from 'shiki/bundle/web';

import * as React from 'react';

import * as CodeBlock from '~/components/code-block';
import * as Tabs from '~/components/primitives/tabs';

import s from './demo-code-block.module.css';

export function DemoCodeBlock({children}: {children?: React.ReactNode}) {
  // eslint-disable-next-line react/no-children-to-array
  const snippets = React.Children.toArray(children)
    .map((pre) => {
      if (pre && typeof pre === 'object' && 'props' in pre) {
        const preProps = pre.props as any;
        return {
          id: preProps.title as string,
          title: preProps.title as string,
          syntax: preProps.syntax as string,
          // prettier-ignore
          // eslint-disable-next-line react/no-children-only
          children: React.Children.only(preProps.children).props?.children,
          source: preProps.source as string,
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
              <CodeBlock.Code lang={snippet.syntax as BundledLanguage}>
                {snippet.source}
              </CodeBlock.Code>
            </CodeBlock.Pre>
          </Tabs.Panel>
        ))}
      </Tabs.Root>
    </div>
  );
}
