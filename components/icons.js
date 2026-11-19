// The site's few UI icons as inline SVG (24×24, drawn in currentColor, the
// size of the surrounding text unless a class sets it).

const Svg = ({ className, children, ...props }) => (
	<svg viewBox="0 0 24 24" focusable="false" className={className ? `ui-icon ${className}` : "ui-icon"} {...props}>
		{children}
	</svg>
);

export const SunIcon = (props) => (
	<Svg {...props}>
		<g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
			<circle cx="12" cy="12" r="5" />
			<path d="M12 1v2" />
			<path d="M12 21v2" />
			<path d="M4.22 4.22l1.42 1.42" />
			<path d="M18.36 18.36l1.42 1.42" />
			<path d="M1 12h2" />
			<path d="M21 12h2" />
			<path d="M4.22 19.78l1.42-1.42" />
			<path d="M18.36 5.64l1.42-1.42" />
		</g>
	</Svg>
);

export const MoonIcon = (props) => (
	<Svg {...props}>
		<path
			fill="currentColor"
			d="M21.4,13.7C20.6,13.9,19.8,14,19,14c-5,0-9-4-9-9c0-0.8,0.1-1.6,0.3-2.4c0.1-0.3,0-0.7-0.3-1 c-0.3-0.3-0.6-0.4-1-0.3C4.3,2.7,1,7.1,1,12c0,6.1,4.9,11,11,11c4.9,0,9.3-3.3,10.6-8.1c0.1-0.3,0-0.7-0.3-1 C22.1,13.7,21.7,13.6,21.4,13.7z"
		/>
	</Svg>
);

export const HamburgerIcon = (props) => (
	<Svg {...props}>
		<path
			fill="currentColor"
			d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"
		/>
	</Svg>
);

export const CloseIcon = (props) => (
	<Svg {...props}>
		<path
			fill="currentColor"
			d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
		/>
	</Svg>
);

export const SearchIcon = (props) => (
	<Svg {...props}>
		<path
			fill="currentColor"
			d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"
		/>
	</Svg>
);

export const TriangleUpIcon = (props) => (
	<Svg {...props}>
		<path
			fill="currentColor"
			d="M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"
		/>
	</Svg>
);
