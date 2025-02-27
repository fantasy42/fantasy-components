import type {PackageManagersType} from '~/lib/types';

import {createLocalStorageState} from 'foxact/create-local-storage-state';

import {PackageManagers} from '~/lib/constants';

const [usePackageManager, usePackageManagerValue] =
  createLocalStorageState<PackageManagersType>(
    'package-manager',
    PackageManagers[0]
  );

export {usePackageManager, usePackageManagerValue};
