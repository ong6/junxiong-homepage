import { Portal } from "@chakra-ui/react";
import { DriftingGutters } from "uipack/web";
import "uipack/web-gutters.css";

// UI Pack's drifting grid in the side gutters of article pages. Portalled to
// <body> so the page's entrance transform can't become its containing block;
// the colour comes from --web-gutters-color in styles/globals.css.
export default function SideBackdrop() {
	return (
		<Portal>
			<DriftingGutters contentWidth={1120} top={72} />
		</Portal>
	);
}
