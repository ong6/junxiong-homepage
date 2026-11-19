import { flushSync } from "react-dom";
import { MoonIcon, SunIcon } from "./icons";
import { useTheme, useThemeToggle } from "../lib/themeChoice";
import { withThemeTransition } from "../lib/themeTransition";
import styles from "./ThemeToggleButton.module.css";

// The new theme prints in through the site's dot screen (lib/themeTransition.js);
// without view transitions or under reduced motion it switches at once.
// Both icons are in the HTML and CSS shows the theme's (styles/globals.css),
// so a dark visit never paints the moon first.
const ThemeToggleButton = () => {
	const theme = useTheme();
	const toggle = useThemeToggle();

	const onClick = () => withThemeTransition(() => flushSync(toggle));

	return (
		<button
			type="button"
			className={`ui-button ${styles.toggle}`}
			aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}
			onClick={onClick}>
			<MoonIcon className="theme-icon theme-light-only" />
			<SunIcon className="theme-icon theme-dark-only" />
		</button>
	);
};

export default ThemeToggleButton;
