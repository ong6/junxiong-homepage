import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Layout from "../components/layouts/Articles";
import Section from "../components/Section";
import works, { workSlugs } from "../lib/works";

// A dated ledger, newest year first, derived from lib/works.js. An entry sits
// under the year it started, in the order the entries are declared there.
const ledger = [];
for (const id of workSlugs) {
	const { year, title, note, summary, thumbnail } = works[id];
	let group = ledger.find((g) => g.year === year);
	if (!group) {
		group = { year, entries: [] };
		ledger.push(group);
	}
	group.entries.push({ id, title, note, description: summary, thumbnail });
}
ledger.sort((a, b) => b.year.localeCompare(a.year));

const Row = ({ entry, rule }) => (
	<Flex
		as={NextLink}
		href={`/works/${entry.id}`}
		align="flex-start"
		gap={4}
		py={4}
		borderTopWidth="1px"
		borderColor={rule}
		data-group
		_hover={{ bg: "surface.raised" }}
		transitionProperty="background-color"
		transitionDuration="140ms">
		<Box
			position="relative"
			flexShrink={0}
			w={{ base: "56px", md: "72px" }}
			h={{ base: "36px", md: "46px" }}
			rounded="md"
			overflow="hidden"
			bg={entry.thumbnail.background || "surface.quiet"}>
			<Image
				src={entry.thumbnail.src}
				alt=""
				fill
				sizes="72px"
				style={{ objectFit: "contain", padding: entry.thumbnail.padding || "0" }}
			/>
		</Box>
		<Box minW={0}>
			<Flex align="baseline" wrap="wrap" columnGap={3} rowGap={0}>
				<Text
					fontSize={{ base: "16px", md: "17px" }}
					fontWeight="700"
					_groupHover={{ textDecoration: "underline" }}
					textUnderlineOffset="3px">
					{entry.title}
				</Text>
				{entry.note && (
					<Text
						fontFamily="var(--font-mono)"
						fontSize="11px"
						color="text.muted"
						whiteSpace="nowrap">
						{entry.note}
					</Text>
				)}
			</Flex>
			<Text fontSize="15px" lineHeight="1.6" color="text.muted" mt={1}>
				{entry.description}
			</Text>
		</Box>
	</Flex>
);

const Works = () => {
	const rule = useColorModeValue("rgba(26,36,32,.16)", "rgba(230,235,232,.14)");
	const yearColor = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="Archive"
			description="Archive of Ong Jun Xiong's NUS projects, 2020 to 2023: hackathons, coursework, design work and open source. Current work lives on the resume.">
			<Box pt={{ base: 10, md: 14 }}>
				<Flex align="baseline" justify="space-between" wrap="wrap" gap={2}>
					<Heading as="h1" fontSize={{ base: "26px", md: "30px" }}>
						Archive, 2020&ndash;2023
					</Heading>
					<Text fontFamily="var(--font-mono)" fontSize="11px" color="text.muted">
						{workSlugs.length} entries
					</Text>
				</Flex>
				<Text mt={3} maxW="620px" fontSize="15px" lineHeight="1.7" color="text.muted">
					Everything I built during my NUS years. I keep the list as a record of what we made back
					then. What I work on now is on my resume.
				</Text>

				<Box mt={{ base: 8, md: 12 }}>
					{ledger.map((group, i) => (
						<Section key={group.year} delay={0.05 * (i + 1)}>
							<Flex
								direction={{ base: "column", md: "row" }}
								align="flex-start"
								gap={{ base: 2, md: 6 }}
								mb={{ base: 8, md: 10 }}>
								<Text
									fontFamily="var(--font-mono)"
									fontSize={{ base: "13px", md: "14px" }}
									fontWeight="700"
									letterSpacing=".06em"
									color={yearColor}
									w={{ md: "72px" }}
									flexShrink={0}
									pt={{ md: 4 }}>
									{group.year}
								</Text>
								<Box flex="1" minW={0} w="100%">
									{group.entries.map((entry) => (
										<Row key={entry.id} entry={entry} rule={rule} />
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
