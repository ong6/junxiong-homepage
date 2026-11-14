import { IconButton, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { flushSync } from "react-dom";
import { useThemeToggle } from "../lib/themeChoice";
import { withThemeTransition } from "../lib/themeTransition";

// The new theme prints in through the site's dot screen (lib/themeTransition.js);
// without view transitions or under reduced motion it switches at once.
// Both icons are in the HTML and CSS shows the theme's (styles/globals.css),
// so a dark visit never paints the moon first.
const ThemeToggleButton = () => {
	const toggle = useThemeToggle();

	const onClick = () => withThemeTransition(() => flushSync(toggle));

	return (
		<IconButton
			aria-label={useColorModeValue("Use dark theme", "Use light theme")}
			variant="ghost"
			color="brand.solid"
			_hover={{ bg: "surface.quiet" }}
			_active={{ bg: "surface.quiet" }}
			minW="44px"
			h="44px"
			icon={
				<>
					<MoonIcon className="theme-icon theme-light-only" />
					<SunIcon className="theme-icon theme-dark-only" />
				</>
			}
			onClick={onClick}
		/>
	);
};

export default ThemeToggleButton;
