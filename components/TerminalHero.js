import { Box, useColorModeValue } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";

const heroStyles = css`
	@keyframes crt-type {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}
	@keyframes crt-blink {
		0%,
		45% {
			opacity: 1;
		}
		50%,
		100% {
			opacity: 0;
		}
	}
	.crt-typed {
		overflow: hidden;
		white-space: nowrap;
		display: inline-block;
		vertical-align: bottom;
		animation: crt-type 1.6s steps(24) both 0.3s;
	}
	.crt-caret {
		animation: crt-blink 1.1s infinite;
	}
	@media (prefers-reduced-motion: reduce) {
		.crt-typed {
			animation: none;
		}
		.crt-caret {
			animation: none;
		}
	}
`;

const screenLines = [
	{ cmd: "whoami", out: "ong jun xiong" },
	{ cmd: "title", out: "software engineer @ tiktok" },
	{ cmd: "focus", out: "ai infrastructure · go · typescript" },
	{ cmd: "pwd", out: "~/singapore" },
];

export default function TerminalHero() {
	const plastic = useColorModeValue(
		"linear-gradient(180deg, #e8ddd2, #d5c8bb)",
		"linear-gradient(180deg, #3a3a40, #2a2a2e)"
	);
	const plasticEdge = useColorModeValue("#c2b4a5", "#1c1c1f");
	const standColor = useColorModeValue("#d5c8bb", "#2a2a2e");
	const shadow = useColorModeValue(
		"0 30px 40px -24px rgba(80, 60, 40, 0.45)",
		"0 30px 40px -24px rgba(0, 0, 0, 0.8)"
	);
	const prompt = useColorModeValue("#8be9b6", "#8be9b6");
	const brand = useColorModeValue("#7a6a5c", "#6e6a66");

	return (
		<Box pt={10} pb={6} style={{ perspective: "1200px" }}>
			<Global styles={heroStyles} />
			<Box
				maxW="560px"
				mx="auto"
				transform="rotateX(3deg)"
				transition="transform .4s ease"
				_hover={{ transform: "rotateX(0deg)" }}>
				{/* Monitor bezel */}
				<Box
					bg={plastic}
					border="1px solid"
					borderColor={plasticEdge}
					borderRadius="26px"
					p={{ base: 3, md: 5 }}
					boxShadow={shadow}>
					{/* Screen — dark glass in both color modes, like a real CRT */}
					<Box
						position="relative"
						bg="#101312"
						borderRadius="14px"
						overflow="hidden"
						boxShadow="inset 0 0 40px rgba(0,0,0,0.9)"
						fontFamily="'JetBrains Mono', monospace"
						fontSize={{ base: "12px", md: "14px" }}
						lineHeight="1.9"
						p={{ base: 4, md: 6 }}
						color="#cfe8d8"
						textShadow="0 0 6px rgba(139, 233, 182, 0.35)">
						<Box display="flex" whiteSpace="nowrap">
							<Box as="span" color={prompt} mr={2}>
								:/$
							</Box>
							<Box as="span" className="crt-typed">
								{screenLines[0].cmd}
							</Box>
						</Box>
						<Box fontWeight="700" fontSize={{ base: "15px", md: "18px" }}>
							{screenLines[0].out}
						</Box>
						{screenLines.slice(1).map((line) => (
							<Box key={line.cmd}>
								<Box as="span" color={prompt}>
									:/${" "}
								</Box>
								{line.cmd}
								<Box as="span" opacity={0.75}>
									{"  →  "}
									{line.out}
								</Box>
							</Box>
						))}
						<Box>
							<Box as="span" color={prompt}>
								:/${" "}
							</Box>
							<Box
								as="span"
								className="crt-caret"
								display="inline-block"
								w="9px"
								h="16px"
								mb="-2px"
								bg={prompt}
							/>
						</Box>
						{/* Scanlines */}
						<Box
							position="absolute"
							inset={0}
							pointerEvents="none"
							background="repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 2px, transparent 4px)"
						/>
						{/* Vignette / glass curve */}
						<Box
							position="absolute"
							inset={0}
							pointerEvents="none"
							background="radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)"
						/>
					</Box>
					{/* Bezel badge */}
					<Box
						textAlign="center"
						pt={2}
						fontSize="10px"
						letterSpacing="3px"
						color={brand}
						fontFamily="'JetBrains Mono', monospace">
						JX-2026
					</Box>
				</Box>
				{/* Stand */}
				<Box
					w="120px"
					h="16px"
					mx="auto"
					bg={standColor}
					borderBottomRadius="8px"
				/>
				<Box
					w="220px"
					h="10px"
					mx="auto"
					mt="0"
					bg={standColor}
					borderRadius="6px"
				/>
			</Box>
		</Box>
	);
}
