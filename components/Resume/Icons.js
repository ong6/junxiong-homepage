import { Icon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import {
	SiApachehive,
	SiApachekafka,
	SiApachemaven,
	
	SiClickhouse,
	SiCss,
	SiDart,
	SiDocker,
	SiFastapi,
	SiFlutter,
	SiGithub,
	SiGnubash,
	SiGo,
	SiGooglecloud,
	SiHtml5,
	SiIpfs,
	SiJavascript,
	SiJira,
	SiKubernetes,
	SiMongodb,
	SiMysql,
	SiNextdotjs,
	SiNodedotjs,
	SiPhpmyadmin,
	SiPostgresql,
	SiPrisma,
	SiPython,
	SiReact,
	SiRedis,
	SiRedux,
	SiSolidity,
	SiSpringboot,
	SiStorybook,
	SiTailwindcss,
	SiTypescript,
	SiVuedotjs,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import { VscAzureDevops } from "react-icons/vsc";
import { TbBrandOpenai } from "react-icons/tb";

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

export const TechTikTok = () => {
	const tiktokList = {
		Go: SiGo,
		Python: SiPython,
		TS: SiTypescript,
		React: SiReact,
		Kafka: SiApachekafka,
		Redis: SiRedis,
		MySQL: SiMysql,
		Hive: SiApachehive,
		ClickHouse: SiClickhouse,
		K8s: SiKubernetes,
	};
	return <TechStack stack={tiktokList} />;
};

export const TechCompoze = () => {
	const compozeList = {
		Python: SiPython,
		FastAPI: SiFastapi,
		Next: SiNextdotjs,
		TS: SiTypescript,
		OpenAI: TbBrandOpenai,
		Docker: SiDocker,
	};
	return <TechStack stack={compozeList} />;
};

export const TechBinance = () => {
	const binanceList = {
		HTML: SiHtml5,
		CSS: SiCss,
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
		Azure: VscAzureDevops,
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
		Azure: VscAzureDevops,
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

export const TechCurve = () => {
	const curveList = {
		Java: FaJava,
		Maven: SiApachemaven,
		CSS: SiCss,
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
		MySQL: SiMysql,
		PgSQL: SiPostgresql,
		MongoDB: SiMongodb,
		Redis: SiRedis,
		ClickHouse: SiClickhouse,
		Kafka: SiApachekafka,
		Docker: SiDocker,
		K8s: SiKubernetes,
		AWS: FaAws,
		GCloud: SiGooglecloud,
	};

	return <TechStack stack={databaseList} />;
};

export const ToolsAndFramework = () => {
	const frameworkList = {
		React: SiReact,
		Next: SiNextdotjs,
		Node: SiNodedotjs,
		Redux: SiRedux,
		Vue: SiVuedotjs,
		Tailwind: SiTailwindcss,
		Spring: SiSpringboot,
		FastAPI: SiFastapi,
		"AI/LLM": TbBrandOpenai,
		Git: SiGithub,
	};

	return <TechStack stack={frameworkList} />;
};

export const ProficientLanguage = () => {
	const languageList = {
		Go: SiGo,
		TS: SiTypescript,
		JS: SiJavascript,
		Python: SiPython,
		Java: FaJava,
		SQL: SiMysql,
		Bash: SiGnubash,
	};

	return <TechStack stack={languageList} />;
};
