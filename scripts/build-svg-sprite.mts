import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ICONS_DIR = path.join(process.cwd(), "src/icons");
const OUTPUT_FILE = path.join(process.cwd(), "public/sprites.svg");

const SVG_TAG_PATTERN = /<svg([^>]*)>([\s\S]*)<\/svg>/;
const STRIPPED_ATTRS_PATTERN = /\s(xmlns|width|height|id)="[^"]*"/g;

async function buildSprite(): Promise<void> {
  const files = (await readdir(ICONS_DIR)).filter((file) => file.endsWith(".svg"));

  const symbols = await Promise.all(files.map(async (file): Promise<string> => {
    const name = path.basename(file, ".svg");
    const source = await readFile(path.join(ICONS_DIR, file), "utf-8");

    const match = source.match(SVG_TAG_PATTERN);
    if (!match) {
      throw new Error(`Invalid SVG source: ${file}`);
    }

    const [, attrs, content] = match;
    const symbolAttrs = attrs.replace(STRIPPED_ATTRS_PATTERN, "");

    return `<symbol id="icon-${name}"${symbolAttrs}>${content.trim()}</symbol>`;
  }));

  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${symbols.join("\n")}\n</svg>\n`;

  await writeFile(OUTPUT_FILE, sprite);
  console.warn(`Generated ${OUTPUT_FILE} (${files.length} icons)`);
}

await buildSprite();
