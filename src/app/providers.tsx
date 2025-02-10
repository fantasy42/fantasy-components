'use client';

import {useTransitionRouter} from 'next-view-transitions';
import * as React from 'react';
import {RouterProvider} from 'react-aria-components';

export function Providers({children}: React.PropsWithChildren) {
  const router = useTransitionRouter();

  return <RouterProvider navigate={router.push}>{children}</RouterProvider>;
}

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useTransitionRouter>['push']>[1]
    >;
  }
}
