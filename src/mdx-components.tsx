import type {MDXComponents} from 'mdx/types';
import type {BundledLanguage} from 'shiki/bundle/web';

import {Link1Icon} from '@radix-ui/react-icons';
import * as React from 'react';

import * as CodeBlock from '~/components/code-block';
import {CodeBlockCopyButton} from '~/components/code-block-copy-button';
import {DemoCodeBlock} from '~/components/demo-code-block';
import {DemoContainer} from '~/components/demo-container';
import * as demos from '~/components/demos';
import {FileSource} from '~/components/file-source';
import {Link} from '~/components/primitives/link';
import * as Tabs from '~/components/primitives/tabs';
import s from '~/styles/components.module.css';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className={s.mainTitle} {...props} />,
    h2: createAnchorHeading('2'),
    h3: createAnchorHeading('3'),
    h4: createAnchorHeading('4'),
    h5: createAnchorHeading('5'),
    h6: createAnchorHeading('6'),
    Description: ({children, ...descProps}: any) => {
      const childText =
        typeof children === 'string' ? children : children.props.children;

      return (
        <p className={s.description} {...descProps}>
          {childText}
        </p>
      );
    },
    p: (props) => <p className={s.paragraph} {...props} />,
    pre: (props) => (
      <CodeBlock.Root>
        <CodeBlock.Pre style={{minHeight: 300}} {...props} />
        <CodeBlockCopyButton />
      </CodeBlock.Root>
    ),
    code: (props: {className: string; children: string}) => {
      const {className} = props;
      if (!className) {
        throw new Error('Codeblock must include className with language');
      }
      const lang = className.split('-').pop();
      if (!lang) {
        throw new Error('Strange...');
      }
      return <CodeBlock.Code lang={lang as BundledLanguage} {...props} />;
    },
    DemoCodeBlock,
    DemoContainer,
    Tabs: Tabs.Root,
    TabsList: Tabs.List,
    Tab: Tabs.Tab,
    TabPanel: Tabs.Panel,
    FileSource,
    ...demos,
    ...components,
  };
}

function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replaceAll(/[^a-z0-9 ]/g, '')
    .replaceAll(' ', '-');
}

type AnchorHeadingLevel = '2' | '3' | '4' | '5' | '6';
function createAnchorHeading(level: AnchorHeadingLevel) {
  function Heading({children, ...headingProps}: any) {
    const Comp = `h${level}` as 'h1';
    const anchor = getAnchor(children);

    return (
      <Comp
        className={s.title}
        id={anchor}
        data-level={level}
        {...headingProps}
      >
        <Link className={s.headingLink} href={`#${anchor}`}>
          {children}

          <Link1Icon aria-hidden />
        </Link>
      </Comp>
    );
  }

  return Heading;
}
