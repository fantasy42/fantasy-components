import type {Metadata} from 'next';

import {ChevronRightIcon} from '@radix-ui/react-icons';

import {getComponentsSlugs} from '~/lib/data/component-slugs';

import s from './component.module.css';

interface PageProps {
  params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {slug} = await params;
  const {metadata} = await import(`content/${slug}.mdx`);

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function Page({params}: PageProps) {
  const {slug} = await params;
  const MDX = await import(`content/${slug}.mdx`);
  const Content = MDX.default;
  const metadata = MDX.metadata;

  return (
    <div className={s.main}>
      <div className={s.breadcrumbs}>
        <span>Components</span>
        <span aria-hidden>
          <ChevronRightIcon />
        </span>
        <span data-current="">{metadata.title}</span>
      </div>
      <Content />
    </div>
  );
}

export async function generateStaticParams() {
  const componentsSlugs = await getComponentsSlugs();
  return componentsSlugs.map((slug) => ({slug}));
}

export const dynamicParams = false;
