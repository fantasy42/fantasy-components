import * as React from 'react';

import * as CodeBlock from '~/components/code-block';

interface FileSourceProps {
  children?: React.ReactNode;
  isPlainText?: boolean;
}
export function FileSource({children, isPlainText = false}: FileSourceProps) {
  if (!children || typeof children !== 'object' || !('props' in children)) {
    throw new Error('Wrong File Source Data');
  }
  const snippetProps = children.props as any;

  if (isPlainText) {
    return <>{snippetProps.source}</>;
  }

  return (
    <CodeBlock.Code lang={snippetProps.syntax}>
      {snippetProps.source}
    </CodeBlock.Code>
  );
}
