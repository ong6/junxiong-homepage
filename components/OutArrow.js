// The ↗ on every link that goes somewhere, on the site or off it. The glyph
// sits in a clipped box so the hover animation can fly it out of the corner
// and back in (styles/globals.css). ← and → stay only where they mean a
// direction: back links, previous/next, swipe hints.
//
//   newTab    – the link opens a new tab: say so to a screen reader, once,
//               here, so no link forgets it.
//   className – spacing, size or colour from the caller's CSS module.
export default function OutArrow({ newTab = false, className }) {
	return (
		<>
			<span data-out-arrow aria-hidden="true" className={className}>
				<span>↗</span>
			</span>
			{newTab && <span className="visually-hidden"> (opens in a new tab)</span>}
		</>
	);
}
