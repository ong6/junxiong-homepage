import {
	Box,
	Heading,
	Link,
	ListItem,
	Text,
	UnorderedList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { TechCurve, TechFintech, TechMaha, TechTeach } from "./Icons";

export default function WorkExperience() {
	return (
		<Box mb={4}>
			<Heading as="h3" variant="section-title" fontSize={24}>
				Experience
			</Heading>
			<Box className="space-y-8">
				<Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between">
						<Text fontSize={18} fontWeight="bold">
							NUS Fintech Society, Senior Software Developer
						</Text>
						<Text fontSize={18} fontWeight="bold">
							Sep 2020 - Present
						</Text>
					</Box>
					<UnorderedList pl={8} fontSize={18} fontWeight="medium">
						<ListItem>
							Collaborated with a team of 4 members to develop a full-stack
							website for{" "}
							<NextLink href={"/works/fintechwebsite"}>
								<Link>NUS Fintech Society.</Link>
							</NextLink>
						</ListItem>
						<ListItem>
							Developed and designed a{" "}
							<NextLink href={"/works/abcdao"}>
								<Link>Decentralized Autonomous Organization (DAO)</Link>
							</NextLink>
							, to serve more than 200 fintech society members.
						</ListItem>
						<ListItem>
							Represented fintech society to{" "}
							<Link
								href={
									"https://fintechlab.nus.edu.sg/nus-fintech-society-blockchain-department-project-showcase/"
								}
								target="_blank">
								present
							</Link>{" "}
							and advocate our DAO project on a global stage during Singapore
							Fintech Month.
						</ListItem>
					</UnorderedList>
					<TechFintech />
				</Box>

				<Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between">
						<Text fontSize={18} fontWeight="bold">
							MahaChem, Mobile App Developer
						</Text>
						<Text fontSize={18} fontWeight="bold">
							May 2021 - Sep 2021
						</Text>
					</Box>
					<UnorderedList pl={8} fontSize={18} fontWeight="medium">
						<ListItem>
							Developed and designed a{" "}
							<Link
								href={"https://appadvice.com/app/myassistant-2-0/1500392856"}
								target="_blank">
								Flutter Application
							</Link>{" "}
							to assist on site sales team with showcasing of products.
						</ListItem>
						<ListItem>
							Automated the conversion of products data into SQL database for
							further analysis and managed the creation of API endpoints to be
							used by the client app.
						</ListItem>
						<ListItem>
							Organized SCRUM meetings and collaborated with other departments
							to discover and troubleshoot current bugs in the App.
						</ListItem>
					</UnorderedList>
					<TechMaha />
				</Box>

				<Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between">
						<Text fontSize={18} fontWeight="bold">
							Curveseries, Software Engineer Intern
						</Text>
						<Text fontSize={18} fontWeight="bold">
							Jan 2020 - Apr 2020
						</Text>
					</Box>
					<UnorderedList pl={8} fontSize={18} fontWeight="medium">
						<ListItem>
							Organized refinery maintenance data to be set up for predictive
							analysis
						</ListItem>
						<ListItem>
							Performed formula-based charting on futures across various oil
							products
						</ListItem>
						<ListItem>
							Conceptualized and developed Java Application to collect RSS News
							feeds and stored them in a SQL database for further analysis
						</ListItem>
					</UnorderedList>
					<TechCurve />
				</Box>

				<Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between">
						<Text fontSize={18} fontWeight="bold">
							Teaching Assistant (NUS)
						</Text>
						<Text fontSize={18} fontWeight="bold">
							Jan 2021 - Present
						</Text>
					</Box>
					<UnorderedList pl={8} fontSize={18} fontWeight="medium">
						<ListItem>
							Conduct weekly tutorials, code review and marking.
						</ListItem>
						<ListItem>Guided over 80 students across various modules.</ListItem>
					</UnorderedList>
					<TechTeach />
				</Box>
			</Box>
		</Box>
	);
}
