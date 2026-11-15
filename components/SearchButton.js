import { Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

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

	useEffect(() => {
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
			<Box
				as="button"
				type="button"
				onClick={show}
				onPointerEnter={preload}
				onFocus={preload}
				onTouchStart={preload}
				aria-label={`Search (${shortcut})`}
				aria-haspopup="dialog"
				aria-expanded={open}
				aria-keyshortcuts="Meta+K Control+K"
				display="inline-flex"
				alignItems="center"
				justifyContent="center"
				gap={2}
				minW="44px"
				minH="44px"
				px={{ base: 0, lg: 3 }}
				border="1px solid"
				borderColor="border.subtle"
				borderRadius="4px"
				color="text.muted"
				bg="transparent"
				cursor="pointer"
				transition="background-color var(--dur-hover) ease, color var(--dur-hover) ease"
				_hover={{ bg: "surface.quiet", color: "page.text" }}>
				<SearchIcon boxSize="14px" />
				{/* From 992px it reads as a search field: label, then the shortcut. */}
				<Box as="span" aria-hidden="true" display={{ base: "none", lg: "inline" }} fontSize="13px" fontWeight="600" lineHeight="1">
					Search
				</Box>
				{/* Fixed width, so the ⌘K / Ctrl K swap after load moves nothing. */}
				<Box as="span" aria-hidden="true" display={{ base: "none", lg: "inline" }} w="6ch" fontFamily="mono" fontSize="12px" lineHeight="1" textAlign="right">
					{shortcut}
				</Box>
			</Box>
			{Menu && <Menu open={open} onOpenChange={setOpen} onClosed={restoreFocus} />}
		</>
	);
}
