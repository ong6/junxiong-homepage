import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
import HobbyScene from "../components/HobbyScene";
import Layout from "../components/layouts/Articles";
import { PAGE_META } from "../lib/pageMeta";
import ProjectLinks from "../components/ProjectLinks";
import { noteLink, notesFor } from "../lib/notes";
import styles from "../styles/Hobbies.module.css";

// Every chapter's object is drawn in UiPack's one 3D style, ink line art
// (STYLE.md, Component looks).
const chapters = [
	{ id: "travel", index: "01", label: "Travel", kind: "travel" },
	{ id: "coding-ai", index: "02", label: "Coding & AI", kind: "ai" },
	{ id: "tennis", index: "03", label: "Tennis", kind: "tennis" },
	{ id: "reading", index: "04", label: "Reading", kind: "reading" },
	// `alias` keeps the chapter's old anchor (/hobbies#home-servers) working.
	{ id: "home-lab", alias: "home-servers", index: "05", label: "Home lab", kind: "server" },
	{ id: "trading", index: "06", label: "Trading", kind: "trading" },
];

// Notes paired with a chapter (or the page) in lib/notes.js, in the same
// compact block as "Built from this hobby".
function NotesBlock({ path, heading = "Notes from this hobby", ...props }) {
	const notes = notesFor(path);
	if (!notes.length) return null;
	return <ProjectLinks heading={heading} compact mt={6} maxW="64ch" links={notes.map(noteLink)} {...props} />;
}

function Chapter({ id, alias, index, label, kind, active, preload, after, children }) {
	return (
		<Box as="section" id={id} className={styles.chapter} data-chapter={kind}>
			{alias ? <span id={alias} className={styles.anchorAlias} aria-hidden="true" /> : null}
			<Box className={styles.copy}>
				<Text className={styles.number}>{index} / 06</Text>
				<Text as="h2" className={styles.heading}>{label}</Text>
				<Text className={styles.prose}>{children}</Text>
				{after}
			</Box>
			<Box
				className={styles.visual}
				aria-label={`${label} visual`}
				data-hobby-visual
				data-chapter-id={id}>
				<Box className={styles.visualSticky}>
					<HobbyScene kind={kind} label={label} active={active} preload={preload} />
				</Box>
			</Box>
		</Box>
	);
}

