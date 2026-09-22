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
import * as CompozeDurableChat from "../components/diagrams/CompozeDurableChat";
import * as CompozeIngestFlow from "../components/diagrams/CompozeIngestFlow";
import * as CompozeQueryFlow from "../components/diagrams/CompozeQueryFlow";
import * as CompozeUserFlow from "../components/diagrams/CompozeUserFlow";
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

const Details = ({ title, children }) => (
	<Box
		as="details"
		mt={{ base: 8, md: 10 }}
		borderTop="1px solid"
		borderBottom="1px solid"
		borderColor="border.subtle"
		sx={{
			"@media print": {
				"&::details-content": { contentVisibility: "visible", height: "auto" },
				"& > .case-study-details-body": { display: "block" },
			},
		}}>
		<Box
			as="summary"
			minH="44px"
			py={3}
			px={1}
			fontSize="17px"
			fontWeight="700"
			cursor="pointer"
			_focusVisible={{ outline: "2px solid", outlineColor: "brand.solid", outlineOffset: "2px" }}>
			{title}
		</Box>
		<Box className="case-study-details-body" pb={5}>
			{children}
		</Box>
	</Box>
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
						Compoze was an evenings-and-weekends company, run alongside my full-time job at TikTok. It built assistants that answer questions from a company&apos;s own documents, and it was sold to a client at the end of 2025.
					</Text>
				</Box>

				<P>
					The idea was to help staff find answers in company documents without searching through them by hand. Compoze included the sources with each answer so people could open them and check.
				</P>

				<Figure
					src="/images/compoze/compoze-02.webp"
					alt="An answered question in Compoze: a knowledge base search over three documents, a structured answer containing a table, and cited sources listed with match scores."
					caption="fig. 1 — the tool call is shown, the answer is structured, and the sources sit under it with their match scores."
				/>

				<DiagramFigure
					id="cuf"
					diagram={CompozeUserFlow}
					caption="fig. 2 — two people use it. An admin fills the knowledge base and watches ingest; a user asks and checks the sources. The dashed hop is where one job ends and the other begins."
				/>

				<H2>Working alone</H2>

				<P>
					Each engagement ran from the first customer conversation through deployment and training, and I handled all of it. Organising the knowledge base took the longest, because only the customer could decide which documents belonged in it and which should stay out. Running Compoze beside a full-time job also meant it had to keep working without constant attention.
				</P>

				<DiagramFigure
					id="carch"
					headingLevel={2}
					diagram={CompozeArchitecture}
					caption="fig. 3 — the whole system. A question walks ① agent → ② retrieval → ③ pgvector → ④ gateway → ⑤ cited answer inside one request. Ingest runs elsewhere: Ⓐ download, Ⓑ extract, Ⓒ chunk, Ⓓ embed, Ⓔ store. One database, every row under a tenant id and row-level security."
				/>

				<Figure
					src="/images/compoze/compoze-01.webp"
					alt="Compoze chat in its empty state, showing the selected agent, four example prompts and the list of tools it can use."
					caption="fig. 4 — the empty state. Each agent arrives with its own example prompts and a visible list of what it can reach."
				/>

				<P>
					The chat opens with example prompts and a list of the tools it can use, so someone new can see what to ask. Past conversations stay in the sidebar.
				</P>

				<H2>One codebase, configured per customer</H2>

				<P>
					Next.js 15 and React 19 on the front, Postgres with pgvector behind
					Drizzle. Every core table carries a tenant id. Tenant checks in the
					application and Postgres row-level security provide two layers of
					isolation. One shared database keeps migrations and billing in one
					place, while tenant scoping has to stay consistent across both layers.
					On top: three roles (Admin, Manager, User), an admin portal
					per tenant, and nine models from OpenAI, Anthropic and Google behind
					one gateway, picked per environment in configuration.
				</P>

				<H2>Finding the right passages</H2>

				<P>
					Documents are chunked at about a thousand characters. Each chunk gets a
					one-sentence header placing it in its document and is embedded with
					OpenAI at 1536 dimensions. A question runs across up to five knowledge
					bases in parallel. Each lane is hybrid: cosine search over an HNSW
					index, keyword search beside it because dense search misses exact
					tokens, the two ranked lists merged with reciprocal rank fusion. Chunks
					under a 0.35 similarity floor are dropped. An LLM scores the survivors
					per database, and a cross-encoder reading question and chunk together
					sets the final order.
				</P>

				<DiagramFigure
					id="cqf"
					diagram={CompozeQueryFlow}
					caption="fig. 5 — one question, five knowledge bases at once. Only chunks over the 0.35 floor survive, and a cross-encoder orders them."
				/>

				<P>
					Citations are stored with the message, checked for entailment against
					the sentence they support, and rendered with their match scores. The source links and scores let readers check how well a passage supports the answer.
				</P>

				<P>
					The prompt is fixed blocks (role, rules, context tagged with chunk
					ids, history, question) so the static prefix caches per tenant. The
					rules: answer only from the context, name what is missing, and refuse
					when the best chunk sits under the floor.
				</P>

				<H2>How I knew it worked</H2>

				<P>
					A fixed set of question and answer pairs came from logs and testing, including questions the documents couldn&apos;t answer, where the expected reply was a refusal. Retrieval and generation are scored apart: context precision for whether the good chunks ranked high, faithfulness for whether each claim is entailed by what came back. The set runs in CI, and a prompt, chunker or model change fails on a regression against main. The comparison is against the previous version rather than a fixed score threshold.
				</P>

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
					diagram={CompozeIngestFlow}
					caption="fig. 6 — a content hash drops files already seen, PII comes out before chunking, and the dashed region runs later on QStash. Each stage is a checkpoint, so a dead run can be retried from the step that broke."
				/>

				<Figure
					src="/images/compoze/compoze-04.webp"
					alt="The Compoze admin knowledge base page: a document table with type, size, source connector and ingest status, status filter counts above it, and a banner saying processing continues in the background."
					caption="fig. 7 — the admin view of ingest. Every document shows where it came from and where it stopped; the counts across the top are how an admin finds the failures."
				/>

				<P>
					Jobs are keyed by content hash, so a re-upload is a no-op; embeddings
					are cached by chunk hash and model, so editing one paragraph re-embeds
					one chunk. PII is redacted at ingest, which keeps the embeddings
					clean. Anything that exhausts its retries lands in a dead-letter
					queue with the payload and the error attached. That gave me a record of what failed and what needed retrying.
				</P>

				<P>
					Nine tools: contextual RAG search, retrieve, summarise, read, create
					and update a document, web search, extract and crawl.
				</P>

				<Figure
					src="/images/compoze/compoze-03.webp"
					alt="The Compoze agent picker showing four domain agents, each with a short description."
					caption="fig. 8 — four domain agents, each with its own prompt, tools and examples. Which ones a tenant sees is configuration."
				/>

				<H2>Safety</H2>

				<P>
					Retrieved text is untrusted input. An instruction planted in a synced
					document can influence the model, so context arrives in a delimited
					block the prompt declares as data. Tools are scoped per agent and
					tenant connector. These controls limit the available tool surface.
					They do not guarantee that the model will ignore a planted instruction.
				</P>

				<Details title="Implementation inventory">
					<Box
						as="dl"
						mt={3}
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
				</Details>

				<DiagramFigure
					id="cdc"
					diagram={CompozeDurableChat}
					caption="fig. 9 — chat streams by default. If the reader leaves before the answer completes, the job moves to durable QStash steps, and a retry resumes after the last one that finished."
				/>

				<Details title="Optimisations and operating details">
					<P>
						Chat streams by default. If the client disconnected mid-answer and
						the stream had not completed, an abort listener handed the job to a
						QStash workflow. Each phase (init, load context, RAG query,
						generation, finalise) was a durable step, so a retry could resume
						after the last completed phase. When QStash was unreachable the
						route fell back to plain streaming.
					</P>

					<P>
						Edge middleware replaced any client-supplied identity header with
						the user and tenant id from the verified JWT, so routes trusted it
						and skipped a database round trip. Indexes led with the tenant id,
						and chat creation was an atomic insert-on-conflict.
					</P>

					<MonoTable rows={optimisations} />

					<P>
						With no one else reviewing the code, automated checks did that job. Route contracts are typed, every payload is validated at runtime with Zod, and contract tests run on each push. That&apos;s what made it safe to keep changing 53 routes and 23 tables. Each request is traced as one span tree with tokens, model and tenant on every span, so pricing is built on cost per tenant per answer. Time to first token was the latency that mattered most.
					</P>
				</Details>

				<Box h={{ base: 12, md: 20 }} />
			</Container>
		</Layout>
	);
}
