import Logo from "./Logo";
import NextLink from "next/link";
import { useEffect, useRef } from "react";
import {
	Box,
	Container,
	Flex,
	IconButton,
	Link,
	useDisclosure,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import ThemeToggleButton from "./ThemeToggleButton";

// The bar is exactly this tall (border included) so the `pt={14}` (56px) on
// <main> in layouts/Main.js clears it. Change both together.
const NAV_HEIGHT = "56px";

const navigationLinks = [
	{ href: "/#work", homeHref: "#work", name: "Projects" },
	{ href: "/#about", homeHref: "#about", name: "About" },
	{ href: "/#now", homeHref: "#now", name: "Now" },
	{ href: "/resume", name: "Résumé" },
	{ href: "/works", name: "Archive" },
	{ href: "https://notes.junxiong.dev", name: "Notes", external: true },
];

const isActive = (link, path) => !link.homeHref && !link.external && path.startsWith(link.href);

function LinkItem({ href, active, external, children }) {
	return (
		<Link
			as={external ? undefined : NextLink}
			href={href}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			aria-current={active ? "page" : undefined}
			position="relative"
			display="inline-flex"
			alignItems="center"
			minH="44px"
			px={2}
			fontSize="13px"
			fontWeight="650"
			lineHeight="1"
			color={active ? "page.text" : "text.muted"}
			textDecoration="none"
			_after={{
				content: '""',
				position: "absolute",
				left: 2,
				right: 2,
				bottom: "10px",
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
	const menu = useDisclosure();
	const menuRef = useRef(null);
	const toggleRef = useRef(null);

	// Mobile menu: Esc closes, a click outside closes, focus moves into the
	// menu on open and back to the toggle on close.
	const { isOpen, onClose } = menu;
	useEffect(() => {
		if (!isOpen) return undefined;
		const toggle = toggleRef.current;
		const first = menuRef.current && menuRef.current.querySelector("a");
		if (first) first.focus();
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		const onPointer = (e) => {
			const inMenu = menuRef.current && menuRef.current.contains(e.target);
			const onToggle = toggleRef.current && toggleRef.current.contains(e.target);
			if (!inMenu && !onToggle) onClose();
		};
		document.addEventListener("keydown", onKey);
		document.addEventListener("pointerdown", onPointer);
		return () => {
			document.removeEventListener("keydown", onKey);
			document.removeEventListener("pointerdown", onPointer);
			if (toggle) toggle.focus();
		};
	}, [isOpen, onClose]);

	return (
		<Box
			position="fixed"
			as="nav"
			aria-label="Site"
			top={0}
			left={0}
			right={0}
			w="100%"
			bg={navBg}
			h={NAV_HEIGHT}
			borderBottom="1px solid"
			borderColor="border.subtle"
			css={{ backdropFilter: "blur(16px) saturate(140%)" }}
			zIndex={20}
			{...props}>
			<Container maxW="1120px" px={4}>
				<Flex h="100%" align="center" justify="space-between" gap={4}>
					<Box flexShrink={0} display="flex" alignItems="center">
						<Logo />
					</Box>

					<Flex align="center" gap={{ base: 1, md: 3 }} flexShrink={0}>
						<Stack
							as="ul"
							listStyleType="none"
							m={0}
							p={0}
							direction="row"
							display={{ base: "none", md: "flex" }}
							alignItems="center"
							spacing={{ md: 1, lg: 3 }}
							mr={{ md: 1, lg: 2 }}>
							{navigationLinks.map((link) => {
								const href = onHome && link.homeHref ? link.homeHref : link.href;
								return (
									<Box as="li" key={link.name}>
										<LinkItem href={href} active={isActive(link, path)} external={link.external}>
											{link.name}
										</LinkItem>
									</Box>
								);
							})}
						</Stack>

						<ThemeToggleButton />

						<Box display={{ base: "block", md: "none" }}>
							<IconButton
								ref={toggleRef}
								icon={menu.isOpen ? <CloseIcon boxSize="12px" /> : <HamburgerIcon />}
								variant="outline"
								borderColor="border.subtle"
								minW="44px"
								h="44px"
								aria-label={menu.isOpen ? "Close navigation menu" : "Open navigation menu"}
								aria-expanded={menu.isOpen}
								aria-controls="navbar-menu"
								onClick={menu.onToggle}
							/>
						</Box>
					</Flex>
				</Flex>
			</Container>

			{menu.isOpen && (
				<Container maxW="1120px" px={4} position="relative">
					<Stack
						ref={menuRef}
						id="navbar-menu"
						as="ul"
						listStyleType="none"
						position="absolute"
						right={4}
						top={2}
						minW="200px"
						m={0}
						spacing={0}
						py={2}
						bg={menuBg}
						border="1px solid"
						borderColor="border.subtle"
						borderRadius="md"
						boxShadow="0 18px 48px rgba(0,0,0,.18)">
						{navigationLinks.map((link) => {
							const href = onHome && link.homeHref ? link.homeHref : link.href;
							const active = isActive(link, path);
							return (
								<Box as="li" key={link.name}>
									<Link
										as={link.external ? undefined : NextLink}
										href={href}
										target={link.external ? "_blank" : undefined}
										rel={link.external ? "noopener noreferrer" : undefined}
										aria-current={active ? "page" : undefined}
										display="flex"
										alignItems="center"
										minH="44px"
										px={4}
										py={2}
										fontSize="15px"
										fontWeight={active ? "700" : "500"}
										color={active ? "page.text" : "text.muted"}
										borderLeft="2px solid"
										borderColor={active ? "mint.500" : "transparent"}
										textDecoration="none"
										_hover={{ bg: "surface.quiet", color: "page.text", textDecoration: "none" }}
										onClick={menu.onClose}>
										{link.name}
									</Link>
								</Box>
							);
						})}
					</Stack>
				</Container>
			)}
		</Box>
	);
};

export default Navbar;
