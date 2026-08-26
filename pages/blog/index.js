import NextLink from "next/link";
import { Box, Heading, Link, Text } from "@chakra-ui/react";
import Layout from "../../components/layouts/Articles";
import Section from "../../components/Section";

const posts = [
	{
		slug: "building-an-agent-platform",
		title: "Notes from building an AI agent platform at work",
		date: "2026-08-10",
		teaser:
			"What actually mattered when I built my team's agent runtime, MCP server, and chat SDK from zero.",
		delay: 0.1,
	},
	{
		slug: "one-person-company",
		title: "I ran a one-person AI company for a year, then a client bought it",
		date: "2026-05-24",
		teaser:
			"Compoze lasted twelve months of nights and weekends. What I'd repeat, and what I wouldn't.",
		delay: 0.2,
	},
	{
		slug: "trading-and-code",
		title: "What trading taught me about writing software",
		date: "2026-03-15",
		teaser:
			"A trade journal and an engineering postmortem are the same document wearing different clothes.",
		delay: 0.3,
	},
];

const Blog = () => (
	<Layout title="Blog">
		<Box maxW="42rem" mx="auto">
			<Heading as="h3" variant="section-title">
				Blog
			</Heading>
			{posts.map((post) => (
				<Section delay={post.delay} key={post.slug}>
					<Box mb={2}>
						<Link as={NextLink} href={`/blog/${post.slug}`} fontSize={18} fontWeight="semibold">
							{post.title}
						</Link>
						<Text fontSize={14} opacity={0.7}>
							{post.date}
						</Text>
						<Text mt={1}>{post.teaser}</Text>
					</Box>
				</Section>
			))}
		</Box>
	</Layout>
);

export default Blog;
