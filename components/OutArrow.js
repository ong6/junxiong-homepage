import { Box, VisuallyHidden } from "@chakra-ui/react";

// The ↗ on every link that goes somewhere, on the site or off it. The glyph
// sits in a clipped box so the hover animation can fly it out of the corner
// and back in (styles/globals.css). ← and → stay only where they mean a
// direction: back links, previous/next, swipe hints.
//
//   newTab – the link opens a new tab: say so to a screen reader, once, here,
//            so no link forgets it.
export default function OutArrow({ newTab = false, ...props }) {
	return (
		<>
			<Box as="span" data-out-arrow aria-hidden="true" {...props}>
				<span>↗</span>
			</Box>
			{newTab && <VisuallyHidden> (opens in a new tab)</VisuallyHidden>}
		</>
	);
}
