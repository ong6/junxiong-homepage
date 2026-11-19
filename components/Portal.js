import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

// Renders its children into a <div> at the end of <body>, once the page is
// live (nothing on the server), so no transformed ancestor becomes their
// containing block and no clipped one cuts them off.
// Layout effect in the browser (the node exists before paint); a plain effect
// on the server, where neither runs.
const useClientLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Portal({ children }) {
	const [node, setNode] = useState(null);
	useClientLayoutEffect(() => {
		const host = document.createElement("div");
		host.className = "portal";
		document.body.appendChild(host);
		setNode(host);
		return () => host.remove();
	}, []);
	return node ? createPortal(children, node) : null;
}
