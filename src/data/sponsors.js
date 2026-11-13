import data from './sponsors.json'

/*
 * Everything on the /sponsors tab comes from sponsors.json: edit that file to add or change anyone.
 *
 * partners: companies, in display order; also scrolled in the home page marquee
 *   name: as it should appear
 *   main: optional, true for the main sponsor, whose logo gets a big tile in the middle of the /sponsors grid
 *   logo: transparent PNG/SVG in /images/sponsors/, any colour (the site shows it in white),
 *         or null to show the name in type until a logo file is added
 *   url : optional; adds a "Website" link
 *   about  : { "ko": "…", "en": "…" }: who they are, or null
 *   support: { "ko": "…", "en": "…" }: what they give the team, or null. It's set into a sentence, so write it
 *            to read there: ko "후원금과 컴퓨팅 자원" (지붕이에 ~을 후원해주셨습니다), en "a welder" (They sponsor G-BungE with ~)
 *   supportLead: optional { "ko": "…", "en": "…" }: a different opening for that sentence, which then gets a
 *            paragraph of its own: ko "올해 GIST 발전재단은 지붕이에 " (~을 후원해주셨습니다)
 */
export const partners = data.partners

/* Logos for the marquee. */
export const sponsors = partners.map((p) => ({ src: p.logo, alt: p.name }))
