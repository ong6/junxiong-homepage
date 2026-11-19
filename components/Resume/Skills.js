import TermHeading from "../TermHeading";
import styles from "./Resume.module.css";

const skills = [
	{
		label: "AI systems",
		value: "MCP · A2A · LangGraph · LlamaIndex · RAG · agentic workflows",
	},
	{
		label: "Backend",
		value: "Go · TypeScript · Python · Java · gRPC · REST · distributed systems",
	},
	{
		label: "Data & infra",
		value: "MySQL · PostgreSQL · ClickHouse · Hive · Kafka · Redis · Docker · Kubernetes · AWS",
	},
	{
		label: "Frontend",
		value: "React · Next.js",
	},
	{
		label: "Delivery",
		value: "client delivery · technical scoping",
	},
];

export default function Skills() {
	// Opens on the same rule and 24px inset as Experience and Education
	// (16px here plus each row's 8px).
	return (
		<div>
			<TermHeading kicker="Tools">Skills</TermHeading>
			<div className={styles.skills}>
				{skills.map((skill) => (
					<div
						key={skill.label}
						className={styles.skill}>
						<p className={styles.skillLabel}>
							{skill.label}
						</p>
						<p className={styles.skillValue}>
							{skill.value}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
