import { Button } from "@chakra-ui/react";

// The site's one filled button (STYLE.md, Ornaments: the primary action):
// accent fill, paper or ink label, the 4px control radius, 44px tall. Used for
// Email me on Contact and Download PDF on the résumé. Renders a link.
export default function FilledButton({ children, ...props }) {
	return (
		<Button as="a" colorScheme="mint" minH="44px" px={5} fontSize="15px" {...props}>
			{children}
		</Button>
	);
}
