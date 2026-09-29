/*
 * Team roster for the /team page.
 *
 * `people` holds each person once: their name, photo, bio and contacts. Groups list who is in them
 * (by id) and in what role, so someone in several sub-teams is written once and shows every team
 * on their card. Seats not filled in yet are `vacant(role)`.
 *
 * TODO: fill in the vacant seats. Optional per person:
 *   ko     : Korean name, shown as a blog post's author on the Korean site (English `name` otherwise)
 *   photo  : e.g. '/images/members/joori-kim.jpg' (portrait, 3:4); the grey gradient shows until then
 *   bio    : { ko, en }, shown when the card is opened
 *   contact: any of { email: 'a@gist.ac.kr', instagram: 'handle', linkedin: 'https://…', github: 'username' }
 */
export const people = {
  'joori-kim': { name: 'Joori Kim' },
  'suhyeok-lee': { name: 'Suhyeok Lee' },
  'hyeonung-chang': { name: 'Hyeonung Chang' },
  'jaewon-lee': { name: 'Jaewon Lee' },
  'yewon-kim': { name: 'Yewon Kim', ko: '김예원' },
  'dokyeong-kim': { name: 'Dokyeong Kim' },
  'yesong-han': { name: 'Yesong Han' },
  'hyoungmok-kim': { name: 'Hyoungmok Kim' },
  'seungji-kim': { name: 'Seungji Kim' },
  'yunju-lee': { name: 'Yunju Lee' },
  'jimin-name': { name: 'Jimin name' },
  'miso-park': { name: 'Miso Park' },
  'cheolsoon-han': { name: 'Cheolsoon Han' },
  'sungsik-kim': { name: 'Sungsik Kim' },
}

/*
 * Faculty advisors, shown on /team above the roster.
 * TODO: fill in. photo: portrait (3:4), e.g. '/images/members/advisor.jpg'; url: lab or faculty page (optional).
 */
export const advisors = [
  {
    name: { ko: '지도교수 성함', en: 'Advisor Name' },
    dept: { ko: 'GIST 소속 학부', en: 'Department, GIST' },
    photo: null,
    url: null,
    message: {
      ko: '지도교수님의 한마디가 들어갈 자리입니다.',
      en: 'A few words from our faculty advisor go here.',
    },
  },
]

/** A seat held by someone in `people`. */
const seat = (id, role) => ({ id, role })
/** Seats nobody has been written in for yet. */
const vacant = (role, count = 1) => Array.from({ length: count }, () => ({ id: null, role }))

const groups = [
  {
    id: 'operation',
    name: 'Operation',
    seats: [...vacant('Project Manager'), ...vacant('President'), seat('joori-kim', 'Vice President')],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    seats: [seat('suhyeok-lee', 'Manufacturing Team Lead'), ...vacant('Manufacturing Team Lead'), ...vacant('Senior', 4), ...vacant('Junior', 5)],
  },
  {
    id: 'powertrain',
    name: 'Powertrain',
    seats: [seat('hyeonung-chang', 'Powertrain Team Lead'), ...vacant('Senior', 2)],
  },
  {
    id: 'aerodynamics',
    name: 'Aerodynamics',
    seats: [
      seat('jaewon-lee', 'Aerodynamics Team Lead'),
      seat('yewon-kim', 'Aerodynamics Team Lead'),
      seat('dokyeong-kim', 'Senior'),
      seat('yesong-han', 'Senior'),
      seat('hyoungmok-kim', 'Senior'),
      seat('seungji-kim', 'Junior'),
      seat('yunju-lee', 'Junior'),
      seat('jimin-name', 'Junior'),
    ],
  },
  {
    id: 'low-voltage',
    name: 'Low Voltage',
    seats: [seat('miso-park', 'LV Team Lead'), ...vacant('LV Team Lead'), seat('joori-kim', 'Senior'), ...vacant('Senior', 4), ...vacant('Junior')],
  },
  {
    id: 'high-voltage',
    name: 'High Voltage',
    seats: [seat('cheolsoon-han', 'HV Team Lead'), ...vacant('Senior'), ...vacant('Junior')],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    seats: [seat('joori-kim', 'Marketing Team Lead'), ...vacant('Senior'), ...vacant('Junior')],
  },
  {
    id: 'c-baja',
    name: 'C-Baja',
    seats: [seat('sungsik-kim', 'BAJA Project Manager'), ...vacant('Senior', 3), ...vacant('Junior', 8)],
  },
]

/* Every team (and role) each person holds, in page order. */
const teamsOf = {}
groups.forEach((g) =>
  g.seats.forEach(({ id, role }) => {
    if (id) (teamsOf[id] ??= []).push({ group: g.id, groupName: g.name, role })
  }),
)

/**
 * Groups as the page renders them. Each member carries the seat's `role` plus the person's details
 * and `teams`: all of their sub-teams, this one included.
 */
export const memberGroups = groups.map((g) => ({
  id: g.id,
  name: g.name,
  members: g.seats.map(({ id, role }, i) =>
    id
      ? { key: `${g.id}-${id}`, id, ...people[id], role, teams: teamsOf[id] }
      : { key: `${g.id}-vacant-${i}`, id: null, name: 'Name', role, teams: [{ group: g.id, groupName: g.name, role }] },
  ),
}))

/* Head count on /about. Set by hand: the vacant seats above are only estimates, so counting them doesn't give the real number. */
export const memberCount = 41
