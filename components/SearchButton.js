import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { SearchIcon } from "./icons";
import styles from "./SearchButton.module.css";

// The header's search control and the ⌘K / Ctrl+K shortcut. The menu itself
// (cmdk and the site index) is fetched on first intent: hovering or focusing
// this button, or the shortcut. Nothing of it is in a page's first load.
let menuModule;
const loadMenu = () => {
	menuModule ||= import("./CommandMenu").then(
		(mod) => mod.default,
		(error) => {
			menuModule = null;
			throw error;
		},
	);
	return menuModule;
};
const preload = () => {
	loadMenu().catch(() => {});
};

// The shortcut listener goes on in the commit that hydrates the header, not
// a frame later, so a ⌘K pressed as the page finishes loading is caught.
const useCommitEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// The hint says ⌘K on Apple devices and Ctrl K elsewhere; the server renders ⌘K.
const noSubscribe = () => () => {};
const isApple = () => /Mac|iPhone|iPad/i.test(navigator.userAgentData?.platform || navigator.platform || "");

export default function SearchButton() {
	const [Menu, setMenu] = useState(null);
	const [open, setOpen] = useState(false);
	const mac = useSyncExternalStore(noSubscribe, isApple, () => true);
	const openRef = useRef(false);
	const opener = useRef(null);

	const show = useCallback(() => {
		opener.current = document.activeElement;
		loadMenu()
			.then((component) => {
				setMenu(() => component);
				setOpen(true);
			})
			.catch(() => {});
	}, []);

	useEffect(() => {
		openRef.current = open;
	}, [open]);

	useCommitEffect(() => {
		const onKey = (event) => {
			if (event.key?.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return;
			event.preventDefault();
			if (openRef.current) setOpen(false);
			else show();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [show]);

	// Focus goes back to whatever had it before the menu opened.
	const restoreFocus = useCallback(() => {
		const el = opener.current;
		opener.current = null;
		if (el && el !== document.body && el.isConnected) el.focus({ preventScroll: true });
	}, []);

	const shortcut = mac ? "⌘K" : "Ctrl K";

	return (
		<>
			<button
				type="button"
				className={styles.button}
				onClick={show}
				onPointerEnter={preload}
				onFocus={preload}
				onTouchStart={preload}
				aria-label={`Search (${shortcut})`}
				aria-haspopup="dialog"
				aria-expanded={open}
				aria-keyshortcuts="Meta+K Control+K">
				<SearchIcon className={styles.icon} />
				{/* From 960px it reads as a search field: label, then the shortcut. */}
				<span aria-hidden="true" className={styles.label}>
					Search
				</span>
				{/* Fixed width, so the ⌘K / Ctrl K swap after load moves nothing. */}
				<span aria-hidden="true" className={styles.shortcut}>
					{shortcut}
				</span>
			</button>
			{Menu && <Menu open={open} onOpenChange={setOpen} onClosed={restoreFocus} />}
		</>
	);
}
