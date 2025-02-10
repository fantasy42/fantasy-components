'use client';

import {clsx} from 'clsx';
import * as React from 'react';
import {
  Tab as ReactAriaTab,
  TabList as ReactAriaTabList,
  TabPanel as ReactAriaTabPanel,
  Tabs as ReactAriaTabs,
} from 'react-aria-components';

import s from './tabs.module.css';

interface TabsRootProps
  extends React.ComponentPropsWithRef<typeof ReactAriaTabs> {}
function Tabs(props: TabsRootProps) {
  const {className, ...tabsRootProps} = props;
  return (
    <ReactAriaTabs className={clsx(s.root, className)} {...tabsRootProps} />
  );
}

interface TabListProps
  extends React.ComponentPropsWithRef<typeof ReactAriaTabList> {}
function TabList(props: TabListProps) {
  const {className, ...tabsRootProps} = props;
  return (
    <ReactAriaTabList
      className={clsx(s.tabList, className)}
      {...tabsRootProps}
    />
  );
}

interface TabProps extends React.ComponentPropsWithRef<typeof ReactAriaTab> {}
function Tab(props: TabProps) {
  const {className, children, ...tabsRootProps} = props;
  return (
    <ReactAriaTab className={clsx(s.tab, className)} {...tabsRootProps}>
      <span className={s.tabInner}>{children as React.ReactNode}</span>
    </ReactAriaTab>
  );
}

interface TabPanelProps
  extends React.ComponentPropsWithRef<typeof ReactAriaTabPanel> {}
function TabPanel(props: TabPanelProps) {
  const {className, ...tabsRootProps} = props;
  return (
    <ReactAriaTabPanel
      className={clsx(s.panel, className)}
      {...tabsRootProps}
    />
  );
}

export {TabList as List, TabPanel as Panel, Tabs as Root, Tab};
