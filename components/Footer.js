import { Box, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import OutArrow from "./OutArrow";

const links = [
	{ label: "Contact", href: "/contact", internal: true },
	{ label: "Hobbies", href: "/hobbies", internal: true },
	{ label: "Archive", href: "/works", internal: true },
	{ label: "Notes", href: "https://notes.junxiong.dev" },
	{ label: "UI Pack", href: "/uipack", internal: true },
	{ label: "GitHub", href: "https://github.com/ong6" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/junx6/" },
	{ label: "Source", href: "https://github.com/ong6/junxiong-homepage" },
];

const Footer = () => (
	<Box mt={{ base: 14, md: 20 }} pt={6} borderTop="1px solid" borderColor="border.subtle">
		<Flex
			direction={{ base: "column", md: "row" }}
			justify="space-between"
			align={{ md: "center" }}
			gap={6}>
			<Box>
				<Text fontWeight="700" fontSize="14px">
					Ong Jun Xiong
				</Text>
				<Text
					mt={1}
					fontFamily="var(--font-mono)"
					fontSize="12px"
					letterSpacing=".08em"
					color="text.muted">
					SOFTWARE ENGINEER · SINGAPORE
				</Text>
			</Box>
			<Flex wrap="wrap" columnGap={6} rowGap={2}>
				{links.map((link) => (
					<Link
						key={link.label}
						as={link.internal ? NextLink : undefined}
						href={link.href}
						target={link.href.startsWith("http") ? "_blank" : undefined}
						rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
						display="inline-flex"
						alignItems="center"
						// 32px targets on a 32px row pitch (24px box + 8px row gap): wrapped rows touch, never overlap.
						minH="32px"
						my={-1}
						fontSize="12px"
						fontWeight="650"
						color="text.muted"
						textDecoration="none"
						_hover={{ color: "page.text", textDecoration: "underline" }}>
						{link.label}
						{link.href.startsWith("http") && (
							<OutArrow ml="3px" fontSize="11px" />
						)}
					</Link>
				))}
			</Flex>
		</Flex>
		<Text mt={6} pb={2} fontSize="12px" color="text.muted">
			© {new Date().getFullYear()} Ong Jun Xiong
		</Text>
	</Box>
);

export default Footer;
