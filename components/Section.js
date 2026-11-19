import styles from "./Section.module.css";

// A short rise on mount via CSS (see .page-rise in globals.css). Reduced-motion
// users get the resting state immediately.
const Section = ({ children, delay = 0 }) => (
	<div className={`page-rise ${styles.section}`} style={{ animationDelay: `${delay}s` }}>
		{children}
	</div>
);

export default Section;
