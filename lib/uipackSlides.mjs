import { renderSlideSvg } from "uipack/presentations";

export const slideThemes = ["light", "dark"];

export const slideLayouts = [
	{
		id: "opening",
		layout: "opening",
		title: "Opening",
		description: "A clear title, one sentence of context, and room for the author.",
		content: {
			eyebrow: "UI PACK",
			headline: ["A familiar look,", "wherever I build."],
			context: "Shared type, colour and spacing for websites and slides.",
		},
		speech: {
			say: "Every project used to start with the same three decisions: type, colour and spacing. UI Pack keeps those decisions together, so a website and a deck can feel related without sharing the same layout.",
			delivery: "Open on the repeated work. Pause before naming UI Pack.",
			next: "The first rule is deciding what should stay consistent.",
		},
		footer: { label: "UI Pack / Jun Xiong", page: "01 / 03" },
	},
	{
		id: "explanation",
		layout: "explanation",
		title: "Explanation",
		description: "One point per slide, with the reasoning alongside it.",
		content: {
			eyebrow: "THE DESIGN RULE",
			headline: "Start with what stays the same.",
			foundation: { title: "The foundation", detail: "Type · colour · spacing" },
			applications: [
				{ title: "Websites", detail: "Adapt to the content and screen." },
				{ title: "Slides", detail: "Keep one idea in focus." },
			],
		},
		speech: {
			say: "The shared layer is deliberately small: type, colour and spacing. A website still adapts to its content and screen. A slide still keeps one idea in focus. The format changes, while the foundation stays familiar.",
			delivery: "Name the foundation first, then compare the two outputs.",
			next: "That gives the system three simple stages.",
		},
		footer: { label: "UI Pack / Jun Xiong", page: "02 / 03" },
	},
	{
		id: "system",
		layout: "system",
		title: "System",
		description: "A flow with labeled steps and a caption that explains the decision.",
		content: {
			eyebrow: "HOW IT FITS TOGETHER",
			headline: "One foundation. Two ways to use it.",
			steps: [
				{ title: "Foundation", detail: "Type and colour" },
				{ title: "Layouts", detail: "Structure and motion" },
				{ title: "Output", detail: "Websites and slides" },
			],
			caption: "Reuse the decisions, then choose the layout for the job.",
		},
		speech: {
			say: "Start with the foundation. Add the layout that fits the job. The output can be a website or a slide, but both begin with the same design decisions. I reuse the foundation without forcing every project into one template.",
			delivery: "Walk left to right. Land on the output, then return to the foundation.",
			next: "Next, show one real project using the same foundation.",
		},
		footer: { label: "UI Pack / Jun Xiong", page: "03 / 03" },
	},
];

export function renderSlide(id, theme = "light") {
	const slide = slideLayouts.find((item) => item.id === id) || slideLayouts[0];
	return renderSlideSvg(slide, { theme });
}
