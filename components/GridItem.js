import NextLink from "next/link";
import Image from "next/image";
import { Box, Text, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Global } from "@emotion/react";

export const GridItem = ({ children, href, title, thumbnail }) => (
	<Box w="100%" textAlign="center">
		<LinkBox cursor="pointer">
			<Image
				src={thumbnail}
				alt={title}
				className="grid-item-thumbnail"
				placeholder="blur"
				loading="lazy"
			/>
			<LinkOverlay href={href} target="_blank">
				<Text mt={2}>{title}</Text>
			</LinkOverlay>
			<Text fontSize={14}>{children}</Text>
		</LinkBox>
	</Box>
);

export const WorkGridItem = ({
	children,
	id,
	title,
	thumbnail,
	backgroundColor,
	padding = "0rem",
}) => (
	<Box w="100%" textAlign="center">
		<NextLink href={`/works/${id}`} passHref>
			<LinkBox cursor="pointer">
				<Box
					position="relative"
					w="100%"
					h="0"
					paddingBottom="56.25%" // 16:9 Aspect Ratio
					backgroundColor={backgroundColor}
					display="flex"
					justifyContent="center"
					alignItems="center"
					rounded="2xl"
					overflow="hidden">
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							bottom: 0,
							right: 0,
							padding: padding,
						}}>
						<Image
							src={thumbnail}
							alt={title}
							layout="responsive"
							width={16}
							height={9}
							objectFit="contain" // Use contain to see full image without crop
						/>
					</div>
				</Box>
				<LinkOverlay href={`/works/${id}`}>
					<Text mt={2} fontSize={20}>
						{title}
					</Text>
				</LinkOverlay>
				<Text fontSize={14}>{children}</Text>
			</LinkBox>
		</NextLink>
	</Box>
);

export const GridItemStyle = () => (
	<Global
		styles={`
      .grid-item-thumbnail {
        border-radius: 12px;
      }
    `}
	/>
);
