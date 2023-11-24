import { Box, Heading, Link } from "@chakra-ui/react";
import React from "react";
import {
	TechBinance,
	TechCurve,
	TechDBS,
	TechMaha,
	TechTanso,
	TechThoughtMachine,
} from "./Icons";
import ResumeDetail from "./ResumeDetail";

const WorkDetails = [
	{
		title: "Binance",
		location: "Remote",
		roles: [
			{
				subtitle: "Software Engineering Intern (Frontend), Payments Team",
				date: "Aug 2023 - Nov 2023",
				description: [
					"Designed and implemented complex UI/UX systems in Typescript and React, boosting user engagement and impacting over 128 million users of Binance.",
					"Collaborated on the Front End development of the 'Crypto Box', a unique feature streamlining payment distributions to group users.",
					"Participated in the integration and testing of secure checkout payment systems while working with cross-functional teams.",
				],
			},
		],
		tech: <TechBinance />,
	},
	{
		title: "Thought Machine",
		location: "Singapore",
		roles: [
			{
				subtitle: "Software Engineering Intern (Client Engineering)",
				date: "May 2023 - Aug 2023",
				description: [
					"Pioneered the development of a generalized remediation tool, streamlining the remediation process and ensuring product consistency, reducing duplicate work, and improving product delivery time.",
					"Collaborated with engineers and analysts to develop tailored banking products, enhancing utility and client interactions while using Python and Postman for demonstrations.",
				],
			},
		],
		tech: <TechThoughtMachine />,
	},
	{
		title: "Tanso",
		location: "Germany, Munich",
		roles: [
			{
				subtitle: "Software Engineering Intern (Fullstack)",
				date: "July 2022 - Dec 2022",
				description: [
					"Worked with Typescript, NextJs, Prisma and tRPC to develop a full-stack dashboard app for carbon emissions tracking.",
					"Learned how an early-stage start-up is ran and organized weekly product development sessions.",
				],
			},
		],
		tech: <TechTanso />,
	},
	{
		title: "DBS Bank",
		location: "Singapore",
		roles: [
			{
				subtitle:
					"Software Engineering Intern (Backend), Global Transaction Services",
				date: "May 2022 - July 2022",
				description: [
					"Created scheduled Cron jobs for key services and designed user acceptance testing.",
					"Designed and engineered the backend models for the limit system with MySQL and Java Spring Boot.",
				],
			},
		],
		tech: <TechDBS />,
	},
	{
		title: "Mahachem",
		location: "Singapore",
		roles: [
			{
				subtitle: "Software Engineering Intern (Mobile)",
				date: "May 2021 - July 2021",
				description: [
					<>
						Developed and designed a{" "}
						<Link
							href={"https://appadvice.com/app/myassistant-2-0/1500392856"}
							target="_blank">
							Flutter Application
						</Link>{" "}
						to assist on site sales team with showcasing of products.
					</>,
					"Automated the conversion of products data into SQL databases for further analysis and managed the creation of API endpoints to be used by the client app.",
				],
			},
		],
		tech: <TechMaha />,
	},
	{
		title: "Curveseries",
		location: "Singapore",
		roles: [
			{
				subtitle: "Software Engineering Intern (Backend)",
				date: "Jan 2020 - April 2020",
				description: [
					"Conceptualized and developed Java Application to collect RSS News feeds and stored the data in a Postgres SQL database for analysis.",
					"Organized refinery maintenance data to be set up for predictive analysis.",
					"Performed formula-based charting on futures across various oil products.",
				],
			},
		],
		tech: <TechCurve />,
	},
	{
		title: "National University of Singapore",
		location: "Singapore",
		roles: [
			{
				subtitle: "Teaching Assistant, CS2030S & CS2103T",
				date: "Jan 2021 - May 2022",
				description: [
					"Conduct weekly tutorials, code review and marking and guided over 60 students across Object Oriented programming and Software Engineering modules.",
					"Awarded with Student Mentor Award for Guiding Students through difficult coursework.",
					<>
						Designed and authored a{" "}
						<Link href={"https://ong6.github.io/Unix-Guide/"} target="_blank">
							website guide
						</Link>{" "}
						to help students get started with Unix systems.
					</>,
				],
			},
		],
	},
];

export default function WorkExperience() {
	return (
		<Box mb={4}>
			<Heading as="h3" variant="section-title" fontSize={24}>
				Experience
			</Heading>
			{WorkDetails.map((detail, index) => (
				<ResumeDetail key={index} detail={detail} />
			))}
		</Box>
	);
}
