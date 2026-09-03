import {
	AspectRatio,
	Badge,
	Box,
	Center,
	Heading,
	Link,
	List,
	ListItem,
	Stack,
	Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
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

const ShowcaseBlock = ({ block }) => {
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
