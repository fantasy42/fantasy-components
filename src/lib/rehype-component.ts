import type {UnistNode, UnistTree} from './types';

import fs from 'node:fs';
import path from 'node:path';
import {u} from 'unist-builder';
import {visit} from 'unist-util-visit';

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      if (node.name === 'DemoCodeBlock') {
        const folder = getAttribute(node, 'folder');

        if (typeof folder === 'string') {
          for (const file of ['index.tsx', 'styles.module.css']) {
            const filePath = `${process.cwd()}/src/components/demos/${folder}/${file}`;

            if (fileExists(filePath)) {
              const source = fs
                .readFileSync(path.join(filePath), 'utf8')
                .replaceAll('@radix-ui/react-icons', 'your-project-icons')
                .replaceAll('~/components/libary', 'path-to-your-components');
              const syntax = file.split('.').pop()!;

              node.children?.push(
                u('element', {
                  tagName: 'pre',
                  properties: {
                    title: file,
                    file: file,
                    syntax,
                    source,
                  },
                })
              );
            }
          }
        }
      }
    });
  };
}

function getAttribute(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name)?.value;
}

function fileExists(path: string) {
  try {
    fs.accessSync(path);
    return true;
  } catch {
    return false;
  }
}
