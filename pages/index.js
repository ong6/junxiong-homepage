import NextImage from "next/image";
import NextLink from "next/link";
import Layout from "../components/layouts/Articles";
import SelectedWork from "../components/SelectedWork";
import OutArrow from "../components/OutArrow";
import { Eyebrow, LANDING_TITLE } from "../components/ArticleParts";
import styles from "../styles/Home.module.css";

function Introduction() {

	return (
		<header id="about" className={styles.intro}>
			<Eyebrow className="hero-rise">JUNXIONG.DEV / SINGAPORE</Eyebrow>

			<div className={styles.hero}>
				<div className={styles.copy}>
					<h1 className={`ui-heading hero-settle ${LANDING_TITLE} ${styles.h1}`}>Ong Jun Xiong</h1>
					<p className={`hero-rise ${styles.lede}`} style={{ "--i": 2 }}>
						I&apos;m a software engineer at TikTok in Singapore, working on AI{" "}
						<span className={styles.nowrap}>infrastructure.</span>
					</p>
					<p className={`hero-rise ${styles.body}`} style={{ "--i": 3 }}>
						Most of my work is Go backends and distributed systems. I like taking
						something from zero to one, and then from one to a hundred. Outside work I ran{" "}
						<NextLink href="/compoze" className="ui-link">
							Compoze
						</NextLink>
						, a small company I sold to a client in 2025. Below is what I build in my own time.
					</p>
				</div>

				<div className={styles.portrait}>
					<div className={`portrait-frame ${styles.frame}`}>
						<NextImage
							src="/images/junxiong.webp"
							alt="Ong Jun Xiong, AI infrastructure engineer in Singapore"
							width={768}
							height={768}
							preload
							sizes="(max-width: 767px) 126px, 284px"
							style={{
								width: "100%",
								height: "auto",
								aspectRatio: "4 / 3",
								objectFit: "cover",
								objectPosition: "center 28%",
							}}
						/>
						<div className={styles.caption}>
							<p>JX / 2026</p>
							<p className={styles.place}>SINGAPORE</p>
						</div>
					</div>
				</div>

				<div className={`hero-rise ${styles.links}`} style={{ "--i": 4 }}>
					<a
						href="https://github.com/ong6"
						target="_blank"
						rel="noopener noreferrer"
						className={`ui-link ${styles.utility}`}>
						GitHub <OutArrow newTab className={styles.arrow} />
					</a>
					<a
						href="https://www.linkedin.com/in/junx6/"
						target="_blank"
						rel="noopener noreferrer"
						className={`ui-link ${styles.utility}`}>
						LinkedIn <OutArrow newTab className={styles.arrow} />
					</a>
					<NextLink href="/resume" className={`ui-link ${styles.utility}`}>
						Resume <OutArrow className={styles.arrow} />
					</NextLink>
				</div>
			</div>
		</header>
	);
}

export default function Home() {
	return (
		<Layout animate={false}>
			<Introduction />
			<SelectedWork />
		</Layout>
	);
}
