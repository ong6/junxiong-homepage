import { Box, Button, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { hobbyScenePalettes } from "../lib/theme";
import styles from "../styles/Hobbies.module.css";

const material = (THREE, color, extra = {}) =>
	new THREE.MeshStandardMaterial({ color, roughness: 0.62, metalness: 0.08, ...extra });

const line = (THREE, points, color, opacity = 1) => {
	const geometry = new THREE.BufferGeometry().setFromPoints(
		points.map(([x, y, z = 0]) => new THREE.Vector3(x, y, z)),
	);
	return new THREE.Line(
		geometry,
		new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity }),
	);
};

const buildAi = (THREE, colors) => {
	const group = new THREE.Group();
	const desk = new THREE.Mesh(
		new THREE.BoxGeometry(3.7, 0.16, 2.35),
		material(THREE, colors.muted),
	);
	desk.position.y = -0.95;
	group.add(desk);
	const terminal = new THREE.Mesh(
		new THREE.BoxGeometry(2.05, 1.25, 0.1),
		material(THREE, colors.ink),
	);
	terminal.position.set(-0.55, 0.12, 0);
	group.add(terminal);
	for (let row = 0; row < 5; row += 1) {
		group.add(line(THREE, [[-1.32, 0.5 - row * 0.2, 0.07], [0.02 + (row % 2) * 0.35, 0.5 - row * 0.2, 0.07]], row === 1 ? colors.accent : colors.paper));
	}
	const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 1), material(THREE, colors.accent, { wireframe: true }));
	core.position.set(1.05, 0.12, 0.2);
	group.add(core);
	[[-0.2, 0.82, 0.1], [1.6, 0.72, -0.15], [1.55, -0.55, 0.2]].forEach((point) => {
		const node = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 14), material(THREE, colors.ink));
		node.position.set(...point);
		group.add(node, line(THREE, [[1.05, 0.12, 0.2], point], colors.accent, 0.72));
	});
	group.rotation.x = -0.12;
	group.userData.animate = (time) => {
		core.rotation.x = time * 0.00018;
		core.rotation.y = time * 0.00028;
	};
	return group;
};

const makeRacket = (THREE, colors, side) => {
	const racket = new THREE.Group();
	const frame = new THREE.Mesh(
		new THREE.TorusGeometry(0.92, 0.075, 12, 52),
		material(THREE, side > 0 ? colors.accent : colors.ink),
	);
	frame.scale.x = 0.72;
	frame.position.y = 0.65;
	racket.add(frame);
	const strings = new THREE.Group();
	for (let i = -4; i <= 4; i += 1) {
		const x = i * 0.13;
		const half = Math.sqrt(Math.max(0, 0.72 ** 2 - x ** 2)) * 1.15;
		strings.add(line(THREE, [[x, 0.65 - half, 0], [x, 0.65 + half, 0]], colors.muted, 0.7));
	}
	for (let i = -5; i <= 5; i += 1) {
		const y = 0.65 + i * 0.13;
		const half = Math.sqrt(Math.max(0, 0.92 ** 2 - (y - 0.65) ** 2)) * 0.72;
		strings.add(line(THREE, [[-half, y, 0], [half, y, 0]], colors.muted, 0.7));
	}
	racket.add(strings);
	const handle = new THREE.Mesh(
		new THREE.CylinderGeometry(0.1, 0.13, 1.2, 12),
		material(THREE, side > 0 ? 0x151f1b : colors.accent),
	);
	handle.position.y = -0.78;
	racket.add(handle);
	racket.position.x = side * 0.72;
	racket.rotation.z = side * -0.28;
	racket.rotation.y = side * 0.18;
	return racket;
};

const buildTennis = (THREE, colors) => {
	const group = new THREE.Group();
	group.add(makeRacket(THREE, colors, -1), makeRacket(THREE, colors, 1));
	const ball = new THREE.Mesh(
		new THREE.SphereGeometry(0.3, 24, 24),
		material(THREE, 0xdce85f),
	);
	ball.position.set(0, 1.72, 0.35);
	group.add(ball);
	group.userData.animate = (time) => {
		group.rotation.y = Math.sin(time * 0.00055) * 0.13;
		ball.position.y = 1.62 + Math.sin(time * 0.002) * 0.14;
	};
	return group;
};

