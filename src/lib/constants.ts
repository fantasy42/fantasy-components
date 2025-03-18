import type {PackageManagersType, Route} from './types';

export const PackageManagers = ['pnpm', 'npm', 'yarn', 'bun'] as const;
export const packageManagersCommandRecord: Record<PackageManagersType, string> =
  {
    pnpm: 'pnpm add',
    yarn: 'yard add',
    bun: 'bun add',
    npm: 'npm install',
  };

export const componentsRoutes: Route[] = [
  {title: 'Scanner', slug: 'scanner'},
  {title: 'Decrypt Text Reveal', slug: 'decrypt-text'},
  {title: 'Magnified Dock', slug: 'magnified-dock'},
  {title: 'Exclusion Tabs', slug: 'exclusion-tabs'},
  {title: 'Tilt Card', slug: 'tilt-card'},
];
