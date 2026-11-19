import { Fragment } from "react";
import styles from "./FactList.module.css";

// The mono fact table under a case study: labels in a fixed column, values
// left-aligned in their own column so a long value wraps under itself instead
// of pushing against the label. Stacks on phones.
//
//   facts     – [label, value] pairs
//   className – the caller's spacing or width (the table's own look is the
//               global .fact-list in styles/parts.css, so this always wins)
//
// A value made of " · " items wraps between items on wider screens, never
// inside one, as long as each item is short enough to fit the column.

function Value({ value }) {
	const items = typeof value === "string" ? value.split(" · ") : [];
	if (items.length < 2 || items.some((item) => item.length > 40)) return value;
	return items.map((item, i) => (
		<Fragment key={i}>
			{i ? " · " : ""}
			<span className={styles.item}>{item}</span>
		</Fragment>
	));
}

export default function FactList({ facts, className, style }) {
	return (
		<dl className={className ? `fact-list ${className}` : "fact-list"} style={style}>
			{facts.map(([label, value]) => (
				<div key={label} className={styles.row}>
					<dt className={styles.label}>{label}</dt>
					<dd className={styles.value}>
						<Value value={value} />
					</dd>
				</div>
			))}
		</dl>
	);
}

// Rows of a page's fact table by label, for the wide-screen side rail
// (layouts/Articles.js `facts`), so the rail repeats the table's own words.
export const pickFacts = (facts, labels) => labels.map((name) => facts.find(([label]) => label === name)).filter(Boolean);