export default function Hobbies() {
	const pageRef = useRef(null);
	const [active, setActive] = useState(null);

	useEffect(() => {
		const visuals = [...pageRef.current.querySelectorAll("[data-hobby-visual]")];
		const chooseVisible = () => {
			const centre = window.innerHeight / 2;
			const visible = visuals
				.map((visual) => ({ visual, rect: visual.getBoundingClientRect() }))
				.filter(({ rect }) => rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1)
				.sort((a, b) =>
					Math.abs((a.rect.top + a.rect.bottom) / 2 - centre) -
					Math.abs((b.rect.top + b.rect.bottom) / 2 - centre),
				)[0];
			setActive(visible?.visual.dataset.chapterId ?? null);
		};
		const observer = new IntersectionObserver(chooseVisible, { threshold: [0, 0.25, 0.6] });
		visuals.forEach((visual) => observer.observe(visual));
		window.addEventListener("scroll", chooseVisible, { passive: true });
		window.addEventListener("resize", chooseVisible);
		chooseVisible();
		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", chooseVisible);
			window.removeEventListener("resize", chooseVisible);
		};
	}, []);

	// The chapters before and after the one playing hold their scenes built and
	// still, so a scene is already drawn when its chapter arrives. Three exist
	// at most: under software WebGL a fourth cost the oldest its context.
	const playing = chapters.findIndex((chapter) => chapter.id === active);
	const isNear = (id) => playing >= 0 && Math.abs(chapters.findIndex((chapter) => chapter.id === id) - playing) === 1;

	return (
		<Layout animate={false} {...PAGE_META["/hobbies"]}>
			<Box ref={pageRef} className={styles.page}>
				<Box as="header" className={styles.intro}>
					<Box className={styles.introInner}>
						<Text className={styles.eyebrow}>{"// OFF THE CLOCK"}</Text>
						<Text as="h1" className={styles.title}>Hobbies</Text>
						<Text className={styles.lede}>I spend a lot of my free time coding and trying out AI tools. I also play tennis, trade, plan trips and read.</Text>
						<Box as="nav" aria-label="Hobby chapters" className={styles.chapterNav}>
							{chapters.map((chapter) => (
								<Link
									key={chapter.id}
									href={`#${chapter.id}`}
									aria-current={active === chapter.id ? "location" : undefined}>
									{chapter.index} {chapter.label}
								</Link>
							))}
						</Box>
					</Box>
				</Box>


				<Chapter {...chapters[0]} active={active === chapters[0].id} preload={isNear(chapters[0].id)}>
					I spent six months in Munich on NUS Overseas Colleges. I like having enough time in a place to get familiar with it, so I tend to plan fewer stops and stay longer in each.
				</Chapter>

				<Chapter
					{...chapters[1]}
					active={active === chapters[1].id} preload={isNear(chapters[1].id)}
					after={
						<ProjectLinks
							heading="Built from this hobby"
							compact
							mt={6}
							maxW="64ch"
							links={[
								{ name: "Groundplane", detail: "Checks declared fields against recorded tool results", href: "/groundplane" },
								{ name: "Agent skills", detail: "The instructions my coding agents load in every repo", href: "/skills" },
							]}
						/>
					}>
					This is my main hobby. I like trying models, building little tools, and seeing what I can get an agent to do. That is how I end up with <Link as={NextLink} href="/groundplane">Groundplane</Link>, a Python library that checks declared output fields against recorded tool results; the <Link as={NextLink} href="/skills">agent skills</Link> that Claude Code and Codex load in every repo I work in; my notes and life admin kept as a markdown repo that an AI agent tends for me; and a <Link href="https://github.com/ong6/sg-property-analysis" target="_blank" rel="noopener noreferrer">Singapore property data-analysis project</Link>. Most of it starts with something I want to try or a problem I want to fix for myself.
				</Chapter>

				<Chapter {...chapters[2]} active={active === chapters[2].id} preload={isNear(chapters[2].id)}>
					Tennis is my main sport. I play with two forehands, swapping my Wilson Blade between hands instead of hitting a backhand. Most sessions are long rallies with one other person. It gives me a break from software.
				</Chapter>

				<Chapter {...chapters[3]} active={active === chapters[3].id} preload={isNear(chapters[3].id)}>
					Non-fiction, usually tied to whatever I am building or trading at the time. Fiction in between to reset.
				</Chapter>

				<Chapter
					{...chapters[4]}
					active={active === chapters[4].id} preload={isNear(chapters[4].id)}
					after={
						<>
							<ProjectLinks
								heading="More on this hobby"
								compact
								mt={6}
								maxW="64ch"
								links={[{ name: "Home lab", detail: "What I plan to run at home and where it stands", href: "/home-lab" }]}
							/>
							<NotesBlock path="/hobbies#home-lab" mt={4} />
						</>
					}>
					I am planning a <Link as={NextLink} href="/home-lab">home lab</Link>: one place for the storage, photos, streaming, home automation and local AI my household runs for itself. Most of it is still a plan. Today an agent runs on a laptop, and my devices share a private network. I <Link href="https://notes.junxiong.dev" target="_blank" rel="noopener noreferrer">write up what I learn as I go</Link>.
				</Chapter>

				<Chapter
					{...chapters[5]}
					active={active === chapters[5].id} preload={isNear(chapters[5].id)}
					after={
						<>
							<ProjectLinks
								heading="Built from this hobby"
								compact
								mt={6}
								maxW="64ch"
								links={[
									{ name: "Trading engine", detail: "Tests trading ideas overnight, with rules set before the results come in", href: "/trading-engine" },
								]}
							/>
							<NotesBlock path="/hobbies#trading" mt={4} />
						</>
					}>
					I trade stocks against a written playbook. A setup needs entry, exit and invalidation rules before I touch it; the journal records each trade in R so one repeating mistake is visible at review time. The visual beside this is an illustrative study, not my account.
				</Chapter>

				<Box className={styles.outro}>
					<NotesBlock path="/hobbies" heading="Notes on this page" mt={0} />
				</Box>
			</Box>
		</Layout>
	);
}
