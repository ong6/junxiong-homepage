import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ThemeToggleButton = () => {
	const { toggleColorMode } = useColorMode();

	return (
		<IconButton
			aria-label={useColorModeValue("Use dark theme", "Use light theme")}
			colorScheme="teal"
			variant="ghost"
			minW="44px"
			h="44px"
			icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
			onClick={toggleColorMode}
		/>
	);
};

export default ThemeToggleButton;
