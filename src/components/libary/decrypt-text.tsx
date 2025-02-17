'use client';

import * as React from 'react';

const CHAR_SET = [
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&()*{|}+',
];
if (process.env.NODE_ENV === 'development') {
  Object.freeze(CHAR_SET);
}

function encrypt(string_: string) {
  let encryptedString = '';

  for (const letter of string_) {
    encryptedString =
      letter === ' '
        ? `${encryptedString} `
        : `${encryptedString}${CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)]}`;
  }

  return encryptedString;
}

function animateDecrypt(
  string_: string,
  iterationCount: number,
  encryptStartIndex: number
) {
  const encryptedString = encrypt(string_.slice(0, iterationCount));

  if (iterationCount <= encryptStartIndex) {
    return encryptedString;
  }

  const endIndex = iterationCount - encryptStartIndex;
  return `${string_.slice(0, endIndex)}${encryptedString.slice(endIndex, string_.length)}`;
}

interface DecryptTextOwnProps {
  children: string;
  /**
   * The number of milliseconds to wait before adding each letter.
   * @default 40
   */
  intervalDelay?: number;
  /**
   * The index at which the decrypt of the sentence will begin.
   * @default 'Math.floor(textLength / 2)'
   * @example 10, 5
   */
  decryptStartIndex?: number;
}

interface DecryptTextProps
  extends Omit<React.ComponentProps<'div'>, 'children'>,
    DecryptTextOwnProps {}
export function DecryptText(props: DecryptTextProps) {
  const {
    children,
    intervalDelay = 40,
    decryptStartIndex: propsDecryptStartIndex,
    ...decryptTextProps
  } = props;

  const [text, setText] = React.useState('');

  const iterationCount = React.useRef(1);

  React.useEffect(() => {
    const textLength = children.length;
    const decryptStartIndex =
      propsDecryptStartIndex ?? Math.floor(textLength / 2);
    const maxIterationCount = textLength + decryptStartIndex;

    const interval = setInterval(() => {
      if (iterationCount.current <= maxIterationCount) {
        setText(
          animateDecrypt(children, iterationCount.current, decryptStartIndex)
        );
        iterationCount.current = iterationCount.current + 1;
      } else {
        clearInterval(interval);
      }
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [children, intervalDelay, propsDecryptStartIndex]);

  return <div {...decryptTextProps}>{text}</div>;
}
