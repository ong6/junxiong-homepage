import {
	Box,
	Button,
	Flex,
	Heading,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Global, css } from "@emotion/react";
import NextLink from "next/link";

const heroStyles = css`
	@keyframes signal-in {
		from {
			clip-path: inset(0 100% 0 0);
		}
		to {
			clip-path: inset(0 0 0 0);
		}
	}

	@keyframes caret-pulse {
		0%,
		45% {
			opacity: 1;
		}
		55%,
		100% {
			opacity: 0.15;
		}
	}

	.signal-line {
		animation: signal-in 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
	}

	.signal-line:nth-of-type(2) {
		animation-delay: 120ms;
	}

	.signal-line:nth-of-type(3) {
		animation-delay: 240ms;
	}

	.signal-line:nth-of-type(4) {
		animation-delay: 360ms;
	}

	.signal-caret {
		animation: caret-pulse 1.2s steps(1) infinite;
	}
`;

const systemLines = [
	["role", "AI infrastructure engineer"],
	["runtime", "A2A · LangGraph"],
	["tools", "Go · MCP"],
	["interface", "React · TypeScript"],
];

function CrtConsole() {
	const shell = useColorModeValue("#D6D0C5", "#2A332F");
	const shellEdge = useColorModeValue("#BBB2A4", "#0A0F0D");
	const label = useColorModeValue("#55675F", "#A5B3AD");

	return (
		<Box
			position="relative"
			maxW={{ base: "440px", md: "400px" }}
			w="100%"
			mx={{ base: "auto", md: 0 }}
			aria-label="A terminal showing Jun Xiong's AI infrastructure stack"
			role="img">
			<Box
				position="absolute"
				inset="8% -5% -5% 8%"
				bg={useColorModeValue("rgba(47,167,120,.12)", "rgba(113,220,178,.08)")}
				filter="blur(24px)"
				aria-hidden="true"
			/>
			<Box
				position="relative"
				bg={shell}
				border="1px solid"
				borderColor={shellEdge}
				borderRadius="18px 18px 12px 12px"
				p={{ base: 3, smmd: 4 }}
				boxShadow={useColorModeValue(
					"0 28px 60px -34px rgba(20,30,26,.55), inset 0 1px rgba(255,255,255,.5)",
					"0 30px 70px -30px rgba(0,0,0,.95), inset 0 1px rgba(255,255,255,.06)"
				)}>
				<Box
					position="relative"
					bg="#08100C"
					border="1px solid #34443C"
					borderRadius="10px"
					overflow="hidden"
					p={{ base: 4, smmd: 5 }}
					minH={{ base: "224px", md: "250px" }}
					fontFamily="var(--font-mono)"
					fontSize={{ base: "11px", smmd: "12px" }}
					lineHeight="1.75"
					color="#C9F3E1"
					textShadow="0 0 10px rgba(113,220,178,.23)"
					boxShadow="inset 0 0 44px rgba(0,0,0,.84)">
					<Flex justify="space-between" color="#71DCB2" mb={3} opacity={0.78}>
						<Text as="span">JX/PRODUCTION</Text>
						<Text as="span">● ONLINE</Text>
					</Flex>
					{systemLines.map(([key, value]) => (
						<Flex key={key} className="signal-line" gap={3} whiteSpace="nowrap">
							<Text as="span" color="#71DCB2" w="70px" flexShrink={0}>
								{key}
							</Text>
							<Text as="span" overflow="hidden" textOverflow="ellipsis">
								{value}
							</Text>
						</Flex>
					))}
					<Box mt={3} pt={3} borderTop="1px solid rgba(113,220,178,.18)">
						<Text as="span" color="#71DCB2">
							ready $ {" "}
						</Text>
						<Box
							as="span"
							className="signal-caret"
							display="inline-block"
							w="7px"
							h="13px"
							mb="-2px"
							bg="#71DCB2"
						/>
					</Box>
					<Box
						position="absolute"
						inset={0}
						pointerEvents="none"
						background="repeating-linear-gradient(0deg, rgba(0,0,0,.16) 0, rgba(0,0,0,.16) 1px, transparent 2px, transparent 4px)"
					/>
					<Box
						position="absolute"
						inset={0}
						pointerEvents="none"
						background="radial-gradient(ellipse at center, transparent 54%, rgba(0,0,0,.5) 100%)"
					/>
				</Box>
				<Flex justify="space-between" align="center" pt={2} px={1} color={label}>
					<Text
						fontFamily="var(--font-mono)"
						fontSize="9px"
						fontWeight="700"
						letterSpacing=".15em">
						JX-26
					</Text>
					<Flex gap={1.5} aria-hidden="true">
						<Box w="5px" h="5px" borderRadius="full" bg="mint.500" />
						<Box w="5px" h="5px" borderRadius="full" bg={label} opacity={0.4} />
					</Flex>
				</Flex>
			</Box>
			<Box w="32%" h="14px" mx="auto" bg={shell} borderX="1px solid" borderColor={shellEdge} />
			<Box
				w="52%"
				h="8px"
				mx="auto"
				bg={shell}
				border="1px solid"
				borderColor={shellEdge}
				borderRadius="6px 6px 3px 3px"
			/>
		</Box>
	);
}

