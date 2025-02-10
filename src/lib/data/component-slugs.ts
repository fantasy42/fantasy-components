import fs from 'node:fs/promises';
import path from 'node:path';

export async function getComponentsSlugs() {
  const directory = path.join(process.cwd(), 'src', 'content');
  const entries = await fs.readdir(directory, {
    recursive: true,
    withFileTypes: true,
  });

  return entries
    .filter((entry) => entry.isFile() && path.parse(entry.name).ext === '.mdx')
    .map((entry) => path.parse(entry.name).name);
}
