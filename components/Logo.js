import Link from "next/link";
import Image from "next/image";
import { Text, useColorModeValue } from "@chakra-ui/react";
import styled from "@emotion/styled";

const LogoBox = styled.span`
	font-weight: bold;
	font-size: 22px;
	display: inline-flex;
	align-items: center;
	height: 32px;
	line-height: 20px;

	img {
		transition: transform 200ms var(--ease-out);
	}

	@media (hover: hover) and (pointer: fine) {
		&:hover img {
			transform: rotate(20deg);
		}
	}
`;

const Logo = () => {
	const codeImg = `/images/Brackets${useColorModeValue("", "-dark")}.png`;

	return (
		<Link href="/" aria-label="Ong Jun Xiong — home">
			<LogoBox>
				<Text
					color={useColorModeValue("gray.800", "whiteAlpha.900")}
					fontFamily="var(--font-sans)"
					fontWeight="bold">
					Jun Xiong
				</Text>
				<Image src={codeImg} width={20} height={20} alt="" style={{ marginLeft: "8px" }} />
			</LogoBox>
		</Link>
	);
};

export default Logo;
