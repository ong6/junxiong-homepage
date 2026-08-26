import { Heading, Text } from "@chakra-ui/react";
import BlogLayout from "../../components/BlogLayout";

const Post = () => (
	<BlogLayout
		title="Notes from building an AI agent platform at work"
		date="2026-08-10"
		readingTime="5 min read">
		<Text>
			I&apos;ll admit something upfront: I think most of the agent hype is
			noise. Half the demos I see are a while loop around an LLM call with a
			landing page. And yet since October I&apos;ve been an AI Infrastructure
			Engineer on TikTok&apos;s Promotion &amp; Operations team, and I spent
			most of this year building an agent platform from zero. Both things can
			be true. The hype is overdone and the underlying thing is genuinely
			useful, if you&apos;re disciplined about what you point it at.
		</Text>
		<Text>
			The platform has three pieces. An agent runtime built on A2A and
			LangGraph, so agents are graphs with explicit states rather than a
			prompt praying its way through a loop. A Go MCP server that exposes our
			internal tooling as roughly sixteen tools. And a React chat SDK that
			other teams drop into their own pages in a few lines, so nobody has to
			build a chat UI ever again.
		</Text>
		<Text>
			The honest ranking of those three by impact: the MCP server first, the
			SDK second, the runtime last. Which stings a little, because the
			runtime was the fun part.
		</Text>
		<Heading as="h2" fontSize={18}>
			The boring part carried the whole thing
		</Heading>
		<Text>
			The MCP server is the least glamorous code I wrote all year. It&apos;s
			Go, it wraps internal APIs, it validates inputs, it returns errors that
			a model can actually read and recover from. No cleverness anywhere.
			But it&apos;s the piece that made everything else work, because an
			agent is only as good as the actions it can take. Before it existed,
			every prototype on the team re-implemented the same internal calls
			with slightly different bugs.
		</Text>
		<Text>
			This matches a belief I&apos;ve held since my Go/gRPC backend days on
			the promotion platform: boring tech, sharp interfaces. The exciting
			layer of your stack should sit on top of the most tedious, most tested
			layer you can stomach writing.
		</Text>
		<Text>
			The number I actually care about is this one. The ops workflows we
			targeted used to take about five minutes of clicking through internal
			consoles, copying IDs between tabs. Through the agent they take under
			thirty seconds. Nobody on the ops side cares that there&apos;s a
			LangGraph state machine underneath. They care that the clicking is
			gone.
		</Text>
		<Heading as="h2" fontSize={18}>
			Things I&apos;d tell past me
		</Heading>
		<Text>
			Scope the agent to workflows where a wrong answer is cheap and
			checkable. Multi-step ops tasks are perfect: each step is verifiable,
			and a human confirms before anything destructive happens. I stayed far
			away from anything where the agent&apos;s output is the final word.
			That single scoping decision did more for reliability than any prompt
			engineering.
		</Text>
		<Text>
			Tool count matters less than tool quality. Sixteen tools sounds small.
			It&apos;s plenty. Every tool with a vague description or an overloaded
			parameter costs you accuracy across the whole system, because the
			model has to guess. I spent more time rewriting tool descriptions than
			I ever expected to, and it was time well spent.
		</Text>
		<Text>
			The SDK is why anyone adopted it. Teams don&apos;t integrate platforms
			because the architecture diagram is nice. They integrate because the
			diff is small. A few lines of React to embed a working chat surface
			beats a beautiful API that demands a sprint. I write TypeScript every
			day and I still didn&apos;t want to build a chat UI twice, so I
			assumed nobody else did either.
		</Text>
		<Text>
			And write everything down as if you&apos;ll be audited. I keep a
			trading journal outside work, and the habit bled into this project:
			every failed approach got a short note on what I tried and why it
			died. When someone asks why the runtime isn&apos;t built on framework
			X, I have the answer from March instead of a shrug.
		</Text>
		<Text>
			The thing I keep chewing on is that none of the hard problems were AI
			problems. They were the same problems as any internal platform:
			interfaces, adoption, error handling, trust. The model is the easy
			part now. Everything around it is still just software engineering,
			which is either comforting or disappointing depending on the day.
		</Text>
	</BlogLayout>
);

export default Post;