const buildTrading = (THREE, colors) => {
	const group = new THREE.Group();
	[
		[-1.2, -0.72, 0.58, 1.4, colors.muted],
		[-0.2, -0.1, 0.82, 1.9, colors.ink],
		[0.9, 0.64, 1.05, 2.35, colors.accent],
	].forEach(([x, y, height, depth, color]) => {
		const step = new THREE.Mesh(new THREE.BoxGeometry(0.82, height, depth), material(THREE, color));
		step.position.set(x, y, 0);
		group.add(step);
	});
	group.add(line(THREE, [[-1.62, -1.15, 1.28], [-0.62, -0.48, 1.28], [0.52, 0.28, 1.28], [1.42, 0.95, 1.28]], colors.accent));
	group.userData.animate = (time) => {
		group.rotation.y = Math.sin(time * 0.00035) * 0.08;
	};
	return group;
};

const buildServer = (THREE, colors) => {
	const group = new THREE.Group();
	const outline = new THREE.Mesh(new THREE.BoxGeometry(3.25, 2.7, 1.7), material(THREE, colors.accent, { wireframe: true }));
	group.add(outline);
	[
		[-0.62, 0.52, 0.42, 1.5, 0.62, 0.18],
		[0.72, -0.22, 0.1, 1.35, 0.72, 0.22],
		[-0.48, -0.82, -0.3, 1.7, 0.28, 0.32],
	].forEach(([x, y, z, w, h, d], index) => {
		const part = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material(THREE, index === 1 ? colors.accent : colors.ink, { wireframe: index !== 1 }));
		part.position.set(x, y, z + index * 0.25);
		group.add(part, line(THREE, [[x, y, z], [x + 0.62, y + 0.62, z + 0.7]], colors.muted, 0.65));
	});
	const memoryLabel = line(THREE, [[-1.62, 1.6, 0], [1.62, 1.6, 0]], colors.accent);
	group.add(memoryLabel);
	group.rotation.x = -0.16;
	group.userData.animate = (time) => {
		group.rotation.y = -0.32 + Math.sin(time * 0.0004) * 0.12;
	};
	return group;
};

const buildTravel = (THREE, colors) => {
	const group = new THREE.Group();
	const map = new THREE.Mesh(new THREE.PlaneGeometry(3.9, 2.8), material(THREE, colors.paper));
	group.add(map);
	const routePoints = [[-1.45, -0.78, 0.06], [-0.72, -0.25, 0.06], [-0.2, 0.25, 0.06], [0.55, 0.02, 0.06], [1.42, 0.72, 0.06]];
	group.add(line(THREE, routePoints, colors.accent));
	routePoints.forEach(([x, y, z], index) => {
		const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, index === 2 ? 0.5 : 0.3, 12), material(THREE, index === 2 ? colors.accent : colors.ink));
		pin.position.set(x, y, z + (index === 2 ? 0.25 : 0.15));
		pin.rotation.x = Math.PI / 2;
		group.add(pin);
	});
	[[-1.35, 0.62], [0.32, -0.72], [1.2, -0.38]].forEach(([x, y], index) => {
		const block = new THREE.Mesh(new THREE.BoxGeometry(0.38 + index * 0.08, 0.32, 0.34 + index * 0.12), material(THREE, colors.muted));
		block.position.set(x, y, 0.2);
		group.add(block);
	});
	group.rotation.x = -0.72;
	group.userData.animate = (time) => {
		group.rotation.z = Math.sin(time * 0.0003) * 0.025;
	};
	return group;
};

const buildReading = (THREE, colors) => {
	const group = new THREE.Group();
	const left = new THREE.Mesh(new THREE.BoxGeometry(1.72, 2.25, 0.12), material(THREE, colors.paper));
	const right = left.clone();
	left.position.x = -0.88;
	right.position.x = 0.88;
	left.rotation.y = -0.2;
	right.rotation.y = 0.2;
	group.add(left, right);
	for (let row = 0; row < 7; row += 1) {
		const y = 0.72 - row * 0.22;
		group.add(line(THREE, [[-1.52, y, 0.11], [-0.28 - (row % 3) * 0.12, y, 0.11]], row === 0 ? colors.accent : colors.muted, 0.8));
		group.add(line(THREE, [[0.28, y, 0.11], [1.52 - (row % 2) * 0.2, y, 0.11]], colors.muted, 0.8));
	}
	group.rotation.x = -0.35;
	group.userData.animate = (time) => {
		left.rotation.y = -0.2 - Math.sin(time * 0.0004) * 0.04;
		right.rotation.y = 0.2 + Math.sin(time * 0.0004) * 0.04;
	};
	return group;
};

const BUILDERS = { ai: buildAi, tennis: buildTennis, trading: buildTrading, server: buildServer, travel: buildTravel, reading: buildReading };

