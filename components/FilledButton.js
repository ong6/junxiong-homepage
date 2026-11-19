// The site's one filled button (STYLE.md, Ornaments: the primary action):
// accent fill, paper or ink label, the 4px control radius, 44px tall. Used for
// Email me on Contact and Download PDF on the résumé. Renders a link; a
// caller's CSS-module class (className) sets its spacing.
export default function FilledButton({ children, className, ...props }) {
	return (
		<a className={className ? `ui-button filled-button ${className}` : "ui-button filled-button"} {...props}>
			{children}
		</a>
	);
}