export default function TerminalHero() {
	const eyebrowColor = useColorModeValue("mint.700", "mint.300");
	const solidBg = useColorModeValue("graphite.900", "mint.300");
	const solidColor = useColorModeValue("warm.50", "graphite.900");
	const solidHoverBg = useColorModeValue("graphite.700", "mint.200");

	return (
		<Box as="section" pt={{ base: 12, md: 20 }} pb={{ base: 16, md: 24 }}>
			<Global styles={heroStyles} />
			<Box
				display="grid"
				gridTemplateColumns={{ base: "1fr", md: "minmax(0, 1.18fr) minmax(300px, .82fr)" }}
				gap={{ base: 12, md: 12, lg: 20 }}
				alignItems="center">
				<Box maxW="660px">
					<Flex
						align="center"
						gap={3}
						fontFamily="var(--font-mono)"
						fontSize="11px"
						fontWeight="700"
						letterSpacing=".11em"
						textTransform="uppercase"
						color={eyebrowColor}
						mb={5}>
						<Box w="28px" h="1px" bg="currentColor" />
						AI infrastructure engineer · TikTok · Singapore
					</Flex>
					<Heading
						as="h1"
						fontSize={{ base: "42px", smmd: "52px", lg: "68px" }}
						lineHeight={{ base: 1.03, lg: 0.98 }}
						letterSpacing="-.055em"
						maxW="760px">
						I build the systems behind production AI.
					</Heading>
					<Text
						mt={{ base: 5, md: 7 }}
						fontSize={{ base: "17px", md: "19px" }}
						lineHeight="1.65"
						color="text.muted"
						maxW="620px">
						Agent runtimes, tool servers, data platforms, and the interfaces
						people use. I turn ambiguous operational problems into reliable
						systems used across the US, Southeast Asia, and the UK.
					</Text>
					<Stack direction={{ base: "column", smmd: "row" }} spacing={3} mt={8}>
						<Button
							as="a"
							href="#work"
							rightIcon={<ArrowForwardIcon />}
							bg={solidBg}
							color={solidColor}
							px={6}
							_hover={{ transform: "translateY(-2px)", bg: solidHoverBg }}>
							See selected work
						</Button>
						<Button
							as={NextLink}
							href="/resume"
							variant="outline"
							rightIcon={<ArrowForwardIcon />}
							borderColor="border.subtle"
							_hover={{ transform: "translateY(-2px)", bg: "surface.quiet" }}>
							View résumé
						</Button>
					</Stack>
					<Text mt={5} fontSize="13px" color="text.muted">
						Interested in AI infrastructure, backend, and forward-deployed roles.
					</Text>
				</Box>

				<CrtConsole />
			</Box>
		</Box>
	);
}
