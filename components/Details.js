import { Box } from "@chakra-ui/react";

// A native disclosure for supporting inventories under a case study. The body's
// last ruled row drops its rule so it never doubles the disclosure's own.
//
//   title – the summary line

export default function Details({ title, children }) {
	return (
		<Box
			as="details"
			mt={{ base: 8, md: 10 }}
			borderTop="1px solid"
			borderBottom="1px solid"
			borderColor="border.subtle"
			sx={{
				"& dl > div:last-of-type": { borderBottom: "none" },
				"@media print": {
					"&::details-content": { contentVisibility: "visible", height: "auto" },
					"& > .case-study-details-body": { display: "block" },
				},
			}}>
			<Box
				as="summary"
				minH="44px"
				py={3}
				px={1}
				fontSize="17px"
				fontWeight="700"
				cursor="pointer"
				_focusVisible={{ outline: "2px solid", outlineColor: "brand.solid", outlineOffset: "2px" }}>
				{title}
			</Box>
			<Box className="case-study-details-body" pb={4}>
				{children}
			</Box>
		</Box>
	);
}
