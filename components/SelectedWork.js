import { Box, Flex, Grid, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const tagStyle = {
	fontFamily: "var(--font-mono)",
	fontSize: "12px",
	fontWeight: "700",
	letterSpacing: ".08em",
	textTransform: "uppercase",
};

function ProjectHeading({ href, external, children }) {
	return (
		<Heading as="h2" fontSize={{ base: "27px", md: "32px" }} lineHeight="1.08">
			<LinkOverlay
				as={external ? undefined : NextLink}
				href={href}
				target={external ? "_blank" : undefined}
				rel={external ? "noopener noreferrer" : undefined}
				display="inline-flex"
				alignItems="center"
				minH="44px"
				color="inherit">
				{children}
			</LinkOverlay>
		</Heading>
	);
}

function ProjectCard({ children, span, bg, color, darkColor = "page.text", minH = "440px" }) {
	return (
		<LinkBox
			as="article"
			gridColumn={{ base: "1 / -1", lg: `span ${span}` }}
			minW={0}
			minH={{ base: "auto", lg: minH }}
			bg={bg}
			color={color}
			_dark={{ color: darkColor }}
			border="1px solid"
			borderColor="border.subtle"
			display="flex"
			flexDirection="column"
			transition="transform 180ms ease, box-shadow 180ms ease"
			_hover={{
				transform: "translateY(-4px)",
				boxShadow: "0 24px 56px -36px rgba(0,0,0,.8)",
			}}
			sx={{ "@media (prefers-reduced-motion: reduce)": { _hover: { transform: "none" } } }}>
			{children}
		</LinkBox>
	);
}

function ProjectMeta({ children, color, darkColor = "text.muted" }) {
	return (
		<Flex
			justify="space-between"
			wrap="wrap"
			gap={2}
			color={color}
			_dark={{ color: darkColor }}
			sx={tagStyle}>
			{children}
		</Flex>
	);
}

function Description({ children, color }) {
	return (
		<Text mt={3} color={color} _dark={{ color: "text.muted" }} fontSize="15px" lineHeight="1.7">
			{children}
		</Text>
	);
}

function OutcomePreview({ rows, onDark = false }) {
	const muted = onDark ? "#A5B3AD" : "text.muted";
	const border = onDark ? "#34443C" : "border.subtle";
	return (
		<Box
			as="dl"
			bg={onDark ? "#08100C" : "surface.raised"}
			color={onDark ? "#E6EBE8" : "page.text"}
			border="1px solid"
			borderColor={border}
			px={4}>
			{rows.map(({ label, value, color }, index) => (
				<Box key={label} py={3} borderTop={index ? "1px solid" : undefined} borderColor={border}>
					<Text as="dt" fontFamily="var(--font-mono)" fontSize="12px" color={muted}>
						{label}
					</Text>
					<Text
						as="dd"
						m={0}
						mt={1}
						fontSize="16px"
						lineHeight="1.5"
						fontWeight="600"
						color={color}>
						{value}
					</Text>
				</Box>
			))}
		</Box>
	);
}

function GroundplaneCard() {
	return (
		<ProjectCard span={5} bg="project.groundplane" color="#E6EBE8" darkColor="#E6EBE8" minH="560px">
			<Box p={{ base: 6, md: 8 }} pb={6}>
				<ProjectMeta color="#71DCB2" darkColor="#71DCB2">
					<Text>Open source · 2026</Text>
					<Text>Python</Text>
				</ProjectMeta>
				<Box mt={3}>
					<ProjectHeading href="/groundplane">Groundplane</ProjectHeading>
				</Box>
				<Description color="#A5B3AD">
					Groundplane checks declared fields in an agent&apos;s output against recorded tool
					results. A configured check raises an error when a winner, total or comparison
					doesn&apos;t match.
				</Description>
			</Box>
			<Box mt="auto" px={{ base: 6, md: 8 }} pb={{ base: 6, md: 8 }}>
				<OutcomePreview
					onDark
					rows={[
						{ label: "Claim", value: "north" },
						{ label: "Recorded winner", value: "harbour" },
						{ label: "Result", value: "Blocked · UnsupportedClaim", color: "#F09A8E" },
					]}
				/>
			</Box>
		</ProjectCard>
	);
}

function CompozeCard() {
	return (
		<ProjectCard span={7} bg="project.compoze" color="#342119" minH="560px">
			<Box p={{ base: 6, md: 8 }} pb={6}>
				<ProjectMeta color="#7A4936">
					<Text>Company · 2025</Text>
					<Text>Sold to a client</Text>
				</ProjectMeta>
				<Box mt={3}>
					<ProjectHeading href="/compoze">Compoze</ProjectHeading>
				</Box>
				<Description color="#684737">
					A one-person AI studio I ran alongside TikTok. I did the selling and pricing, built
					document-grounded assistants, and sat with clients until they could use the thing without
					me.
				</Description>
			</Box>
			<Box as="figure" m={0} mt="auto" px={{ base: 6, md: 8 }} pb={{ base: 6, md: 8 }}>
				<Box
					w="100%"
					maxW="720px"
					border="1px solid"
					borderColor="border.subtle"
					bg="surface.raised"
					_dark={{ bg: "#181F1C" }}>
					<Flex
						justify="space-between"
						gap={3}
						px={4}
						py={3}
						bg="#E9FAF3"
						color="#205F49"
						_dark={{ bg: "#193F33", color: "#9BE8CA" }}
						fontFamily="var(--font-mono)"
						fontSize="12px"
						fontWeight="700">
						<Text>Knowledge base search</Text>
						<Text>3 documents</Text>
					</Flex>
					<Box px={4} py={4}>
						<Text fontWeight="700" fontSize="15px">How much annual leave carries over?</Text>
						<Grid as="dl" mt={4} templateColumns="minmax(0, 1fr) auto" fontSize="13px">
							{[["Annual entitlement", "18 days"], ["Maximum carry-over", "5 days"], ["Use by", "31 March"]].map(([term, value], index) => (
								<Box key={term} display="contents">
									<Text as="dt" py={2.5} borderTop={index ? "1px solid" : undefined} borderColor="border.subtle" color="text.muted">{term}</Text>
									<Text as="dd" m={0} py={2.5} pl={4} borderTop={index ? "1px solid" : undefined} borderColor="border.subtle" fontWeight="700">{value}</Text>
								</Box>
							))}
						</Grid>
					</Box>
				</Box>
				<Text
					as="figcaption"
					mt={3}
					fontSize="14px"
					lineHeight="1.6"
					color="#684737"
					_dark={{ color: "text.muted" }}>
					A policy question, answered from the company&apos;s documents.
				</Text>
			</Box>
		</ProjectCard>
	);
}

export default function SelectedWork() {
	return (
		<Box
			as="section"
			id="work"
			aria-label="Selected personal work"
			scrollMarginTop="96px"
			mt={{ base: 10, md: 16 }}>
			<Grid
				templateColumns={{ base: "1fr", lg: "repeat(12, minmax(0, 1fr))" }}
				gap={{ base: 5, lg: 6 }}>
				<GroundplaneCard />
				<CompozeCard />
			</Grid>
		</Box>
	);
}
