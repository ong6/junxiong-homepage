import { Box } from "@chakra-ui/react";

// Simple fade-up on mount via CSS (see .fade-up in globals.css). Reduced-motion
// users get the resting state immediately.
const Section = ({ children, delay = 0 }) => (
	<Box className="fade-up" style={{ animationDelay: `${delay}s` }} mb={6}>
		{children}
	</Box>
);

export default Section;
