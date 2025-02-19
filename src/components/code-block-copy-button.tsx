'use client';

import type {PressEvent} from 'react-aria-components';

import {CheckIcon, CopyIcon} from '@radix-ui/react-icons';
import {clsx} from 'clsx';
import {AnimatePresence, motion, MotionConfig} from 'motion/react';
import * as React from 'react';

import {IconButton} from '~/components/primitives/icon-button';
import {useClipboard} from '~/lib/hooks/use-clipboard';

import s from './code-block.module.css';

const variants = {
  visible: {opacity: 1, scale: 1},
  hidden: {opacity: 0, scale: 0.5},
};

interface CodeBlockCopyButtonProps
  extends React.ComponentProps<typeof IconButton> {}
export function CodeBlockCopyButton(props: CodeBlockCopyButtonProps) {
  const {className, ...copyButtonProps} = props;

  const {copied, copy} = useClipboard();

  return (
    <>
      <IconButton
        className={clsx(s.copyButton, className)}
        aria-label="Copy code to clipboard"
        {...copyButtonProps}
        onPress={React.useCallback(
          (event: PressEvent) => {
            const copyValue = event.target
          .closest('[data-code-block-root]')
          ?.querySelector('code')
          ?.textContent; // prettier-ignore

            if (copyValue) {
              copy(copyValue);
            }
          },
          [copy]
        )}
      >
        <MotionConfig transition={{duration: 0.11, ease: 'easeOut'}}>
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                animate="visible"
                exit="hidden"
                initial="hidden"
                key="check"
                variants={variants}
              >
                <CheckIcon width={20} height={20} aria-hidden />
              </motion.span>
            ) : (
              <motion.span
                animate="visible"
                exit="hidden"
                initial="hidden"
                key="copy"
                variants={variants}
              >
                <CopyIcon width={16} height={16} aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>
        </MotionConfig>
      </IconButton>
      {copied && (
        <div role="log" aria-live="polite" className="sr-only">
          Copied code to clipboard
        </div>
      )}
    </>
  );
}
