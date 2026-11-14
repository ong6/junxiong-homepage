import { AspectRatio, Box, Button, Center, Flex, Link, Stack, Text, usePrefersReducedMotion } from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import FactList from "./FactList";
import OutArrow from "./OutArrow";
import styles from "../styles/Archive.module.css";

// One row of the Archive ledger (/works): a native disclosure whose closed
// state is the ledger line (thumbnail, title, tag, one-line summary) and whose
// open state is the entry itself: its paragraph, its facts and its media, in
// the 680px measure. `id` is the slug, so /works#<slug> lands on the row even
// without script; pages/works.js opens it from the hash.
//
// Media mounts only once the row has been opened, so the list downloads its
// 14 thumbnails and nothing else. Embeds unmount again on close, so a playing
// video never carries on behind a closed row.

const MEASURE = 680;
const DIM = { _dark: { filter: "brightness(.86) contrast(1.04)" } };

// The entry's links, platform and stack as fact rows; labels used twice
// ("Featured on") share one row.
function factsFor(entry) {
	const rows = [["Dates", entry.dateRange]];
	for (const item of entry.meta) {
		let row = rows.find(([label]) => label === item.label);
		if (!row) {
			row = [item.label, []];
			rows.push(row);
		}
		row[1].push(item);
	}
	return rows.map(([label, items]) =>
		typeof items === "string"
			? [label, items]
			: [
					label,
					items.every((item) => !item.href)
						? items.map((item) => item.text).join(" · ")
						: items.map((item, i) => (
								<Fragment key={item.text}>
									{i ? " · " : ""}
									<FactValue item={item} />
								</Fragment>
							)),
				],
	);
}

function FactValue({ item }) {
	if (!item.href) return item.text;
	return (
		<Link href={item.href} target="_blank" rel="noopener noreferrer" display="inline-flex" alignItems="center" minH="44px" minW="44px" my={-3}>
			{item.text}
			<OutArrow newTab ml="4px" />
		</Link>
	);
}

// Screenshots never render above their own pixels, nor taller than 80% of
// the window (one dashboard is a 2250×3997 page capture).
function Shot({ block }) {
	const ratio = block.width / block.height;
	return (
		<Box w="100%" maxW={`min(${block.width}px, calc(80vh * ${ratio.toFixed(4)}))`} rounded="md" overflow="hidden" border="1px solid" borderColor="border.subtle" {...DIM}>
			<Image
				src={block.src}
				alt={block.alt}
				width={block.width}
				height={block.height}
				sizes={`(max-width: ${MEASURE + 40}px) 100vw, ${Math.min(block.width, MEASURE)}px`}
				unoptimized={block.animated}
				style={{ display: "block", width: "100%", height: "auto" }}
			/>
		</Box>
	);
}

// A short silent screen recording: plays muted and looped while its row is
// open, unless the reader prefers reduced motion, when the poster waits
// behind a play control.
function Recording({ block, open }) {
	const ref = useRef(null);
	const reducedMotion = usePrefersReducedMotion();
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		const video = ref.current;
		if (!video) return undefined;
		if (open && !reducedMotion) video.play().catch(() => {});
		else video.pause();
		return () => video.pause();
	}, [open, reducedMotion]);

	return (
		<Box position="relative" w="100%" maxW={`${block.width}px`}>
			<Box
				as="video"
				ref={ref}
				muted
				loop
				playsInline
				preload="metadata"
				poster={block.poster}
				aria-label={block.alt}
				onPlay={() => setPlaying(true)}
				onPause={() => setPlaying(false)}
				display="block"
				w="100%"
				h="auto"
				aspectRatio={`${block.width} / ${block.height}`}
				rounded="md"
				border="1px solid"
				borderColor="border.subtle"
				{...DIM}>
				<source src={block.webm} type="video/webm" />
				<source src={block.src} type="video/mp4" />
			</Box>
			{reducedMotion && !playing && (
				<Center position="absolute" inset={0}>
					<Button onClick={() => ref.current?.play()} size="sm" minH="44px" bg="rgba(0,0,0,.72)" color="white" _hover={{ bg: "rgba(0,0,0,.88)" }} leftIcon={<TriangleUpIcon transform="rotate(90deg)" boxSize={3} />}>
						Play recording
					</Button>
				</Center>
			)}
		</Box>
	);
}

