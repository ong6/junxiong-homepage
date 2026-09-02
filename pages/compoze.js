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
import CompozeArchitecture from "../components/diagrams/CompozeArchitecture";
import CompozeIngestFlow from "../components/diagrams/CompozeIngestFlow";
import CompozeQueryFlow from "../components/diagrams/CompozeQueryFlow";
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

const Figure = ({ src, alt, caption }) => (
	<Box as="figure" my={{ base: 10, md: 14 }} mx={0}>
		<Box border="1px solid" borderColor="border.subtle" lineHeight={0}>
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
				gap={6}
				py={2}
				borderBottom="1px solid"
				borderColor="border.subtle">
				<Box as="dt" flex="0 0 34%" color="text.muted">
					{label}
				</Box>
				<Box as="dd" ml={0} flex="1" lineHeight="1.6">
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
	["agent tools", "9"],
	["domain agents", "4"],
	["models / providers", "9 / 3"],
	["knowledge bases per search", "5, in parallel"],
	["similarity floor", "0.35 cosine"],
	["api routes", "53"],
	["database tables", "23"],
	["test specs", "27"],
	["typescript", "~76k lines"],
];

export default function Compoze() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="Compoze"
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
						mt={7}
						fontSize={{ base: "19px", md: "21px" }}
						lineHeight="1.6"
						fontWeight="600">
						I built Compoze on evenings and weekends while working full time at
						TikTok. It sold document-grounded assistants to businesses. At the
						end of 2025 one of its own clients bought the company outright. The
						client and the terms stay private.
					</Text>
				</Box>

				<CompozeArchitecture figure="fig. 1" />

				<P>
					The pitch was narrow on purpose. A company has a few thousand
					documents nobody reads and staff who ask the same handful of questions
					about them every week. Compoze answered those questions with the
					documents attached, so the answer could be checked rather than
					believed.
				</P>

				<Figure
					src="/images/compoze/compoze-01.webp"
					alt="Compoze chat in its empty state, showing the selected agent, four example prompts and the list of tools it can use."
					caption="fig. 2 — the empty state. Each agent arrives with its own example prompts and a visible list of what it can reach."
				/>

				<P>
					An empty chat box gets you empty questions. So nothing ships blank:
					every agent carries example prompts and shows its tool list up front,
					and past threads stay in the sidebar. That was the cheapest fix I made
					to how much people actually used the thing.
				</P>

				<H2>One codebase, configured per customer</H2>

				<P>
					Next.js 15 and React 19 on the front, Postgres with pgvector behind
					Drizzle. Every core table carries a tenant id and isolation is
					enforced in the application layer, not by handing each customer their
					own database. I spent longer on that call than any other. One database
					is one migration and one bill; the price is that a single forgotten
					where clause leaks a customer&apos;s documents into another&apos;s
					answers, so the check has to live somewhere no route can skip it.
				</P>

				<P>
					On top of that, three roles — Admin, Manager, User — and an admin
					portal for the people who run a tenant. Nine models from OpenAI,
					Anthropic and Google sit behind one gateway, and a customer picks
					which one runs in which environment through configuration.
				</P>

				<H2>Retrieval is the part you get judged on</H2>

				<P>
					Documents are chunked at roughly a thousand characters and embedded
					with OpenAI at 1536 dimensions. A question runs cosine search across
					up to five knowledge bases in parallel with a 0.35 similarity floor,
					an LLM scores what came back per database, and the survivors get
					summarised before the answer is written. Citations are stored with the
					message and rendered with their match scores.
				</P>

				<CompozeQueryFlow figure="fig. 3" />

				<Figure
					src="/images/compoze/compoze-02.webp"
					alt="An answered question in Compoze: a knowledge base search over three documents, a structured answer containing a table, and cited sources listed with match scores."
					caption="fig. 4 — the tool call is shown, the answer is structured, and the sources sit under it with their match scores."
				/>

				<P>
					Showing the score matters more than it looks. Nobody trusts a cited
					answer until they have opened two or three citations and found them
					right, and a score makes that check quick enough that people do it.
				</P>

				<P>
					Dense search on its own misses exact tokens, so keyword search runs
					beside it and the two ranked lists merge with reciprocal rank fusion,
					which needs no normalising across two incomparable score scales. The
					floor and the LLM relevance pass are the cheap first cut. A
					cross-encoder that reads the question and a chunk together decides the
					final order, and only the top handful reach the answer.
				</P>

				<P>
					Every chunk carries a header written at ingest, one sentence placing
					it in its document, because a paragraph lifted out of a contract stops
					meaning much on its own. Matching happens on the small chunk and the
					parent section is what the model reads. The vector index is HNSW
					rather than IVFFlat, for recall per unit of latency and because it
					does not need a populated table before it can be built.
				</P>

				<P>
					The prompt is fixed in blocks: role, rules, retrieved context
					delimited and tagged with chunk ids, then history and the question.
					That order exists so the static prefix can be cached, since it is
					identical on every request for a tenant. The rules say to answer only
					from the context and to name what is missing, and when the best chunk
					sits under the confidence bar the reply is a refusal instead of
					something written from the model&apos;s own memory.
				</P>

				<H2>How I knew it worked</H2>

				<P>
					A fixed set of question and answer pairs, taken from logged questions,
					from user testing rounds where every question a tester asked
					became a case, and from adversarial questions the corpus cannot
					answer, where the correct reply is that there is nothing to answer
					from. Retrieval and generation are scored apart: context precision for
					whether the good chunks ranked high, faithfulness for whether each
					claim is entailed by what came back. The set runs in CI and a change
					to a prompt, a chunker or a model fails on a regression against main.
					Deltas rather than absolute thresholds, which go stale and get muted.
					Without a scoreboard every retrieval change is a coin flip two people
					can argue about all week.
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
					on the Lark side reaching docs, wiki, sheets and bitable. Ingest is
					async through QStash: download, extract with LlamaParse, chunk,
					batch-embed, store. The failure paths took more of my time than the
					happy one, because a run that dies after the download leaves a
					document that looks uploaded and answers nothing.
				</P>

				<CompozeIngestFlow figure="fig. 5" />

				<Figure
					src="/images/compoze/compoze-04.webp"
					alt="The Compoze admin knowledge base page: a document table with type, size, source connector and ingest status, status filter counts above it, and a banner saying processing continues in the background."
					caption="fig. 6 — the admin view of ingest. Every document shows where it came from and where it stopped, and the counts across the top are how a tenant admin finds the failures."
				/>

				<P>
					Jobs are keyed by content hash, so a re-upload of the same file is a
					no-op, and embeddings are cached by chunk hash and model, so editing
					one paragraph re-embeds one chunk. Anything that exhausts its retries
					lands in a dead-letter queue with the payload and the error attached.
					A silent drop is worse than a loud failure.
				</P>

				<P>
					Nine tools in total — contextual RAG search, retrieve, summarise,
					read, create and update a document, web search, extract and crawl.
					Code, image, sheet and text artifacts open in a side panel and get
					edited there instead of being pasted back into chat.
				</P>

				<Figure
					src="/images/compoze/compoze-03.webp"
					alt="The Compoze agent picker showing four domain agents, each with a short description."
					caption="fig. 7 — four domain agents, each with its own prompt, tools and examples. Which ones a tenant sees is configuration, not a fork."
				/>

				<H2>Things I optimised</H2>

				<P>
					Chat streams by default. If the client disconnected mid-answer, an
					abort listener handed the job to a QStash workflow, and only if the
					stream had not already completed, so a request was never billed twice.
					Stream errors took the same path. When QStash was unreachable the
					route degraded to plain streaming instead of queueing a job nobody
					would ever run.
				</P>

				<P>
					Each phase of the background chat workflow (init, load context, RAG
					query, generation, finalise) was a durable step. A retry resumed after
					the last completed step rather than re-running retrieval or paying for
					generation a second time, and duplicate deliveries of a finished job
					were skipped.
				</P>

				<P>
					Edge middleware stripped any client-supplied identity header in
					production, then injected the user and tenant id from the verified
					JWT. Routes could trust the header and skip a database round trip, and
					a client could not spoof a tenant it did not belong to.
				</P>

				<P>
					Indexes led with the tenant id, and chats carried a denormalised
					tenant id so the hot queries never joined a second table to find one.
					Chat creation was an atomic insert-on-conflict, which settled the race
					between two concurrent first messages.
				</P>

				<MonoTable rows={optimisations} />

				<H2>Safety</H2>

				<P>
					Retrieved text is untrusted input. An instruction planted in a synced
					document gets retrieved and then runs with the user&apos;s tool
					permissions, which is the one thing here that is a liability rather
					than a bug. Context arrives in a delimited block the prompt declares
					as data, untrusted spans are marked as spans the model should not
					obey, and tools are scoped per agent so a document-triggered path
					reaches nothing with a side effect.
				</P>

				<P>
					Tenant isolation gets a second guard under the application check.
					Postgres row-level security keys on the tenant id set per connection,
					so the database refuses the query the code forgot to scope. PII is
					redacted at ingest rather than filtered at read time, which keeps the
					embeddings themselves clean. Each citation is checked for entailment
					against the sentence it is attached to, which is the difference
					between citations as decoration and citations as a guarantee.
				</P>

				<H2>Working alone</H2>

				<P>
					With no reviewer, CI is the reviewer. Route contracts are typed, every
					payload is validated at runtime with Zod, and contract tests run on
					each push, which is what let me keep changing 53 routes and 23 tables
					without a second pair of eyes.
				</P>

				<P>
					Each request is traced as one span tree across retrieve, rerank and
					generate, with tokens, model and tenant on every span. Cost per tenant
					per answer is a first-class number, because it is the input to
					pricing. Every stage has a latency budget, and time to first token is
					the one I watched, since the silent gap before the first word is what
					people mean when they say it is slow.
				</P>

				<P>
					Selling and delivering it was six stages and I did all of them:
					discovery and analysis, knowledge engineering, model selection,
					integration and development, testing and refinement, deployment and
					training. Knowledge engineering was the slow one. Deciding what
					belongs in a knowledge base, and what should never go near it, is not
					a technical question and you cannot do it for the customer.
				</P>

				<P>
					Running it next to a full-time job shaped the product more than any
					opinion I had about architecture. Anything that needed me awake to
					work did not get built.
				</P>

				<Box h={{ base: 12, md: 20 }} />
			</Container>
		</Layout>
	);
}
