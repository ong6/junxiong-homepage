import { useColorMode } from "@chakra-ui/react";
import { ObjectScene } from "uipack/objects";
import { useIdleAfterLoad } from "../lib/useIdleAfterLoad";

// UiPack owns geometry, playback, fallbacks and framing, and draws every
// subject in its one style, ink line art, in the page's own paper, ink and
// accent (styles/globals.css sets them on .uipack-object). This maps the site
// theme, and holds the scene inactive until the page has loaded and gone
// idle, so building the WebGL scene never competes with first render.
// `preload` builds a scene and paints its first frame before it is active
// (a page sets it on the scenes near the viewport).
export default function HobbyScene({ controls = "playback", active = true, preload = false, ...props }) {
	const { colorMode } = useColorMode();
	const idle = useIdleAfterLoad();
	return (
		<ObjectScene
			{...props}
			active={active && idle}
			preload={preload && idle}
			controls={controls}
			surface="page"
			theme={colorMode}
		/>
	);
}
