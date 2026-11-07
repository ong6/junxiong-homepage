import NextImage from "next/image";
import { Heading, Box } from "@chakra-ui/react";
import { BackLink, ARTICLE_TITLE } from "./ArticleParts";

// Same opening as every other article page: a 44px back link, then the h1.
export const Title = ({ children }) => (
	<Box pt={{ base: 10, md: 16 }} mb={6}>
		<BackLink href="/works">Archive</BackLink>
		<Heading as="h1" mt={{ base: 8, md: 10 }} fontSize={ARTICLE_TITLE} lineHeight="1" letterSpacing="-.045em">
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
				borderRadius: "6px",
			}}
		/>
	</Box>
);

// Meta labels use the site's mono label (the FactList look), not Chakra's
// default green badge.
export const Meta = ({ children }) => (
	<Box
		as="span"
		mr={3}
		color="text.muted"
		fontFamily="var(--font-mono)"
		fontSize="12px"
		fontWeight="700"
		letterSpacing=".08em"
		textTransform="uppercase">
		{children}
	</Box>
);