const Fallback = ({ kind, label }) => {
	const scenes = {
		ai: (
			<>
				<rect x="24" y="72" width="74" height="54" rx="6" /><rect x="143" y="72" width="74" height="54" rx="6" /><rect x="262" y="72" width="74" height="54" rx="6" />
				<path d="M98 99h45m74 0h45" /><path className="soft" d="M40 90h42M40 104h30m119-14h42m-42 14h26m63-14h42m-42 14h34" />
				<circle cx="120" cy="99" r="7" /><circle cx="240" cy="99" r="7" />
				<text x="61" y="153">PROMPT</text><text x="180" y="153">TOOLS</text><text x="299" y="153">CHECK</text>
			</>
		),
		tennis: (
			<>
				<ellipse cx="116" cy="76" rx="42" ry="58" transform="rotate(-28 116 76)" /><path d="M142 124l38 62" />
				<ellipse cx="244" cy="76" rx="42" ry="58" transform="rotate(28 244 76)" /><path d="M218 124l-38 62" />
				<path className="soft" d="M77 42l80 47M73 62l72 43m138-63l-80 47m84-27l-72 43" /><circle cx="180" cy="54" r="13" fill="currentColor" />
			</>
		),
		trading: (
			<>
				<rect x="36" y="30" width="288" height="154" rx="6" /><path className="soft" d="M36 62h288M208 62v122" />
				<path d="M58 151h76v-26h54M58 116h96V90h34M58 80h130" /><circle cx="188" cy="90" r="6" fill="currentColor" />
				<path className="soft" d="M228 88h70m-70 28h70m-70 28h70" /><text x="56" y="48">PAPER MODE / NO LIVE DATA</text>
			</>
		),
		server: (
			<>
				<path d="M78 38h204v142H78zM96 58h168v26H96zM96 96h168v26H96zM96 134h168v26H96z" /><path className="soft" d="M114 66h112m-112 38h112m-112 38h112" />
				<circle cx="246" cy="71" r="5" fill="currentColor" /><circle cx="246" cy="109" r="5" fill="currentColor" /><path d="M58 28l20 10m204 0l20-10M58 190l20-10m204 0l20 10" />
			</>
		),
		travel: (
			<>
				<path d="M34 46l96-24 100 28 96-24v142l-96 24-100-28-96 24zM130 22v142m100-114v142" /><path className="soft" d="M62 78l52 28m36 16l56-34m44 20l48 30" />
				<path d="M62 78c36 30 68 18 88 44s70 18 100-14 48 30 48 30" /><circle cx="62" cy="78" r="7" fill="currentColor" /><circle cx="298" cy="138" r="7" fill="currentColor" />
			</>
		),
		reading: (
			<>
				<path d="M34 52c54-20 102-16 146 8v132c-44-24-92-28-146-8zM326 52c-54-20-102-16-146 8v132c44-24 92-28 146-8z" />
				<path className="soft" d="M58 84h88m-88 24h96m-96 24h78m166-48h-88m88 24h-96m96 24h-78" /><path d="M180 60v132" />
			</>
		),
	};
	return (
		<Box className={styles.fallback} role="img" aria-label={`${label} illustration`}>
			<svg className={styles.fallbackSvg} viewBox="0 0 360 214" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
				{scenes[kind]}
			</svg>
		</Box>
	);
};

const TradingDashboard = () => (
	<Box className={styles.tradingDashboard} aria-hidden="true">
		<Box className={styles.tradingTopbar}>
			<span>PAPER MODE</span><span>NO LIVE DATA</span>
		</Box>
		<Box className={styles.tradingGrid}>
			<Box className={styles.chartPanel}>
				<Text className={styles.ticker}>RISK LADDER / SETUP QUALITY</Text>
				<Box className={styles.riskLadder}>
					<span data-grade="b">OBSERVE</span>
					<span data-grade="a">PLAN</span>
					<span data-grade="aplus">REVIEW</span>
				</Box>
			</Box>
			<Box className={styles.riskPanel}>
				<Text>ENTRY <b>WRITTEN</b></Text><Text>STOP <b>SET</b></Text><Text>EXIT <b>RULE</b></Text>
			</Box>
		</Box>
		<Box className={styles.tradeLog}><span>JOURNAL</span><span>PROCESS BEFORE OUTCOME</span></Box>
	</Box>
);

