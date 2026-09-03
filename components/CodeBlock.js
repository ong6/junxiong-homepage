import { Box, Text, useColorModeValue } from "@chakra-ui/react";

// Code rendered as text, not an image, so it stays selectable and readable in
// both themes. `tone` marks the one line the figure is about. Lines wider than
// the column scroll sideways; a scroll shadow on the right edge (pure CSS, the
// background-attachment trick) shows there is more, and disappears once the
// reader has scrolled to the end.
export const CodeBlock = ({ title, lines }) => {
	const muted = useColorModeValue("graphite.500", "graphite.300");
	const hot = useColorModeValue("mint.700", "mint.300");
	const [bg, bg0, shadow] = useColorModeValue(
		["#F8F6F0", "rgba(248,246,240,0)", "rgba(26,36,32,.16)"],
		["#151F1B", "rgba(21,31,27,0)", "rgba(0,0,0,.55)"]
	);
	return (
		<Box mt={4} border="1px solid" borderColor="border.subtle" bg={bg}>
			<Text
				px={{ base: 4, md: 5 }}
				pt={{ base: 4, md: 5 }}
				fontFamily="var(--font-mono)"
				fontSize={{ base: "11px", md: "12px" }}
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
				_focusVisible={{ outline: "2px solid", outlineColor: "mint.500", outlineOffset: "-2px" }}>
				<Box
					as="pre"
					m={0}
					fontFamily="var(--font-mono)"
					fontSize={{ base: "11.5px", md: "12.5px" }}
					lineHeight="1.75"
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
			fontSize="11px"
			lineHeight="1.6"
			color="text.muted">
			{caption}
		</Text>
	</Box>
);
