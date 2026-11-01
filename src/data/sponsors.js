import data from './sponsors.json'

/*
 * Everything on the /sponsors tab comes from sponsors.json: edit that file to add or change anyone.
 *
 * partners: companies, in display order; also scrolled in the home page marquee
 *   name: as it should appear
 *   logo: transparent PNG/SVG in /images/sponsors/, any colour (the site shows it in white),
 *         or null to show the name in type until a logo file is added
 *   url : optional; adds a "Website" link
 *   desc: { "ko": "…", "en": "…" }: who they are and what they support us with
 *
 * supporters: people who support us personally, by group: "ob" (alumni) and "individual".
 *   Each is a list of names as they'd like to be credited; an empty list shows an invitation instead.
 *   TODO: the OB names are placeholders.
 */
export const partners = data.partners

/* Logos for the marquee. */
export const sponsors = partners.map((p) => ({ src: p.logo, alt: p.name }))

/* Supporter groups in page order, as { id, names }. */
export const supporterGroups = Object.entries(data.supporters).map(([id, names]) => ({ id, names }))
