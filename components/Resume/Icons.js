import { Icon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import {
	SiAndroid,
	SiApachekafka,
	SiApachemaven,
	SiAzuredevops,
	SiCplusplus,
	SiCss3,
	SiDart,
	SiDjango,
	SiDocker,
	SiFirebase,
	SiFlask,
	SiFlutter,
	SiGithub,
	SiGnubash,
	SiGooglecloud,
	SiHeroku,
	SiHtml5,
	SiIpfs,
	SiJavascript,
	SiJira,
	SiMongodb,
	SiMysql,
	SiNextdotjs,
	SiPhpmyadmin,
	SiPostgresql,
	SiPrisma,
	SiPython,
	SiReact,
	SiRedux,
	SiSolidity,
	SiSpringboot,
	SiStorybook,
	SiTypescript,
	SiVercel,
	SiVuedotjs,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

export const ResumeLogo = ({ children, title, thumbnail, small = false }) => (
	<Box
		textAlign="center"
		display="flex"
		alignItems="center"
		flexDirection="column"
		px={2}
		mb={5}
		role="group">
		<Icon
			as={thumbnail}
			alt={title}
			w={small ? "36px" : "48px"}
			h={small ? "36px" : "48px"}
			placeholder="blur"
		/>
		<Text
			fontSize="sm"
			fontWeight="bold"
			position="absolute"
			mt={small ? "36px" : "48px"}
			_groupHover={{ opacity: 1, transition: "opacity .2s ease-in" }}
			className="opacity-0 ease-out transition-all duration-1000">
			{children}
		</Text>
	</Box>
);

export default function TechStack({ stack }) {
	return (
		<Box>
			<Box className="flex flex-row flex-wrap">
				{Object.entries(stack).map(([key, value]) => (
					<ResumeLogo key={key} title={key} thumbnail={value} small={true}>
						{key}
					</ResumeLogo>
				))}
			</Box>
		</Box>
	);
}

export const TechBinance = () => {
	const binanceList = {
		HTML: SiHtml5,
		CSS: SiCss3,
		React: SiReact,
		Redux: SiRedux,
		TS: SiTypescript,
		Storybook: SiStorybook,
		Postgres: SiPostgresql,
		Git: SiGithub,
		Docker: SiDocker,
	};
	return <TechStack stack={binanceList} />;
};
export const TechThoughtMachine = () => {
	const tmList = {
		Python: SiPython,
		Azure: SiAzuredevops,
		Kafka: SiApachekafka,
		Postgres: SiPostgresql,
		MongoDB: SiMongodb,
	};
	return <TechStack stack={tmList} />;
};

export const TechTanso = () => {
	const tansoList = {
		Next: SiNextdotjs,
		TS: SiTypescript,
		Prisma: SiPrisma,
		Storybook: SiStorybook,
		Azure: SiAzuredevops,
		Postgres: SiPostgresql,
		Git: SiGithub,
		Docker: SiDocker,
	};
	return <TechStack stack={tansoList} />;
};

export const TechDBS = () => {
	const dbsList = {
		Java: FaJava,
		Maven: SiApachemaven,
		Jira: SiJira,
		Github: SiGithub,
		Bash: SiGnubash,
		Spring: SiSpringboot,
	};
	return <TechStack stack={dbsList} />;
};

export const TechFintech = () => {
	const fintechList = {
		Next: SiNextdotjs,
		Python: SiPython,
		TS: SiTypescript,
		Solidity: SiSolidity,
		IPFS: SiIpfs,
		Github: SiGithub,
	};
	return <TechStack stack={fintechList} />;
};

export const TechTeach = () => {
	const teachList = {
		Java: FaJava,
		Python: SiPython,
		Github: SiGithub,
	};

	return <TechStack stack={teachList} />;
};

export const TechCurve = () => {
	const curveList = {
		Java: FaJava,
		Maven: SiApachemaven,
		CSS: SiCss3,
		PgSQL: SiPostgresql,
		Github: SiGithub,
	};

	return <TechStack stack={curveList} />;
};

export const TechMaha = () => {
	const mahaList = {
		Flutter: SiFlutter,
		Dart: SiDart,
		PHP: SiPhpmyadmin,
		Github: SiGithub,
		MySQL: SiMysql,
	};

	return <TechStack stack={mahaList} />;
};

export const Databases = () => {
	const databaseList = {
		Docker: SiDocker,
		PgSQL: SiPostgresql,
		MySQL: SiMysql,
		Firebase: SiFirebase,
		Heroku: SiHeroku,
		IPFS: SiIpfs,
		mongodb: SiMongodb,
		Kafka: SiApachekafka,
	};

	return <TechStack stack={databaseList} />;
};

export const ToolsAndFramework = () => {
	const frameworkList = {
		Flask: SiFlask,
		Android: SiAndroid,
		Django: SiDjango,
		React: SiReact,
		Next: SiNextdotjs,
		Redux: SiRedux,
		Vercel: SiVercel,
		Vue: SiVuedotjs,
		Flutter: SiFlutter,
		Git: SiGithub,
		Google: SiGooglecloud,
	};

	return <TechStack stack={frameworkList} />;
};

export const ProficientLanguage = () => {
	const languageList = {
		Java: FaJava,
		JS: SiJavascript,
		TS: SiTypescript,
		Dart: SiDart,
		Bash: SiGnubash,
		"C++": SiCplusplus,
		CSS: SiCss3,
		HTML: SiHtml5,
		Python: SiPython,
		Solidity: SiSolidity,
	};

	return <TechStack stack={languageList} />;
};
