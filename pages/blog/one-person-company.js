import { Heading, Text } from "@chakra-ui/react";
import BlogLayout from "../../components/BlogLayout";

const Post = () => (
	<BlogLayout
		title="I ran a one-person AI company for a year, then a client bought it"
		date="2026-05-24"
		readingTime="5 min read">
		<Text>
			From January to December 2025 I ran Compoze, an AI solutions company
			with exactly one employee: me. Nights and weekends, alongside a
			full-time engineering job at TikTok. At the end of the year, one of
			its own clients acquired it. I can&apos;t share who or for how much,
			and honestly the interesting part isn&apos;t the exit anyway.
			It&apos;s what running the thing did to how I build software.
		</Text>
		<Heading as="h2" fontSize={18}>
			The stack was deliberately dull
		</Heading>
		<Text>
			Compoze built RAG systems for businesses. The whole company ran on
			LlamaIndex with a FastAPI backend, a Next.js chat frontend, LlamaCloud
			for vector indexing, deployed on Fly.io in Singapore. I picked every
			piece for the same reason: I had maybe ten productive hours a week,
			and every hour spent fighting infrastructure was an hour not spent
			shipping something a client would pay for.
		</Text>
		<Text>
			People underrate how clarifying that constraint is. At a day job you
			can afford a two-week detour to evaluate the shiny thing. When your
			entire engineering department is one tired person on a Tuesday night,
			you develop strong opinions fast. Managed vector indexing over
			self-hosted, because I refuse to babysit an index at midnight. Fly.io
			over a Kubernetes anything, because deploys had to be one command I
			could run half-asleep.
		</Text>
		<Heading as="h2" fontSize={18}>
			One person is a feature, until it isn&apos;t
		</Heading>
		<Text>
			The good part of being solo: no meetings, no alignment, no handoffs.
			A client describes a problem on Monday, they see a working demo the
			next weekend. That speed was the product as much as the RAG pipeline
			was. Clients had usually talked to bigger shops that quoted in
			quarters, and I quoted in weeks.
		</Text>
		<Text>
			The bad part is that every single failure mode routes to your phone.
			I got disciplined about the unsexy stuff early, health checks,
			retries, structured logs, because there was no on-call rotation to
			hide behind. There was just me, and I also had a job to be awake for.
		</Text>
		<Text>
			The other cost is that nights-and-weekends means saying no
			constantly. I climbed less. I traded less. Some weeks the company got
			four focused hours and that had to be enough. If I&apos;d tried to
			make it my identity instead of a bounded project, I think it would
			have eaten the year in a much worse way.
		</Text>
		<Heading as="h2" fontSize={18}>
			On being acquired by your own client
		</Heading>
		<Text>
			The acquisition wasn&apos;t something I engineered. A client depended
			on what I&apos;d built, wanted it closer to their core, and buying
			the company was the clean way to get it. My takeaway from that is
			almost embarrassingly simple: the best sales strategy I had was a
			system that kept working after the invoice was paid. Every renewal
			and referral came from software that didn&apos;t fall over.
		</Text>
		<Text>
			Would I do it again? Yes, with two changes. I&apos;d productize
			earlier instead of treating each engagement as bespoke, because by
			month six I was rebuilding the same three components with different
			logos. And I&apos;d set the operating cadence from day one: a weekly
			written review of what worked and what didn&apos;t, the same way I
			review my trades. The months where I did that went visibly better
			than the months where I just heads-down coded.
		</Text>
		<Text>
			The strangest part of the whole year is how normal it felt by the
			end. Incorporating, invoicing, shipping, supporting, all of it
			compresses into routine faster than you&apos;d expect. The scary
			version of starting a company exists mostly in the heads of people
			who haven&apos;t sent the first invoice yet.
		</Text>
	</BlogLayout>
);

export default Post;
