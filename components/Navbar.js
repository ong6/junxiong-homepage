import Logo from "./Logo";
import NextLink from "next/link";
import {
	Box,
	Container,
	Flex,
	IconButton,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import ThemeToggleButton from "./ThemeToggleButton";

const navigationLinks = [
	{ href: "/#work", homeHref: "#work", name: "Work" },
	{ href: "/#experience", homeHref: "#experience", name: "Experience" },
	{ href: "/#about", homeHref: "#about", name: "About" },
	{ href: "/resume", name: "Résumé" },
	{ href: "/#contact", homeHref: "#contact", name: "Contact" },
];

function LinkItem({ href, active, children }) {
	return (
		<Link
			as={NextLink}
			href={href}
			position="relative"
			px={2}
			py={2}
			fontSize="13px"
			fontWeight="650"
			color={active ? "page.text" : "text.muted"}
			textDecoration="none"
			_after={{
				content: '""',
				position: "absolute",
				left: 2,
				right: 2,
				bottom: "4px",
				h: "1px",
				bg: "mint.500",
				transform: active ? "scaleX(1)" : "scaleX(0)",
				transformOrigin: "left",
				transition: "transform 160ms ease",
			}}
			_hover={{ color: "page.text", textDecoration: "none", _after: { transform: "scaleX(1)" } }}>
			{children}
		</Link>
	);
}

const Navbar = ({ path = "/", ...props }) => {
	const onHome = path === "/" || path.startsWith("/#");
	const navBg = useColorModeValue("rgba(241,238,230,.86)", "rgba(14,21,18,.86)");
	const menuBg = useColorModeValue("warm.50", "graphite.800");

	return (
		<Box
			position="fixed"
			as="nav"
			top={0}
			w="100%"
			bg={navBg}
			borderBottom="1px solid"
			borderColor="border.subtle"
			css={{ backdropFilter: "blur(16px) saturate(140%)" }}
			zIndex={20}
			{...props}>
			<Container
				display="flex"
				px={{ base: 3, md: 6 }}
				py={2}
				maxW="1120px"
				align="center"
				justify="space-between">
				<Box flexShrink={0} mr={{ base: 2, md: 6 }}>
					<Logo />
				</Box>

				<Stack
					direction="row"
					display={{ base: "none", md: "flex" }}
					alignItems="center"
					spacing={{ md: 2, lg: 4 }}
					flex="1"
					justify="flex-end"
					mr={3}>
					{navigationLinks.map((link) => {
						const href = onHome && link.homeHref ? link.homeHref : link.href;
						const active = link.href === "/resume" && path.startsWith("/resume");
						return (
							<LinkItem href={href} active={active} key={link.name}>
								{link.name}
							</LinkItem>
						);
					})}
				</Stack>

				<Flex align="center" gap={2}>
					<ThemeToggleButton />
					<Box display={{ base: "block", md: "none" }}>
						<Menu isLazy id="navbar-menu">
							<MenuButton
								as={IconButton}
								icon={<HamburgerIcon />}
								variant="outline"
								borderColor="border.subtle"
								minW="44px"
								h="44px"
								aria-label="Open navigation menu"
							/>
							<MenuList bg={menuBg} borderColor="border.subtle" boxShadow="0 18px 48px rgba(0,0,0,.18)">
								{navigationLinks.map((link) => {
									const href = onHome && link.homeHref ? link.homeHref : link.href;
									return (
										<MenuItem as={NextLink} href={href} key={link.name} bg="transparent" _hover={{ bg: "surface.quiet" }}>
											{link.name}
										</MenuItem>
									);
								})}
							</MenuList>
						</Menu>
					</Box>
				</Flex>
			</Container>
		</Box>
	);
};

export default Navbar;
