import { Icon } from "@chakra-ui/icons";
import { Box, Image, Text, Tooltip } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import {
	SiAndroid,
	SiBootstrap,
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
	SiHeroku,
	SiHtml5,
	SiIpfs,
	SiJava,
	SiJavascript,
	SiJquery,
	SiMongodb,
	SiMysql,
	SiPhpmyadmin,
	SiPostgresql,
	SiPython,
	SiReact,
	SiRedux,
	SiSolidity,
	SiNextdotjs,
	SiTypescript,
	SiVercel,
	SiVuedotjs,
	SiApachemaven,
	SiJira,
	SiSpring,
	SiSpringboot,
	SiPrisma,
	SiStorybook,
	SiAzuredevops,
} from "react-icons/si";

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
		Java: SiJava,
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
		Java: SiJava,
		Python: SiPython,
		Github: SiGithub,
	};

	return <TechStack stack={teachList} />;
};

export const TechCurve = () => {
	const curveList = {
		Java: SiJava,
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
	};

	return <TechStack stack={frameworkList} />;
};

export const ProficientLanguage = () => {
	const languageList = {
		Java: SiJava,
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
