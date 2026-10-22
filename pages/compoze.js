import {
	Box,
	Container,
	Heading,
	Link,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import DiagramFigure from "../components/DiagramFigure";
import Details from "../components/Details";
import FactList from "../components/FactList";
import * as CompozeArchitecture from "../components/diagrams/CompozeArchitecture";
import * as CompozeDurableChat from "../components/diagrams/CompozeDurableChat";
import * as CompozeIngestFlow from "../components/diagrams/CompozeIngestFlow";
import * as CompozeQueryFlow from "../components/diagrams/CompozeQueryFlow";
import * as CompozeUserFlow from "../components/diagrams/CompozeUserFlow";
import Layout from "../components/layouts/Articles";
import CaseStudyFooter from "../components/CaseStudyFooter";
import ProjectLinks from "../components/ProjectLinks";

// A written case study: one ~680px column of prose, screenshots as inline
// figures, and a single mono fact table. Deliberately unlike the homepage
// (mono `//` eyebrows over huge titles), /hobbies (numbered log) and /works
// (dated ledger).

const P = (props) => (
	<Text
		mt={5}
		fontSize={{ base: "17px", md: "18px" }}
		lineHeight="1.8"
		{...props}
	/>
);

const H2 = (props) => (
	<Heading
		as="h2"
		mt={{ base: 12, md: 16 }}
		fontSize={{ base: "22px", md: "24px" }}
		{...props}
	/>
);


// The product shots are light-UI captures. In dark mode they are pulled down
// a step so they sit in the page rather than glow off it.
const Figure = ({ src, alt, caption }) => (
	<Box as="figure" my={{ base: 10, md: 14 }} mx={0}>
		<Box
			border="1px solid"
			borderColor="border.subtle"
			lineHeight={0}
			_dark={{ bg: "surface.raised", "& img": { filter: "brightness(.86) contrast(1.04)" } }}>
			<Image
				src={src}
				alt={alt}
				width={1440}
				height={900}
				sizes="(max-width: 768px) 100vw, 800px"
				style={{ width: "100%", height: "auto" }}
			/>
		</Box>
		<Text
			as="figcaption"
			mt={3}
			fontFamily="var(--font-mono)"
			fontSize="12px"
			lineHeight="1.6"
			color="text.muted">
			{caption}
		</Text>
	</Box>
);


const optimisations = [
	[
		"cursor pagination",
		"fetch limit + 1 to learn whether a next page exists, no COUNT",
	],
	[
		"adaptive polling",
		"3s while processing, 5s while pending, 30s idle, previous data kept so the table never flashes",
	],
	[
		"connector caches",
		"per-connector LRU with per-action TTLs for Drive and Lark, plus a sliding-window rate limit per tenant",
	],
	[
		"sse anti-buffering",
		"no-transform cache headers, X-Accel-Buffering off, framework compression disabled, per-route duration budgets on fluid compute",
	],
	[
		"tool surface",
		"only the tools the agent and the tenant connectors allow reach the model, with a tighter step budget on background runs",
	],
];

const facts = [
	["domain agents", "4"],
	["agent tools", "9"],
	["models / providers", "9 / 3"],
	["knowledge bases per search", "5, in parallel"],
	["similarity floor", "0.35 cosine"],
	["test specs", "27"],
	["api routes", "53"],
	["database tables", "23"],
	["typescript", "~76k lines"],
];

const links = [
	{ name: "UI Pack", detail: "The system figures on this page are drawn with it", href: "/uipack" },
	{ name: "Notes", detail: "Longer working notes", href: "https://notes.junxiong.dev", external: true },
];

export default function Compoze() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="Compoze"
			schema={{ type: "TechArticle" }}
			description="Compoze built document-grounded assistants for businesses. I ran it alone alongside a full-time job in 2025, until a client bought the company.">
			<Container maxW="680px" px={0} ml={0}>
				<Box pt={{ base: 10, md: 16 }}>
					<Link
						as={NextLink}
						href="/#work"
						display="inline-flex"
						alignItems="center"
						minH="32px"
						my={-1.5}
						fontSize="13px"
						fontWeight="700">
						← Selected projects
					</Link>

					<Heading
						as="h1"
						mt={{ base: 8, md: 10 }}
						fontSize={{ base: "40px", md: "52px" }}
						lineHeight="1"
						letterSpacing="-.045em">
						Compoze
					</Heading>

					<Text
						mt={4}
						color={accent}
						fontFamily="var(--font-mono)"
						fontSize="12px"
						fontWeight="700"
						letterSpacing=".1em"
						textTransform="uppercase">
						2025 · sole founder · sold to a client
					</Text>

					<Text
						mt={8}
						fontSize={{ base: "19px", md: "21px" }}
						lineHeight="1.6"
						fontWeight="600">
						Compoze was a company I ran on evenings and weekends alongside my job at TikTok. It built assistants that answer questions from a company&apos;s own documents, and a client bought it at the end of 2025.
					</Text>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<P>
					Staff could ask a question and get an answer with its sources attached, so they could open the document and check it instead of searching through files by hand.
				</P>

				<Figure
					src="/images/compoze/compoze-02.webp"
					alt="An answered question in Compoze: a knowledge base search over three documents, a structured answer containing a table, and cited sources listed with match scores."
					caption="fig. 1 — an answer with the search it ran and the sources it used, each with a match score."
				/>

				<DiagramFigure
					id="cuf"
					headingLevel={2}
					diagram={CompozeUserFlow}
					caption="fig. 2 — an admin connects the document sources and watches them process; a user picks an assistant, asks a question and checks the sources."
				/>

				<H2>Working alone</H2>

				<P>
					Each engagement ran from the first customer conversation through deployment and training, and I handled all of it. Organising the knowledge base took the longest, because only the customer could decide which documents belonged in it and which should stay out. Running Compoze beside a full-time job also meant it had to keep working without constant attention.
				</P>

				<DiagramFigure
					id="carch"
					headingLevel={2}
					diagram={CompozeArchitecture}
					caption="fig. 3 — a question goes through the assistant, search and the model gateway in one request. Documents are processed separately in the background. Everything lives in one Postgres database, with every row tagged by customer."
				/>

				<Figure
					src="/images/compoze/compoze-01.webp"
					alt="Compoze chat in its empty state, showing the selected agent, four example prompts and the list of tools it can use."
					caption="fig. 4 — a new chat shows example prompts and the tools the assistant can use, so someone new can see what to ask."
				/>

				<H2>One codebase for every customer</H2>

				<P>
					Compoze ran on two stacks: a Python assistant on LlamaIndex and FastAPI with LlamaCloud doing the indexing, and the platform on this page, built on Next.js and Postgres with pgvector. Every customer shared one codebase and one database. Each customer&apos;s rows carry a tenant id and are kept apart twice, once in the app and once with Postgres row-level security. One database kept migrations and billing simple, but it meant the tenant checks had to be right everywhere. Nine models from OpenAI, Anthropic and Google sit behind one gateway, chosen per environment in config.
				</P>

				<H2>Finding the right passages</H2>

				<P>
					Documents are split into chunks of about a thousand characters, and each chunk gets a one-line header saying where in the document it came from. A question searches up to five knowledge bases at once, using both embeddings and plain keyword search, since embeddings alone miss exact words like codes and names. Anything under a 0.35 similarity score is dropped, and a reranker puts the rest in order.
				</P>

				<DiagramFigure
					id="cqf"
					diagram={CompozeQueryFlow}
					caption="fig. 5 — one question searching five knowledge bases at once. Passages under the 0.35 cutoff are dropped, and each citation is checked before the answer is shown."
				/>

				<P>
					Each citation is checked against the sentence it supports, and the source links and scores let readers see how well a passage backs up the answer. When even the best passage is under the cutoff, the assistant says it can&apos;t answer instead of guessing.
				</P>

				<H2>How I knew it worked</H2>

				<P>
					I kept a fixed set of questions and expected answers from logs and testing, including questions the documents couldn&apos;t answer, where the right reply was a refusal. Search and the written answer are scored separately. The set runs in CI, so a change to the prompt, the chunking or the model fails if it does worse than the version on main.
				</P>

				<H2>Getting the documents in</H2>

				<P>
					Files come in from Lark and Google Drive, and processing runs in the background on QStash. The failure cases took more of my time than the normal path, because a job that dies halfway leaves a document that looks uploaded but never shows up in answers. So each step can be retried on its own, uploading the same file twice does nothing, and anything that keeps failing lands in a dead-letter queue with the error attached. That gave me a record of what failed and what needed retrying.
				</P>

				<DiagramFigure
					id="cif"
					diagram={CompozeIngestFlow}
					caption="fig. 6 — duplicate files are dropped, personal data is removed before chunking, and a failed run can be retried from the step that broke."
				/>

				<Figure
					src="/images/compoze/compoze-04.webp"
					alt="The Compoze admin knowledge base page: a document table with type, size, source connector and ingest status, status filter counts above it, and a banner saying processing continues in the background."
					caption="fig. 7 — the admin view. Each document shows where it came from and how far it got; the counts at the top are how an admin finds the failures."
				/>

				<Figure
					src="/images/compoze/compoze-03.webp"
					alt="The Compoze agent picker showing four domain agents, each with a short description."
					caption="fig. 8 — four assistants, each with its own prompt, tools and examples. Which ones a customer sees is set in config."
				/>

				<H2>Safety</H2>

				<P>
					A synced document could contain instructions aimed at the model. I mark
					retrieved text as data in the prompt and limit each agent to its own
					tools. That limits what a planted instruction can do, but it doesn&apos;t
					stop the model from reading it.
				</P>

				<DiagramFigure
					id="cdc"
					diagram={CompozeDurableChat}
					caption="fig. 9 — if the reader closes the tab mid-answer, the job moves to QStash and finishes in the background, picking up from the last step that completed."
				/>

				<Details title="Implementation details">
					<FactList facts={facts} mt={3} />

					<P>
						Edge middleware replaced any client-supplied identity header with
						the user and tenant id from the verified JWT, so routes trusted it
						and skipped a database round trip. Indexes led with the tenant id,
						and chat creation was an atomic insert-on-conflict.
					</P>

					<FactList facts={optimisations} mt={{ base: 8, md: 10 }} />

					<P>
						With no one else reviewing the code, I leaned on automated checks: typed route contracts, Zod validation on every payload and contract tests on each push. Each request is traced with tokens, model and tenant, which is what pricing was based on.
					</P>
				</Details>

				<CaseStudyFooter links={links} next={{ name: "UI Pack", href: "/uipack", detail: "The design system behind these figures" }} />
			</Container>
		</Layout>
	);
}
