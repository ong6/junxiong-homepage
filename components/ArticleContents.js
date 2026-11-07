import { Box, Link, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

// Wide-screen contents rail for long articles (STYLE.md, Layout: Article).
// From 1200px the 680px prose column leaves ~400px empty on its right; this
// rail fills it with the page's own section heads, sticky below the nav, the
// one being read marked. It reads the h2s already on the page, so it adds no
// words. Figures that break out to the full width carry an opaque ground and
// sit above the rail; only while one overlaps the rail's own box does the
// rail fade out (160ms, instant under reduced motion), so it is never seen
// half covered, and it returns as soon as the figure has passed. Below 1200px, without script, or with fewer than three sections it
// renders nothing and the page is unchanged.

const MIN_SECTIONS = 3;
const STICKY_TOP = 96;
const slug = (text) =>
	text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

export default function ArticleContents({ containerRef }) {
	const [items, setItems] = useState([]);
	const [active, setActive] = useState(null);
	const [covered, setCovered] = useState(false);
	const navRef = useRef(null);

	// Hide the rail only while a full-width element overlaps the rail's own box.
	// One IntersectionObserver watches the elements wider than the prose column
	// that reach into the rail's column, with its root shrunk to the rail's
	// vertical band (rootMargin), so plain text beside the rail never hides it.
	// The observer is rebuilt when the rail's height or the viewport changes.
	useEffect(() => {
		const root = containerRef.current;
		const nav = navRef.current;
		if (!root || !nav || typeof IntersectionObserver === "undefined") return undefined;
		let observer = null;
		const crossing = new Set();
		const build = () => {
			if (observer) observer.disconnect();
			crossing.clear();
			const r = nav.getBoundingClientRect();
			if (!r.width) return;
			// The band the rail occupies once it sticks (it sticks 96px from the
			// top before any wide figure reaches it).
			const top = STICKY_TOP;
			const bottom = Math.max(0, Math.round(window.innerHeight - STICKY_TOP - nav.offsetHeight));
			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => (e.isIntersecting ? crossing.add(e.target) : crossing.delete(e.target)));
					setCovered(crossing.size > 0);
				},
				{ rootMargin: `-${top}px 0px -${bottom}px 0px` },
			);
			// Wide = it reaches into the rail's column (a full-width figure, not a
			// prose-width screenshot).
			root.querySelectorAll("figure").forEach((f) => {
				if (f.parentElement && f.parentElement.closest("figure")) return;
				if (f.getBoundingClientRect().right > r.left) observer.observe(f);
			});
		};
		build();
		const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(build);
		if (ro) ro.observe(nav);
		window.addEventListener("resize", build);
		return () => {
			if (observer) observer.disconnect();
			if (ro) ro.disconnect();
			window.removeEventListener("resize", build);
		};
	}, [containerRef, items.length]);

	useEffect(() => {
		const root = containerRef.current;
		if (!root) return undefined;
		const heads = [...root.querySelectorAll("h2")].filter(
			(h) => !h.closest("figure, [data-contents-skip], [data-article-contents]"),
		);
		const seen = new Set();
		const found = heads.map((h) => {
			if (!h.id) {
				let id = slug(h.textContent) || "section";
				while (seen.has(id) || document.getElementById(id)) id += "-2";
				h.id = id;
			}
			seen.add(h.id);
			return { id: h.id, title: h.textContent.replace(/↗/g, "").trim() };
		});
		setItems(found);
		if (found.length < MIN_SECTIONS || typeof IntersectionObserver === "undefined") return undefined;
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible[0]) setActive(visible[0].target.id);
			},
			{ rootMargin: "-96px 0px -55% 0px" },
		);
		heads.forEach((h) => observer.observe(h));
		return () => observer.disconnect();
	}, [containerRef]);

	if (items.length < MIN_SECTIONS) return null;

	return (
		<Box
			data-article-contents
			position="absolute"
			top={{ base: 10, md: 16 }}
			right={0}
			bottom={0}
			w="224px"
			zIndex={0}
			display={{ base: "none", xl: "block" }}>
			<Box
				as="nav"
				ref={navRef}
				aria-label="On this page"
				position="sticky"
				top={`${STICKY_TOP}px`}
				opacity={covered ? 0 : 1}
				visibility={covered ? "hidden" : "visible"}
				transition={covered ? "opacity var(--dur-hover) ease, visibility 0s linear var(--dur-hover)" : "opacity var(--dur-hover) ease"}
				sx={{ "@media (prefers-reduced-motion: reduce)": { transition: "none" } }}>
				<Text
					fontFamily="var(--font-mono)"
					fontSize="12px"
					fontWeight="700"
					letterSpacing=".08em"
					textTransform="uppercase"
					color="brand.solid">
					{"// On this page"}
				</Text>
				<Box as="ol" listStyleType="none" m={0} mt={3} p={0} borderLeft="1px solid" borderColor="border.subtle">
					{items.map((item) => {
						const current = item.id === active;
						return (
							<Box as="li" key={item.id}>
								<Link
									href={`#${item.id}`}
									aria-current={current ? "location" : undefined}
									display="flex"
									alignItems="center"
									minH="32px"
									py={1}
									pl={4}
									ml="-1px"
									borderLeft="2px solid"
									borderColor={current ? "brand.solid" : "transparent"}
									color={current ? "page.text" : "text.muted"}
									fontSize="14px"
									fontWeight={current ? "700" : "500"}
									lineHeight="1.4"
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
			</Box>
		</Box>
	);
}
