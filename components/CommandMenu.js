// The ⌘K command menu, on cmdk (https://cmdk.paco.me). Kept thin and in one
// place so it can move into a future `uipack/widgets` entry: `CommandMenu` and
// its skin (CommandMenu.module.css, reading the site's colour variables) hold
// all the cmdk code; the default export only binds the site's index and its
// router. The header trigger and the shortcut live in SearchButton.js, which
// imports this file on first use, so no page loads it up front.
import { Command, useCommandState } from "cmdk";
import { useRouter } from "next/router";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { SEARCH_GROUPS, matchScore } from "../lib/siteIndex";
import styles from "./CommandMenu.module.css";

// Runs its callback when the dialog's content has unmounted, after the close
// animation and after the page scroll is unlocked.
function OnUnmount({ callback }) {
	const ref = useRef(callback);
	useEffect(() => {
		ref.current = callback;
	});
	useEffect(() => () => ref.current(), []);
	return null;
}

// Says the result count once typing pauses, not on every key.
function Announcer({ search }) {
	const count = useCommandState((state) => state.filtered.count);
	const [text, setText] = useState("");
	const typed = Boolean(search.trim());
	useEffect(() => {
		if (!typed) return undefined;
		const id = setTimeout(() => setText(count ? `${count} result${count === 1 ? "" : "s"}` : "No results"), 450);
		return () => clearTimeout(id);
	}, [count, typed, search]);
	return (
		<div className={styles.srOnly} aria-live="polite" aria-atomic="true">
			{typed ? text : ""}
		</div>
	);
}

// On a phone the open keyboard shrinks the visual viewport, not the layout
// one; the dialog takes its height from it so the list ends above the keys.
function useVisualViewportHeight(open) {
	const [height, setHeight] = useState(null);
	useEffect(() => {
		const vv = typeof window !== "undefined" && window.visualViewport;
		if (!open || !vv) return undefined;
		const update = () => setHeight(Math.round(vv.height));
		update();
		vv.addEventListener("resize", update);
		return () => vv.removeEventListener("resize", update);
	}, [open]);
	return height;
}

// One row: named by its title, described by its one-liner.
function Item({ item, onSelect }) {
	const id = useId();
	return (
		<Command.Item
			value={item.id}
			onSelect={() => onSelect(item)}
			className={styles.item}
			aria-labelledby={`${id}-title`}
			aria-describedby={item.description ? `${id}-description` : undefined}>
			<span className={styles.text}>
				<span id={`${id}-title`} className={styles.title}>
					{item.title}
					{item.external && (
						<>
							<span className={styles.arrow} aria-hidden="true">↗</span>
							<span className={styles.srOnly}> (opens in a new tab)</span>
						</>
					)}
				</span>
				{item.description && (
					<span id={`${id}-description`} className={styles.description}>
						{item.description}
					</span>
				)}
			</span>
			{item.meta && <span className={styles.meta}>{item.meta}</span>}
		</Command.Item>
	);
}

export function CommandMenu({ open, onOpenChange, groups, filter, onSelect, onClosed, label, placeholder }) {
	const [search, setSearch] = useState("");
	const viewport = useVisualViewportHeight(open);

	return (
		<Command.Dialog
			open={open}
			onOpenChange={onOpenChange}
			label={label}
			filter={filter}
			vimBindings={false}
			className={styles.root}
			overlayClassName={styles.overlay}
			contentClassName={styles.content}
			style={viewport ? { "--command-vh": `${viewport}px` } : undefined}>
			<div className={styles.field}>
				<svg className={styles.glyph} viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
					<circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
					<path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				</svg>
				<Command.Input className={styles.input} value={search} onValueChange={setSearch} placeholder={placeholder} />
				<button type="button" className={styles.close} onClick={() => onOpenChange(false)} aria-label="Close (Esc)">
					<span className={styles.fineOnly}>Esc</span>
					<span className={styles.coarseOnly}>Close</span>
				</button>
			</div>
			<Command.List className={styles.list} aria-label="Results">
				<Command.Empty className={styles.empty}>No results for “{search.trim()}”.</Command.Empty>
				{groups.map((group) => (
					<Command.Group key={group.label} heading={group.label} className={styles.group}>
						{group.items.map((item) => (
							<Item key={item.id} item={item} onSelect={onSelect} />
						))}
					</Command.Group>
				))}
			</Command.List>
			<div className={styles.footer} aria-hidden="true">
				<span><kbd>↑</kbd><kbd>↓</kbd> Move</span>
				<span><kbd>Enter</kbd> Open</span>
				<span><kbd>Esc</kbd> Close</span>
			</div>
			<Announcer search={search} />
			<OnUnmount
				callback={() => {
					setSearch("");
					onClosed?.();
				}}
			/>
		</Command.Dialog>
	);
}

// The site's menu: its index, and navigation that handles pages, in-page
// anchors and other sites. A new tab opens inside the key press or click (a
// browser blocks it later); a page change waits until the dialog has closed
// and unlocked the page, so an anchor scrolls the page it lands on.
export default function SiteCommandMenu({ open, onOpenChange, onClosed }) {
	const router = useRouter();
	const pending = useRef(null);

	const onSelect = useCallback(
		(item) => {
			if (item.external) window.open(item.href, "_blank", "noopener,noreferrer");
			else pending.current = item.href;
			onOpenChange(false);
		},
		[onOpenChange],
	);

	const closed = useCallback(() => {
		onClosed?.();
		const href = pending.current;
		pending.current = null;
		if (href) setTimeout(() => router.push(href), 0);
	}, [onClosed, router]);

	return (
		<CommandMenu
			open={open}
			onOpenChange={onOpenChange}
			groups={SEARCH_GROUPS}
			filter={matchScore}
			onSelect={onSelect}
			onClosed={closed}
			label="Search the site and notes"
			placeholder="Search pages, projects and notes"
		/>
	);
}
