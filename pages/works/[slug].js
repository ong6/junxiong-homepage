import {
	AspectRatio,
	Badge,
	Box,
	Button,
	Center,
	Heading,
	Link,
	List,
	ListItem,
	Stack,
	Text,
	usePrefersReducedMotion,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ExternalLinkIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Title, WorkImage, Meta } from "../../components/Work";
import P from "../../components/Paragraph";
import Layout from "../../components/layouts/Articles";
import works, { workSlugs } from "../../lib/works";

const embedStyle = {
	width: "100%",
	border: "1px solid",
	borderColor: "border.subtle",
	borderRadius: "lg",
	overflow: "hidden",
	bg: "surface.quiet",
};

// A YouTube embed URL maps straight onto its watch URL, so the fallback link
// needs no extra data; Figma blocks carry an explicit `href`.
const youtubeWatchUrl = (src) => {
	const id = src.split("/embed/")[1]?.split(/[?&]/)[0];
	return id ? `https://www.youtube.com/watch?v=${id}` : src;
};

const EmbedFallback = ({ href, children }) => (
	<Text mt={2} fontSize="14px" color="text.muted">
		<Link href={href} target="_blank" rel="noopener noreferrer">
			{children}
			<ExternalLinkIcon mx="2px" />
		</Link>
	</Text>
);

// Short silent screen recordings. Autoplays muted and looped unless the
// visitor prefers reduced motion, in which case the poster sits still behind a
// play control. Sized like WorkImage: never wider than the file's own pixels.
const VideoBlock = ({ block }) => {
	const videoRef = useRef(null);
	const reducedMotion = usePrefersReducedMotion();
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		const video = videoRef.current;
		if (!video || reducedMotion) return undefined;
		video.play().catch(() => {});
		return () => video.pause();
	}, [reducedMotion]);

	const play = () => {
		videoRef.current?.play();
	};

	return (
		<Box mb={4} mx="auto" w="100%" maxW={`${block.width}px`} position="relative">
			<Box
				as="video"
				ref={videoRef}
				muted
				loop
				playsInline
				preload="metadata"
				poster={block.poster}
				aria-label={block.alt}
				onPlay={() => setPlaying(true)}
				onPause={() => setPlaying(false)}
				sx={{
					width: "100%",
					height: "auto",
					aspectRatio: `${block.width} / ${block.height}`,
					display: "block",
					borderRadius: "lg",
				}}>
				<source src={block.webm} type="video/webm" />
				<source src={block.src} type="video/mp4" />
			</Box>
			{reducedMotion && !playing && (
				<Center position="absolute" inset={0}>
					<Button
						onClick={play}
						size="sm"
						bg="rgba(0,0,0,.72)"
						color="white"
						_hover={{ bg: "rgba(0,0,0,.88)" }}
						leftIcon={<TriangleUpIcon transform="rotate(90deg)" boxSize={3} />}>
						Play recording
					</Button>
				</Center>
			)}
		</Box>
	);
};

const ShowcaseBlock = ({ block }) => {
	if (block.type === "video") {
		return <VideoBlock block={block} />;
	}


	if (block.type === "image") {
		return (
			<WorkImage
				src={block.src}
				alt={block.alt}
				width={block.width}
				height={block.height}
				animated={block.animated}
			/>
		);
	}

	if (block.type === "youtube") {
		return (
			<Box>
				<AspectRatio ratio={16 / 9} {...embedStyle}>
					<iframe
						title={block.title}
						src={block.src}
						loading="lazy"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					/>
				</AspectRatio>
				<EmbedFallback href={youtubeWatchUrl(block.src)}>Watch on YouTube</EmbedFallback>
			</Box>
		);
	}

	if (block.type === "figma") {
		return (
			<Box>
				<AspectRatio ratio={16 / 9} {...embedStyle}>
					<iframe title={block.title} src={block.src} loading="lazy" allowFullScreen />
				</AspectRatio>
				<EmbedFallback href={block.href}>Open in Figma</EmbedFallback>
			</Box>
		);
	}

	return null;
};

const MetaValue = ({ item }) => {
	if (!item.href) return <span>{item.text}</span>;

	return (
		<Link href={item.href} target="_blank" rel="noopener noreferrer">
			{item.text}
			<ExternalLinkIcon mx="2px" />
		</Link>
	);
};

const WorkPage = ({ slug }) => {
	const work = works[slug];

	return (
		<Layout title={work.title} description={work.description} schema={{ type: "Article" }}>
			<Box>
				<Title>
					{work.heading} <Badge>{work.dateRange}</Badge>
				</Title>
				<P>{work.body}</P>
				<List ml={4} my={4}>
					{work.meta.map((item) => (
						<ListItem key={`${item.label}-${item.text}`}>
							<Meta>{item.label}</Meta>
							<MetaValue item={item} />
						</ListItem>
					))}
				</List>

				<Heading as="h2" fontSize={16} my={8}>
					<Center>Project Showcase</Center>
				</Heading>

				<Stack spacing={8}>
					{work.showcase.map((block) => (
						<ShowcaseBlock key={block.src} block={block} />
					))}
				</Stack>
			</Box>
		</Layout>
	);
};

export const getStaticPaths = async () => ({
	paths: workSlugs.map((slug) => ({ params: { slug } })),
	fallback: false,
});

export const getStaticProps = async ({ params }) => ({
	props: { slug: params.slug },
});

export default WorkPage;
