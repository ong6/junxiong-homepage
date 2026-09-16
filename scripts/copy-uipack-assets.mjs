// Copies uipack's rendered asset previews into public/ so /assets can serve
// them. Runs before every build (see package.json "prebuild"); the output is
// gitignored because it is derived from the pinned uipack commit.
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const pkg = dirname(require.resolve("uipack/package.json"));
const src = join(pkg, "docs", "assets");
const dest = join(process.cwd(), "public", "uipack-assets", "docs", "assets");

rmSync(join(process.cwd(), "public", "uipack-assets"), { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log(`uipack assets copied to ${dest}`);
