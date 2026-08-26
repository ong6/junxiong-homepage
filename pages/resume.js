import { Box, Heading, Text } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import Layout from "../components/layouts/Articles";
import {
	Databases,
	ProficientLanguage,
	ToolsAndFramework,
} from "../components/Resume/Icons";
import Education from "../components/Resume/Education";
import FeaturedProjects from "../components/Resume/FeaturedProjects";
import PrintButton from "../components/Resume/PrintButton";
import PrintHeader from "../components/Resume/PrintHeader";
import WorkExperience from "../components/Resume/WorkExperience";
import Section from "../components/Section";
import Extracurricular from "../components/Resume/Extracurricular";

const printStyles = css`
	@media print {
		@page {
			margin: 1.5cm;
		}

		/* Kill animations everywhere — framer-motion leaves inline
		   opacity/transform that would hide content in print. */
		* {
			opacity: 1 !important;
			transform: none !important;
			animation: none !important;
			transition: none !important;
			box-shadow: none !important;
			text-shadow: none !important;
		}

		/* Layout-owned chrome: fixed navbar (with theme toggle), and the
		   intro/avatar + footer, which are the Container's non-article
		   children inside the Main layout. */
		nav {
			display: none !important;
		}
		main > div > *:not(article) {
			display: none !important;
		}

		/* Page-owned pieces marked for hiding (print button, tech-stack
		   section, projects grid + View All Works button). */
		.print-hide {
			display: none !important;
		}
		/* Per-job tech icon rows inside resume details. */
		#resume-print-root .flex-wrap {
			display: none !important;
		}

		/* Print-only header. */
		.print-only {
			display: block !important;
		}

		/* Clean page: white background, black text (Chakra sets color-mode
		   backgrounds via CSS vars on body — override them too). */
		html,
		body {
			background: #fff !important;
			--chakra-colors-chakra-body-bg: #fff;
			--chakra-colors-chakra-body-text: #000;
		}
		body,
		#resume-print-root,
		#resume-print-root * {
			background: transparent !important;
			color: #000 !important;
			font-family: Georgia, "Times New Roman", Times, serif;
		}
		body {
			background: #fff !important;
		}

		/* Typography. */
		#resume-print-root {
			font-size: 11pt;
		}
		#resume-print-root p,
		#resume-print-root li {
			font-size: 11pt !important;
			line-height: 1.4 !important;
		}
		#resume-print-root h1 {
			font-size: 16pt !important;
		}
		#resume-print-root h3 {
			font-size: 13pt !important;
		}
		#resume-print-root a {
			color: #000 !important;
			text-decoration: none !important;
		}
		#resume-print-root hr {
			border-color: #aaa !important;
		}

		/* Keep an individual role/detail block on one page. */
		#resume-print-root .mb-2,
		#resume-print-root .mb-2 > div {
			break-inside: avoid;
			page-break-inside: avoid;
		}
	}
`;

const Works = () => (
	<Layout title="Resume">
		<Box id="resume-print-root">
			<Global styles={printStyles} />
			<PrintHeader />
			<Box className="print-hide" textAlign="right" mb={2}>
				<PrintButton />
			</Box>
			<Section delay={0.1}>
				<Education />
			</Section>
			<Box className="print-hide">
				<Section delay={0.3}>
					<Technical />
				</Section>
			</Box>
			<Section delay={0.5}>
				<WorkExperience />
			</Section>
			<Section delay={0.7}>
				<Extracurricular />
			</Section>
			<Box className="print-hide">
				<Section delay={0.9}>
					<FeaturedProjects />
				</Section>
			</Box>
		</Box>
	</Layout>
);

const Technical = () => {
	return (
		<Box mb={4}>
			<Heading as="h3" variant="section-title" fontSize={24}>
				Technical Proficiency
			</Heading>
			<Box fontSize={18} fontWeight="bold">
				<Text pb={3}>Proficient Languages</Text>
				<ProficientLanguage />
				<Text pb={3}>Tools and Frameworks</Text>
				<ToolsAndFramework />
				<Text pb={3}>Database and Cloud</Text>
				<Databases />
			</Box>
		</Box>
	);
};

export default Works;
