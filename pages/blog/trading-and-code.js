import { Heading, Text } from "@chakra-ui/react";
import BlogLayout from "../../components/BlogLayout";

const Post = () => (
	<BlogLayout
		title="What trading taught me about writing software"
		date="2026-03-15"
		readingTime="4 min read">
		<Text>
			I trade stocks actively, with rules. Every trade gets logged with an
			R-multiple, how much I made or lost as a multiple of what I risked.
			Every name on my watchlist has written entry and exit triggers before
			I put on a cent. Every week I review the log looking for one repeating
			mistake, just one, and I work on that until it stops repeating. None
			of this makes me sound fun at parties. All of it has made me a better
			engineer, which is not what I expected when I started.
		</Text>
		<Heading as="h2" fontSize={18}>
			Write the exit before the entry
		</Heading>
		<Text>
			The core discipline in my playbook is that decisions get written down
			before the money moves. The trigger says what price I buy, where I&apos;m
			wrong, and where I take profit. If the setup doesn&apos;t hit the
			trigger, I don&apos;t trade, no matter how good it looks in the moment.
		</Text>
		<Text>
			Software has the same failure mode trading does: deciding under
			adrenaline. The 2am incident where you push a fix you haven&apos;t
			really thought through is the same animal as market-buying a stock
			because it&apos;s ripping and you can&apos;t stand watching. The fix
			is identical too. Decide in advance, calmly, in writing. A runbook is
			a set of entry and exit triggers for production. A rollback criterion
			written before the deploy is a stop-loss. When I ship something risky
			at work now, I write down what &quot;this isn&apos;t working&quot;
			looks like before I ship it, because afterwards I&apos;ll be too
			invested to see it.
		</Text>
		<Heading as="h2" fontSize={18}>
			Size the position, size the blast radius
		</Heading>
		<Text>
			R-multiples force you to think in units of risk, not units of money.
			A trade isn&apos;t &quot;I made $500&quot;, it&apos;s &quot;I made
			2R&quot;, twice what I was willing to lose. The question is never
			whether an idea can win, it&apos;s what it costs when it loses.
		</Text>
		<Text>
			That&apos;s just blast-radius thinking with a different accent.
			Feature flags, canary deploys, migrating one shard first, these are
			all position sizing. The engineers I trust most aren&apos;t the ones
			with the highest win rate on their ideas. They&apos;re the ones whose
			losers are small, because they structured the rollout so a bad bet
			cost one service an afternoon instead of the platform a weekend.
		</Text>
		<Heading as="h2" fontSize={18}>
			The journal and the postmortem are the same skill
		</Heading>
		<Text>
			This is the one I&apos;d defend hardest. A trading journal and an
			engineering postmortem are the same document. Both start from the
			same uncomfortable premise, that your memory of why you did something
			is a liar, and the only trustworthy record is the one written at the
			time. Both are worthless as blame and valuable only as pattern
			detection. And both fail the same way, by producing ten action items
			nobody follows instead of one that someone does.
		</Text>
		<Text>
			My weekly review rule is one repeating mistake at a time. Not five
			resolutions, one. Some weeks it&apos;s &quot;stop moving stops down&quot;,
			and I&apos;ll ignore every other flaw in my trading until that
			one&apos;s dead. Postmortems that changed how my team actually
			operates worked the same way, one concrete change, followed up on,
			rather than a wall of remediation tickets that quietly age out.
		</Text>
		<Text>
			The uncomfortable part is that the market grades you honestly and
			frequently, and software mostly doesn&apos;t. A bad trade shows up in
			the log as a red number within days. A bad architecture decision can
			hide for a year behind a demo that worked. That gap is exactly why
			the written record matters more in engineering, not less. The market
			will journal for you whether you like it or not. Your codebase
			won&apos;t, so you have to.
		</Text>
	</BlogLayout>
);

export default Post;
