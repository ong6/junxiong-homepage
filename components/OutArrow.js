import { Box } from "@chakra-ui/react";

// The ↗ on every link that goes somewhere, on the site or off it. The glyph
// sits in a clipped box so the hover animation can fly it out of the corner
// and back in (styles/globals.css). ← and → stay only where they mean a
// direction: back links, previous/next, swipe hints.
export default function OutArrow(props) {
	return (
		<Box as="span" data-out-arrow aria-hidden="true" {...props}>
			<span>↗</span>
		</Box>
	);
}
