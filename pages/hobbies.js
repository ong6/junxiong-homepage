import { Container, Heading, Icon, Link } from "@chakra-ui/react";
import {
	IoAirplane,
	IoBook,
	IoCodeSlash,
	IoServer,
	IoTennisball,
	IoTrendingUp,
} from "react-icons/io5";
import Intro from "../components/Intro";
import Layout from "../components/layouts/Articles";
import Paragraph from "../components/Paragraph";
import Section from "../components/Section";

const Hobbies = () => (
	<Layout
		title="Hobbies"
		description="Away from work: tennis, trading stocks against a written playbook, tinkering with side projects and home servers, slow travel and reading.">
		<Container maxW="full">
			<Intro />
			<Section delay={0.1}>
				<Heading as="h2" variant="section-title">
					<Icon as={IoTennisball} mr={2} verticalAlign="middle" />
					Tennis
				</Heading>
				<Paragraph>
					Tennis is my main sport. The feedback is immediate and unsentimental
					— the ball goes in or it does not — and getting better means drilling
					one specific thing badly until it is boring. It is the first thing I
					reach for when I want to switch my brain off from work.
				</Paragraph>
			</Section>

			<Section delay={0.2}>
				<Heading as="h2" variant="section-title">
					<Icon as={IoTrendingUp} mr={2} verticalAlign="middle" />
					Trading &amp; Markets
				</Heading>
				<Paragraph>
					I actively trade stocks with a written playbook. Every trade gets
					logged with an R-multiple calculation, every watchlist name has
					written entry and exit triggers, and every week I review the log
					hunting for one repeating mistake at a time. I treat it as a craft to
					get slightly better at each week, not a get-rich scheme.
				</Paragraph>
			</Section>

			<Section delay={0.3}>
				<Heading as="h2" variant="section-title">
					<Icon as={IoCodeSlash} mr={2} verticalAlign="middle" />
					Tinkering with Code
				</Heading>
				<Paragraph>
					I keep a few side projects going outside of work. Right now that
					means a{" "}
					<Link href="https://github.com/ong6/sg-property-analysis" target="_blank">
						Singapore property data-analysis project
					</Link>
					, building agent tooling for myself, and running my personal notes
					and life admin as a markdown repo that an AI agent tends for me. Half
					the fun is that the tools only need to make sense to one user.
				</Paragraph>
			</Section>

			<Section delay={0.4}>
				<Heading as="h2" variant="section-title">
					<Icon as={IoServer} mr={2} verticalAlign="middle" />
					Home Servers
				</Heading>
				<Paragraph>
					I run things on my own hardware at home rather than renting them. It
					is the cheapest way I know to learn the operational half of software
					— the part that only shows up when something has to stay up while you
					are asleep, and nobody is paid to fix it but you.
				</Paragraph>
			</Section>

			<Section delay={0.5}>
				<Heading as="h2" variant="section-title">
					<Icon as={IoAirplane} mr={2} verticalAlign="middle" />
					Travel
				</Heading>
				<Paragraph>
					I lived in Munich for six months during NUS Overseas Colleges, which
					sold me on staying somewhere long enough to have a regular grocery
					store. I prefer slow trips — fewer places, more days in each — over
					checklist itineraries.
				</Paragraph>
			</Section>

			<Section delay={0.6}>
				<Heading as="h2" variant="section-title">
					<Icon as={IoBook} mr={2} verticalAlign="middle" />
					Reading
				</Heading>
				<Paragraph>
					I read to steal ideas — mostly non-fiction that connects to whatever
					I am building or trading at the moment, with fiction in between to
					reset. A book that changes how I do one thing is worth a shelf of
					ones I merely agreed with.
				</Paragraph>
			</Section>
		</Container>
	</Layout>
);

export default Hobbies;
