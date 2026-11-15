import { Box, Link, Text, VisuallyHidden } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import OutArrow from "./OutArrow";

// The orientation parts of a long article (STYLE.md, Layout: Article).
//
// ArticleContents, from 1200px: the 680px prose column leaves ~400px empty on
// its right, and this side rail fills it: a few of the page's own facts
// beside the title and the lede, then a panel that sticks below the nav with
// the page's links out and the list of its sections, the one being read
// marked. Every word in it is already on the page. Figures that break out to
// the full width carry an opaque ground and sit above the rail; only while
// one overlaps the panel's own box does the panel fade out (160ms, instant
// under reduced motion), so it is never seen half covered.
//
// The facts and links repeat the meta line, the fact table and the closing
// Links out block, so the rail hides them from screen readers and the tab
// order (aria-hidden, tabIndex -1): those users meet each once, in reading
// order. The section list is the page's only contents list at that width,
// so it stays a real nav.
//
// SectionMenu, below 1200px: a 44px bar that slides out from under the
// header once the h1 has scrolled away. It names the section being read and
// opens the section list. Esc and a tap outside close it, focus moves into
// the list and back, it is fixed so it never shifts the page, and it keeps a
// focused element clear of itself. Pages with fewer than three sections get
// neither list.

const MIN_SECTIONS = 3;
const STICKY_TOP = 96;
const slug = (text) =>
	text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

const label = {
	fontFamily: "var(--font-mono)",
	fontSize: "12px",
	fontWeight: "700",
	letterSpacing: ".08em",
	textTransform: "uppercase",
	color: "brand.solid",
};

