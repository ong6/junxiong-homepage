import {
	Box,
	Flex,
	Heading,
	Link,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import PrintButton from "./PrintButton";

const contactLinks = [
	{ label: "Email", href: "mailto:junxiongong2@gmail.com" },
	{ label: "GitHub", href: "https://github.com/ong6" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/junx6/" },
];

export default function PrintHeader() {
	const borderColor = useColorModeValue("rgba(26,36,32,.18)", "rgba(230,235,232,.18)");
	const eyebrow = useColorModeValue("mint.700", "mint.300");

	return (
		<Box pb={8} mb={8} borderBottomWidth="1px" borderColor={borderColor}>
			<Flex
				direction={{ base: "column", md: "row" }}
				justify="space-between"
				align={{ base: "flex-start", md: "flex-end" }}
				gap={5}>
				<Box maxW="590px">
					<Text
						fontFamily="var(--font-mono)"
						fontSize="11px"
						fontWeight="700"
						letterSpacing="0.1em"
						textTransform="uppercase"
						color={eyebrow}>
						Singapore · résumé
					</Text>
					<Heading as="h1" fontSize={{ base: "34px", md: "44px" }} lineHeight="1.08" mt={2}>
						Ong Jun Xiong
					</Heading>
					<Text fontSize={{ base: "18px", md: "21px" }} fontWeight="700" mt={2}>
						AI Infrastructure &amp; Backend Engineer
					</Text>
				</Box>
				<PrintButton flexShrink={0} />
			</Flex>

			<Text fontSize="16px" lineHeight="1.75" opacity={0.92} maxW="680px" mt={5}>
				I build production agent runtimes, tool servers, and backend platforms.
				At TikTok, my work spans the shared AI layer and the Go services beneath
				global e-commerce operations.
			</Text>

			<Flex wrap="wrap" columnGap={5} rowGap={2} mt={4} fontSize="14px" fontWeight="700">
				<Link href="https://junxiong.dev" display="inline-flex" alignItems="center" minH="32px" my={-1.5}>
					junxiong.dev
				</Link>
				{contactLinks.map((link) => (
					<Link
						key={link.label}
						href={link.href}
						display="inline-flex"
						alignItems="center"
						minH="32px"
						my={-1.5}
						target={link.href.startsWith("http") ? "_blank" : undefined}
						rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
						{link.label}
					</Link>
				))}
			</Flex>
		</Box>
	);
}
