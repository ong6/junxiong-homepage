import { Box } from "@chakra-ui/react";

// The ↗ on links that leave the site. The glyph sits in a clipped box so the
// hover animation can fly it out of the corner and back in (styles/globals.css).
export default function OutArrow(props) {
	return (
		<Box as="span" data-out-arrow aria-hidden="true" {...props}>
			<span>↗</span>
		</Box>
	);
}

// The → on links that stay on the site: same box as OutArrow, so a row of
// utility links shares one arrow style; it nudges right on hover.
export function NextArrow(props) {
	return (
		<Box as="span" data-in-arrow aria-hidden="true" {...props}>
			<span>→</span>
		</Box>
	);
}
