import type {BundledLanguage} from 'shiki/bundle/web';

import {clsx} from 'clsx';
import {toJsxRuntime} from 'hast-util-to-jsx-runtime';
import * as React from 'react';
import {jsx, jsxs} from 'react/jsx-runtime';
import {codeToHast} from 'shiki/bundle/web';

import s from './code-block.module.css';

interface CodeRootProps extends React.ComponentProps<'div'> {}
function CodeRoot(props: CodeRootProps) {
  const {className, ...codeRootProps} = props;
  return (
    <div
      className={clsx(s.root, className)}
      data-code-block-root
      {...codeRootProps}
    />
  );
}

interface CodePreProps extends React.ComponentProps<'pre'> {}
function CodePre(props: CodePreProps) {
  const {className, ...preProps} = props;
  return <pre className={clsx(s.pre, className)} tabIndex={-1} {...preProps} />;
}

interface CodeProps extends React.ComponentProps<'code'> {
  children: string;
  lang: BundledLanguage;
}
async function Code(props: CodeProps) {
  const {lang, children, className, ...codeProps} = props;
  const out = await codeToHast(children, {
    lang,
    theme: 'github-dark-high-contrast',
  });

  const Fragment = React.Fragment;

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre: (props) => props.children,
      code: ({className: codeClassName, ...props}: any) => (
        <code
          className={clsx(s.code, className, codeClassName)}
          {...codeProps}
          {...props}
        />
      ),
    },
  }) as React.JSX.Element;
}

export {Code, CodePre as Pre, CodeRoot as Root};
