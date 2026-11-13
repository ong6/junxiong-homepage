import { useColorMode } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";

// The theme is the reader's last choice, then the system's (STYLE.md, Theme).
// Only the toggle writes the choice; Chakra's own storage also recorded the
// system's value on a first visit, which froze the theme for every later one.
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

// Chakra's storage manager: read the choice, never write one. With nothing
// stored Chakra resolves "system" itself.
export const themeManager = { type: "localStorage", get: () => stored(), set: () => {} };

// The browser's own chrome (the address bar on a phone) follows the theme on
// screen, not only the system's.
const paintChrome = (mode) => {
	for (const meta of document.querySelectorAll('meta[name="theme-color"]')) meta.content = GROUND[mode];
};

// Runs in <head> before anything paints (pages/_document.js), so the first
// frame has the right ground, colour scheme and tokens. Kept dependency-free:
// it is serialised into the document.
export const themeScript = `(function(){var d=document.documentElement,s;try{s=localStorage.getItem(${JSON.stringify(THEME_KEY)})}catch(e){}var c=s==="light"||s==="dark",t=c?s:(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");d.dataset.theme=t;d.style.colorScheme=t;if(c){var m=document.querySelectorAll('meta[name="theme-color"]');for(var i=0;i<m.length;i++)m[i].content=t==="dark"?${JSON.stringify(GROUND.dark)}:${JSON.stringify(GROUND.light)}}})();`;

// Flip the theme and remember it as the reader's choice.
export function useThemeToggle() {
	const { colorMode, setColorMode } = useColorMode();
	return useCallback(() => {
		const next = colorMode === "dark" ? "light" : "dark";
		try {
			localStorage.setItem(THEME_KEY, next);
		} catch {
			// Private mode: the choice lasts for this page only.
		}
		// The toggle's icon turns in only after a real change, never on load.
		document.documentElement.dataset.themeChanged = "";
		paintChrome(next);
		setColorMode(next);
	}, [colorMode, setColorMode]);
}

// With no stored choice the page follows the system while it is open; a
// choice made in another tab arrives through the storage event.
export function ThemeFollower() {
	const { setColorMode } = useColorMode();
	useEffect(() => {
		const query = window.matchMedia("(prefers-color-scheme: dark)");
		const system = () => (query.matches ? "dark" : "light");
		const onSystem = () => {
			if (!stored()) setColorMode(system());
		};
		const onStorage = (event) => {
			if (event.key !== THEME_KEY) return;
			const mode = stored() || system();
			paintChrome(mode);
			setColorMode(mode);
		};
		query.addEventListener("change", onSystem);
		window.addEventListener("storage", onStorage);
		return () => {
			query.removeEventListener("change", onSystem);
			window.removeEventListener("storage", onStorage);
		};
	}, [setColorMode]);
	return null;
}
