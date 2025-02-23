import {useCallback, useInsertionEffect, useRef} from 'react';

export function useEffectEvent<T extends (...arguments_: any[]) => any>(
  callback?: T
) {
  const ref = useRef<AnyFunction | undefined>((): any => {
    throw new Error('Cannot call an event handler while rendering.');
  });
  useInsertionEffect(() => {
    ref.current = callback;
  });
  return useCallback<AnyFunction>(
    (...arguments_) => ref.current?.(...arguments_),
    []
  ) as T;
}

type AnyFunction = (...arguments_: any[]) => any;
