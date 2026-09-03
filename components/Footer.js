import { Box, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const links = [
	{ label: "Email", href: "mailto:junxiongong2@gmail.com" },
	{ label: "Hobbies", href: "/hobbies", internal: true },
	{ label: "Archive", href: "/works", internal: true },
	{ label: "Notes", href: "https://notes.junxiong.dev" },
	{ label: "GitHub", href: "https://github.com/ong6" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/junx6/" },
	{ label: "Source", href: "https://github.com/ong6/junxiong-homepage" },
];

const Footer = () => (
	<Box mt={{ base: 14, md: 20 }} pt={6} borderTop="1px solid" borderColor="border.subtle">
		<Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ md: "center" }} gap={5}>
			<Box>
				<Text fontWeight="700" fontSize="14px">Ong Jun Xiong</Text>
				<Text mt={1} fontFamily="var(--font-mono)" fontSize={{ base: "11px", md: "12px" }} letterSpacing=".08em" color="text.muted">
					ENGINEER · BUILDER · SINGAPORE
				</Text>
			</Box>
			<Flex wrap="wrap" columnGap={5} rowGap={2}>
				{links.map((link) => (
					<Link
						key={link.label}
						as={link.internal ? NextLink : undefined}
						href={link.href}
						target={link.href.startsWith("http") ? "_blank" : undefined}
						rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
						display="inline-flex"
						alignItems="center"
						minH="32px"
						my={-1.5}
						fontSize="12px"
						fontWeight="650"
						color="text.muted"
						textDecoration="none"
						_hover={{ color: "page.text", textDecoration: "underline" }}>
						{link.label}
						{link.href.startsWith("http") && (
							<Box as="span" aria-hidden="true" ml="3px" fontSize="11px">
								↗
							</Box>
						)}
					</Link>
				))}
			</Flex>
		</Flex>
		<Text mt={6} pb={2} fontSize="11px" color="text.muted">
			© {new Date().getFullYear()} Ong Jun Xiong
		</Text>
	</Box>
);

export default Footer;
