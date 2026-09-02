import {
	Badge,
	Box,
	Center,
	Heading,
	Link,
	List,
	ListItem,
	Stack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Title, WorkImage, Meta } from "../../components/Work";
import P from "../../components/Paragraph";
import Layout from "../../components/layouts/Articles";
import works, { workSlugs } from "../../lib/works";

const embedStyle = {
	width: "100%",
	my: 4,
	border: "2px solid",
	borderColor: "blue.300",
	borderRadius: "lg",
	overflow: "hidden",
};

const ShowcaseBlock = ({ block }) => {
	if (block.type === "image") {
		return (
			<WorkImage
				src={block.src}
				alt={block.alt}
				width={block.width}
				height={block.height}
			/>
		);
	}

	if (block.type === "youtube") {
		return (
			<Box>
				<iframe
					title={block.title}
					src={block.src}
					width="100%"
					height={block.height}
					loading="lazy"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					frameBorder="0"
					allowFullScreen
				/>
			</Box>
		);
	}

	if (block.type === "figma") {
		return (
			<Box {...embedStyle}>
				<iframe
					title={block.title}
					src={block.src}
					width="100%"
					height={block.height}
					loading="lazy"
					style={{ border: "none", display: "block" }}
					allowFullScreen
				/>
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
		<Layout title={work.title} description={work.description}>
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

				<Heading as="h3" fontSize={16} my={8}>
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
