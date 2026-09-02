import NextLink from "next/link";
import NextImage from "next/image";
import { Heading, Box, Link, Badge } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export const Title = ({ children }) => (
	<Box pt={{ base: 12, md: 16 }} mb={6}>
		<Link as={NextLink} href="/works">
			Works
		</Link>
		<span>
			{" "}
			<ChevronRightIcon />{" "}
		</span>
		<Heading display="inline-block" as="h1" fontSize={{ base: "26px", md: "32px" }} letterSpacing="-.02em" ml={1}>
			{children}
		</Heading>
	</Box>
);

export const WorkImage = ({ src, alt, width, height }) => (
	<Box mb={4}>
		<NextImage
			src={src}
			alt={alt}
			width={width}
			height={height}
			sizes="(max-width: 768px) 100vw, 1120px"
			style={{
				width: "100%",
				height: "auto",
				borderRadius: "var(--chakra-radii-lg)",
			}}
		/>
	</Box>
);

export const Meta = ({ children }) => (
	<Badge colorScheme="green" mr={2}>
		{children}
	</Badge>
);
