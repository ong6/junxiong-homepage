import Image from "next/image";
import { Fragment, useEffect, useRef, useState, useSyncExternalStore } from "react";
import FactList from "./FactList";
import { TriangleUpIcon } from "./icons";
import OutArrow from "./OutArrow";
import styles from "../styles/Archive.module.css";

// One row of the Archive ledger (/works): a native disclosure whose closed
// state is the ledger line (thumbnail, title, tag, one-line summary) and whose
// open state is the entry itself: its paragraph, its facts and its media, in
// the 680px measure. `id` is the slug, so /works#<slug> lands on the row even
// without script; pages/works.js opens it from the hash.
//
// Media mounts only once the row has been opened, so the list downloads its
// 14 thumbnails and nothing else. Embeds unmount again on close, so a playing
// video never carries on behind a closed row.

const MEASURE = 680;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeToMotion = (onChange) => {
	const query = window.matchMedia(REDUCED_MOTION);
	query.addEventListener("change", onChange);
	return () => query.removeEventListener("change", onChange);
};
const usePrefersReducedMotion = () =>
	useSyncExternalStore(
		subscribeToMotion,
		() => window.matchMedia(REDUCED_MOTION).matches,
		() => false,
	);

// The entry's links, platform and stack as fact rows; labels used twice
// ("Featured on") share one row.
function factsFor(entry) {
	const rows = [["Dates", entry.dateRange]];
	for (const item of entry.meta) {
		let row = rows.find(([label]) => label === item.label);
		if (!row) {
			row = [item.label, []];
			rows.push(row);
		}
		row[1].push(item);
	}
	return rows.map(([label, items]) =>
		typeof items === "string"
			? [label, items]
			: [
					label,
					items.every((item) => !item.href)
						? items.map((item) => item.text).join(" · ")
						: items.map((item, i) => (
								<Fragment key={item.text}>
									{i ? " · " : ""}
									<FactValue item={item} />
								</Fragment>
							)),
				],
	);
}

function FactValue({ item }) {
	if (!item.href) return item.text;
	return (
		<a href={item.href} target="_blank" rel="noopener noreferrer" className={`ui-link ${styles.factLink}`}>
			{item.text}
			<OutArrow newTab className={styles.arrow} />
		</a>
	);
}

// Screenshots never render above their own pixels, nor taller than 80% of
// the window (one dashboard is a 2250×3997 page capture).
function Shot({ block }) {
	const ratio = block.width / block.height;
	return (
		<div className={`${styles.shot} ${styles.dim}`} style={{ maxWidth: `min(${block.width}px, calc(80vh * ${ratio.toFixed(4)}))` }}>
			<Image
				src={block.src}
				alt={block.alt}
				width={block.width}
				height={block.height}
				sizes={`(max-width: ${MEASURE + 40}px) 100vw, ${Math.min(block.width, MEASURE)}px`}
				unoptimized={block.animated}
				style={{ display: "block", width: "100%", height: "auto" }}
			/>
		</div>
	);
}

// A short silent screen recording: plays muted and looped while its row is
// open, unless the reader prefers reduced motion, when the poster waits
// behind a play control.
function Recording({ block, open }) {
	const ref = useRef(null);
	const reducedMotion = usePrefersReducedMotion();
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		const video = ref.current;
		if (!video) return undefined;
		if (open && !reducedMotion) video.play().catch(() => {});
		else video.pause();
		return () => video.pause();
	}, [open, reducedMotion]);

	return (
		<div className={styles.recording} style={{ maxWidth: `${block.width}px` }}>
			<video
				ref={ref}
				muted
				loop
				playsInline
				preload="metadata"
				poster={block.poster}
				aria-label={block.alt}
				onPlay={() => setPlaying(true)}
				onPause={() => setPlaying(false)}
				className={`${styles.video} ${styles.dim}`}
				style={{ aspectRatio: `${block.width} / ${block.height}` }}>
				<source src={block.webm} type="video/webm" />
				<source src={block.src} type="video/mp4" />
			</video>
			{reducedMotion && !playing && (
				<div className={styles.playWrap}>
					<button type="button" onClick={() => ref.current?.play()} className={`ui-button ${styles.play}`}>
						<span className={styles.playIcon}>
							<TriangleUpIcon className={styles.playGlyph} aria-hidden="true" focusable={false} />
						</span>
						Play recording
					</button>
				</div>
			)}
		</div>
	);
}

// A YouTube embed URL maps straight onto its watch URL; Figma blocks carry
// an explicit `href`.
const watchUrl = (src) => {
	const id = src.split("/embed/")[1]?.split(/[?&]/)[0];
	return id ? `https://www.youtube.com/watch?v=${id}` : src;
};

function Embed({ block }) {
	const youtube = block.type === "youtube";
	return (
		<div className={styles.embed}>
			<div className={styles.frame}>
				<iframe
					title={block.title}
					src={block.src}
					loading="lazy"
					allowFullScreen
					{...(youtube && {
						allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
						referrerPolicy: "strict-origin-when-cross-origin",
					})}
				/>
			</div>
			<p className={styles.embedLink}>
				<a href={youtube ? watchUrl(block.src) : block.href} target="_blank" rel="noopener noreferrer" className={`ui-link ${styles.outLink}`}>
					{youtube ? "Watch on YouTube" : "Open in Figma"}
					<OutArrow newTab className={styles.arrow} />
				</a>
			</p>
		</div>
	);
}

function Media({ block, open }) {
	if (block.type === "image") return <Shot block={block} />;
	if (block.type === "video") return <Recording block={block} open={open} />;
	return open ? <Embed block={block} /> : null;
}

export default function ArchiveEntry({ id, entry, open, onToggle }) {
	// Mount media on the first open and keep it, so closing animates the
	// whole panel shut instead of collapsing it first.
	const [loaded, setLoaded] = useState(open);
	if (open && !loaded) setLoaded(true);

	return (
		<details id={id} className={styles.entry} open={open} onToggle={(event) => onToggle(id, event.currentTarget.open)}>
			<summary className={styles.summary}>
				{/* A 16:9 frame (64×36, 80×45) to match the screenshots, which
				    fill it; logos with their own background stay contained.
				    Framed, and dimmed in dark mode like the screenshots. */}
				<div className={`${styles.thumb} ${styles.dim}`} style={entry.thumbnail.background ? { background: entry.thumbnail.background } : undefined}>
					<Image
						src={entry.thumbnail.src}
						alt=""
						fill
						sizes="80px"
						style={{
							objectFit: entry.thumbnail.background ? "contain" : "cover",
							padding: entry.thumbnail.padding || "0",
						}}
					/>
				</div>
				<div className={styles.heading}>
					<div className={styles.titleRow}>
						<h3 className={styles.title}>{entry.title}</h3>
						{entry.note && <p className={styles.note}>{entry.note}</p>}
					</div>
					<p className={styles.summaryText}>{entry.summary}</p>
				</div>
				<span className={styles.marker} aria-hidden="true" />
			</summary>
			<div className={styles.panel}>
				<p className={styles.body}>{entry.body}</p>
				<FactList facts={factsFor(entry)} className={styles.facts} />
				{loaded && (
					<div className={styles.media}>
						{entry.showcase.map((block) => (
							<Media key={block.src} block={block} open={open} />
						))}
					</div>
				)}
			</div>
		</details>
	);
}
