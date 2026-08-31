import Link from "next/link";
import Image from "next/image";
import { Text, useColorModeValue } from "@chakra-ui/react";
import styled from "@emotion/styled";

const LogoBox = styled.span`
	font-weight: bold;
	font-size: 22px;
	display: inline-flex;
	align-items: center;
	height: 30px;
	line-height: 20px;
	padding: 10px;

	img {
		transition: 200ms ease;
	}

	&:hover img {
		transform: rotate(20deg);
	}
`;

const Logo = () => {
	const codeImg = `/images/Brackets${useColorModeValue("", "-dark")}.png`;

	return (
		<Link href="/" aria-label="Ong Jun Xiong — home">
			<LogoBox>
				<Image src={codeImg} width={20} height={20} alt="" />
				<Text
					color={useColorModeValue("gray.800", "whiteAlpha.900")}
					fontFamily="var(--font-sans)"
					fontWeight="bold"
					ml={3}>
					Jun Xiong
				</Text>
			</LogoBox>
		</Link>
	);
};

export default Logo;
