import {
	Box,
	Flex,
	Heading,
	Link,
	Text,
} from "@chakra-ui/react";
import PrintButton from "./PrintButton";
import OutArrow from "../OutArrow";
import { ARTICLE_TITLE, Eyebrow } from "../ArticleParts";

const contactLinks = [
	{ label: "Email", href: "mailto:junxiongong2@gmail.com" },
	{ label: "GitHub", href: "https://github.com/ong6" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/junx6/" },
];

export default function PrintHeader() {

	return (
		<Box pb={8} mb={8} borderBottomWidth="1px" borderColor="border.subtle">
			<Flex
				direction={{ base: "column", md: "row" }}
				justify="space-between"
				align={{ base: "flex-start", md: "flex-end" }}
				gap={6}>
				<Box maxW="590px">
					<Eyebrow>Singapore · résumé</Eyebrow>
					<Heading as="h1" fontSize={ARTICLE_TITLE} lineHeight="1" letterSpacing="-.045em" mt={2}>
						Ong Jun Xiong
					</Heading>
					<Text fontSize={{ base: "18px", md: "21px" }} fontWeight="700" mt={2}>
						AI Infrastructure &amp; Backend Engineer
					</Text>
				</Box>
				<PrintButton flexShrink={0} />
			</Flex>

			<Text fontSize="16px" lineHeight="text" opacity={0.92} maxW="680px" mt={6}>
				I build production agent runtimes, tool servers, and backend platforms.
				At TikTok, my work spans the shared AI layer and the Go services beneath
				global e-commerce operations.
			</Text>

			<Flex wrap="wrap" columnGap={6} rowGap={2} mt={4} fontSize="14px" fontWeight="700">
				<Link href="https://junxiong.dev" display="inline-flex" alignItems="center" minH="44px" my={-3}>
					junxiong.dev
				</Link>
				{contactLinks.map((link) => (
					<Link
						key={link.label}
						href={link.href}
						display="inline-flex"
						alignItems="center"
						minH="44px"
						minW="44px"
						my={-3}
						target={link.href.startsWith("http") ? "_blank" : undefined}
						rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
						{link.label}
						{link.href.startsWith("http") && <OutArrow ml="4px" fontSize="12px" />}
					</Link>
				))}
			</Flex>
		</Box>
	);
}
