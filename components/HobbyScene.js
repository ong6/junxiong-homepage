import { useColorMode } from "@chakra-ui/react";
import { ObjectScene } from "uipack/objects";
import { hobbyScenePalettes } from "../lib/theme";

// UI Pack owns geometry, playback, fallbacks and framing. This maps the site theme.
export default function HobbyScene(props) {
	const { colorMode } = useColorMode();
	return <ObjectScene {...props} theme={colorMode} palette={hobbyScenePalettes[colorMode]} />;
}
