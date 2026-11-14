import { withViewTransition } from "uipack/web";

// The theme change (STYLE.md, Motion): a view transition whose look is one
// block of styles/globals.css ("Theme change"), keyed off this attribute for
// the length of the transition. uipack's withViewTransition runs the update at
// once under reduced motion or without view-transition support.
export function withThemeTransition(update) {
	const root = document.documentElement;
	root.dataset.themeTransition = "halftone";
	return withViewTransition(update).finally(() => {
		delete root.dataset.themeTransition;
	});
}
