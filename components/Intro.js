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
				<Heading as="h2" variant="page-title" textAlign="center">
					:/$ Ong Jun Xiong
				</Heading>
				<Text textAlign="center">
					Software Developer • Computer Science Student • Rock Climber
				</Text>
			</Box>
			<Box flexShrink={0} mt={4} textAlign="center">
				<Center>
					<Image
						borderColor="whiteAlpha.800"
						borderWidth={2}
						borderStyle="solid"
						maxW={{ sm: "250px" }}
						display="inline-block"
						borderRadius="full"
						src="/images/junxiong.png"
						alt="Profile image"
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
