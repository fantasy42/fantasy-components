'use client';

import {clsx} from 'clsx';
import * as React from 'react';
import {Breadcrumb, Breadcrumbs} from 'react-aria-components';

import s from './breadcrumbs.module.css';

interface BreadcrumbsRootProps
  extends React.ComponentProps<typeof Breadcrumbs> {}
function BreadcrumbsRoot(props: BreadcrumbsRootProps) {
  const {className, ...breadcrumbsRootProps} = props;
  return (
    <Breadcrumbs
      className={clsx(s.breadcrumbs, className)}
      aria-label="Navigation"
      {...breadcrumbsRootProps}
    />
  );
}

interface BreadcrumbsItemProps
  extends React.ComponentProps<typeof Breadcrumb> {}
function BreadcrumbsItem(props: BreadcrumbsItemProps) {
  const {className, ...breadcrumbsItemProps} = props;
  return (
    <Breadcrumb
      className={clsx(s.breadcrumb, className)}
      {...breadcrumbsItemProps}
    />
  );
}

export {BreadcrumbsItem as Item, BreadcrumbsRoot as Root};
