import { Box, Heading } from "@chakra-ui/react";
import { Eyebrow } from "./ArticleParts";

// Résumé section head: the site's `// LABEL` eyebrow over the h2 (it used a
// cobalt diamond until 2026-11). The 16px under the heading clears its
// descenders off the section's first rule; every résumé section opens with it.
const TermHeading = ({ children, kicker = "Selected signal", ...props }) => (
	<Box mb={4} {...props}>
		<Eyebrow mb={2}>{kicker}</Eyebrow>
		<Heading as="h2" fontSize={{ base: "32px", md: "44px" }} lineHeight="1.08">
			{children}
		</Heading>
	</Box>
);

export default TermHeading;
