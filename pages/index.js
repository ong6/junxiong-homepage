import { Box, Flex, Grid, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import Layout from "../components/layouts/Articles";
import SelectedWork from "../components/SelectedWork";

const utilityLinkProps = {
	display: "inline-flex",
	alignItems: "center",
	minH: "44px",
	fontFamily: "var(--font-mono)",
	fontSize: "12px",
	fontWeight: "700",
	letterSpacing: ".04em",
	textDecoration: "underline",
	textUnderlineOffset: "4px",
};

function Eyebrow({ children }) {
	return (
		<Text
			fontFamily="var(--font-mono)"
			fontSize="12px"
			fontWeight="700"
			letterSpacing=".12em"
			color={useColorModeValue("cobalt.700", "cobalt.300")}>
			{children}
		</Text>
	);
}

function Introduction() {
	const portraitBorder = useColorModeValue("rgba(26,36,32,.18)", "rgba(230,235,232,.18)");

	return (
		<Box as="header" id="about" scrollMarginTop="96px" pt={{ base: 8, md: 20 }}>
			<Eyebrow>{"// JUNXIONG.DEV / SINGAPORE"}</Eyebrow>

			<Grid
				gridTemplateColumns={{
					base: "144px minmax(0, 1fr)",
					md: "minmax(0, 1.35fr) minmax(260px, .65fr)",
				}}
				gridTemplateAreas={{
					base: '"copy copy" "portrait links"',
					md: '"copy portrait" "links portrait"',
				}}
				columnGap={{ base: 6, md: 14, lg: 20 }}
				rowGap={6}
				alignItems="center"
				mt={5}>
				<Box gridArea="copy" maxW="720px">
					<Heading
						as="h1"
						fontSize={{ base: "46px", smmd: "58px", lg: "74px" }}
						lineHeight=".98"
						letterSpacing="-.06em">
						Ong Jun Xiong
					</Heading>
					<Text mt={5} fontSize={{ base: "19px", md: "23px" }} lineHeight="1.45" fontWeight="600">
						I&apos;m a software engineer at TikTok in Singapore, building AI infrastructure for
						e-commerce.
					</Text>
					<Text mt={5} maxW="640px" fontSize="16px" lineHeight="1.75" color="text.muted">
						Before AI infrastructure, I wrote Go services for TikTok&apos;s seller platform. Outside
						work, I built and ran{" "}
						<Link as={NextLink} href="/compoze">
							Compoze
						</Link>{" "}
						until a client bought it. The tools below started with something that annoyed me enough
						to fix.
					</Text>
				</Box>

				<Box
					gridArea="portrait"
					justifySelf={{ md: "end" }}
					w="100%"
					maxW={{ base: "144px", md: "310px" }}>
					<Box
						border="1px solid"
						borderColor={portraitBorder}
						bg="surface.raised"
						p={{ base: 2, md: 3 }}
						transform={{ md: "rotate(1.5deg)" }}>
						<NextImage
							src="/images/junxiong.webp"
							alt="Ong Jun Xiong, AI infrastructure engineer in Singapore"
							width={768}
							height={768}
							preload
							sizes="(max-width: 767px) 126px, 284px"
							style={{
								width: "100%",
								height: "auto",
								aspectRatio: "4 / 3",
								objectFit: "cover",
								objectPosition: "center 28%",
							}}
						/>
						<Flex
							mt={{ base: 2, md: 3 }}
							justify="space-between"
							color="text.muted"
							fontFamily="var(--font-mono)"
							fontSize="12px">
							<Text>JX / 2026</Text>
							<Text display={{ base: "none", md: "block" }}>SINGAPORE</Text>
						</Flex>
					</Box>
				</Box>

				<Grid
					gridArea="links"
					templateColumns={{ base: "repeat(2, minmax(0, 1fr))", md: "repeat(3, max-content)" }}
					columnGap={{ base: 2, md: 6 }}
					rowGap={1}>
					<Link
						href="https://github.com/ong6"
						target="_blank"
						rel="noopener noreferrer"
						{...utilityLinkProps}>
						GitHub ↗
					</Link>
					<Link
						href="https://www.linkedin.com/in/junx6/"
						target="_blank"
						rel="noopener noreferrer"
						{...utilityLinkProps}>
						LinkedIn ↗
					</Link>
					<Link as={NextLink} href="/resume" {...utilityLinkProps}>
						Resume
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
}

export default function Home() {
	return (
		<Layout animate={false}>
			<Introduction />
			<SelectedWork />
		</Layout>
	);
}
