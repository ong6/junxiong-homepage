import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
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

				<P>
					The pitch was narrow on purpose. A company has a few thousand documents
					nobody reads and staff who ask the same handful of questions about them
					every week. Compoze answered those questions with the documents
					attached, so the answer could be checked rather than believed.
				</P>

				<Figure
					src="/images/compoze/compoze-01.webp"
					alt="Compoze chat in its empty state, showing the selected agent, four example prompts and the list of tools it can use."
					caption="fig. 1 — the empty state. Each agent arrives with its own example prompts and a visible list of what it can reach."
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
					Drizzle. Every core table carries a tenant id and isolation is enforced
					in the application layer, not by handing each customer their own
					database. I spent longer on that call than any other. One database is
					one migration and one bill; the price is that a single forgotten where
					clause leaks a customer&apos;s documents into another&apos;s answers, so
					the check has to live somewhere no route can skip it.
				</P>

				<P>
					On top of that, three roles — Admin, Manager, User — and an admin portal
					for the people who run a tenant. Nine models from OpenAI, Anthropic and
					Google sit behind one gateway, and a customer picks which one runs in
					which environment through configuration.
				</P>

				<H2>Retrieval is the part you get judged on</H2>

				<P>
					Documents are chunked at roughly a thousand characters and embedded with
					OpenAI at 1536 dimensions. A question runs cosine search across up to
					five knowledge bases in parallel with a 0.35 similarity floor, an LLM
					scores what came back per database, and the survivors get summarised
					before the answer is written. Citations are stored with the message and
					rendered with their match scores.
				</P>

				<Figure
					src="/images/compoze/compoze-02.webp"
					alt="An answered question in Compoze: a knowledge base search over three documents, a structured answer containing a table, and cited sources listed with match scores."
					caption="fig. 2 — the tool call is shown, the answer is structured, and the sources sit under it with their match scores."
				/>

				<P>
					Showing the score matters more than it looks. Nobody trusts a cited
					answer until they have opened two or three citations and found them
					right, and a score makes that check quick enough that people do it.
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
					Files come from Lark and Google Drive over OAuth, with an MCP server on
					the Lark side reaching docs, wiki, sheets and bitable. Ingest is async
					through QStash: download, extract with LlamaParse, chunk, batch-embed,
					store. The failure paths took more of my time than the happy one,
					because a run that dies after the download leaves a document that looks
					uploaded and answers nothing.
				</P>

				<P>
					Nine tools in total — contextual RAG search, retrieve, summarise, read,
					create and update a document, web search, extract and crawl. Code,
					image, sheet and text artifacts open in a side panel and get edited
					there instead of being pasted back into chat.
				</P>

				<Figure
					src="/images/compoze/compoze-03.webp"
					alt="The Compoze agent picker showing four domain agents, each with a short description."
					caption="fig. 3 — four domain agents, each with its own prompt, tools and examples. Which ones a tenant sees is configuration, not a fork."
				/>

				<H2>Working alone</H2>

				<P>
					With no reviewer, CI is the reviewer. Route contracts are typed, every
					payload is validated at runtime with Zod, and contract tests run on each
					push, which is what let me keep changing 53 routes and 23 tables without
					a second pair of eyes.
				</P>

				<P>
					Selling and delivering it was six stages and I did all of them:
					discovery and analysis, knowledge engineering, model selection,
					integration and development, testing and refinement, deployment and
					training. Knowledge engineering was the slow one. Deciding what belongs
					in a knowledge base, and what should never go near it, is not a
					technical question and you cannot do it for the customer.
				</P>

				<P>
					Running it next to a full-time job shaped the product more than any
					opinion I had about architecture. Anything that needed me awake to work
					did not get built.
				</P>

				<Box h={{ base: 12, md: 20 }} />
			</Container>
		</Layout>
	);
}
