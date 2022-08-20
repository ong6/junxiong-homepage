import { Box, Heading, Link } from "@chakra-ui/react";
import React from "react";
import { TechFintech } from "./Icons";
import ResumeDetail from "./ResumeDetail";
import NextLink from "next/link";

const extracurricular = [
	{
		title: "NUS Fintech Society	Singapore",
		location: "Singapore",
		roles: [
			{
				subtitle: "President",
				date: "May 2022 – Present",
				description: [
					"Lead the club of over 200 students and defined its goals, visions, and mission",
					"Collaborated with large fintech companies such as Ripple, Shopee, ByBit, Alpha lab and more to organize large scale events in the fintech space",
				],
			},
			{
				subtitle: "Senior Blockchain Developer",
				date: "Aug 2021 – May 2022",
				description: [
					<>
						Developed and designed a{" "}
						<NextLink href={"/works/abcdao"}>
							<Link>Decentralized Autonomous Organization (DAO)</Link>
						</NextLink>
						, to serve more than 200 fintech society members.
					</>,
				],
			},
			{
				subtitle: "Software Engineer (Fullstack)",
				date: "Aug 2020 – May 2021",
				description: [
					<>
						Represented fintech society to{" "}
						<Link
							href={
								"https://fintechlab.nus.edu.sg/nus-fintech-society-blockchain-department-project-showcase/"
							}
							target="_blank">
							present
						</Link>{" "}
						and advocate our DAO project on a global stage during Singapore
						Fintech Month
					</>,
				],
			},
		],
		tech: <TechFintech />,
	},
];
export default function Extracurricular() {
	return (
		<Box mb={8}>
			<Heading as="h3" variant="section-title" fontSize={24}>
				Extracurricular Activities
			</Heading>
			{extracurricular.map((detail, index) => (
				<ResumeDetail key={index} detail={detail} />
			))}
		</Box>
	);
}
