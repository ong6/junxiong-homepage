import { Box, Container, Link, Text, useColorModeValue } from "@chakra-ui/react";
import Layout from "../components/layouts/Articles";
import Section from "../components/Section";

// A running log, not a grid of cards: one narrow column, numbered entries, a
// single rule down the left margin. Deliberately unlike /works and the homepage.
const Entry = ({ index, label, children, delay }) => {
	const rule = useColorModeValue("rgba(26,36,32,.16)", "rgba(230,235,232,.14)");
	const num = useColorModeValue("mint.700", "mint.300");

	return (
		<Section delay={delay}>
			<Box
				borderLeftWidth="1px"
				borderColor={rule}
				pl={{ base: 5, md: 8 }}
				pb={{ base: 7, md: 9 }}>
				<Text
					fontFamily="var(--font-mono)"
					fontSize="11px"
					fontWeight="700"
					letterSpacing=".1em"
					color={num}
					mb={1}>
					{index}
				</Text>
				<Text fontSize={{ base: "19px", md: "21px" }} fontWeight="700" mb={2}>
					{label}
				</Text>
				<Text fontSize="16px" lineHeight="1.75" color="text.muted">
					{children}
				</Text>
			</Box>
		</Section>
	);
};

const Hobbies = () => (
	<Layout
		title="Hobbies"
		description="What Ong Jun Xiong does away from work: tennis, trading against a written playbook, side projects, a home inference box, slow travel and reading.">
		<Container maxW="720px" px={0} ml={0}>
			<Box pt={{ base: 10, md: 14 }} pb={{ base: 6, md: 8 }}>
				<Text
					as="h1"
					fontFamily="var(--font-mono)"
					fontSize={{ base: "13px", md: "14px" }}
					fontWeight="700"
					letterSpacing=".08em"
					textTransform="uppercase">
					Things I do when I&apos;m not working
				</Text>
			</Box>

			<Entry index="01" label="Tennis" delay={0.05}>
				My main sport. Getting better means picking one flaw and drilling it
				until it is boring. It is also the only hour in a day where I am not
				thinking about software.
			</Entry>

			<Entry index="02" label="Trading" delay={0.1}>
				I trade stocks against a written playbook. Every trade is logged with
				its R-multiple, every watchlist name has entry and exit triggers
				written down before I touch it, and once a week I read back the log
				looking for one repeating mistake. It is a craft I want to be slightly
				better at each week, not a get-rich scheme.
			</Entry>

			<Entry index="03" label="Side projects" delay={0.15}>
				Currently a{" "}
				<Link
					href="https://github.com/ong6/sg-property-analysis"
					target="_blank"
					rel="noopener noreferrer">
					Singapore property data-analysis project
				</Link>
				, agent tooling for my own use, and my notes and life admin kept as a
				markdown repo that an AI agent tends for me. The tools only have to
				make sense to one user, which cuts out most of the arguing.
			</Entry>

			<Entry index="04" label="Home server" delay={0.2}>
				I am speccing an always-on inference box that serves models to my own
				tools. So far the hobby is mostly purchase arithmetic: tokens per
				second is roughly memory bandwidth divided by model size, and that one
				line settles more hardware arguments than any benchmark thread. I write
				up what I learn as I go.
			</Entry>

			<Entry index="05" label="Travel" delay={0.25}>
				Six months in Munich on NUS Overseas Colleges, which was long enough to
				have a regular grocery store. That is the part I want from a trip now,
				so I go slow: fewer places, more days in each.
			</Entry>

			<Entry index="06" label="Reading" delay={0.3}>
				Non-fiction, usually tied to whatever I am building or trading at the
				time. Fiction in between to reset.
			</Entry>
		</Container>
	</Layout>
);

export default Hobbies;
