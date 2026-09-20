import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
import HobbyScene from "../components/HobbyScene";
import Layout from "../components/layouts/Articles";
import styles from "../styles/Hobbies.module.css";

const chapters = [
	{ id: "coding-ai", index: "01", label: "Coding & AI", kind: "ai" },
	{ id: "tennis", index: "02", label: "Tennis", kind: "tennis" },
	{ id: "trading", index: "03", label: "Trading", kind: "trading" },
	{ id: "home-servers", index: "04", label: "Home servers", kind: "server" },
	{ id: "travel", index: "05", label: "Travel", kind: "travel" },
	{ id: "reading", index: "06", label: "Reading", kind: "reading" },
];

function Chapter({ id, index, label, kind, active, children }) {
	return (
		<Box as="section" id={id} className={styles.chapter} data-chapter={kind}>
			<Box className={styles.copy}>
				<Text className={styles.number}>{index} / 06</Text>
				<Text as="h2" className={styles.heading}>{label}</Text>
				<Text className={styles.prose}>{children}</Text>
			</Box>
			<Box
				className={styles.visual}
				aria-label={`${label} visual`}
				data-hobby-visual
				data-chapter-id={id}>
				<Box className={styles.visualSticky}>
					<HobbyScene kind={kind} label={label} active={active} />
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

	return (
		<Layout animate={false} title="Hobbies" description="Coding and experimenting with AI are Ong Jun Xiong’s main hobbies, alongside tennis, trading, home servers, travel and reading.">
			<Box ref={pageRef} className={styles.page}>
				<Box as="header" className={styles.intro}>
					<Box className={styles.introInner}>
						<Text className={styles.eyebrow}>{"// OFF THE CLOCK"}</Text>
						<Text as="h1" className={styles.title}>Things I keep returning to.</Text>
						<Text className={styles.lede}>Six interests, from agent experiments to a quiet stack of books. Scroll normally; the objects are just here to keep you company.</Text>
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

				<Chapter {...chapters[0]} active={active === chapters[0].id}>
					This is my main hobby. I like trying models, building little tools, and seeing what I can get an agent to do. That is how I end up with <Link as={NextLink} href="/groundplane">Groundplane</Link>, a Python library that checks declared output fields against recorded tool results; <Link as={NextLink} href="/jobforge">Jobforge</Link>, a Claude Code plugin that grades the plan you say before you code; my notes and life admin kept as a markdown repo that an AI agent tends for me; and a <Link href="https://github.com/ong6/sg-property-analysis" target="_blank" rel="noopener noreferrer">Singapore property data-analysis project</Link>. Most of it starts with something I want to try or a problem I want to fix for myself.
				</Chapter>

				<Chapter {...chapters[1]} active={active === chapters[1].id}>
					My main sport. Getting better means picking one flaw and drilling it until it is boring. I play with two forehands, swapping my Wilson Blade between hands instead of hitting a backhand. It is also the only hour in a day where I am not thinking about software.
				</Chapter>

				<Chapter {...chapters[2]} active={active === chapters[2].id}>
					I trade stocks against a written playbook. A setup needs entry, exit and invalidation rules before I touch it; the journal is designed to record each trade in R and make one repeating mistake visible at review time.
				</Chapter>

				<Chapter {...chapters[3]} active={active === chapters[3].id}>
					I am speccing an always-on inference box that serves models to my own tools. So far the hobby is mostly purchase arithmetic: tokens per second is roughly memory bandwidth divided by model size, and that one line settles more hardware arguments than any benchmark thread. I <Link href="https://notes.junxiong.dev" target="_blank" rel="noopener noreferrer">write up what I learn as I go</Link>.
				</Chapter>

				<Chapter {...chapters[4]} active={active === chapters[4].id}>
					Six months in Munich on NUS Overseas Colleges, which was long enough to have a regular grocery store. That is the part I want from a trip now, so I go slow: fewer places, more days in each.
				</Chapter>

				<Chapter {...chapters[5]} active={active === chapters[5].id}>
					Non-fiction, usually tied to whatever I am building or trading at the time. Fiction in between to reset.
				</Chapter>
			</Box>
		</Layout>
	);
}
