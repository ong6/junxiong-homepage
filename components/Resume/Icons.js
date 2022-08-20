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
} from "react-icons/si";

export const TechFintech = () => {
	const databaseList = {
		Python: SiPython,
		JS: SiJavascript,
		Solidity: SiSolidity,
		Django: SiDjango,
		Github: SiGithub,
		React: SiReact,
		IPFS: SiIpfs,
	};

	return (
		<Box my={4}>
			<Box className="flex flex-row flex-wrap">
				{Object.entries(databaseList).map(([key, value]) => (
					<ResumeLogo key={key} title={key} thumbnail={value} small={true}>
						{key}
					</ResumeLogo>
				))}
			</Box>
		</Box>
	);
};
export const TechTeach = () => {
	const databaseList = {
		Java: SiJava,
		Python: SiPython,
		Github: SiGithub,
	};

	return (
		<Box my={4}>
			<Box className="flex flex-row flex-wrap">
				{Object.entries(databaseList).map(([key, value]) => (
					<ResumeLogo key={key} title={key} thumbnail={value} small={true}>
						{key}
					</ResumeLogo>
				))}
			</Box>
		</Box>
	);
};

export const TechCurve = () => {
	const databaseList = {
		Java: SiJava,
		PgSQL: SiPostgresql,
		HTML: SiHtml5,
		CSS: SiCss3,
		JS: SiJavascript,
		Github: SiGithub,
	};

	return (
		<Box my={4}>
			<Box className="flex flex-row flex-wrap">
				{Object.entries(databaseList).map(([key, value]) => (
					<ResumeLogo key={key} title={key} thumbnail={value} small={true}>
						{key}
					</ResumeLogo>
				))}
			</Box>
		</Box>
	);
};

export const TechMaha = () => {
	const databaseList = {
		Flutter: SiFlutter,
		Dart: SiDart,
		PHP: SiPhpmyadmin,
		Github: SiGithub,
		MySQL: SiMysql,
	};

	return (
		<Box my={4}>
			<Box className="flex flex-row flex-wrap">
				{Object.entries(databaseList).map(([key, value]) => (
					<ResumeLogo key={key} title={key} thumbnail={value} small={true}>
						{key}
					</ResumeLogo>
				))}
			</Box>
		</Box>
	);
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

	return (
		<Box className="flex flex-row flex-wrap">
			{Object.entries(databaseList).map(([key, value]) => (
				<ResumeLogo key={key} title={key} thumbnail={value}>
					{key}
				</ResumeLogo>
			))}
		</Box>
	);
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

	return (
		<Box className="flex flex-row flex-wrap">
			{Object.entries(frameworkList).map(([key, value]) => (
				<ResumeLogo key={key} title={key} thumbnail={value}>
					{key}
				</ResumeLogo>
			))}
		</Box>
	);
};

export const ProficientLanguage = () => {
	const languageList = {
		Python: SiPython,
		Java: SiJava,
		JS: SiJavascript,
		TS: SiTypescript,
		Dart: SiDart,
		Bash: SiGnubash,
		"C++": SiCplusplus,
		CSS: SiCss3,
		HTML: SiHtml5,
		Solidity: SiSolidity,
	};

	return (
		<Box className="flex flex-row flex-wrap">
			{Object.entries(languageList).map(([key, value]) => (
				<ResumeLogo key={key} title={key} thumbnail={value}>
					{key}
				</ResumeLogo>
			))}
		</Box>
	);
};

export const ResumeLogo = ({ children, title, thumbnail, small = false }) => (
	<Box
		textAlign="center"
		display="flex"
		alignItems="center"
		flexDirection="column"
		px={2}
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
			_groupHover={{ opacity: 1, transition: "opacity .2s ease-in" }}
			className="opacity-0 ease-out transition-all duration-1000">
			{children}
		</Text>
	</Box>
);
