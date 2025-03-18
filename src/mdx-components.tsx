import type {MDXComponents} from 'mdx/types';
import type {BundledLanguage} from 'shiki/bundle/web';

import {Link1Icon} from '@radix-ui/react-icons';
import * as React from 'react';

import * as CodeBlock from '~/components/code-block';
import {CodeBlockCollapsible} from '~/components/code-block-collapsible';
import {CodeBlockCommand} from '~/components/code-block-command';
import {CodeBlockCopyButton} from '~/components/code-block-copy-button';
import * as CollapsibleCodeTabs from '~/components/collapsible-code-tabs';
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
    a: ({children, href, ...linkProps}: any) => {
      if (href?.startsWith('/') || href?.startsWith('#')) {
        return (
          <Link className={s.link} href={href} {...linkProps}>
            {children}
          </Link>
        );
      }

      return (
        <Link
          className={s.link}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...linkProps}
        >
          {children}

          <span className={s.linkIconWrapper}>
            <svg
              strokeLinejoin="round"
              viewBox="0 0 16 16"
              height={16}
              width={16}
              style={{color: 'currentcolor'}}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.75011 4H6.00011V5.5H6.75011H9.43945L5.46978 9.46967L4.93945 10L6.00011 11.0607L6.53044 10.5303L10.499 6.56182V9.25V10H11.999V9.25V5C11.999 4.44772 11.5512 4 10.999 4H6.75011Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </Link>
      );
    },
    DemoCodeBlock,
    DemoContainer,
    Tabs: Tabs.Root,
    TabsList: Tabs.List,
    Tab: Tabs.Tab,
    TabPanel: Tabs.Panel,
    FileSource,
    CollapsibleCodeTabsRoot: CollapsibleCodeTabs.Root,
    CollapsibleCodeTabsPanel: CollapsibleCodeTabs.Panel,
    CodeBlockCommand,
    CodeBlockCollapsible,
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
        data-heading
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
