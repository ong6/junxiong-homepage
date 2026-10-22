import {
	Box,
	Container,
	Heading,
	Link,
	LinkBox,
	LinkOverlay,
	Text,
	VisuallyHidden,
	useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import CaseStudyFooter from "../components/CaseStudyFooter";
import OutArrow from "../components/OutArrow";
import Layout from "../components/layouts/Articles";
import { AI_TOOLING } from "../lib/aiTooling";

const mono = {
	fontFamily: "var(--font-mono)",
	fontSize: "12px",
	fontWeight: "700",
	letterSpacing: ".08em",
	textTransform: "uppercase",
};

// One framed column, a row per layer, so the page reads as a stack. The layer
// sits above the name rather than in a side column, so every row shares one left edge.
function Layer({ tool, index }) {
	return (
		<LinkBox
			as="article"
			data-group
			data-reveal
			data-fill
			data-tone="agents"
			style={{ "--i": index }}
			borderTop={index ? "1px solid" : undefined}
			borderColor="border.subtle"
			p={{ base: 6, md: 8 }}
			transition="border-color 160ms ease">
			<Text sx={mono} color="brand.solid">
				{String(index + 1).padStart(2, "0")} · {tool.layer}
				<Box as="span" color="text.muted" fontWeight="500">
					{" · "}
					{tool.when}
				</Box>
			</Text>
			<Heading as="h2" mt={2} fontSize={{ base: "24px", md: "28px" }} lineHeight="1.1">
				<LinkOverlay
					{...(tool.external
						? { href: tool.href, target: "_blank", rel: "noopener noreferrer" }
						: { as: NextLink, href: tool.href, prefetch: false })}
					color="inherit"
					display="inline-flex"
					alignItems="center"
					minH="44px">
					{tool.name}
					{tool.external && <VisuallyHidden> (opens in a new tab)</VisuallyHidden>}
					<OutArrow ml={2} color="brand.solid" />
				</LinkOverlay>
			</Heading>
			<Text mt={2} fontSize={{ base: "17px", md: "18px" }} lineHeight="1.75">
				{tool.detail}
			</Text>
			<Text mt={3} color="text.muted" fontFamily="var(--font-mono)" fontSize="12px">
				{tool.meta}
			</Text>
		</LinkBox>
	);
}

export default function AiTooling() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="AI tooling"
			description="Open-source tools for AI agents, by layer: Workbase for memory, Agent skills for context, Skillsmith for evaluation and Groundplane for runtime checks.">
			<Container maxW="680px" px={0} ml={0}>
				<Box pt={{ base: 10, md: 16 }}>
					<Link
						as={NextLink}
						href="/#work"
						display="inline-flex"
						alignItems="center"
						minH="32px"
						my={-1.5}
						fontSize="13px"
						fontWeight="700">
						← Selected projects
					</Link>

					<Heading
						as="h1"
						mt={{ base: 8, md: 10 }}
						fontSize={{ base: "40px", md: "52px" }}
						lineHeight="1"
						letterSpacing="-.045em">
						AI tooling
					</Heading>

					<Text
						mt={4}
						color={accent}
						fontFamily="var(--font-mono)"
						fontSize="12px"
						fontWeight="700"
						letterSpacing=".1em"
						textTransform="uppercase">
						2026 · open source · {AI_TOOLING.length} tools
					</Text>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						I use coding agents every day and build them at work, and these are the tools I ended up
						writing around them. They&apos;re ordered by where they sit in an agent&apos;s run, from
						what it reads before it starts to checking what it says at the end.
					</Text>
				</Box>

				<Box
					as="section"
					aria-label="Tools by layer"
					mt={{ base: 10, md: 12 }}
					bg="surface.raised"
					border="1px solid"
					borderColor="border.subtle"
					borderRadius="6px"
					overflow="clip">
					{AI_TOOLING.map((tool, index) => (
						<Layer key={tool.href} tool={tool} index={index} />
					))}
				</Box>

				<CaseStudyFooter
					next={{
						name: "Compoze",
						href: "/compoze",
						detail: "Document-grounded assistants, a company I ran alone and sold to a client",
					}}
				/>
			</Container>
		</Layout>
	);
}
