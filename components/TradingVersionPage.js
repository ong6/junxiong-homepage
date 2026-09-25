import { Box, Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import DiagramFigure from "./DiagramFigure";
import Layout from "./layouts/Articles";
import VersionSwitcher from "./VersionSwitcher";
import { VERSIONS } from "../lib/tradingVersions";

// One past version of the trading engine: the switcher, a lead, the diagram as
// the engine stood then, a short write-up and a fact table. The current engine
// lives at /trading-engine; these pages keep the older shapes readable.

export const P = (props) => <Text mt={5} fontSize={{ base: "17px", md: "18px" }} lineHeight="1.8" {...props} />;

export const H2 = (props) => (
	<Heading as="h2" mt={{ base: 12, md: 14 }} fontSize={{ base: "22px", md: "24px" }} {...props} />
);

export const Code = (props) => <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em" {...props} />;

function Facts({ facts }) {
	return (
		<Box
			as="dl"
			mt={{ base: 12, md: 14 }}
			borderTop="1px solid"
			borderColor="border.subtle"
			fontFamily="var(--font-mono)"
			fontSize="12px">
			{facts.map(([label, value]) => (
				<Flex
					key={label}
					direction={{ base: "column", md: "row" }}
					justify="space-between"
					gap={{ base: 1, md: 4 }}
					py={{ base: 3, md: 2 }}
					borderBottom="1px solid"
					borderColor="border.subtle">
					<Box as="dt" color="text.muted">
						{label}
					</Box>
					<Box as="dd" ml={0} textAlign={{ base: "left", md: "right" }} fontWeight="700">
						{value}
					</Box>
				</Flex>
			))}
		</Box>
	);
}

function Neighbours({ v }) {
	const i = VERSIONS.findIndex((version) => version.v === v);
	const prev = VERSIONS[i - 1];
	const next = VERSIONS[i + 1];
	return (
		<Flex as="nav" aria-label="Previous and next version" mt={{ base: 12, md: 16 }} gap={4} borderTop="1px solid" borderColor="border.subtle" pt={6}>
			{[prev && ["← Previous", prev], next && ["Next →", next]].filter(Boolean).map(([dir, version]) => (
				<Link
					key={version.v}
					as={NextLink}
					href={version.href}
					prefetch={false}
					flex="1"
					textAlign={dir.startsWith("Next") ? "right" : "left"}
					textDecoration="none"
					_hover={{ textDecoration: "none", "& [data-title]": { color: "brand.solid" } }}>
					<Text fontFamily="var(--font-mono)" fontSize="12px" color="text.muted" letterSpacing=".06em">
						{dir} · {version.v}
					</Text>
					<Text data-title mt={1} fontWeight="700">
						{version.title}
					</Text>
				</Link>
			))}
		</Flex>
	);
}

export default function TradingVersionPage({ v, description, lead, diagram, caption, facts, children }) {
	const version = VERSIONS.find((item) => item.v === v);
	return (
		<Layout title={`Trading engine ${v}: ${version.title}`} description={description} schema={{ type: "TechArticle" }}>
			<Container maxW="680px" px={0} ml={0}>
				<Box pt={{ base: 10, md: 16 }}>
					<Link as={NextLink} href="/trading-engine" display="inline-flex" alignItems="center" minH="32px" my={-1.5} fontSize="13px" fontWeight="700">
						← Trading engine
					</Link>
					<Heading as="h1" mt={{ base: 8, md: 10 }} fontSize={{ base: "36px", md: "46px" }} lineHeight="1.05" letterSpacing="-.04em">
						{version.title}
					</Heading>
					<VersionSwitcher active={v} mt={6} />
					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						{lead}
					</Text>
				</Box>

				<DiagramFigure id={`te-${v}`} headingLevel={2} diagram={diagram} caption={caption} />

				{children}

				<Facts facts={facts} />
				<Neighbours v={v} />
			</Container>
		</Layout>
	);
}
