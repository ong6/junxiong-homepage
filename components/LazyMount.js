import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useIdleAfterLoad } from "../lib/useIdleAfterLoad";

// Mounts heavy children (3D galleries) only when they come near the viewport
// and the page has settled, or at once when a deep link points at them
// (`eager`). The placeholder holds their space (height and margins) and
// carries their anchor id, so links land in the right place and nothing
// below shifts when they mount.
export default function LazyMount({ id, minH, my, eager = false, rootMargin = "200px", children }) {
	const ref = useRef(null);
	const idle = useIdleAfterLoad();
	const [near, setNear] = useState(false);
	useEffect(() => {
		if (near || !ref.current) return undefined;
		const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), { rootMargin });
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [near, rootMargin]);
	if (eager || (near && idle)) return children;
	return <Box ref={ref} id={id} minH={minH} my={my} aria-hidden="true" />;
}
