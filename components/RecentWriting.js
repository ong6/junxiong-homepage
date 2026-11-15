import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import OutArrow from "./OutArrow";
import { Eyebrow } from "./ArticleParts";
import { NOTES_URL, latestNotes } from "../lib/notes";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-11-05" → "5 Nov 2026", the trading pages' date form. Parsed by hand so
// the server and the browser print the same string in any time zone.
const formatDate = (iso) => {
	const [year, month, day] = iso.split("-").map(Number);
	return `${day} ${MONTHS[month - 1]} ${year}`;
};

// The newest articles on notes.junxiong.dev, as links out. Not a blog: the
// writing lives on the notes site; this is a ruled list in the Links out
// grammar (date, title, one line, the arrow flush with the rule).
export default function RecentWriting() {
	const notes = latestNotes(4);
	return (
		<Box as="section" id="writing" aria-labelledby="writing-heading" scrollMarginTop="96px" mt={{ base: 16, md: 24 }}>
			<Eyebrow>Notes</Eyebrow>
			<Heading id="writing-heading" as="h2" mt={2} fontSize={{ base: "25px", md: "30px" }}>
				Recent writing
			</Heading>
			<Box as="ul" listStyleType="none" m={0} mt={6} p={0} borderTop="1px solid" borderColor="border.subtle">
				{notes.map((note, index) => (
					<Box as="li" key={note.slug}>
						<Link
							href={note.url}
							target="_blank"
							rel="noopener noreferrer"
							data-reveal
							data-group
							data-hover="row"
							style={{ "--i": index }}
							display="grid"
							gridTemplateColumns={{ base: "minmax(0, 1fr) auto", md: "136px minmax(0, 1fr) auto" }}
							gridTemplateAreas={{ base: '"date arrow" "title title" "detail detail"', md: '"date title arrow" ". detail ."' }}
							columnGap={{ base: 4, md: 6 }}
							alignItems="baseline"
							minH="44px"
							py={4}
							borderBottom="1px solid"
							borderColor="border.subtle"
							color="page.text"
							textDecoration="none"
							_hover={{ color: "brand.solid", textDecoration: "none" }}>
							<Text
								as="time"
								dateTime={note.date}
								gridArea="date"
								fontFamily="var(--font-mono)"
								fontSize="12px"
								lineHeight="text"
								color="text.muted">
								{formatDate(note.date)}
							</Text>
							<Text gridArea="title" mt={{ base: 1, md: 0 }} fontSize={{ base: "16px", md: "18px" }} fontWeight="750" lineHeight="heading">
								{note.title}
							</Text>
							<Flex gridArea="arrow" alignSelf="start" justify="flex-end">
								<OutArrow newTab />
							</Flex>
							{note.description ? (
								<Text gridArea="detail" mt={1} maxW="680px" color="text.muted" fontSize="14px" lineHeight="text">
									{note.description}
								</Text>
							) : null}
						</Link>
					</Box>
				))}
			</Box>
			<Link
				href={NOTES_URL}
				target="_blank"
				rel="noopener noreferrer"
				display="inline-flex"
				alignItems="center"
				minH="44px"
				mt={2}
				fontFamily="var(--font-mono)"
				fontSize="12px"
				fontWeight="700"
				letterSpacing=".04em"
				textDecoration="underline"
				textUnderlineOffset="4px">
				All notes <OutArrow newTab ml="4px" />
			</Link>
		</Box>
	);
}
