import { Box, Grid, Heading, Link, SimpleGrid, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import HobbyScene from "../components/HobbyScene";
import Layout from "../components/layouts/Articles";

const links = [
	{
		label: "Email",
		detail: "The simplest way to start a conversation.",
		href: "mailto:junxiongong2@gmail.com",
		external: true,
	},
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
		label: "Résumé",
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
					<Link
						as={NextLink}
						href="/"
						display="inline-flex"
						alignItems="center"
						minH="32px"
						my={-1.5}
						fontSize="13px"
						fontWeight="700">
						← Home
					</Link>
					<Text
						mt={{ base: 8, md: 10 }}
						color="brand.solid"
						fontFamily="var(--font-mono)"
						fontSize="12px"
						fontWeight="700"
						letterSpacing=".1em">
						{"// CONTACT / SINGAPORE"}
					</Text>
					<Heading
						as="h1"
						mt={3}
						fontSize={{ base: "44px", md: "64px" }}
						lineHeight="1"
						letterSpacing="-.05em">
						Let&apos;s talk.
					</Heading>
					<Text mt={6} maxW="560px" fontSize={{ base: "19px", md: "22px" }} lineHeight="1.55" fontWeight="600">
						Email is the easiest way to reach me.
					</Text>
					<Text mt={4} maxW="560px" fontSize="16px" lineHeight="1.75" color="text.muted">
						You can also find my projects, writing and work history below.
					</Text>
				</Box>

				<Box h={{ base: "340px", md: "440px" }} minW={0}>
					<HobbyScene kind="contact" label="Contact signals" active />
				</Box>
			</Grid>

			<Box as="section" aria-labelledby="contact-links" mt={{ base: 12, md: 16 }}>
				<Text color="brand.solid" fontFamily="var(--font-mono)" fontSize="12px" fontWeight="700" letterSpacing=".1em">
					{"// WAYS TO REACH ME"}
				</Text>
				<Heading id="contact-links" as="h2" mt={2} fontSize={{ base: "28px", md: "36px" }}>
					Email, work and writing.
				</Heading>
				<SimpleGrid columns={{ base: 1, md: 2 }} mt={6} borderTop="1px solid" borderColor="border.subtle">
					{links.map((item) => (
						<Link
							key={item.label}
							as={item.external ? undefined : NextLink}
							href={item.href}
							target={item.external && item.href.startsWith("http") ? "_blank" : undefined}
							rel={item.external && item.href.startsWith("http") ? "noopener noreferrer" : undefined}
							display="block"
							minH="112px"
							py={5}
							pr={{ base: 0, md: 6 }}
							borderBottom="1px solid"
							borderColor="border.subtle"
							color="page.text"
							textDecoration="none"
							_hover={{ color: "brand.solid", textDecoration: "none" }}>
							<Text fontSize="19px" fontWeight="750">
								{item.label} <Box as="span" aria-hidden="true">{item.external ? "↗" : "→"}</Box>
							</Text>
							<Text mt={2} maxW="420px" color="text.muted" fontSize="15px" lineHeight="1.6">
								{item.detail}
							</Text>
						</Link>
					))}
				</SimpleGrid>
			</Box>
		</Layout>
	);
}
