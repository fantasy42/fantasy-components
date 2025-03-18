import type {Route} from '~/lib/types';

import {ChevronLeftIcon, ChevronRightIcon} from '@radix-ui/react-icons';

import {componentsRoutes} from '~/lib/constants';

import s from './components-pagination.module.css';
import {Link} from './primitives/link';

export function ComponentsPagination({slug}: {slug: string}) {
  const currentSlugIndex = componentsRoutes.findIndex(
    (route) => route.slug === slug
  );
  const previous = componentsRoutes[currentSlugIndex - 1];
  const next = componentsRoutes[currentSlugIndex + 1];

  return (
    <div className={s.root}>
      {previous && <PaginationLink type="Previous" route={previous} />}
      {next && <PaginationLink type="Next" route={next} />}
    </div>
  );
}

function PaginationLink({
  type,
  route,
}: {
  type: 'Next' | 'Previous';
  route: Route;
}) {
  return (
    <Link
      className={s.link}
      data-type={type.toLowerCase()}
      href={`/components/${route.slug}`}
      aria-label={`${type} page: ${route.title}`}
    >
      <div className={s.type}>{type}</div>
      <div className={s.title}>{route.title}</div>

      {type === 'Next' ? (
        <ChevronRightIcon className={s.icon} />
      ) : (
        <ChevronLeftIcon className={s.icon} />
      )}
    </Link>
  );
}
