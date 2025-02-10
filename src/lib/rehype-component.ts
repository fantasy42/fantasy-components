import type {Node} from 'unist';

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
          node.children = [];

          for (const file of ['index.tsx', 'styles.module.css']) {
            const filePath = `${process.cwd()}/src/components/demos/${folder}/${file}`;

            if (fileExists(filePath)) {
              const source = fs
                .readFileSync(path.join(filePath), 'utf8')
                .replaceAll('@radix-ui/react-icons', 'your-project-icons')
                .replaceAll('~/components/libary', 'path-to-your-components');
              const syntax = file.split('.').pop()!;

              node.children.push(
                u('element', {
                  tagName: 'pre',
                  properties: {
                    title: file,
                    file: file,
                    syntax,
                    source,
                  },
                  children: [
                    u('element', {
                      tagName: 'code',
                      children: [
                        {
                          type: 'text',
                          value: source,
                        },
                      ],
                    }),
                  ],
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

interface UnistNode extends Node {
  type: string;
  name?: string;
  tagName?: string;
  value?: string;
  properties?: {
    __rawString__?: string;
    __className__?: string;
    __event__?: string;
    [key: string]: unknown;
  } & NpmCommands;
  attributes?: {
    name: string;
    value: unknown;
    type?: string;
  }[];
  children?: UnistNode[];
}

interface UnistTree extends Node {
  children: UnistNode[];
}

interface NpmCommands {
  __npmCommand__?: string;
  __yarnCommand__?: string;
  __pnpmCommand__?: string;
  __bunCommand__?: string;
}
