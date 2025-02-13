import * as React from 'react';

import * as CodeBlock from '~/components/code-block';

import {CodeBlockCopyButton} from './code-block-copy-button';

export function FileSource({children}: {children?: React.ReactNode}) {
  if (!children || typeof children !== 'object' || !('props' in children)) {
    throw new Error('Wrong File Source Data');
  }
  const snippetProps = children.props as any;

  return (
    <CodeBlock.Root>
      <CodeBlock.Pre style={{minHeight: 300}}>
        <CodeBlock.Code lang={snippetProps.syntax}>
          {snippetProps.source}
        </CodeBlock.Code>
      </CodeBlock.Pre>
      <CodeBlockCopyButton />
    </CodeBlock.Root>
  );
}