// The page's h2s (figure titles, the Next card and these parts excluded),
// given ids, and the one being read: the last head above a line 45% down
// the window, or the last head once the page is scrolled to its end.
function useSections(containerRef) {
	const [items, setItems] = useState([]);
	const [active, setActive] = useState(null);

	useEffect(() => {
		const root = containerRef.current;
		if (!root) return undefined;
		const heads = [...root.querySelectorAll("h2")].filter(
			(h) => !h.closest("figure, [data-contents-skip], [data-article-contents], [data-section-menu]"),
		);
		const seen = new Set();
		const found = heads.map((h) => {
			if (!h.id) {
				let id = slug(h.textContent) || "section";
				while (seen.has(id) || document.getElementById(id)) id += "-2";
				h.id = id;
			}
			seen.add(h.id);
			// A heading may name itself for the list (data-contents-title) when
			// its text carries more, such as a link's "(opens in a new tab)".
			return { id: h.id, title: (h.dataset.contentsTitle || h.textContent).replace(/↗/g, "").trim() };
		});
		setItems(found);
		if (found.length < MIN_SECTIONS) return undefined;
		let frame = 0;
		const update = () => {
			frame = 0;
			const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
			const line = atEnd ? window.innerHeight : window.innerHeight * 0.45;
			let current = null;
			for (const h of heads) if (h.getBoundingClientRect().top < line) current = h.id;
			setActive(current);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [containerRef]);

	return { items: items.length >= MIN_SECTIONS ? items : [], active };
}

function RailFacts({ facts }) {
	return (
		<Box aria-hidden="true" data-rail-facts>
			<Text sx={label}>{"// Facts"}</Text>
			<Box as="dl" m={0} mt={3} borderTop="1px solid" borderColor="border.subtle" fontFamily="var(--font-mono)" fontSize="12px" lineHeight="text">
				{facts.map(([name, value]) => (
					<Box key={name} py={2} borderBottom="1px solid" borderColor="border.subtle">
						<Box as="dt" color="text.muted">
							{name}
						</Box>
						<Box as="dd" m={0} color="page.text" sx={{ textWrap: "pretty" }}>
							{value}
						</Box>
					</Box>
				))}
			</Box>
		</Box>
	);
}

function RailLinks({ links }) {
	return (
		<Box aria-hidden="true" data-rail-links>
			<Text sx={label}>{"// Links out"}</Text>
			<Box as="ul" listStyleType="none" m={0} mt={3} p={0} borderTop="1px solid" borderColor="border.subtle">
				{links.map(({ name, detail, href, external }) => (
					<Box as="li" key={href} borderBottom="1px solid" borderColor="border.subtle">
						<Link
							as={external ? undefined : NextLink}
							href={href}
							prefetch={external ? undefined : false}
							target={external ? "_blank" : undefined}
							rel={external ? "noopener noreferrer" : undefined}
							tabIndex={-1}
							display="block"
							py={2}
							color="page.text"
							textDecoration="none"
							_hover={{ textDecoration: "none", "& [data-name]": { color: "brand.solid" } }}>
							<Box as="span" display="flex" alignItems="baseline" justifyContent="space-between" gap={2}>
								<Text as="span" data-name fontSize="14px" fontWeight="700" lineHeight="label" transition="color var(--dur-hover) ease">
									{name}
								</Text>
								<OutArrow flexShrink={0} fontSize="12px" color="brand.solid" />
							</Box>
							{external && <VisuallyHidden> (opens in a new tab)</VisuallyHidden>}
							{detail && (
								<Text as="span" display="block" mt={1} color="text.muted" fontSize="12px" lineHeight="text">
									{detail}
								</Text>
							)}
						</Link>
					</Box>
				))}
			</Box>
		</Box>
	);
}

// One row per section, the one being read marked with the accent rule.
function SectionList({ items, active, rowH, onPick }) {
	return (
		<Box as="ol" listStyleType="none" m={0} p={0} borderLeft="1px solid" borderColor="border.subtle">
			{items.map((item) => {
				const current = item.id === active;
				return (
					<Box as="li" key={item.id}>
						<Link
							href={`#${item.id}`}
							onClick={onPick ? () => onPick(item.id) : undefined}
							aria-current={current ? "location" : undefined}
							display="flex"
							alignItems="center"
							minH={rowH}
							py={1}
							pl={4}
							pr={2}
							ml="-1px"
							borderLeft="2px solid"
							borderColor={current ? "brand.solid" : "transparent"}
							color={current ? "page.text" : "text.muted"}
							fontSize="14px"
							fontWeight={current ? "700" : "500"}
							lineHeight="label"
							textDecoration="none"
							transition="color var(--dur-hover) ease, border-color var(--dur-hover) ease"
							sx={{ "@media (pointer: coarse)": { minHeight: "44px" } }}
							_hover={{ color: "page.text", textDecoration: "none" }}>
							{item.title}
						</Link>
					</Box>
				);
			})}
		</Box>
	);
}

export default function ArticleContents({ containerRef, contents = false, facts, links }) {
	const { items, active } = useSections(containerRef);
	// Hidden until the first measure, so it is never painted half covered.
	const [covered, setCovered] = useState(true);
	const [factsFit, setFactsFit] = useState(true);
	const slotRef = useRef(null);
	const factsRef = useRef(null);
	const panelRef = useRef(null);
	const sections = contents ? items : [];
	const hasFacts = Boolean(facts && facts.length);
	const hasLinks = Boolean(links && links.length);
	const shown = hasFacts || hasLinks || sections.length > 0;

	// The facts sit beside the title and the lede and scroll away with them, so
	// the right side is filled at first view; the links and the section list
	// follow the reader. If the facts would run into the first full-width
	// figure they join the sticky panel instead.
	// The panel hides only while a full-width figure overlaps its own box:
	// figures wider than the prose column that reach into the rail's column are
	// measured against the panel once per frame while scrolling, so plain text
	// beside the rail never hides it.
	useEffect(() => {
		const root = containerRef.current;
		const slot = slotRef.current;
		const panel = panelRef.current;
		if (!root || !slot || !panel) return undefined;
		let wide = [];
		let frame = 0;
		const check = () => {
			frame = 0;
			const r = panel.getBoundingClientRect();
			if (!r.width) return;
			setCovered(
				wide.some((f) => {
					const b = f.getBoundingClientRect();
					return b.top < r.bottom + 8 && b.bottom > r.top - 8;
				}),
			);
		};
		const queue = () => {
			if (!frame) frame = requestAnimationFrame(check);
		};
		const build = () => {
			const s = slot.getBoundingClientRect();
			if (!s.width) return;
			wide = [...root.querySelectorAll("figure")].filter((f) => !(f.parentElement && f.parentElement.closest("figure")) && f.getBoundingClientRect().right > s.left);
			const factsEl = factsRef.current;
			if (factsEl) {
				const end = s.top + factsEl.offsetHeight + 24;
				setFactsFit(!wide.some((f) => {
					const b = f.getBoundingClientRect();
					return b.top < end && b.bottom > s.top;
				}));
			}
			queue();
		};
		build();
		const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(build);
		if (ro) {
			ro.observe(panel);
			ro.observe(root);
		}
		window.addEventListener("resize", build);
		window.addEventListener("scroll", queue, { passive: true });
		return () => {
			if (frame) cancelAnimationFrame(frame);
			if (ro) ro.disconnect();
			window.removeEventListener("resize", build);
			window.removeEventListener("scroll", queue);
		};
	}, [containerRef, shown, sections.length]);

	if (!shown) return null;

	const factsBlock = hasFacts ? (
		<Box ref={factsRef}>
			<RailFacts facts={facts} />
		</Box>
	) : null;

	return (
		<Box
			ref={slotRef}
			data-article-contents
			position="absolute"
			top={{ base: 10, md: 16 }}
			right={0}
			bottom={0}
			w="224px"
			zIndex={0}
			display={{ base: "none", xl: "block" }}>
			{factsFit && factsBlock && <Box mb={8}>{factsBlock}</Box>}
			<Box
				ref={panelRef}
				data-rail
				position="sticky"
				top={`${STICKY_TOP}px`}
				maxH={`calc(100vh - ${STICKY_TOP + 24}px)`}
				overflowY="auto"
				display="flex"
				flexDirection="column"
				gap={8}
				opacity={covered ? 0 : 1}
				visibility={covered ? "hidden" : "visible"}
				transition={covered ? "opacity var(--dur-hover) ease, visibility 0s linear var(--dur-hover)" : "opacity var(--dur-hover) ease"}
				sx={{
					scrollbarWidth: "thin",
					// The panel clips its overflow, so its rings are drawn inside.
					"& a:focus-visible": { outlineOffset: "-2px", transition: "none" },
					"@media (prefers-reduced-motion: reduce)": { transition: "none" },
				}}>
				{!factsFit && factsBlock}
				{hasLinks && <RailLinks links={links} />}
				{sections.length > 0 && (
					<Box as="nav" aria-label="On this page">
						<Text sx={label} mb={3}>
							{"// On this page"}
						</Text>
						<SectionList items={sections} active={active} rowH="32px" />
					</Box>
				)}
			</Box>
		</Box>
	);
}

// Moves focus to a section's heading after a jump, so the next Tab continues
// from there. The heading takes focus without a ring (it is not a control).
function focusHeading(id) {
	const head = document.getElementById(id);
	if (!head) return;
	if (!head.hasAttribute("tabindex")) head.setAttribute("tabindex", "-1");
	head.focus({ preventScroll: true });
}

const Chevron = ({ open }) => (
	<Box
		as="svg"
		aria-hidden="true"
		viewBox="0 0 12 12"
		w="12px"
		h="12px"
		flexShrink={0}
		transform={open ? "rotate(180deg)" : "none"}
		transition="transform var(--dur-hover) var(--ease-out)"
		sx={{ "@media (prefers-reduced-motion: reduce)": { transition: "none" } }}>
		<path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</Box>
);

const noSubscribe = () => () => {};
const headerHost = () => {
	const nav = document.querySelector('nav[aria-label="Site"]');
	return nav ? nav.parentElement : document.body;
};

export function SectionMenu({ containerRef }) {
	const { items, active } = useSections(containerRef);
	const [shown, setShown] = useState(false);
	const [open, setOpen] = useState(false);
	const [linksOut, setLinksOut] = useState(false);
	const barRef = useRef(null);
	const buttonRef = useRef(null);
	const panelRef = useRef(null);
	const panelId = useId();
	const ready = items.length > 0;
	// The bar lives in the site header, after the site nav: outside the
	// article, whose entrance transform would otherwise hold a fixed box, and
	// early in the tab order, as a page-level control. Client only; it is
	// hidden until the reader scrolls anyway.
	const host = useSyncExternalStore(noSubscribe, headerHost, () => null);

	// Show the bar once the h1 is under the header.
	useEffect(() => {
		const root = containerRef.current;
		const h1 = root && root.querySelector("h1");
		if (!ready || !h1) return undefined;
		let frame = 0;
		const check = () => {
			frame = 0;
			const header = document.querySelector('nav[aria-label="Site"]');
			const edge = header ? header.getBoundingClientRect().bottom : 64;
			const visible = h1.getBoundingClientRect().bottom < edge;
			setShown(visible);
			if (!visible) setOpen(false);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(check);
		};
		check();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		setLinksOut(Boolean(document.getElementById("links-out")));
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [containerRef, ready]);

	// Open: focus the current row; Esc closes and returns focus to the button;
	// a tap or click outside closes.
	useEffect(() => {
		if (!open) return undefined;
		const panel = panelRef.current;
		const first = panel && (panel.querySelector("[aria-current]") || panel.querySelector("a"));
		if (first) first.focus({ preventScroll: true });
		const onKey = (e) => {
			if (e.key !== "Escape") return;
			e.preventDefault();
			setOpen(false);
			if (buttonRef.current) buttonRef.current.focus();
		};
		const onPointer = (e) => {
			if (barRef.current && !barRef.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener("keydown", onKey);
		document.addEventListener("pointerdown", onPointer);
		return () => {
			document.removeEventListener("keydown", onKey);
			document.removeEventListener("pointerdown", onPointer);
		};
	}, [open]);

	// Never let the bar cover the focused element: once the browser has
	// scrolled a newly focused element into view, nudge it below the bar.
	useEffect(() => {
		if (!shown) return undefined;
		let frame = 0;
		const onFocus = (e) => {
			const el = e.target;
			// Not the section heads a jump focuses mid-scroll, and nothing that
			// doesn't scroll with the page (the header, the skip link, dialogs).
			if (!(el instanceof Element) || el.tagName === "H2" || el.id === "links-out" || !barRef.current) return;
			for (let node = el; node && node !== document.body; node = node.parentElement) {
				if (getComputedStyle(node).position === "fixed") return;
			}
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				if (!barRef.current) return;
				const edge = barRef.current.getBoundingClientRect().bottom + 8;
				const box = el.getBoundingClientRect();
				if (box.top < edge && box.bottom > 0) window.scrollBy({ top: box.top - edge - 8, behavior: "instant" });
			});
		};
		document.addEventListener("focusin", onFocus);
		return () => {
			cancelAnimationFrame(frame);
			document.removeEventListener("focusin", onFocus);
		};
	}, [shown]);

	if (!ready || !host) return null;

	const index = items.findIndex((item) => item.id === active);
	const current = index >= 0 ? items[index] : null;
	// Close after the browser has followed the link (the hash, the jump and
	// the scroll-margin behave as for any in-page link), then move focus to
	// the section's heading.
	const pick = (id) => {
		requestAnimationFrame(() => {
			setOpen(false);
			focusHeading(id);
		});
	};

	return createPortal(
		<Box
			ref={barRef}
			data-section-menu
			data-shown={shown ? "" : undefined}
			position="fixed"
			top={{ base: "64px", md: "72px" }}
			left={0}
			right={0}
			zIndex={19}
			display={{ base: "block", xl: "none" }}
			bg="rgba(243,239,231,.9)"
			borderBottom="1px solid"
			borderColor="border.subtle"
			css={{ backdropFilter: "blur(14px)" }}
			transform={shown ? "none" : "translateY(-100%)"}
			visibility={shown ? "visible" : "hidden"}
			transition={
				shown
					? "transform var(--dur-ui) var(--ease-out)"
					: "transform var(--dur-ui) var(--ease-out), visibility 0s linear var(--dur-ui)"
			}
			onBlur={(e) => {
				if (open && barRef.current && !barRef.current.contains(e.relatedTarget)) setOpen(false);
			}}
			sx={{
				"html[data-theme=dark] &": { bg: "rgba(21,19,17,.9)" },
				"@media (prefers-reduced-motion: reduce)": { transition: "none" },
			}}>
			<Box maxW="1120px" mx="auto" px={4} position="relative">
				<Box
					as="button"
					type="button"
					ref={buttonRef}
					aria-expanded={open}
					aria-controls={open ? panelId : undefined}
					onClick={() => setOpen((value) => !value)}
					display="flex"
					alignItems="center"
					gap={3}
					w="100%"
					maxW="680px"
					minH="44px"
					px={0}
					bg="transparent"
					color="page.text"
					textAlign="left"
					cursor="pointer"
					sx={{ "&:focus-visible": { outlineOffset: "-2px" } }}>
					<Text as="span" sx={label} flexShrink={0}>
						{current ? `${index + 1} / ${items.length}` : "// On this page"}
					</Text>
					{current && <VisuallyHidden>On this page, section:</VisuallyHidden>}
					<Text as="span" flex="1" minW={0} fontSize="14px" fontWeight="700" lineHeight="label" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
						{current ? current.title : ""}
					</Text>
					<Chevron open={open} />
				</Box>
				{open && (
					<Box
						as="nav"
						id={panelId}
						ref={panelRef}
						aria-label="On this page"
						position="absolute"
						top="calc(100% + 8px)"
						left={4}
						right={4}
						maxW="680px"
						maxH={{ base: "calc(100dvh - 64px - 45px - 24px)", md: "calc(100dvh - 72px - 45px - 24px)" }}
						overflowY="auto"
						bg="surface.raised"
						border="1px solid"
						borderColor="border.subtle"
						borderRadius="6px"
						px={4}
						py={3}
						sx={{ "& a:focus-visible": { outlineOffset: "-2px" } }}>
						<SectionList items={items} active={active} rowH="44px" onPick={pick} />
						{linksOut && (
							<Link
								href="#links-out"
								onClick={() => pick("links-out")}
								display="flex"
								alignItems="center"
								minH="44px"
								mt={2}
								pt={2}
								borderTop="1px solid"
								borderColor="border.subtle"
								fontSize="14px"
								fontWeight="700"
								textDecoration="none"
								color="page.text"
								_hover={{ textDecoration: "none", color: "brand.solid" }}>
								Links out
							</Link>
						)}
					</Box>
				)}
			</Box>
		</Box>,
		host,
	);
}
