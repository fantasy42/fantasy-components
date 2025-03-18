'use client';

import * as React from 'react';

import s from './contents-table.module.css';
import {Link} from './primitives/link';

function getHeadingLevel(nodeName: string) {
  return Number(nodeName.replace('H', ''));
}

export function ContentsTable() {
  const [headings, setHeadings] = React.useState<HTMLHeadingElement[]>([]);

  React.useEffect(() => {
    const headingElements = [
      ...document.querySelectorAll('[data-heading]'),
    ] as HTMLHeadingElement[];

    setHeadings(headingElements);
  }, []);

  return (
    <aside className={s.aside}>
      <nav className={s.nav} aria-labelledby="heading">
        <h3 className={s.title} aria-label="Table of contents" id="heading">
          Contents
        </h3>
        <ul>
          {headings.map(({textContent, nodeName, id}) => (
            <li
              key={id}
              className={s.linkWrapper}
              data-level={getHeadingLevel(nodeName)}
            >
              <Link href={`#${id}`} className={s.link}>
                {textContent}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
