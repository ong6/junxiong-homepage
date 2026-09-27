import { useColorMode } from "@chakra-ui/react";
import { ObjectScene } from "uipack/objects";
import { hobbyScenePalettes } from "../lib/theme";
import { useIdleAfterLoad } from "../lib/useIdleAfterLoad";

// UI Pack owns geometry, playback, fallbacks and framing. This maps the site
// theme, and holds the scene inactive until the page has loaded and gone
// idle, so building the WebGL scene never competes with first render.
export default function HobbyScene({ controls = "playback", active = true, ...props }) {
	const { colorMode } = useColorMode();
	const idle = useIdleAfterLoad();
	return (
		<ObjectScene
			{...props}
			active={active && idle}
			controls={controls}
			surface="page"
			theme={colorMode}
			palette={hobbyScenePalettes[colorMode]}
		/>
	);
}
