import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Layout from "../components/layouts/Articles";
import Section from "../components/Section";
import ArchiveEntry from "../components/ArchiveEntry";
import works, { workSlugs } from "../lib/works";
import { ARTICLE_TITLE } from "../components/ArticleParts";

// A dated ledger, newest year first, derived from lib/works.js. An entry sits
// under the year it started, in the order the entries are declared there.
const ledger = [];
for (const id of workSlugs) {
	const { year } = works[id];
	let group = ledger.find((g) => g.year === year);
	if (!group) {
		group = { year, ids: [] };
		ledger.push(group);
	}
	group.ids.push(id);
}
ledger.sort((a, b) => b.year.localeCompare(a.year));

// /works#<slug> opens that entry and brings it under the fixed header: on
// load, on a hash change and on an in-app link to a hash. The old
// /works/<slug> pages redirect here (next.config.js).
const slugFromHash = () => {
	const slug = decodeURIComponent(window.location.hash.slice(1));
	return Object.hasOwn(works, slug) ? slug : null;
};

const Works = () => {
	const router = useRouter();
	const [open, setOpen] = useState({});

	const toggle = useCallback((id, isOpen) => {
		setOpen((current) => (Boolean(current[id]) === isOpen ? current : { ...current, [id]: isOpen }));
	}, []);

	useEffect(() => {
		// A jump opens the row at once (data-instant skips the slide), so the
		// page is already long enough to scroll it to the top.
		const openFromHash = () => {
			const slug = slugFromHash();
			const row = slug && document.getElementById(slug);
			if (!row) return;
			row.setAttribute("data-instant", "");
			row.open = true;
			toggle(slug, true);
			row.scrollIntoView({ block: "start" });
			requestAnimationFrame(() => requestAnimationFrame(() => row.removeAttribute("data-instant")));
		};
		openFromHash();
		window.addEventListener("hashchange", openFromHash);
		router.events.on("hashChangeComplete", openFromHash);
		return () => {
			window.removeEventListener("hashchange", openFromHash);
			router.events.off("hashChangeComplete", openFromHash);
		};
	}, [router.events, toggle]);

	return (
		<Layout
			title="Archive"
			description="Archive of Ong Jun Xiong's NUS projects, 2020 to 2023: hackathons, coursework, design work and open source. Current projects are on the homepage.">
			<Box pt={{ base: 10, md: 14 }}>
				<Flex align="baseline" justify="space-between" wrap="wrap" gap={2}>
					<Heading as="h1" fontSize={ARTICLE_TITLE} lineHeight="1" letterSpacing="-.045em">
						Archive, 2020&ndash;2023
					</Heading>
					<Text fontFamily="var(--font-mono)" fontSize="12px" color="text.muted">
						{workSlugs.length} entries
					</Text>
				</Flex>
				<Text mt={3} maxW="620px" fontSize="15px" lineHeight="text" color="text.muted">
					Projects from my NUS years, including coursework, hackathons and open-source contributions. Current projects are on the{" "}
					<Link as={NextLink} href="/#work">
						homepage
					</Link>
					.
				</Text>

				<Box mt={{ base: 8, md: 12 }}>
					{ledger.map((group, i) => (
						<Section key={group.year} delay={0.05 * (i + 1)}>
							<Flex direction={{ base: "column", md: "row" }} align="flex-start" gap={{ base: 2, md: 6 }} mb={{ base: 8, md: 10 }}>
								<Text
									as="h2"
									fontFamily="var(--font-mono)"
									fontSize={{ base: "13px", md: "14px" }}
									fontWeight="700"
									letterSpacing=".08em"
									color="brand.solid"
									w={{ md: "72px" }}
									flexShrink={0}
									pt={{ md: 4 }}>
									{group.year}
								</Text>
								<Box flex="1" minW={0} w="100%">
									{group.ids.map((id) => (
										<ArchiveEntry key={id} id={id} entry={works[id]} open={Boolean(open[id])} onToggle={toggle} />
									))}
								</Box>
							</Flex>
						</Section>
					))}
				</Box>
			</Box>
		</Layout>
	);
};

export default Works;
