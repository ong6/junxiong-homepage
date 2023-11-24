import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { WorkGridItem } from "../GridItem";
import thumbMarkbind from "../../public/images/works/markbind_01.png";
import thumbNusConnect from "../../public/images/works/nusconnect_03.png";
import thumbSqueezy from "../../public/images/works/squeezy_01.png";

export default function FeaturedProjects() {
	return (
		<>
			<Heading as="h3" variant="section-title" fontSize={24}>
				Projects
			</Heading>
			<SimpleGrid columns={[1, 2, 3]} gap={6}>
				<WorkGridItem
					id="squeezy"
					thumbnail={thumbSqueezy}
					title="Project Squeezy">
					Squeeze your stress away with this smart Stress-Ball!
				</WorkGridItem>
				<WorkGridItem
					id="nusconnect"
					title="NUSConnect"
					thumbnail={thumbNusConnect}>
					A gamified learning management system that is accessible to all and
					easy to use
				</WorkGridItem>
				<WorkGridItem id="markbind" thumbnail={thumbMarkbind} title="Markbind">
					A tool for generating static websites from Markdown-like syntax.
				</WorkGridItem>
			</SimpleGrid>
			<Box align="center" my={4}>
				<NextLink href="/works">
					<Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
						View All Works
					</Button>
				</NextLink>
			</Box>
		</>
	);
}
