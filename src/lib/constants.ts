import type {PackageManagersType} from './types';

export const PackageManagers = ['pnpm', 'npm', 'yarn', 'bun'] as const;
export const packageManagersCommandRecord: Record<PackageManagersType, string> =
  {
    pnpm: 'pnpm add',
    yarn: 'yard add',
    bun: 'bun add',
    npm: 'npm install',
  };
