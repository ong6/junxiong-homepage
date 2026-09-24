import {
	Box,
	Flex,
	Grid,
	Heading,
	Link,
	LinkBox,
	LinkOverlay,
	SimpleGrid,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";

const labelStyle = {
	fontFamily: "var(--font-mono)",
	fontSize: "12px",
	fontWeight: "700",
	letterSpacing: ".08em",
	textTransform: "uppercase",
};

function ProjectLink({ href, children }) {
	return (
		<LinkOverlay as={NextLink} href={href} prefetch={false} color="inherit" display="inline-flex" alignItems="center" minH="44px">
			{children}
			<Box
				as="span"
				aria-hidden="true"
				ml={2}
				color="brand.solid"
				display="inline-block"
				transition="transform 160ms ease"
				_groupHover={{ transform: "translateX(4px)" }}
				sx={{ "@media (prefers-reduced-motion: reduce)": { transition: "none", transform: "none !important" } }}>
				→
			</Box>
		</LinkOverlay>
	);
}

function FeaturedCard({ span, children }) {
	return (
		<LinkBox
			as="article"
			role="group"
			gridColumn={{ base: "1 / -1", lg: `span ${span}` }}
			minW={0}
			bg="surface.raised"
			border="1px solid"
			borderColor="border.subtle"
			borderRadius="6px"
			overflow="hidden"
			display="flex"
			flexDirection="column"
			transition="transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease"
			_hover={{
				transform: "translateY(-2px)",
				borderColor: "border.strong",
				boxShadow: "0 18px 42px -34px rgba(39,32,27,.65)",
			}}
			sx={{ "@media (prefers-reduced-motion: reduce)": { transition: "none", _hover: { transform: "none" } } }}>
			{children}
		</LinkBox>
	);
}

function DottedCanvas({ children }) {
	const dot = useColorModeValue("rgba(36,87,197,.17)", "rgba(142,174,255,.18)");
	return (
		<Box
			border="1px solid"
			borderColor="border.subtle"
			borderRadius="4px"
			bg="preview.canvas"
			backgroundImage={`radial-gradient(${dot} 1px, transparent 1px)`}
			backgroundSize="12px 12px"
			p={{ base: 4, md: 5 }}>
			{children}
		</Box>
	);
}

function CardCopy({ eyebrow, title, href, description }) {
	return (
		<Box p={{ base: 5, md: 7 }} pb={{ base: 4, md: 5 }}>
			<Text sx={labelStyle} color="brand.solid">
				{eyebrow}
			</Text>
			<Heading as="h3" mt={3} fontSize={{ base: "30px", md: "38px" }} lineHeight="1.05">
				<ProjectLink href={href}>{title}</ProjectLink>
			</Heading>
			<Text mt={4} maxW="610px" color="text.muted" fontSize="16px" lineHeight="1.7">
				{description}
			</Text>
		</Box>
	);
}

function GroundplaneCard() {
	return (
		<FeaturedCard span={7}>
			<CardCopy
				eyebrow="Open source · 2026"
				title="Groundplane"
				href="/groundplane"
				description="I built Groundplane to catch cases where an agent gives the wrong winner or total despite having the right data. It checks the answer against recorded tool results."
			/>
			<Box mt="auto" px={{ base: 5, md: 7 }} pb={{ base: 5, md: 7 }}>
				<DottedCanvas>
					<Box
						maxW="480px"
						bg="preview.panel"
						border="1px solid"
						borderColor="border.subtle"
						borderRadius="4px"
						boxShadow="4px 4px 0 var(--chakra-colors-preview-shadow)"
						p={4}>
						<Flex justify="space-between" gap={3} color="text.muted" sx={labelStyle}>
							<Text>Declared field</Text>
							<Text>Check 01</Text>
						</Flex>
						<Grid as="dl" mt={4} templateColumns="minmax(0, 1fr) auto" rowGap={2} fontSize="16px">
							<Text as="dt" color="text.muted">Claim</Text>
							<Text as="dd" m={0} fontWeight="700">north</Text>
							<Text as="dt" color="text.muted">Recorded winner</Text>
							<Text as="dd" m={0} fontWeight="700">harbour</Text>
						</Grid>
						<Text mt={4} pt={3} borderTop="1px solid" borderColor="border.subtle" color="status.error" fontFamily="var(--font-mono)" fontSize="12px" fontWeight="700">
							Blocked · UnsupportedClaim
						</Text>
						<Text mt={2} color="text.muted" fontSize="14px" lineHeight="1.5">
							The model named north, but the recorded facts rank harbour first, so the field is rejected.
						</Text>
					</Box>
				</DottedCanvas>
			</Box>
		</FeaturedCard>
	);
}

function CompozeCard() {
	return (
		<FeaturedCard span={5}>
			<CardCopy
				eyebrow="Company · 2025"
				title="Compoze"
				href="/compoze"
				description="I ran Compoze alongside TikTok, building assistants that answered questions from company documents. I handled sales, development and customer training."
			/>
			<Box mt="auto" px={{ base: 5, md: 7 }} pb={{ base: 5, md: 7 }}>
				<DottedCanvas>
					<Box bg="preview.panel" border="1px solid" borderColor="border.subtle" borderRadius="4px" overflow="hidden">
						<Flex justify="space-between" gap={3} px={4} py={3} bg="accent.soft" color="accent.terracotta" sx={labelStyle}>
							<Text>Policy search</Text>
							<Text>3 sources</Text>
						</Flex>
						<Box p={4}>
							<Text fontSize="16px" fontWeight="700" lineHeight="1.45">
								How much annual leave carries over?
							</Text>
						<Text mt={3} color="text.muted" fontSize="16px" lineHeight="1.6">
								Up to 5 days, used by 31 March.
							</Text>
						</Box>
					</Box>
				</DottedCanvas>
			</Box>
		</FeaturedCard>
	);
}

const supportingProjects = [
	{
		title: "Trading engine",
		href: "/trading-engine",
		label: "Research system",
		description: "I use this to test trading ideas overnight, with rules set before the results come in.",
		wide: true,
	},
	{
		title: "Skillsmith",
		href: "/skillsmith",
		label: "Agent skills",
		description: "I make a skill from the repo, then compare the agent with and without it to check whether the extra instructions help.",
	},
	{
		title: "Skillpack",
		href: "/skillpack",
		label: "Agent tooling",
		description: "The eight reusable instructions I keep in one place for Claude Code and Codex.",
	},
	{
		title: "UI Pack",
		href: "/uipack",
		label: "Design system",
		description: "The web figures, motion rules and slide starters I reuse across my projects.",
	},
	{
		title: "Jobforge",
		href: "/jobforge",
		label: "Interview practice",
		description: "Coding drills that grade the plan I say out loud before I touch the keyboard.",
	},
];

function SupportingCard({ project }) {
	return (
		<LinkBox
			as="article"
			role="group"
			bg="surface.raised"
			border="1px solid"
			borderColor="border.subtle"
			borderRadius="4px"
			p={{ base: 5, md: 6 }}
			gridColumn={{ md: project.wide ? "span 2" : undefined }}
			transition="border-color 160ms ease, transform 160ms ease"
			_hover={{ borderColor: "border.strong", transform: "translateY(-2px)" }}
			sx={{ "@media (prefers-reduced-motion: reduce)": { transition: "none", _hover: { transform: "none" } } }}>
			<Text color="text.muted" sx={labelStyle}>
				{project.label}
			</Text>
			<Heading as="h3" mt={5} fontSize={{ base: "23px", md: "26px" }} lineHeight="1.1">
				<ProjectLink href={project.href}>{project.title}</ProjectLink>
			</Heading>
			<Text mt={3} color="text.muted" fontSize="16px" lineHeight="1.65">
				{project.description}
			</Text>
		</LinkBox>
	);
}

const elsewhereLinks = [
	{ name: "Hobbies", href: "/hobbies", detail: "What I do away from the editor" },
	{ name: "Notes", href: "https://notes.junxiong.dev", detail: "Longer working notes", external: true },
	{ name: "Archive", href: "/works", detail: "University-era projects" },
	{ name: "Resume", href: "/resume", detail: "Work history and experience" },
];

function Elsewhere() {
	return (
		<Box as="section" aria-labelledby="elsewhere-heading" mt={{ base: 14, md: 20 }}>
			<Text sx={labelStyle} color="brand.solid">
				{"// ELSEWHERE"}
			</Text>
			<Heading id="elsewhere-heading" as="h2" mt={2} fontSize={{ base: "25px", md: "30px" }}>
				Around the site
			</Heading>
			<SimpleGrid columns={{ base: 1, smmd: 2, lg: 4 }} mt={6} borderTop="1px solid" borderColor="border.subtle">
				{elsewhereLinks.map((item) => (
					<Link
						key={item.name}
						as={item.external ? undefined : NextLink}
						href={item.href}
						prefetch={item.external ? undefined : false}
						target={item.external ? "_blank" : undefined}
						rel={item.external ? "noopener noreferrer" : undefined}
						display="block"
						minH="92px"
						py={4}
						pr={4}
						borderBottom="1px solid"
						borderColor="border.subtle"
						color="page.text"
						textDecoration="none"
						_hover={{ color: "brand.solid", textDecoration: "none" }}>
						<Flex align="center" justify="space-between" gap={3} fontWeight="750">
							<Text>{item.name}</Text>
							<Text aria-hidden="true">{item.external ? "↗" : "→"}</Text>
						</Flex>
						<Text mt={1} color="text.muted" fontSize="13px" lineHeight="1.5">
							{item.detail}
						</Text>
					</Link>
				))}
			</SimpleGrid>
		</Box>
	);
}

export default function SelectedWork() {
	return (
		<>
			<Box
				as="section"
				id="work"
				aria-labelledby="work-heading"
				scrollMarginTop="96px"
				mt={{ base: 14, md: 22 }}>
				<Text sx={labelStyle} color="brand.solid">
					{"// PROJECTS"}
				</Text>
				<Heading id="work-heading" as="h2" mt={2} fontSize={{ base: "32px", md: "44px" }}>
					Selected work
				</Heading>
				<Grid mt={{ base: 6, md: 8 }} templateColumns={{ base: "1fr", lg: "repeat(12, minmax(0, 1fr))" }} gap={{ base: 4, md: 5 }}>
					<GroundplaneCard />
					<CompozeCard />
				</Grid>

				<Box mt={{ base: 8, md: 10 }}>
					<Heading as="h2" fontSize={{ base: "22px", md: "25px" }}>
						Also building
					</Heading>
					<SimpleGrid columns={{ base: 1, md: 2 }} mt={4} gap={4}>
						{supportingProjects.map((project) => (
							<SupportingCard key={project.title} project={project} />
						))}
					</SimpleGrid>
				</Box>
			</Box>

			<Elsewhere />
		</>
	);
}
