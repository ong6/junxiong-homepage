import { Box, Text } from "@chakra-ui/react";

// Code rendered as text, not an image, so it stays selectable and readable in
// both themes. `tone` marks the one line the figure is about. Lines wider than
// the column scroll sideways; a scroll shadow on the right edge (pure CSS, the
// background-attachment trick) shows there is more, and disappears once the
// reader has scrolled to the end.
export const CodeBlock = ({ title, lines }) => {
	// Tokens, so the first paint is in the right theme: the ground is the
	// preview canvas (a warm neutral in both themes), the marked line the accent.
	const muted = "text.muted";
	const hot = "brand.solid";
	const bg = "var(--chakra-colors-preview-canvas)";
	const bg0 = "transparent";
	const shadow = "var(--chakra-colors-scroll-shadow)";
	return (
		<Box mt={4} border="1px solid" borderColor="border.subtle" bg="preview.canvas">
			<Text
				px={{ base: 4, md: 5 }}
				pt={{ base: 4, md: 5 }}
				fontFamily="var(--font-mono)"
				fontSize="12px"
				fontWeight="700"
				letterSpacing=".08em"
				textTransform="uppercase"
				color="text.muted">
				{title}
			</Text>
			<Box
				overflowX="auto"
				px={{ base: 4, md: 5 }}
				pt={3}
				pb={{ base: 4, md: 5 }}
				tabIndex={0}
				aria-label={`${title}, scrolls sideways`}
				sx={{
					WebkitOverflowScrolling: "touch",
					backgroundImage: [
						`linear-gradient(to right, ${bg} 40%, ${bg0})`,
						`linear-gradient(to left, ${bg} 40%, ${bg0})`,
						`linear-gradient(to right, ${shadow}, transparent)`,
						`linear-gradient(to left, ${shadow}, transparent)`,
					].join(", "),
					backgroundPosition: "left, right, left, right",
					backgroundSize: "40px 100%, 40px 100%, 14px 100%, 14px 100%",
					backgroundRepeat: "no-repeat",
					backgroundAttachment: "local, local, scroll, scroll",
				}}
				_focusVisible={{ outline: "2px solid", outlineColor: "brand.solid", outlineOffset: "-2px" }}>
				<Box
					as="pre"
					m={0}
					fontFamily="var(--font-mono)"
					fontSize={{ base: "12px", md: "12.5px" }}
					lineHeight="text"
					whiteSpace="pre"
					w="max-content"
					minW="100%">
					{lines.map(([text, tone], i) => (
						<Box
							as="span"
							key={i}
							display="block"
							color={tone === "muted" ? muted : tone === "hot" ? hot : "page.text"}
							fontWeight={tone === "hot" ? "700" : "400"}>
							{text || " "}
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export const CodeFigure = ({ caption, children }) => (
	<Box as="figure" my={{ base: 10, md: 14 }} mx={0}>
		{children}
		<Text
			as="figcaption"
			mt={3}
			fontFamily="var(--font-mono)"
			fontSize="12px"
			lineHeight="text"
			color="text.muted">
			{caption}
		</Text>
	</Box>
);
