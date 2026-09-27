import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { flushSync } from "react-dom";
import { withPaintTransition } from "uipack/web";

// The new theme pours down the page as paint (UI Pack's withPaintTransition);
// without view transitions or under reduced motion it switches at once.
const ThemeToggleButton = () => {
	const { toggleColorMode } = useColorMode();

	const onClick = () => withPaintTransition(() => flushSync(toggleColorMode));

	return (
		<IconButton
			aria-label={useColorModeValue("Use dark theme", "Use light theme")}
			colorScheme="mint"
			variant="ghost"
			minW="44px"
			h="44px"
			icon={useColorModeValue(
				<MoonIcon key="moon" className="theme-icon" />,
				<SunIcon key="sun" className="theme-icon" />,
			)}
			onClick={onClick}
		/>
	);
};

export default ThemeToggleButton;
