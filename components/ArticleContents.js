import { Box, Link, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

// Wide-screen contents rail for long articles (STYLE.md, Layout: Article).
// From 1200px the 680px prose column leaves ~400px empty on its right; this
// rail fills it with the page's own section heads, sticky below the nav, the
// one being read marked. It reads the h2s already on the page, so it adds no
// words. Figures that break out to the full width carry an opaque ground and
// sit above the rail; while one crosses the rail's band the rail fades out
// (160ms) so it is never seen half covered, and it returns after the figure. Below 1200px, without script, or with fewer than three sections it
// renders nothing and the page is unchanged.

const MIN_SECTIONS = 3;
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

	// Fade out while a figure wider than the prose column crosses the rail.
	useEffect(() => {
		const root = containerRef.current;
		const nav = navRef.current;
		if (!root || !nav) return undefined;
		let frame = 0;
		const check = () => {
			frame = 0;
			const r = nav.getBoundingClientRect();
			if (!r.width) return;
			const hit = [...root.querySelectorAll("figure")].some((f) => {
				const b = f.getBoundingClientRect();
				return b.right > r.left && b.top < r.bottom && b.bottom > r.top;
			});
			setCovered(hit);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(check);
		};
		check();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (frame) cancelAnimationFrame(frame);
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
				top="96px"
				opacity={covered ? 0 : 1}
				visibility={covered ? "hidden" : "visible"}
				transition={covered ? "opacity var(--dur-hover) ease, visibility 0s linear var(--dur-hover)" : "opacity var(--dur-hover) ease"}>
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
