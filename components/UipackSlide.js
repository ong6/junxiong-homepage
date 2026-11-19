import { useTheme } from "../lib/themeChoice";
import { SlideStarter } from "uipack/presentations";

// The one slide starter on /uipack: uipack's opening layout with its talk
// track (what to say, a delivery cue, the transition to the next slide). The
// other layouts live on ui.junxiong.dev/presentations.
const opening = {
	id: "opening",
	layout: "opening",
	title: "Opening",
	description: "A clear title, one sentence of context, and room for the author.",
	content: {
		// One word, as the product spells itself (STYLE.md, House words).
		eyebrow: "UIPACK",
		headline: ["A familiar look,", "wherever I build."],
		context: "Shared type, colour and spacing for websites and slides.",
	},
	speech: {
		say: "Every project used to start with the same three decisions: type, colour and spacing. UiPack keeps those decisions together, so a website and a deck can feel related without sharing the same layout.",
		delivery: "Open on the repeated work. Pause before naming UiPack.",
		next: "The first rule is deciding what should stay consistent.",
	},
	footer: { label: "UiPack / Jun Xiong", page: "01 / 03" },
};

export default function UipackSlide() {
	const colorMode = useTheme();
	return <SlideStarter slide={opening} theme={colorMode} />;
}
