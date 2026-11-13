import { Box, Flex, Grid, Heading, Link, SimpleGrid, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import HobbyScene from "../components/HobbyScene";
import Layout from "../components/layouts/Articles";
import OutArrow from "../components/OutArrow";
import FilledButton from "../components/FilledButton";
import { BackLink, Eyebrow, LANDING_TITLE } from "../components/ArticleParts";

const links = [
	{
		label: "LinkedIn",
		detail: "My work history and what I do now.",
		href: "https://www.linkedin.com/in/junx6/",
		external: true,
	},
	{
		label: "GitHub",
		detail: "Source code and the projects I maintain.",
		href: "https://github.com/ong6",
		external: true,
	},
	{
		label: "Resume",
		detail: "Roles, experience and the printable PDF.",
		href: "/resume",
	},
	{
		label: "Notes",
		detail: "Longer write-ups about systems I am building.",
		href: "https://notes.junxiong.dev",
		external: true,
	},
];

export default function Contact() {
	return (
		<Layout
			title="Contact"
			description="Contact Ong Jun Xiong by email, or find his work on GitHub, LinkedIn and notes.">
			<Grid
				templateColumns={{ base: "1fr", lg: "minmax(0, .9fr) minmax(360px, 1.1fr)" }}
				columnGap={{ lg: 16 }}
				rowGap={10}
				alignItems="center"
				pt={{ base: 10, md: 16 }}>
				<Box>
					<BackLink href="/">Home</BackLink>
					<Eyebrow mt={{ base: 8, md: 10 }}>CONTACT / SINGAPORE</Eyebrow>
					<Heading
						as="h1"
						mt={4}
						fontSize={LANDING_TITLE}
						lineHeight=".98"
						letterSpacing="-.06em">
						Contact
					</Heading>
					<Text mt={6} maxW="560px" fontSize={{ base: "19px", md: "22px" }} lineHeight="lede" fontWeight="600">
						Email is the easiest way to reach me.
					</Text>
					<FilledButton href="mailto:junxiongong2@gmail.com" mt={8} data-group>
						Email me <OutArrow ml={2} />
					</FilledButton>
					<Text mt={4} fontFamily="var(--font-mono)" fontSize="14px" color="text.muted" userSelect="all">
						junxiongong2@gmail.com
					</Text>
				</Box>

				<Box h={{ base: "340px", md: "440px" }} minW={0}>
					<HobbyScene kind="contact" label="Contact signals" variant={3} active />
				</Box>
			</Grid>

			<Box as="section" aria-labelledby="contact-links" mt={{ base: 10, md: 12 }}>
				<Eyebrow>ELSEWHERE</Eyebrow>
				<Heading id="contact-links" as="h2" mt={2} fontSize={{ base: "28px", md: "36px" }}>
					Work and writing
				</Heading>
				{/* Same row grammar as the Links out block: name, arrow pinned to the
				    row's right edge, detail below. Columns sit 24px apart. */}
				<SimpleGrid columns={{ base: 1, md: 2 }} columnGap={6} mt={6} borderTop="1px solid" borderColor="border.subtle">
					{links.map((item) => (
						<Link
							key={item.label}
							as={item.external ? undefined : NextLink}
							href={item.href}
							target={item.external && item.href.startsWith("http") ? "_blank" : undefined}
							rel={item.external && item.href.startsWith("http") ? "noopener noreferrer" : undefined}
							display="block"
							minH="112px"
							py={6}
							borderBottom="1px solid"
							borderColor="border.subtle"
							color="page.text"
							textDecoration="none"
							_hover={{ color: "brand.solid", textDecoration: "none" }}>
							<Flex align="center" justify="space-between" gap={3} fontSize="19px" fontWeight="750">
								<Text as="span">{item.label}</Text>
								<OutArrow />
							</Flex>
							<Text mt={2} maxW="420px" color="text.muted" fontSize="15px" lineHeight="lede">
								{item.detail}
							</Text>
						</Link>
					))}
				</SimpleGrid>
			</Box>
		</Layout>
	);
}
