import { pipelineParts } from "uipack/presets";
import { aiToolchain } from "../../lib/uipackGallery";

export const CLAIM =
	"Skillpack supplies an agent instruction, Skill Eval Pack tests it against the same task without that instruction, and Groundplane checks declared output fields against recorded tool facts when the accepted skill runs.";

const layout = pipelineParts(aiToolchain, "ai-toolchain-meta");

export const meta = {
	...aiToolchain.figure,
	legend: layout.legend,
	viewBox: layout.viewBox,
	narrowViewBox: layout.narrowViewBox,
};

export function Wide({ id }) {
	return pipelineParts(aiToolchain, id).wide;
}

export function Narrow({ id }) {
	return pipelineParts(aiToolchain, id).narrow;
}
