import { useCallback, useEffect, useSyncExternalStore } from "react";

// The theme is the reader's last choice, then the system's (STYLE.md, Theme).
// Only the toggle writes the choice; with nothing stored the page follows the
// system. The theme lives on <html> as data-theme (written by themeScript
// before first paint, then by setTheme), and React reads it from there.
export const THEME_KEY = "junxiong-theme";
export const GROUND = { light: "#F3EFE7", dark: "#151311" };

const stored = () => {
	try {
		const value = localStorage.getItem(THEME_KEY);
		return value === "light" || value === "dark" ? value : undefined;
	} catch {
		return undefined;
	}
};

const systemTheme = () => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

// The browser's own chrome (the address bar on a phone) follows the theme on
// screen, not only the system's.
const paintChrome = (mode) => {
	for (const meta of document.querySelectorAll('meta[name="theme-color"]')) meta.content = GROUND[mode];
};

// Runs in <head> before anything paints (pages/_document.js), so the first
// frame has the right ground, colour scheme and tokens. Kept dependency-free:
// it is serialised into the document.
export const themeScript = `(function(){var d=document.documentElement,s;try{s=localStorage.getItem(${JSON.stringify(THEME_KEY)})}catch(e){}var c=s==="light"||s==="dark",t=c?s:(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");d.dataset.theme=t;d.style.colorScheme=t;if(c){var m=document.querySelectorAll('meta[name="theme-color"]');for(var i=0;i<m.length;i++)m[i].content=t==="dark"?${JSON.stringify(GROUND.dark)}:${JSON.stringify(GROUND.light)}}})();`;

const listeners = new Set();
const subscribe = (listener) => {
	listeners.add(listener);
	return () => listeners.delete(listener);
};
const current = () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

// No colour transition runs while the theme flips: every token changes in the
// same frame. The sheet comes off two frames later, once the new colours have
// been computed.
function withoutTransitions(update) {
	const style = document.createElement("style");
	style.appendChild(document.createTextNode("*{transition:none!important}"));
	document.head.appendChild(style);
	update();
	window.getComputedStyle(document.body);
	requestAnimationFrame(() => requestAnimationFrame(() => style.remove()));
}

function setTheme(mode) {
	withoutTransitions(() => {
		document.documentElement.dataset.theme = mode;
		document.documentElement.style.colorScheme = mode;
	});
	for (const listener of listeners) listener();
}

// The theme on screen. The server and the hydrating render report "light"
// (the server cannot know), then the real value, so the markup always matches.
export function useTheme() {
	return useSyncExternalStore(subscribe, current, () => "light");
}

// Flip the theme and remember it as the reader's choice.
export function useThemeToggle() {
	return useCallback(() => {
		const next = current() === "dark" ? "light" : "dark";
		try {
			localStorage.setItem(THEME_KEY, next);
		} catch {
			// Private mode: the choice lasts for this page only.
		}
		// The toggle's icon turns in only after a real change, never on load.
		document.documentElement.dataset.themeChanged = "";
		paintChrome(next);
		setTheme(next);
	}, []);
}

// With no stored choice the page follows the system while it is open; a
// choice made in another tab arrives through the storage event.
export function ThemeFollower() {
	useEffect(() => {
		// The script in <head> already set the theme; this confirms it once
		// the page is live.
		setTheme(stored() || systemTheme());
		const query = window.matchMedia("(prefers-color-scheme: dark)");
		const onSystem = () => {
			if (!stored()) setTheme(systemTheme());
		};
		const onStorage = (event) => {
			if (event.key !== THEME_KEY) return;
			const mode = stored() || systemTheme();
			paintChrome(mode);
			setTheme(mode);
		};
		query.addEventListener("change", onSystem);
		window.addEventListener("storage", onStorage);
		return () => {
			query.removeEventListener("change", onSystem);
			window.removeEventListener("storage", onStorage);
		};
	}, []);
	return null;
}
