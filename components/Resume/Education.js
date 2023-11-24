import { Box, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";
import { TechFintech } from "./Icons";
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
					"Awarded Student Take on the World Award",
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
				subtitle: "Department of Innovation & Entrepreneurship ",
				date: "July 2022 - Dec 2022",
				description: ["NUS Overseas Collage (NOC) Munich batch 8"],
			},
		],
		tech: "",
	},
];
export default function Education() {
	return (
		<Box mb={8}>
			<Heading as="h3" variant="section-title" fontSize={24}>
				Education
			</Heading>
			{EducationDetails.map((detail, index) => (
				<ResumeDetail key={index} detail={detail} />
			))}
		</Box>
	);
}
