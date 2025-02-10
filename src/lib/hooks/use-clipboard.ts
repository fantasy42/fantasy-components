import * as React from 'react';

interface UseClipboardOption {
  timeout?: number;
}

export function useClipboard({timeout = 1000}: UseClipboardOption = {}) {
  const [copied, setCopied] = React.useState(false);
  const copyTimeoutRef = React.useRef<null | number>(null);

  const handleCopyResult = React.useCallback(
    (isCopied: boolean) => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      if (isCopied) {
        copyTimeoutRef.current = window.setTimeout(
          () => setCopied(false),
          timeout
        );
      }
      setCopied(isCopied);
    },
    [timeout]
  );

  const copy = React.useCallback(
    async (valueToCopy: string) => {
      try {
        await navigator.clipboard.writeText(valueToCopy);
        handleCopyResult(true);
      } catch {
        console.error('Copying text is only allowed in a secure context');
      }
    },
    [handleCopyResult]
  );

  return {copy, copied};
}
