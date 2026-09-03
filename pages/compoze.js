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
import * as CompozeArchitecture from "../components/diagrams/CompozeArchitecture";
import * as CompozeIngestFlow from "../components/diagrams/CompozeIngestFlow";
import * as CompozeQueryFlow from "../components/diagrams/CompozeQueryFlow";
import Layout from "../components/layouts/Articles";

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
			fontSize="11px"
			lineHeight="1.6"
			color="text.muted">
			{caption}
		</Text>
	</Box>
);

const MonoTable = ({ rows }) => (
	<Box
		as="dl"
		mt={{ base: 8, md: 10 }}
		borderTop="1px solid"
		borderColor="border.subtle"
		fontFamily="var(--font-mono)"
		fontSize="12px">
		{rows.map(([label, value]) => (
			<Box
				key={label}
				display="flex"
				flexDirection={{ base: "column", md: "row" }}
				gap={{ base: 1, md: 6 }}
				py={{ base: 3, md: 2 }}
				borderBottom="1px solid"
				borderColor="border.subtle">
				<Box as="dt" flex={{ md: "0 0 34%" }} color="text.muted">
					{label}
				</Box>
				<Box as="dd" ml={0} flex={{ md: "1" }} lineHeight="1.6">
					{value}
				</Box>
			</Box>
		))}
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

export default function Compoze() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="Compoze"
			schema={{ type: "TechArticle" }}
			description="Compoze sold document-grounded assistants to businesses. I built and ran it alone alongside a full-time job in 2025, and one of its clients bought the company at the end of that year.">
			<Container maxW="680px" px={0} ml={0}>
				<Box pt={{ base: 10, md: 16 }}>
					<Link as={NextLink} href="/#work" fontSize="13px" fontWeight="700">
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
						fontSize="11px"
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
						I built Compoze on evenings and weekends while working full time at
						TikTok. It sold document-grounded assistants to businesses. At the
						end of 2025 it was sold to a client, terms private.
					</Text>
				</Box>

				<DiagramFigure
					id="carch"
					wide={CompozeArchitecture.Wide}
					narrow={CompozeArchitecture.Narrow}
					breakpoint="lg"
					caption="fig. 1 — the whole system. A question walks ① agent → ② retrieval → ③ pgvector → ④ gateway → ⑤ cited answer inside one request. Ingest runs elsewhere: Ⓐ download, Ⓑ extract, Ⓒ chunk, Ⓓ embed, Ⓔ store. One database, every row under a tenant id and row-level security."
				/>

				<P>
					The pitch was narrow. A company has a few thousand documents nobody
					reads and staff who ask the same handful of questions about them
					every week. Compoze answered those questions with the documents
					attached, so the answer could be checked rather than believed.
				</P>

				<Figure
					src="/images/compoze/compoze-01.webp"
					alt="Compoze chat in its empty state, showing the selected agent, four example prompts and the list of tools it can use."
					caption="fig. 2 — the empty state. Each agent arrives with its own example prompts and a visible list of what it can reach."
				/>

				<P>
					An empty chat box gets you empty questions, so nothing ships blank:
					example prompts, a visible tool list, past threads in the sidebar.
					Cheapest fix I made to how much people used it.
				</P>

				<H2>One codebase, configured per customer</H2>

				<P>
					Next.js 15 and React 19 on the front, Postgres with pgvector behind
					Drizzle. Every core table carries a tenant id, checked in the
					application layer and again by Postgres row-level security, so the
					database refuses the query the code forgot to scope. One database is
					one migration and one bill; the price is that a forgotten where
					clause leaks one customer&apos;s documents into another&apos;s
					answers. On top of
					that, three roles (Admin, Manager, User), an admin portal per tenant,
					and nine models from OpenAI, Anthropic and Google behind one gateway,
					chosen per environment through configuration.
				</P>

				<H2>Retrieval is the part you get judged on</H2>

				<P>
					Documents are chunked at roughly a thousand characters, each chunk
					given a one-sentence header placing it in its document, and embedded
					with OpenAI at 1536 dimensions. A question runs across up to five
					knowledge bases in parallel. Each lane is hybrid: cosine search over
					an HNSW index, keyword search beside it because dense search alone
					misses exact tokens, the two ranked lists merged with reciprocal
					rank fusion. Chunks under a 0.35 similarity floor are dropped, an LLM
					scores the survivors per database, and a cross-encoder reading
					question and chunk together sets the final order.
				</P>

				<DiagramFigure
					id="cqf"
					wide={CompozeQueryFlow.Wide}
					narrow={CompozeQueryFlow.Narrow}
					breakpoint="smmd"
					caption="fig. 3 — one question, five knowledge bases at once. Only chunks over the 0.35 floor survive, and a cross-encoder orders them."
				/>

				<Figure
					src="/images/compoze/compoze-02.webp"
					alt="An answered question in Compoze: a knowledge base search over three documents, a structured answer containing a table, and cited sources listed with match scores."
					caption="fig. 4 — the tool call is shown, the answer is structured, and the sources sit under it with their match scores."
				/>

				<P>
					Citations are stored with the message, checked for entailment against
					the sentence they support, and rendered with their match scores. A
					visible score is what gets people to open two or three citations and
					check, and nobody trusts the answer before they have.
				</P>

				<P>
					The prompt is fixed blocks (role, rules, context tagged with chunk
					ids, history, question) so the static prefix caches per tenant. The
					rules: answer only from the context, name what is missing, and refuse
					when the best chunk sits under the floor.
				</P>

				<H2>How I knew it worked</H2>

				<P>
					A fixed set of question and answer pairs: logged questions, every
					question a tester asked, and adversarial questions the corpus cannot
					answer, where the right reply is a refusal. Retrieval and generation
					are scored apart, context precision for whether the good chunks
					ranked high, faithfulness for whether each claim is entailed by what
					came back. The set runs in CI and a prompt, chunker or model change
					fails on a regression against main. Deltas, not absolute thresholds.
				</P>

				<Box
					as="dl"
					mt={{ base: 12, md: 16 }}
					borderTop="1px solid"
					borderColor="border.subtle"
					fontFamily="var(--font-mono)"
					fontSize="12px">
					{facts.map(([label, value]) => (
						<Box
							key={label}
							display="flex"
							justifyContent="space-between"
							gap={4}
							py={2}
							borderBottom="1px solid"
							borderColor="border.subtle">
							<Box as="dt" color="text.muted">
								{label}
							</Box>
							<Box as="dd" ml={0} textAlign="right" fontWeight="700">
								{value}
							</Box>
						</Box>
					))}
				</Box>

				<H2>Getting the documents in</H2>

				<P>
					Files come from Lark and Google Drive over OAuth, with an MCP server
					for Lark docs, wiki, sheets and bitable. Ingest is
					async through QStash: download, extract with LlamaParse, chunk,
					batch-embed, store. The failure paths took more of my time than the
					happy one, because a run that dies after the download leaves a
					document that looks uploaded and answers nothing.
				</P>

				<DiagramFigure
					id="cif"
					wide={CompozeIngestFlow.Wide}
					narrow={CompozeIngestFlow.Narrow}
					breakpoint="smmd"
					caption="fig. 5 — a content hash drops files already seen, PII comes out before chunking, and the dashed region runs later on QStash. Each stage is a checkpoint, so a dead run can be retried from the step that broke."
				/>

				<Figure
					src="/images/compoze/compoze-04.webp"
					alt="The Compoze admin knowledge base page: a document table with type, size, source connector and ingest status, status filter counts above it, and a banner saying processing continues in the background."
					caption="fig. 6 — the admin view of ingest. Every document shows where it came from and where it stopped; the counts across the top are how an admin finds the failures."
				/>

				<P>
					Jobs are keyed by content hash, so a re-upload is a no-op; embeddings
					are cached by chunk hash and model, so editing one paragraph re-embeds
					one chunk. PII is redacted at ingest, which keeps the embeddings
					clean. Anything that exhausts its retries lands in a dead-letter
					queue with the payload and the error attached. A silent drop is
					worse than a loud failure.
				</P>

				<P>
					Nine tools: contextual RAG search, retrieve, summarise, read, create
					and update a document, web search, extract and crawl.
				</P>

				<Figure
					src="/images/compoze/compoze-03.webp"
					alt="The Compoze agent picker showing four domain agents, each with a short description."
					caption="fig. 7 — four domain agents, each with its own prompt, tools and examples. Which ones a tenant sees is configuration."
				/>

				<H2>Things I optimised</H2>

				<P>
					Chat streams by default. If the client disconnected mid-answer, an
					abort listener handed the job to a QStash workflow, only if the
					stream had not completed, so a request was never billed twice. Each
					phase (init, load context, RAG query, generation, finalise) was a
					durable step, so a retry resumed after the last completed one. When
					QStash was unreachable the route fell back to plain streaming.
				</P>

				<P>
					Edge middleware replaced any client-supplied identity header with
					the user and tenant id from the verified JWT, so routes trusted it
					and skipped a database round trip. Indexes led with the tenant id,
					and chat creation was an atomic insert-on-conflict.
				</P>

				<MonoTable rows={optimisations} />

				<H2>Safety</H2>

				<P>
					Retrieved text is untrusted input: an instruction planted in a synced
					document gets retrieved and runs with the user&apos;s tool
					permissions. So context arrives in a delimited block the prompt
					declares as data, and tools are scoped per agent so a
					document-triggered path reaches nothing with a side effect.
				</P>

				<H2>Working alone</H2>

				<P>
					With no reviewer, CI is the reviewer. Route contracts are typed,
					every payload is validated at runtime with Zod, and contract tests
					run on each push, which is what let me keep changing 53 routes and
					23 tables alone. Each request is traced as one span tree with tokens,
					model and tenant on every span, so cost per tenant per answer is the
					number pricing is built on. Time to first token is the latency I
					watched.
				</P>

				<P>
					I did all six stages of selling and delivering it, discovery through
					deployment and training. Knowledge engineering was the slow one: deciding what belongs in a
					knowledge base, and what should never go near it, is not a technical
					question and you cannot do it for the customer. Running it next to a
					full-time job shaped the product more than any opinion I had about
					architecture. Anything that needed me awake to work did not get
					built.
				</P>

				<Box h={{ base: 12, md: 20 }} />
			</Container>
		</Layout>
	);
}
