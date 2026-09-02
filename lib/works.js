// Single source of truth for the /works/<slug> detail pages.
//
// Each entry drives pages/works/[slug].js. Shape:
//   title        – <Layout> title (site suffix is appended by the layout)
//   description  – <Layout> meta description
//   heading      – the on-page <Title> text
//   dateRange    – the <Badge> beside the heading
//   body         – the intro paragraph
//   meta         – rows of the definition list; `href` makes the value a link
//   showcase     – ordered blocks rendered under "Project Showcase"
//                  { type: "image", src, alt, width, height }
//                  { type: "figma", title, src, height }
//                  { type: "youtube", title, src, height }
//
// Image width/height are the real pixel dimensions of the file in
// public/images/works, required by next/image for static /public sources.

const works = {
	codeparty: {
		title: "CodeParty",
		description:
			"CodeParty is an interview-prep platform that pairs peers on coding questions in real time, with a shared question repository.",
		heading: "CodeParty",
		dateRange: "Aug 2023 - Nov 2023",
		body: "CodeParty pairs you with a peer and a coding question, in a shared editor, in real time. Practicing interviews alone is easy to put off; booking a session with another person is not. We built it for CS3219 as a set of microservices so each part — matching, collaboration, the question bank — could be deployed and replaced on its own.",
		meta: [
			{
				label: "Figma",
				text: "Figma",
				href: "https://www.figma.com/file/rWDRhrZmCD2SsVzisNQHH6/PeerPrep?type=design&node-id=1509-1035&mode=design&t=0ueA4Qsn7kLyWJzQ-0",
			},
			{
				label: "Presentation Slides",
				text: "Google Slides",
				href: "https://docs.google.com/presentation/d/1CbiiCUi9Sq9yVgMjhTKZeJQ3E5jKd1cQE_3clSYkWiY/edit?usp=sharing",
			},
			{
				label: "Documentation",
				text: "Docs",
				href: "https://docs.google.com/document/d/1sb4gFP5xFQs2hCUGsVNRfetcjbK61MfjpuwXIqnWCac/edit?usp=sharing",
			},
			{ label: "Platform", text: "Online website" },
			{
				label: "Stack",
				text: "Next.js, TailwindCSS, Express.js, Node.js, Vercel",
			},
		],
		showcase: [
			{
				type: "image",
				src: "/images/works/codeparty_03.webp",
				alt: "CodeParty collaborative coding workspace",
				width: 1662,
				height: 1024,
			},
			{
				type: "image",
				src: "/images/works/codeparty_02.png",
				alt: "CodeParty question library",
				width: 1659,
				height: 1259,
			},
		],
	},

	nusconnect: {
		title: "NUS Connect",
		description:
			"NUSConnect is a custom LMS for NUS students and teaching assistants, with a forum, a quiz system and gamified rewards.",
		heading: "NUSConnect",
		dateRange: "May 2021 - Aug 2021",
		body: "A custom learning management system for NUS students and teaching assistants, built around a forum and a quiz system. Completing quizzes earns rewards, which sounds gimmicky until you watch how much more students post when there is a streak to protect.",
		meta: [
			{
				label: "Website",
				text: "https://nus-connect.vercel.app/",
				href: "https://nus-connect.vercel.app/",
			},
			{
				label: "Documentation",
				text: "https://notawakestudio.github.io/NUSConnect-Docs/",
				href: "https://notawakestudio.github.io/NUSConnect-Docs/",
			},
			{
				label: "Presentation",
				text: "What is NUS Connect?",
				href: "https://www.youtube.com/watch?v=lYMwwFo2hoU",
			},
			{
				label: "Award",
				text: "Achieved Artemis (Extreme) in Orbital",
				href: "https://credentials.nus.edu.sg/a2be1551-4093-4a45-850d-570cd13f5437",
			},
			{ label: "Platform", text: "Web" },
			{
				label: "Stack",
				text: "Next.js, Typescript, TailwindCSS, ChakraUI, Firebase, Flask, Jest",
			},
			{
				label: "Source",
				text: "github.com/notawakestudio/NUSConnect",
				href: "https://github.com/notawakestudio/NUSConnect",
			},
		],
		showcase: [
			{
				type: "image",
				src: "/images/works/nusconnect_02.png",
				alt: "NUSConnect course forum",
				width: 1024,
				height: 256,
			},
			{
				type: "youtube",
				title: "NUSConnect product demonstration",
				src: "https://www.youtube.com/embed/5p1V0kUZNzQ",
				height: 400,
			},
			{
				type: "image",
				src: "/images/works/nusconnect_01.webp",
				alt: "NUSConnect learning dashboard",
				width: 1985,
				height: 1058,
			},
		],
	},

	imposter: {
		title: "imPoster",
		description:
			"imPoster is a desktop app for exploring, testing and building APIs, aimed at people new to API development.",
		heading: "imPoster",
		dateRange: "Feb 2021 - April 2021",
		body: "imPoster is a desktop app for people new to API development. Point it at an endpoint and send requests — explore, test, or build your own APIs without wading through a professional tool’s settings first. The interface is deliberately minimal.",
		meta: [
			{
				label: "Documentation",
				text: "https://ay2021s2-cs2103t-t12-4.github.io/tp/",
				href: "https://ay2021s2-cs2103t-t12-4.github.io/tp/",
			},
			{
				label: "Source",
				text: "github.com/ong6/imposter",
				href: "https://github.com/AY2021S2-CS2103T-T12-4/tp",
			},
			{ label: "Platform", text: "Windows, Mac, Linux" },
			{ label: "Stack", text: "Java, CSS, Shell, Gradle" },
		],
		showcase: [
			{
				type: "image",
				src: "/images/works/imposter_02.webp",
				alt: "imPoster API request workspace",
				width: 1874,
				height: 1474,
			},
			{
				type: "image",
				src: "/images/works/imposter_03.png",
				alt: "imPoster API response viewer",
				width: 1185,
				height: 630,
			},
		],
	},

	fintechwebsite: {
		title: "NUS Fintech Website",
		description:
			"The NUS Fintech Society website: blockchain and machine learning research, projects and events for over 200 members.",
		heading: "NUS Fintech Website",
		dateRange: "Nov 2020 - Jan 2021",
		body: "NUS FinTech Society is a School of Computing club that does blockchain and machine learning research, with over 200 members. I built the society’s website — the public face for its projects, events, and team.",
		meta: [
			{
				label: "Website",
				text: "https://fintechsociety.comp.nus.edu.sg/",
				href: "https://fintechsociety.comp.nus.edu.sg/",
			},
			{ label: "Platform", text: "Web" },
			{ label: "Stack", text: "React, SCSS, Flask, Javascript " },
		],
		showcase: [
			{
				type: "image",
				src: "/images/works/fintechwebsite_01.png",
				alt: "NUS FinTech Society homepage",
				width: 1612,
				height: 773,
			},
			{
				type: "image",
				src: "/images/works/fintechwebsite_02.png",
				alt: "NUS FinTech Society project showcase",
				width: 1979,
				height: 913,
			},
		],
	},

	abcdao: {
		title: "ABCDAO",
		description:
			"ABCDAO is a decentralized autonomous organization for NUS Fintech's Blockchain Department, with an ERC20 governance token and on-chain voting.",
		heading: "$ABCDao",
		dateRange: "Aug 2021 - Dec 2021",
		body: "We turned the NUS Fintech Society’s Blockchain Department into a DAO: members vote on every major decision on-chain, weighted by an ERC20 governance token we issued called ABCDao. A student club is a fun place to test governance ideas — the stakes are low and the politics are real.",
		meta: [
			{
				label: "Website",
				text: "https://nus-fintech-society.github.io/BC_DAO_frontend/#/",
				href: "https://nus-fintech-society.github.io/BC_DAO_frontend/#/",
			},
			{
				label: "Source",
				text: "https://github.com/NUS-Fintech-Society/BC_DAO_frontend",
				href: "https://github.com/NUS-Fintech-Society/BC_DAO_frontend",
			},
			{
				label: "Presentation",
				text: "Blockchain DAO Project Showcase",
				href: "https://fintechlab.nus.edu.sg/nus-fintech-society-blockchain-department-project-showcase/",
			},
			{ label: "Platform", text: "Web3, Requires MetaMask" },
			{
				label: "Stack",
				text: "React, tailwindCSS, Solidity, Javascript, ethers ",
			},
		],
		showcase: [
			{
				type: "image",
				src: "/images/works/abcdao_01.png",
				alt: "ABCDAO governance homepage",
				width: 1335,
				height: 771,
			},
			{
				type: "image",
				src: "/images/works/abcdao_02.png",
				alt: "ABCDAO proposal voting interface",
				width: 1352,
				height: 709,
			},
		],
	},

	dexdao: {
		title: "The DEX DAO",
		description:
			"The DEX DAO is a token project for decentralized exchange traders, launched with an airdrop to every trader from 2021.",
		heading: "The DEX DAO",
		dateRange: "Dec 2021 - Jan 2022",
		body: "$DEX was a token experiment for the decentralized-exchange crowd. We airdropped it to every wallet that traded on a DEX in 2021 — the simplest honest definition of “the community” we could find.",
		meta: [
			{
				label: "Twitter",
				text: "@The_DexDAO",
				href: "https://twitter.com/The_DexDAO",
			},
			{ label: "Platform", text: "Web3 (Metamask needed)" },
			{
				label: "Stack",
				text: "Next.js, TailwindCSS, Solidity, Etherscan, Alchemy, Node.js, Vercel",
			},
		],
		showcase: [
			{
				type: "image",
				src: "/images/works/dexdao_03.png",
				alt: "The Dex DAO homepage",
				width: 1600,
				height: 900,
			},
			{
				type: "image",
				src: "/images/works/dexdao_02.webp",
				alt: "The Dex DAO token dashboard",
				width: 2250,
				height: 3997,
			},
		],
	},

	youtubehandsfree: {
		title: "Youtube Handsfree",
		description:
			"Youtube Handsfree is a computer vision Chrome extension that controls YouTube playback with hand signs.",
		heading: "Youtube Handsfree",
		dateRange: "Nov 2020 - Nov 2020",
		body: "A computer-vision system that tracks your hand through the webcam and maps signs to YouTube controls: pause, seek, volume. Built in a two-day hackathon, mostly to see if it could be done.",
		meta: [
			{
				label: "Source",
				text: "github.com/ong6/youtube-handsfree",
				href: "https://github.com/ong6/youtube-handsfree",
			},
			{ label: "Platform", text: "Web (Chrome Extension)" },
			{ label: "Stack", text: "Javascript " },
		],
		showcase: [
			{
				type: "image",
				src: "/images/works/handsfree_01.webp",
				alt: "YouTube Handsfree gesture controls in action",
				width: 480,
				height: 244,
			},
		],
	},

	vitalvision: {
		title: "Vital Vision",
		description:
			"Vital Vision is VR rehabilitation for post-stroke patients, with a dashboard that lets clinicians monitor progress.",
		heading: "Vital Vision",
		dateRange: "Jan 2023 - Aug 2023",
		body: "VR rehabilitation for post-stroke patients, aimed at the gap between hospital discharge and community care, where guided recovery work often stops. Patients run their exercises inside an immersive environment; clinicians follow progress on a dashboard and adjust the program from there.",
		meta: [
			{
				label: "Website",
				text: "https://semperstroke-dashboard.vercel.app/landing",
				href: "https://semperstroke-dashboard.vercel.app/landing",
			},
			{
				label: "Featured on: ",
				text: "Instagram",
				href: "https://www.instagram.com/p/CxaKYDbBjTK/?img_index=1",
			},
			{
				label: "Featured on:",
				text: "NUS Official Website",
				href: "https://www.comp.nus.edu.sg/news/2023-medical-grand-challenge/",
			},
			{
				label: "Platform",
				text: "Online website, Health Tech, Game - VR",
			},
			{
				label: "Stack",
				text: "Next.js, TailwindCSS, Node.js, Vercel, Unity, Oculus Quest 2",
			},
		],
		showcase: [
			{
				type: "image",
				src: "/images/works/vitalvision_02.webp",
				alt: "Vital Vision clinician dashboard",
				width: 1280,
				height: 900,
			},
		],
	},

	markup: {
		title: "Markup",
		description:
			"Markup is an AI web app that generates exam questions and auto-grades the responses.",
		heading: "Markup",
		dateRange: "June 2023 - Aug 2023",
		body: "Markup generates exam questions on demand and grades the answers instantly. Teachers skip writing and marking papers by hand; students get an unlimited supply of practice questions whatever school they are from, plus per-question data on where a class is actually struggling.",
		meta: [
			{
				label: "Presentation Slides",
				text: "Google Slides",
				href: "https://docs.google.com/presentation/d/1Sp1yHuupdsB_QyIpKAaQisAKY6uAZsAiop0jfxhgaUM/edit?usp=sharing",
			},
			{ label: "Platform", text: "Online website, AI" },
			{
				label: "Stack",
				text: "Next.js, TailwindCSS, Node.js, Vercel, Open AI",
			},
		],
		showcase: [
			{
				type: "image",
				src: "/images/works/markup_01.png",
				alt: "Markup question-generation interface",
				width: 1200,
				height: 386,
			},
		],
	},

	amuze: {
		title: "Amuze",
		description:
			"Amuze is an NFT museum platform where collectors list historical assets and others discover them.",
		heading: "A-Muze",
		dateRange: "Dec 2021 - Jan 2022",
		body: "First Runner-up at NUS Fintech Month Hackathon 2022 (10k prize). Amuze is a digital museum: collectors list historical pieces as NFTs, and anyone can walk the collection from anywhere. The pitch was that a lot of history sits unseen in private hands. I built the full stack.",
		meta: [
			{
				label: "Website",
				text: "https://amuze.vercel.app/",
				href: "https://amuze.vercel.app/",
			},
			{
				label: "Presentation Slides",
				text: "https://docs.google.com/presentation/d/1ELMGX2O2zSgMe_jo-t0f0Val5YJ7-Qlv/edit?usp=sharing&ouid=118156243590926955681&rtpof=true&sd=true",
				href: "https://docs.google.com/presentation/d/1ELMGX2O2zSgMe_jo-t0f0Val5YJ7-Qlv/edit?usp=sharing&ouid=118156243590926955681&rtpof=true&sd=true",
			},
			{
				label: "Platform",
				text: "Online website, Web3 (Metamask needed)",
			},
			{
				label: "Stack",
				text: "Next.js, TailwindCSS, Solidity, Etherscan, Alchemy, Node.js, Vercel",
			},
		],
		showcase: [
			{
				type: "image",
				src: "/images/works/amuze_03.png",
				alt: "A-Muze digital museum landing page",
				width: 1280,
				height: 960,
			},
			{
				type: "image",
				src: "/images/works/amuze_01.png",
				alt: "A-Muze collection gallery",
				width: 468,
				height: 263,
			},
			{
				type: "image",
				src: "/images/works/amuze_02.png",
				alt: "A-Muze NFT collection details",
				width: 914,
				height: 567,
			},
		],
	},

	squeezy: {
		title: "Project Squeezy",
		description:
			"Project Squeezy is a smart stress ball that reports stress levels over Bluetooth to a React Native app.",
		heading: "Project Squeezy",
		dateRange: "Nov 2021 - Jan 2022",
		body: "First Runner-up at NUS Makerthon 2022 (3K prize). Squeezy is a smart stress ball — hardware plus software — with a companion app that tracks your stress levels over time. I built the React Native app and the Bluetooth link between the app and the ball.",
		meta: [
			{
				label: "Website",
				text: "https://linktr.ee/projectsqueezy",
				href: "https://linktr.ee/projectsqueezy",
			},
			{
				label: "Poster",
				text: "Project Squeezy Poster",
				href: "https://i.imgur.com/ZZ92PxS.jpg",
			},
			{
				label: "Showcase Booth",
				text: "View us at Makerbooth 2022!",
				href: "https://uvents.nus.edu.sg/event/make2022/module/MAK2022/project/16",
			},
			{ label: "Platform", text: "Android, Physical" },
			{ label: "Stack", text: "ReactNative, Arduino Nano 33 IoT" },
			{
				label: "Source",
				text: "github.com/ong6/squeezy_app",
				href: "https://github.com/ong6/squeezy_app",
			},
		],
		showcase: [
			{
				type: "image",
				src: "/images/works/squeezy_04.png",
				alt: "Project Squeezy companion app",
				width: 1280,
				height: 899,
			},
			{
				type: "youtube",
				title: "Project Squeezy demonstration",
				src: "https://www.youtube.com/embed/nHkiPQZP4-U",
				height: 400,
			},
			{
				type: "image",
				src: "/images/works/squeezy_02.png",
				alt: "Project Squeezy stress history view",
				width: 1280,
				height: 720,
			},
			{
				type: "image",
				src: "/images/works/squeezy_03.png",
				alt: "Project Squeezy Bluetooth pairing flow",
				width: 1280,
				height: 960,
			},
		],
	},

	covalent: {
		title: "Covalent",
		description:
			"Covalent is a social media manager app dashboard designed for video producers as a solo CS3240 interactive design project.",
		heading: "Covalent",
		dateRange: "March 2022 - April 2022",
		body: "A solo project for CS3240 (Interactive Design). The brief was a social media manager app; I narrowed it to video producers and built the design around a single dashboard. The repository and prototype preserve the full design process, research through evaluation.",
		meta: [
			{
				label: "Source",
				text: "github.com/ong6/covalent",
				href: "https://github.com/ong6/covalent",
			},
			{
				label: "Figma Design Files",
				text: "https://www.figma.com/file/covalent-design",
				href: "https://www.figma.com/file/brRhvhN3In9jbjXjRXK1GO/Covalent?node-id=0%3A1",
			},
			{
				label: "Figma Prototype",
				text: "https://www.figma.com/covanlent-prototype",
				href: "https://www.figma.com/proto/brRhvhN3In9jbjXjRXK1GO/Covalent?page-id=0%3A1&node-id=8%3A170&starting-point-node-id=8%3A170&scaling=scale-down",
			},
			{ label: "Platform", text: "Figma Concept" },
		],
		showcase: [
			// The legacy www.figma.com/embed host is retired; embed.figma.com is
			// the supported one. This file is still public (verified via oEmbed).
			{
				type: "figma",
				title: "Interactive Covalent prototype",
				src: "https://embed.figma.com/proto/brRhvhN3In9jbjXjRXK1GO/Covalent?page-id=0%3A1&node-id=30%3A4415&starting-point-node-id=8%3A170&scaling=scale-down&content-scaling=fixed&embed-host=share",
				height: 600,
			},
			{
				type: "figma",
				title: "Covalent design file",
				src: "https://embed.figma.com/design/brRhvhN3In9jbjXjRXK1GO/Covalent?node-id=0%3A1&embed-host=share",
				height: 600,
			},
			{
				type: "image",
				src: "/images/works/covalent_01.webp",
				alt: "Covalent social media dashboard design",
				width: 1600,
				height: 1200,
			},
		],
	},

	contractme: {
		title: "ContractMe!",
		description:
			"ContractMe! is a marketplace app designed through a full design process from user research to evaluation as a CS3240 project.",
		heading: "ContractMe!",
		dateRange: "February 2022 - April 2022",
		body: "A team project for CS3240 (Interactive Design): take one app through the whole design process, user research to user evaluation. We picked a marketplace for hiring contractors and called it ContractMe. The repository and prototype preserve every stage of that process.",
		meta: [
			{
				label: "Source",
				text: "github.com/ong6/ContractMe",
				href: "https://github.com/ong6/ContractMe",
			},
			{ label: "Platform", text: "Figma Concept" },
		],
		showcase: [
			// The Figma file cOeKMKw3s5ijxGPxupQQDn no longer exists (oEmbed 404),
			// so the two embeds it backed were replaced with the screenshot.
			{
				type: "image",
				src: "/images/works/contractme_01.webp",
				alt: "ContractMe marketplace app screens",
				width: 1600,
				height: 900,
			},
		],
	},

	markbind: {
		title: "Markbind",
		description:
			"Markbind is a static site generator for Markdown-like syntax, used for course sites and documentation. I am a contributor and help maintain it.",
		heading: "Markbind (Contributor)",
		dateRange: "Aug 2021 - Aug 2023",
		body: "A static site generator for content-heavy instructional sites: course pages, tutorials, documentation, textbooks. Markdown-like syntax in, finished website out. I contributed to the repo and helped maintain it from 2021 to 2023.",
		meta: [
			{
				label: "Website",
				text: "https://markbind.org/",
				href: "https://markbind.org/",
			},
			{ label: "Platform", text: "Web" },
			{ label: "Stack", text: "Vue, Javascript " },
			{
				label: "Contributions",
				text: "github.com/ong6/oss-progress-report/blob/main/nus-oss/markbind.md",
				href: "https://github.com/ong6/oss-progress-report/blob/main/nus-oss/markbind.md",
			},
			{
				label: "Source",
				text: "github.com/MarkBind/markbind",
				href: "https://github.com/MarkBind/markbind",
			},
		],
		showcase: [
			{
				type: "image",
				src: "/images/works/markbind_02.png",
				alt: "MarkBind documentation homepage",
				width: 804,
				height: 154,
			},
			{
				type: "image",
				src: "/images/works/markbind_03.png",
				alt: "MarkBind authoring interface",
				width: 1760,
				height: 990,
			},
		],
	},
};

export const workSlugs = Object.keys(works);

export const getWork = (slug) => works[slug] ?? null;

export default works;
