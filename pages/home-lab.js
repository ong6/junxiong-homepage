import { Box, Container, Heading, Text } from "@chakra-ui/react";
import CaseStudyFooter from "../components/CaseStudyFooter";
import DiagramFigure from "../components/DiagramFigure";
import * as HomeLabArchitecture from "../components/diagrams/HomeLabArchitecture";
import Layout from "../components/layouts/Articles";
import FactList, { pickFacts } from "../components/FactList";
import { BackLink, MetaLine, P, H2, ARTICLE_TITLE } from "../components/ArticleParts";
import { PAGE_META } from "../lib/pageMeta";
import { withNotes } from "../lib/notes";

// The rough idea of the home lab, not a spec. Every sentence and fact row comes
// from the facts the owner cleared for this page (2026-11-16). It is mostly a
// plan, so nothing here may read as if the lab already runs. No addresses,
// rooms, hardware brands or models, network details, sizes, prices or dates
// beyond "on order". Not on the homepage cards: a project goes there once it runs.
const facts = [
	["status", "mostly a plan"],
	["running", "agent on a laptop since Sep 2026 · private network since Nov 2026"],
	["on hand", "small server · storage drives"],
	["on order", "Mac Studio"],
	["still to come", "network gear · storage box · power backup unit"],
	["models", "local first · cloud fallback"],
	["backups", "photos and files only · no off-site copy, by choice"],
	["version 1 done when", "every core service is reachable from my phone · one test restore has worked"],
];

const railFacts = pickFacts(facts, ["status", "running", "on order", "version 1 done when"]);

const links = withNotes("/home-lab", [{ name: "Hobbies", detail: "The home lab is one of six chapters", href: "/hobbies#home-lab" }]);

export default function HomeLab() {
	return (
		<Layout contents facts={railFacts} links={links} {...PAGE_META["/home-lab"]} schema={{ type: "Article" }}>
			<Container maxW="680px" px={0} ml={0}>
				<Box pt={{ base: 10, md: 16 }}>
					<BackLink href="/hobbies#home-lab">Hobbies</BackLink>

					<Heading as="h1" mt={{ base: 8, md: 10 }} fontSize={ARTICLE_TITLE} lineHeight="1" letterSpacing="-.045em">
						Home lab
					</Heading>

					<MetaLine>2026 · hobby · mostly a plan</MetaLine>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="lede" fontWeight="600">
						My home lab will be one place for everything my household runs for itself: file storage, photos, films and shows, home automation, private git, hosting for my own small apps, and local AI. It is mostly a plan. Two parts run today: an always-on agent on a laptop and a private network between my devices.
					</Text>
				</Box>

				<DiagramFigure
					id="home-lab-layout"
					headingLevel={2}
					diagram={HomeLabArchitecture}
					caption="fig. 1 — family devices reach only the family apps, through one front door; my phone reaches everything over the private network. Dashed outlines are planned and not set up yet."
				/>

				<H2>What it is for</H2>
				<P>
					The lab has two sides. The family side is photos, streaming and one shared AI chat app. My family will reach it from their own phones and the TV, with nothing extra to install.
				</P>
				<P>
					The personal side is everything else. Only I will reach it, over the private network between my devices, which is a mesh VPN.
				</P>

				<H2>The pieces</H2>
				<P>
					A network gateway and switch will split the house into zones. A storage box will only store. One small, low-power server will stay on all the time and run virtual machines.
				</P>
				<P>
					A Mac Studio on my desk will run local models and the agent. A power backup unit will keep things up through short outages and shut the server down cleanly in long ones.
				</P>
				<P>
					The server will run Proxmox for the virtual machines and Home Assistant for home automation. The family apps will get their own isolated machine: Immich for photos, Jellyfin for films and shows, and Open WebUI for the shared AI chat.
				</P>
				<P>
					The personal side will get LiteLLM, which routes local or cloud models into my coding agents. Forgejo will hold my private git; public repos stay on GitHub. Coolify will host my own small apps, and there will be a status dashboard.
				</P>

				<H2>The rules</H2>
				<P>
					These are the rules I set for it. The storage box stores and runs no apps. The family apps sit in their own zone and can reach only what they serve. The AI machine can reach only the shares and ports it needs, and the agent cannot reach the family&apos;s devices.
				</P>
				<P>
					Local models come first, with a cloud model as the fallback. Only photos and files are treated as durable. Downloaded media is not backed up. There is no off-site backup. That is my choice, and I know the risk.
				</P>

				<H2>Where it stands</H2>
				<P>
					The agent runs on a laptop, and I message it from my phone. My devices are already on the private network. Nothing else runs yet.
				</P>
				<P>
					I have the small server and the storage drives. The network gear, the storage box and the power backup unit are still to come. The Mac Studio is on order.
				</P>
				<P>
					When the Mac Studio arrives, it will take over the agent and the local models. Then the rack, network, storage and services go in. After that come a status dashboard for everything, voice control answered by a local model, and monitoring. The 3D printer comes later.
				</P>
				<P>
					Version 1 is done when every core service is reachable from my phone over the private network and one test restore from the second copy of photos and files has worked. After that it is upkeep and add-ons.
				</P>

				<FactList facts={facts} />

				<CaseStudyFooter
					links={links}
					next={{ name: "Trading engine", href: "/trading-engine", detail: "Tests trading ideas overnight, with rules set before the results come in" }}
				/>
			</Container>
		</Layout>
	);
}
