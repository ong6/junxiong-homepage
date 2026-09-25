import { Box, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { CURRENT, VERSIONS } from "../lib/tradingVersions";

// Page-level version tabs for the trading-engine case study. Each version is
// its own route, so a past diagram can be linked and indexed. On narrow screens
// the row scrolls sideways instead of wrapping.
//
//   active – "v1" … "v6"

export default function VersionSwitcher({ active, ...props }) {
	const current = VERSIONS.find((version) => version.v === active);
	const isPast = !current?.current;

	return (
		<Box {...props}>
			<Flex
				as="nav"
				aria-label="Engine versions"
				gap={2}
				overflowX="auto"
				pb={1}
				sx={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
				{VERSIONS.map(({ v, href, current: isCurrent }) => {
					const selected = v === active;
					return (
						<Link
							key={v}
							as={NextLink}
							href={href}
							prefetch={false}
							aria-current={selected ? "page" : undefined}
							display="inline-flex"
							alignItems="center"
							gap={1.5}
							flexShrink={0}
							minH="44px"
							px={4}
							border="1px solid"
							borderColor={selected ? "brand.solid" : "border.subtle"}
							borderRadius="4px"
							bg={selected ? "brand.solid" : "surface.raised"}
							color={selected ? "page.bg" : "page.text"}
							fontFamily="var(--font-mono)"
							fontSize="13px"
							fontWeight="700"
							textDecoration="none"
							_hover={{ textDecoration: "none", borderColor: "brand.solid" }}>
							{v}
							{isCurrent ? (
								<Text as="span" fontSize="10px" letterSpacing=".08em" opacity={0.8}>
									NOW
								</Text>
							) : null}
						</Link>
					);
				})}
			</Flex>
			{current ? (
				<Text mt={3} color="text.muted" fontFamily="var(--font-mono)" fontSize="12px" letterSpacing=".04em">
					{current.v} · {current.when} · {current.title}
					{isPast ? (
						<>
							{" · "}
							<Link as={NextLink} href={CURRENT.href} color="brand.solid" fontWeight="700">
								see {CURRENT.v}, the current engine →
							</Link>
						</>
					) : null}
				</Text>
			) : null}
		</Box>
	);
}