// A YouTube embed URL maps straight onto its watch URL; Figma blocks carry
// an explicit `href`.
const watchUrl = (src) => {
	const id = src.split("/embed/")[1]?.split(/[?&]/)[0];
	return id ? `https://www.youtube.com/watch?v=${id}` : src;
};

function Embed({ block }) {
	const youtube = block.type === "youtube";
	return (
		<Box w="100%">
			<AspectRatio ratio={16 / 9} border="1px solid" borderColor="border.subtle" rounded="md" overflow="hidden" bg="surface.quiet">
				<iframe
					title={block.title}
					src={block.src}
					loading="lazy"
					allowFullScreen
					{...(youtube && {
						allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
						referrerPolicy: "strict-origin-when-cross-origin",
					})}
				/>
			</AspectRatio>
			<Text mt={2} fontSize="14px" color="text.muted">
				<Link href={youtube ? watchUrl(block.src) : block.href} target="_blank" rel="noopener noreferrer" display="inline-flex" alignItems="center" minH="44px" my={-3}>
					{youtube ? "Watch on YouTube" : "Open in Figma"}
					<OutArrow newTab ml="4px" />
				</Link>
			</Text>
		</Box>
	);
}

function Media({ block, open }) {
	if (block.type === "image") return <Shot block={block} />;
	if (block.type === "video") return <Recording block={block} open={open} />;
	return open ? <Embed block={block} /> : null;
}

export default function ArchiveEntry({ id, entry, open, onToggle }) {
	// Mount media on the first open and keep it, so closing animates the
	// whole panel shut instead of collapsing it first.
	const [loaded, setLoaded] = useState(open);
	if (open && !loaded) setLoaded(true);

	return (
		<Box as="details" id={id} className={styles.entry} open={open} onToggle={(event) => onToggle(id, event.currentTarget.open)} borderTopWidth="1px" borderColor="border.subtle" scrollMarginTop={{ base: "80px", md: "96px" }}>
			<Flex as="summary" className={styles.summary} align="flex-start" gap={4} py={4} cursor="pointer" _hover={{ bg: "surface.raised" }} transitionProperty="background-color" transitionDuration="var(--dur-hover)">
				{/* A 16:9 frame (64×36, 80×45) to match the screenshots, which
				    fill it; logos with their own background stay contained.
				    Framed, and dimmed in dark mode like the screenshots. */}
				<Box position="relative" flexShrink={0} w={{ base: "64px", md: "80px" }} aspectRatio="16 / 9" rounded="md" overflow="hidden" border="1px solid" borderColor="border.subtle" bg={entry.thumbnail.background || "surface.quiet"} {...DIM}>
					<Image
						src={entry.thumbnail.src}
						alt=""
						fill
						sizes="80px"
						style={{
							objectFit: entry.thumbnail.background ? "contain" : "cover",
							padding: entry.thumbnail.padding || "0",
						}}
					/>
				</Box>
				<Box minW={0} flex="1">
					<Flex align="baseline" wrap="wrap" columnGap={3} rowGap={0}>
						<Text as="h3" fontSize={{ base: "16px", md: "17px" }} fontWeight="700">
							{entry.title}
						</Text>
						{entry.note && (
							<Text fontFamily="var(--font-mono)" fontSize="12px" color="text.muted" whiteSpace="nowrap">
								{entry.note}
							</Text>
						)}
					</Flex>
					<Text fontSize="15px" lineHeight="text" color="text.muted" mt={1}>
						{entry.summary}
					</Text>
				</Box>
				<Box as="span" className={styles.marker} aria-hidden="true" flexShrink={0} mt="5px" mr={{ base: 0, md: 2 }} color="text.muted" />
			</Flex>
			<Box pl={{ base: 0, md: "96px" }} pt={1} pb={{ base: 8, md: 10 }}>
				<Text maxW={`${MEASURE}px`} fontSize="16px" lineHeight="prose">
					{entry.body}
				</Text>
				<FactList facts={factsFor(entry)} mt={5} maxW={`${MEASURE}px`} />
				{loaded && (
					<Stack spacing={6} mt={8} maxW={`${MEASURE}px`}>
						{entry.showcase.map((block) => (
							<Media key={block.src} block={block} open={open} />
						))}
					</Stack>
				)}
			</Box>
		</Box>
	);
}