export default function HobbyScene({ kind, label, active }) {
	const hostRef = useRef(null);
	const canvasRef = useRef(null);
	const frameRef = useRef(null);
	const drawRef = useRef(null);
	const activeRef = useRef(active);
	const pausedRef = useRef(false);
	const reducedRef = useRef(false);
	const [ready, setReady] = useState(false);
	const [paused, setPaused] = useState(false);
	const [reduced, setReduced] = useState(false);
	const { colorMode } = useColorMode();

	useEffect(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => {
			reducedRef.current = media.matches;
			setReduced(media.matches);
			if (media.matches && frameRef.current) {
				cancelAnimationFrame(frameRef.current);
				frameRef.current = null;
			}
			if (!media.matches && activeRef.current && !pausedRef.current) drawRef.current?.();
		};
		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, []);

	useEffect(() => {
		activeRef.current = active;
		if (active && !pausedRef.current && !reducedRef.current) drawRef.current?.();
	}, [active]);

	useEffect(() => {
		if (!active || !canvasRef.current) {
			setReady(false);
			return undefined;
		}
		let disposed = false;
		let renderer;
		let scene;
		let resizeObserver;
		const canvas = canvasRef.current;
		const handleContextLost = (event) => {
			event.preventDefault();
			if (frameRef.current) cancelAnimationFrame(frameRef.current);
			frameRef.current = null;
			canvas.dataset.renderer = "fallback";
			setReady(false);
		};
		canvas.addEventListener("webglcontextlost", handleContextLost);
		const testCanvas = document.createElement("canvas");
		if (!testCanvas.getContext("webgl2") && !testCanvas.getContext("webgl")) {
			canvas.dataset.renderer = "fallback";
			return undefined;
		}

		import("three").then((THREE) => {
			if (disposed) return;
			try {
				renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
				renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
				renderer.outputColorSpace = THREE.SRGBColorSpace;
				scene = new THREE.Scene();
				const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
				camera.position.set(0, 0, 6);
				const colors = hobbyScenePalettes[colorMode];
				const object = BUILDERS[kind](THREE, colors);
				scene.add(object, new THREE.HemisphereLight(colors.paper, colors.muted, 2.1));
				const key = new THREE.DirectionalLight(0xffffff, 2.4);
				key.position.set(4, 5, 6);
				scene.add(key);
				let frames = 0;
				const render = (time = 0) => {
					frameRef.current = null;
					if (disposed) return;
					object.userData.animate?.(time);
					renderer.render(scene, camera);
					frames += 1;
					canvas.dataset.frames = String(frames);
					if (activeRef.current && !pausedRef.current && !reducedRef.current) {
						frameRef.current = requestAnimationFrame(render);
					}
				};
				drawRef.current = () => {
					if (!frameRef.current && !disposed) frameRef.current = requestAnimationFrame(render);
				};
				const resize = () => {
					const width = canvas.clientWidth || 1;
					const height = canvas.clientHeight || 1;
					renderer.setSize(width, height, false);
					camera.aspect = width / height;
					camera.updateProjectionMatrix();
					renderer.render(scene, camera);
				};
				resizeObserver = new ResizeObserver(resize);
				resizeObserver.observe(canvas);
				resize();
				canvas.dataset.renderer = "webgl";
				setReady(true);
				if (activeRef.current && !reducedRef.current) drawRef.current();
			} catch {
				canvas.dataset.renderer = "fallback";
			}
		});

		return () => {
			disposed = true;
			canvas.removeEventListener("webglcontextlost", handleContextLost);
			if (frameRef.current) cancelAnimationFrame(frameRef.current);
			resizeObserver?.disconnect();
			if (renderer) {
				scene?.traverse((item) => {
					item.geometry?.dispose?.();
					if (Array.isArray(item.material)) item.material.forEach((entry) => entry.dispose?.());
					else item.material?.dispose?.();
				});
			}
			renderer?.dispose();
			renderer?.forceContextLoss();
			drawRef.current = null;
		};
	}, [active, kind, colorMode]);

	const togglePaused = () => {
		const next = !pausedRef.current;
		pausedRef.current = next;
		setPaused(next);
		if (next && frameRef.current) { cancelAnimationFrame(frameRef.current); frameRef.current = null; }
		if (!next) drawRef.current?.();
	};

	return (
		<Box ref={hostRef} className={styles.scene} data-active={active ? "true" : "false"} data-kind={kind}>
			<Fallback kind={kind} label={label} />
			{active && <canvas ref={canvasRef} className={styles.canvas} data-ready={ready ? "true" : "false"} aria-hidden="true" />}
			{kind === "trading" && <TradingDashboard />}
			{ready && !reduced && (
				<Button className={styles.pause} variant="outline" minW="92px" minH="44px" onClick={togglePaused} aria-pressed={paused}>
					{paused ? "Play motion" : "Pause motion"}
				</Button>
			)}
		</Box>
	);
}
