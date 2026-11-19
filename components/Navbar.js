import Logo from "./Logo";
import NextLink from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { CloseIcon, HamburgerIcon } from "./icons";
import ThemeToggleButton from "./ThemeToggleButton";
import OutArrow from "./OutArrow";
import SearchButton from "./SearchButton";
import styles from "./Navbar.module.css";

// The bar is 64px tall, 72px from 768px; layouts/Main.module.css offsets
// <main> by the same so the fixed header never covers content.

const navigationLinks = [
	{
		href: "/#work",
		homeHref: "#work",
		name: "Projects",
		activePaths: ["/ai-tooling", "/compoze", "/groundplane", "/skills", "/skillsmith", "/trading-engine", "/uipack", "/workbase"],
	},
	{ href: "/resume", name: "Resume" },
	{ href: "/hobbies", name: "Hobbies", activePaths: ["/hobbies", "/home-lab"] },
	{ href: "https://notes.junxiong.dev", name: "Notes", external: true },
];

const mobileOnlyLinks = [{ href: "/works", name: "Archive" }];

const pathname = (path) => (path || "/").split(/[?#]/)[0].replace(/\/+$/, "") || "/";

const isActive = (link, path) => {
	if (link.external) return false;
	const current = pathname(path);
	// A project's sub-pages (past versions, docs) belong to Projects too.
	return link.activePaths ? link.activePaths.some((p) => current === p || current.startsWith(`${p}/`)) : current === link.href;
};

function LinkItem({ href, active, external, children }) {
	const Anchor = external ? "a" : NextLink;
	return (
		<Anchor
			href={href}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			aria-current={active ? "page" : undefined}
			className={`ui-link ${styles.link}`}>
			{children}
			{external && <OutArrow newTab className={styles.linkArrow} />}
		</Anchor>
	);
}

const Navbar = ({ path = "/", ...props }) => {
	const onHome = path === "/" || path.startsWith("/#");
	const [isOpen, setOpen] = useState(false);
	const navRef = useRef(null);
	const menuRef = useRef(null);
	const toggleRef = useRef(null);
	// Focus goes back to the toggle only when Escape closed the menu.
	const restoreFocusRef = useRef(false);

	const onClose = useCallback(() => setOpen(false), []);

	// The mobile menu is a non-modal Base UI dialog drawn as a dropdown under
	// the bar: Escape, a click outside and focus leaving it all close it.
	const onOpenChange = useCallback((open, details) => {
		restoreFocusRef.current = !open && details?.reason === "escape-key";
		setOpen(open);
	}, []);

	// The layout persists between pages, so browser Back/Forward must not leave
	// a menu from the previous route hanging open.
	useEffect(() => {
		onClose();
	}, [path, onClose]);

	return (
		<nav ref={navRef} aria-label="Site" className={styles.nav} {...props}>
			<Dialog.Root open={isOpen} onOpenChange={onOpenChange} modal={false}>
				<div className={`ui-container ${styles.bar}`}>
					<div className={styles.row}>
						<div className={styles.brand}>
							<Logo />
						</div>

						<div className={styles.controls}>
							<ul className={styles.links}>
								{navigationLinks.map((link) => {
									const href = onHome && link.homeHref ? link.homeHref : link.href;
									return (
										<li key={link.name}>
											<LinkItem href={href} active={isActive(link, path)} external={link.external}>
												{link.name}
											</LinkItem>
										</li>
									);
								})}
							</ul>

							<SearchButton />

							<NextLink
								href="/contact"
								aria-current={pathname(path) === "/contact" ? "page" : undefined}
								className={`ui-link ${styles.contact}`}>
								Contact
							</NextLink>

							<div className={styles.wideOnly}>
								<ThemeToggleButton />
							</div>

							<div className={styles.narrowOnly}>
								<Dialog.Trigger
									ref={toggleRef}
									className={`ui-button ${styles.menuToggle}`}
									aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
									aria-controls="navbar-menu">
									{isOpen ? <CloseIcon className={styles.closeIcon} aria-hidden="true" /> : <HamburgerIcon aria-hidden="true" />}
								</Dialog.Trigger>
							</div>
						</div>
					</div>
				</div>

				<Dialog.Portal container={navRef} className={`ui-container ${styles.menuFrame}`}>
					<Dialog.Popup
						ref={menuRef}
						id="navbar-menu"
						className={styles.menu}
						initialFocus={() => menuRef.current?.querySelector("a") ?? true}
						finalFocus={() => (restoreFocusRef.current ? toggleRef.current : false)}
						onBlur={(event) => {
							const next = event.relatedTarget;
							if (next && !menuRef.current?.contains(next) && !toggleRef.current?.contains(next)) {
								onClose();
							}
						}}>
						<ul className={styles.menuList}>
							{[...navigationLinks, ...mobileOnlyLinks].map((link) => {
								const href = onHome && link.homeHref ? link.homeHref : link.href;
								const active = isActive(link, path);
								const Anchor = link.external ? "a" : NextLink;
								return (
									<li key={link.name}>
										<Anchor
											href={href}
											target={link.external ? "_blank" : undefined}
											rel={link.external ? "noopener noreferrer" : undefined}
											aria-current={active ? "page" : undefined}
											className={`ui-link ${styles.menuLink}`}
											onClick={onClose}>
											{link.name}
											{link.external && <OutArrow newTab className={styles.menuArrow} />}
										</Anchor>
									</li>
								);
							})}
							<li>
								<div className={styles.themeRow}>
									<div>
										<div className={styles.themeLabel}>Theme</div>
										<div className={styles.themeHint}>Light or dark</div>
									</div>
									<ThemeToggleButton />
								</div>
							</li>
						</ul>
					</Dialog.Popup>
				</Dialog.Portal>
			</Dialog.Root>
		</nav>
	);
};

export default Navbar;
