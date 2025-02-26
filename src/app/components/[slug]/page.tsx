import type {Metadata} from 'next';

import {ChevronRightIcon} from '@radix-ui/react-icons';

import * as Breadcrumbs from '~/components/primitives/breadcrumbs';
import {Link} from '~/components/primitives/link';
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
      <Breadcrumbs.Root>
        <Breadcrumbs.Item>
          <Link href="/components">Components</Link>
          <ChevronRightIcon aria-hidden />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Link>{metadata.title}</Link>
        </Breadcrumbs.Item>
      </Breadcrumbs.Root>

      <Content />
    </div>
  );
}

export async function generateStaticParams() {
  const componentsSlugs = await getComponentsSlugs();
  return componentsSlugs.map((slug) => ({slug}));
}

export const dynamicParams = false;
