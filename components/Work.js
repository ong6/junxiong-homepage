import NextLink from "next/link";
import NextImage from "next/image";
import { Heading, Box, Link, Badge } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export const Title = ({ children }) => (
	<Box pt={{ base: 12, md: 16 }} mb={6}>
		<Link as={NextLink} href="/works">
			Archive
		</Link>
		<span>
			{" "}
			<ChevronRightIcon />{" "}
		</span>
		<Heading
			display="inline-block"
			as="h1"
			fontSize={{ base: "26px", md: "32px" }}
			letterSpacing="-.02em"
			ml={1}>
			{children}
		</Heading>
	</Box>
);

// Capped at the file's own pixel width and centred, so small screenshots are
// never upscaled to the column. Animated WebPs bypass the optimiser, which
// would otherwise serve them as-is anyway.
export const WorkImage = ({ src, alt, width, height, animated = false }) => (
	<Box mb={4} mx="auto" w="100%" maxW={`${width}px`}>
		<NextImage
			src={src}
			alt={alt}
			width={width}
			height={height}
			sizes={`(max-width: 768px) 100vw, ${width}px`}
			unoptimized={animated}
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
