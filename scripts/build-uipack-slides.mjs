import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { renderSlide, slideLayouts, slideThemes } from "../lib/uipackSlides.mjs";

const dir = fileURLToPath(new URL("../public/uipack-slides/", import.meta.url));
await mkdir(dir, { recursive: true });
for (const { id } of slideLayouts) {
	for (const theme of slideThemes) {
		await writeFile(`${dir}/${id}-${theme}.svg`, renderSlide(id, theme));
	}
}
console.log("UI Pack slide starters generated.");
