import NextLink from "next/link";
import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Layout from "./layouts/Articles";
import Section from "./Section";

const BlogLayout = ({ title, date, readingTime, children }) => (
	<Layout title={title}>
		<Box maxW="42rem" mx="auto">
			<Section>
				<Link as={NextLink} href="/blog" fontSize={14}>
					<ChevronLeftIcon mb="2px" />
					Back to blog
				</Link>
				<Heading as="h1" fontSize={26} mt={4} mb={2}>
					{title}
				</Heading>
				<Text fontSize={14} opacity={0.7} mb={8}>
					{date} &middot; {readingTime}
				</Text>
			</Section>
			<Section delay={0.1}>
				<Box
					sx={{
						"& p": { mb: 4, lineHeight: 1.75 },
						"& h2": { mt: 8, mb: 3 },
					}}>
					{children}
				</Box>
			</Section>
		</Box>
	</Layout>
);

export default BlogLayout;
