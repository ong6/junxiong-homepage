import { Box } from "@chakra-ui/react";
import { Fragment } from "react";

// The mono fact table under a case study: labels in a fixed column, values
// left-aligned in their own column so a long value wraps under itself instead
// of pushing against the label. Stacks on phones.
//
//   facts – [label, value] pairs
//
// A value made of " · " items wraps between items on wider screens, never
// inside one, as long as each item is short enough to fit the column.

function Value({ value }) {
	const items = typeof value === "string" ? value.split(" · ") : [];
	if (items.length < 2 || items.some((item) => item.length > 40)) return value;
	return items.map((item, i) => (
		<Fragment key={i}>
			{i ? "\u00a0· " : ""}
			<Box as="span" whiteSpace={{ md: "nowrap" }}>
				{item}
			</Box>
		</Fragment>
	));
}

export default function FactList({ facts, ...props }) {
	return (
		<Box
			as="dl"
			mt={{ base: 12, md: 16 }}
			borderTop="1px solid"
			borderColor="border.subtle"
			fontFamily="var(--font-mono)"
			fontSize="12px"
			{...props}>
			{facts.map(([label, value]) => (
				<Box
					key={label}
					display="grid"
					gridTemplateColumns={{ base: "1fr", md: "13rem 1fr" }}
					columnGap={6}
					rowGap={1}
					py={{ base: 3, md: 2.5 }}
					borderBottom="1px solid"
					borderColor="border.subtle">
					<Box as="dt" color="text.muted">
						{label}
					</Box>
					<Box as="dd" ml={0} lineHeight="1.6" sx={{ textWrap: "pretty" }}>
						<Value value={value} />
					</Box>
				</Box>
			))}
		</Box>
	);
}
