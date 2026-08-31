import {
	Box,
	Center,
	Heading,
	Image,
	SkeletonCircle,
	Text,
} from "@chakra-ui/react";
import React from "react";

export default function Intro() {
	return (
		<Box
			pt={8}
			pb={4}
			display={{ md: "flex" }}
			alignItems="center"
			flexDirection="column"
			className="space-y-8">
			<Box flexGrow={1} alignItems="center" className="space-y-4">
				<Heading as="h1" variant="page-title" textAlign="center">
					:/$ Ong Jun Xiong
				</Heading>
				<Text textAlign="center">
					Software Engineer @ TikTok • AI Infrastructure • Tennis Player
				</Text>
			</Box>
			<Box flexShrink={0} mt={4} textAlign="center">
				<Center>
					<Image
						borderColor="whiteAlpha.800"
						borderWidth={2}
						borderStyle="solid"
						boxSize={{ base: "200px", sm: "250px" }}
						display="inline-block"
						borderRadius="full"
						objectFit="cover"
						src="/images/junxiong.webp"
						alt="Portrait of Ong Jun Xiong"
						loading="eager"
						fetchPriority="high"
						decoding="async"
						fallback={
							<SkeletonCircle
								width={{ sm: "250px" }}
								height={{ sm: "250px" }}
							/>
						}
					/>
				</Center>
			</Box>
		</Box>
	);
}
