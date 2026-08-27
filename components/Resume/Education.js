import { Box } from "@chakra-ui/react";
import TermHeading from "../TermHeading";
import React from "react";
import ResumeDetail from "./ResumeDetail";

const EducationDetails = [
	{
		title: "National University of Singapore",
		location: "Singapore",
		roles: [
			{
				subtitle: "Bachelor of Computing in Computer Science (Hons)",
				date: "Aug 2020 - Dec 2023",
				description: [
					"Relevant course work: Object-Oriented Programming, Software engineering, Data structures and algorithms, Computer organization, Distributed Systems, Big Data, AI planning and Decision making, VR and AR Development",
					"Specializing in Artificial Intelligence and Software Engineering",
				],
			},
		],
		tech: "",
	},
	{
		title: "Technical University of Munich",
		location: "Germany, Munich",
		roles: [
			{
				subtitle: "Department of Innovation & Entrepreneurship",
				date: "July 2022 - Dec 2022",
				description: ["NUS Overseas Colleges (NOC) Munich, batch 8", "Awarded the Student Take on the World (SToW) Award"],
			},
		],
		tech: "",
	},
];
export default function Education() {
	return (
		<Box mb={8}>
			<TermHeading>education</TermHeading>
			{EducationDetails.map((detail, index) => (
				<ResumeDetail key={index} detail={detail} />
			))}
		</Box>
	);
}
