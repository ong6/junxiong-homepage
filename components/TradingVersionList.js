import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { VERSIONS } from "../lib/tradingVersions";

// Every engine version in order, for the current page and the full past
// pages. The version on screen is plain text; every other one links out.
//
//   active – "v7" | "v8" …

export default function TradingVersionList({ active }) {
	return (
		<Box as="ol" listStyleType="none" mt={6} borderTop="1px solid" borderColor="border.subtle">
			{VERSIONS.map(({ v, href, when, title, body, current }) => (
				<Box
					as="li"
					key={v}
					display="grid"
					gridTemplateColumns={{ base: "48px 1fr", md: "64px 1fr" }}
					columnGap={4}
					py={4}
					borderBottom="1px solid"
					borderColor="border.subtle">
					<Text fontFamily="var(--font-mono)" fontSize="14px" fontWeight="700" color={v === active ? "brand.solid" : "text.muted"}>
						{v}
					</Text>
					<Box>
						<Text fontFamily="var(--font-mono)" fontSize="12px" letterSpacing=".06em" color="text.muted" textTransform="uppercase">
							{when}
							{current ? " · current" : ""}
						</Text>
						<Text mt={1} fontSize={{ base: "17px", md: "18px" }} fontWeight="700">
							{v === active ? (
								title
							) : (
								<Link as={NextLink} href={href} prefetch={false} display="block" py={1}>
									{title}&nbsp;→
								</Link>
							)}
						</Text>
						<Text mt={1} fontSize={{ base: "16px", md: "17px" }} lineHeight="1.7" color="text.muted">
							{body}
						</Text>
					</Box>
				</Box>
			))}
		</Box>
	);
}
