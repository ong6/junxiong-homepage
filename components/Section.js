import { Box } from "@chakra-ui/react";

// A short rise on mount via CSS (see .page-rise in globals.css). Reduced-motion
// users get the resting state immediately.
const Section = ({ children, delay = 0 }) => (
	<Box className="page-rise" style={{ animationDelay: `${delay}s` }} mb={6}>
		{children}
	</Box>
);

export default Section;
