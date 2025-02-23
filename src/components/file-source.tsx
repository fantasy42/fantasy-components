import * as React from 'react';

import * as CodeBlock from '~/components/code-block';

export function FileSource({children}: {children?: React.ReactNode}) {
  if (!children || typeof children !== 'object' || !('props' in children)) {
    throw new Error('Wrong File Source Data');
  }
  const snippetProps = children.props as any;

  return (
    <CodeBlock.Code lang={snippetProps.syntax}>
      {snippetProps.source}
    </CodeBlock.Code>
  );
}
