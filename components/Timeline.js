import { Badge, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

export default function Timeline({ items }) {
	const railColor = useColorModeValue("rgba(65,54,45,0.20)", "whiteAlpha.300");
	const nodeIdle = useColorModeValue("rgba(65,54,45,0.35)", "whiteAlpha.500");
	const pageBg = useColorModeValue("#EEE2DC", "#202023");

	// Single source of truth for the timeline geometry. `--rail-x` is the centre
	// line of the rail, measured from the container's border box; the nodes are
	// derived from it rather than hand-tuned, so they cannot drift apart.
	const geometry = {
		"--tl-pad": "24px",
		"--tl-rail-x": "6.5px", // half the widest node → flush with the page column
		"--tl-node-y": "12px",
		"@media (min-width: 48em)": {
			"--tl-pad": "28px",
		},
	};

	// Nodes/segments live inside each item (which is the positioning context),
	// so shift back out of the container padding to land on the rail centre.
	const railCentre = "calc(var(--tl-rail-x) - var(--tl-pad))";

	return (
		<Box position="relative" pl="var(--tl-pad)" mt={2} sx={geometry}>
			{items.map((row, i) => {
				const isCurrent = i === 0;
				const isLast = i === items.length - 1;
				const size = isCurrent ? "13px" : "9px";
				return (
					<Box key={row.title} position="relative" pb={isLast ? 0 : 7}>
						{/* rail segment: this node's centre → the next node's centre */}
						{!isLast && (
							<Box
								position="absolute"
								left={railCentre}
								top="var(--tl-node-y)"
								bottom="calc(-1 * var(--tl-node-y))"
								w="1px"
								transform="translateX(-50%)"
								bg={railColor}
							/>
						)}

						{/* the node — self-centring on the rail at any diameter */}
						<Box
							position="absolute"
							left={railCentre}
							top="var(--tl-node-y)"
							w={size}
							h={size}
							transform="translate(-50%, -50%)"
							borderRadius="full"
							bg={isCurrent ? "teal.400" : pageBg}
							border="1px solid"
							borderColor={isCurrent ? "teal.400" : nodeIdle}
							boxShadow={isCurrent ? "0 0 0 4px rgba(56,178,172,0.18)" : "none"}
						/>

						<Flex align="center" wrap="wrap" gap={2.5}>
							<Text
								fontFamily="'JetBrains Mono', monospace"
								fontSize="11px"
								fontWeight="700"
								letterSpacing="0.07em"
								textTransform="uppercase"
								opacity={0.7}>
								{row.period}
							</Text>
							{isCurrent && (
								<Badge variant="subtle" colorScheme="teal" fontSize="9px">
									current
								</Badge>
							)}
							{row.tag && (
								<Badge variant="outline" colorScheme="gray" fontSize="9px">
									{row.tag}
								</Badge>
							)}
						</Flex>

						<Text fontWeight="bold" fontSize="17px" mt={1}>
							{row.title}
						</Text>
						<Text fontSize="15px" lineHeight="1.7" opacity={0.75} mt={1.5}>
							{row.blurb}
						</Text>
					</Box>
				);
			})}
		</Box>
	);
}
