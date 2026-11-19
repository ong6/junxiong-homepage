import NextLink from "next/link";
import { Fragment } from "react";
import OutArrow from "./OutArrow";
import RecentWriting from "./RecentWriting";
import { TradingPreview, UipackPreview } from "./SupportingPreviews";
import { AI_TOOLING } from "../lib/aiTooling";
import { toneFor } from "../lib/tones";
import styles from "./SelectedWork.module.css";

function ProjectLink({ href, children }) {
	return (
		<NextLink href={href} prefetch={false} className={`ui-linkoverlay ${styles.overlay}`}>
			{children}
			<OutArrow className={styles.arrow} />
		</NextLink>
	);
}

function FeaturedCard({ span, index = 0, tone, children }) {
	return (
		<article
			data-group
			data-reveal="lead"
			data-hover="card"
			data-tone={tone}
			className={`ui-linkbox ${styles.card}`}
			style={{ "--i": index, "--span": span }}>
			{children}
		</article>
	);
}

function DottedCanvas({ children }) {
	return <div className={styles.canvas}>{children}</div>;
}

function CardCopy({ eyebrow, title, href, description }) {
	return (
		<div className={styles.copy}>
			<p data-tone-label className="eyebrow">
				{eyebrow}
			</p>
			<h3 className={`ui-heading ${styles.cardTitle}`}>
				<ProjectLink href={href}>{title}</ProjectLink>
			</h3>
			<p className={styles.description}>{description}</p>
		</div>
	);
}

function AiToolingCard() {
	return (
		<FeaturedCard span={7} tone={toneFor("/ai-tooling")}>
			<CardCopy
				eyebrow="Open source · 2026"
				title="AI tooling"
				href="/ai-tooling"
				description="Open-source tools I wrote for working with AI agents, sorted by where each one sits in the stack."
			/>
			<div className={styles.preview}>
				<DottedCanvas>
					<div data-panel className={styles.panel}>
						<div className={styles.head}>
							<p>Layer</p>
							<p>Tool</p>
						</div>
						<dl className={styles.tools}>
							{AI_TOOLING.map((tool) => (
								<Fragment key={tool.href}>
									<dt className={styles.layer}>{tool.layer}</dt>
									<dd className={styles.tool}>{tool.name}</dd>
								</Fragment>
							))}
						</dl>
					</div>
				</DottedCanvas>
			</div>
		</FeaturedCard>
	);
}

function CompozeCard() {
	return (
		<FeaturedCard span={5} index={1} tone={toneFor("/compoze")}>
			<CardCopy
				eyebrow="Company · 2025"
				title="Compoze"
				href="/compoze"
				description="Assistants that answer questions from a company's own documents. A side business next to TikTok, where I did the sales, the building and the customer training."
			/>
			<div className={styles.preview}>
				<DottedCanvas>
					<div data-panel className={styles.panelClip}>
						<div className={styles.headSoft}>
							<p>Policy search</p>
							<p>3 sources</p>
						</div>
						<div className={styles.question}>
							<p className={styles.ask}>How much annual leave carries over?</p>
							<p className={styles.answer}>Up to 5 days, used by 31 March.</p>
						</div>
					</div>
				</DottedCanvas>
			</div>
		</FeaturedCard>
	);
}

const supportingProjects = [
	{
		title: "Trading engine",
		href: "/trading-engine",
		label: "Research system",
		description: "Tests trading ideas overnight, with the rules fixed before the results come in.",
		wide: true,
		Preview: TradingPreview,
	},
	{
		title: "UiPack",
		href: "/uipack",
		label: "Design system",
		description: "The figures, motion rules and slide starters shared across my projects.",
		wide: true,
		Preview: UipackPreview,
	},
];

function SupportingCard({ project, index }) {
	return (
		<article
			data-group
			data-reveal
			data-hover="card"
			data-tone={toneFor(project.href)}
			className={`ui-linkbox ${styles.support} ${project.wide ? styles.wide : ""}`}
			style={{ "--i": index % 2 }}>
			{/* Copy beside its preview from lg, the preview under the copy below. */}
			<div className={styles.supportGrid}>
				<div>
					<p data-tone-label className={`eyebrow ${styles.muted}`}>
						{project.label}
					</p>
					<h3 className={`ui-heading ${styles.supportTitle}`}>
						<ProjectLink href={project.href}>{project.title}</ProjectLink>
					</h3>
					<p className={styles.supportDescription}>{project.description}</p>
				</div>
				{project.Preview ? (
					<DottedCanvas>
						<project.Preview />
					</DottedCanvas>
				) : null}
			</div>
		</article>
	);
}

const elsewhereLinks = [
	{ name: "Hobbies", href: "/hobbies", detail: "What I do away from the editor" },
	{ name: "Archive", href: "/works", detail: "University-era projects" },
	{ name: "Resume", href: "/resume", detail: "Work history and experience" },
];

function Elsewhere() {
	return (
		<section aria-labelledby="elsewhere-heading" className={styles.elsewhere}>
			<p className="eyebrow">{"// ELSEWHERE"}</p>
			<h2 id="elsewhere-heading" className={`ui-heading ${styles.elsewhereHeading}`}>
				Around the site
			</h2>
			{/* Links out grammar: the arrow ends each row flush with its rule;
			    columns sit 24px apart instead of padding the rows. Notes moved to
			    Recent writing above, so three rows fill three columns. */}
			<div className={styles.elsewhereGrid}>
				{elsewhereLinks.map((item, index) => {
					const Anchor = item.external ? "a" : NextLink;
					return (
						<Anchor
							key={item.name}
							href={item.href}
							prefetch={item.external ? undefined : false}
							target={item.external ? "_blank" : undefined}
							rel={item.external ? "noopener noreferrer" : undefined}
							data-reveal
							data-group
							data-hover="row"
							style={{ "--i": index }}
							className={`ui-link ${styles.elsewhereRow}`}>
							<div className={styles.elsewhereLine}>
								<p>{item.name}</p>
								<OutArrow newTab={Boolean(item.external)} />
							</div>
							<p className={styles.elsewhereDetail}>{item.detail}</p>
						</Anchor>
					);
				})}
			</div>
		</section>
	);
}

export default function SelectedWork() {
	return (
		<>
			<section id="work" aria-labelledby="work-heading" className={styles.section}>
				<p className="eyebrow">{"// PROJECTS"}</p>
				<h2 id="work-heading" className={`ui-heading ${styles.workHeading}`}>
					Selected work
				</h2>
				<div className={styles.leadGrid}>
					<AiToolingCard />
					<CompozeCard />
				</div>

				<div className={styles.also}>
					<h2 className={`ui-heading ${styles.alsoHeading}`}>Also building</h2>
					<div className={styles.alsoGrid}>
						{supportingProjects.map((project, index) => (
							<SupportingCard key={project.title} project={project} index={index} />
						))}
					</div>
				</div>
			</section>

			<RecentWriting />
			<Elsewhere />
		</>
	);
}
