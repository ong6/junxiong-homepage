import Layout from "../components/layouts/Articles";
import { PAGE_META } from "../lib/pageMeta";
import Education from "../components/Resume/Education";
import PrintHeader from "../components/Resume/PrintHeader";
import Skills from "../components/Resume/Skills";
import WorkExperience from "../components/Resume/WorkExperience";
import Section from "../components/Section";
import styles from "../styles/CaseStudy.module.css";

const Resume = () => (
	<Layout
		{...PAGE_META["/resume"]}>
		<div className={styles.top}>
			<PrintHeader />
			<Section delay={0.05}>
				<WorkExperience />
			</Section>
			<Section delay={0.1}>
				<Skills />
			</Section>
			<Section delay={0.15}>
				<Education />
			</Section>
		</div>
	</Layout>
);

export default Resume;
