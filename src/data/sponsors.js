/*
 * Sponsors, listed on /sponsors and scrolled in the home page marquee.
 *   logo: transparent PNG/SVG in /images/sponsors/; any colour, the site shows it in white.
 *         null shows the name in type instead, until a logo file is added
 *   url : optional; adds a "Website" link
 *   desc: { ko, en }: who they are and what they support us with
 * People who support us personally go in supporters.js.
 */
export const partners = [
  {
    name: 'JTEKT',
    logo: '/images/sponsors/jtekt.png',
    url: 'https://www.jtekt.co.jp/e/',
    desc: {
      ko: '베어링과 스티어링 시스템을 만드는 일본 기업입니다. G-BungE에 베어링(6908 2RS, 6007 2RS)을 지원합니다.',
      en: 'A Japanese maker of bearings and steering systems. JTEKT supplies our bearings (6908 2RS, 6007 2RS).',
    },
  },
  {
    name: 'SOSLAB',
    logo: '/images/sponsors/soslab.svg',
    url: 'https://www.soslab.co',
    desc: {
      ko: '자율주행과 로봇에 쓰이는 라이다(LiDAR) 센서를 개발하는 기업입니다. G-BungE에 후원금을 지원합니다.',
      en: 'A developer of LiDAR sensors for autonomous vehicles and robots. SOSLAB supports us with funding.',
    },
  },
  {
    name: 'Bender',
    logo: '/images/sponsors/bender.svg',
    url: 'https://www.bender.de/en/',
    desc: {
      ko: '절연 감시 장치(IMD)로 잘 알려진 독일의 전기 안전 전문 기업입니다. G-BungE에 ISOMETER IR155-3204를 지원합니다.',
      en: 'A German electrical safety specialist, best known for insulation monitoring devices. Bender supplies our ISOMETER IR155-3204.',
    },
  },
  {
    name: 'SimScale',
    logo: '/images/sponsors/simscale.png',
    url: 'https://www.simscale.com',
    desc: {
      ko: '브라우저에서 유동(CFD)·구조 해석을 돌릴 수 있는 클라우드 시뮬레이션 플랫폼입니다.',
      en: 'A cloud simulation platform for running CFD and structural analysis right in the browser.',
    },
  },
  {
    // TODO: logo and website
    name: 'KASE',
    logo: null,
    desc: {
      ko: 'G-BungE에 절연 감시 장치(IMD)를 지원합니다.',
      en: 'KASE supplies our insulation monitoring device (IMD).',
    },
  },
  {
    name: 'Cadence',
    logo: '/images/sponsors/cadence.svg',
    url: 'https://www.cadence.com',
    desc: {
      ko: '반도체와 전자 회로 설계(EDA) 소프트웨어를 만드는 기업입니다.',
      en: 'A maker of electronic design automation (EDA) software for chips and circuit boards.',
    },
  },
  {
    name: 'Ansys',
    logo: '/images/sponsors/ansys.svg',
    url: 'https://www.ansys.com',
    desc: {
      ko: '구조, 유동, 전자기 해석까지 아우르는 공학 시뮬레이션 소프트웨어 기업입니다.',
      en: 'An engineering simulation software company covering structures, fluids and electromagnetics.',
    },
  },
  {
    // TODO: logo and website
    name: '지티알코리아',
    logo: null,
    desc: {
      ko: 'G-BungE에 SN 6 Bio+를 지원합니다.',
      en: 'GTR Korea supplies our SN 6 Bio+.',
    },
  },
  {
    name: 'IWISS',
    logo: '/images/sponsors/iwiss.png',
    url: 'https://www.iwiss.com',
    desc: {
      ko: '커넥터와 단자용 압착 공구를 만드는 기업입니다. G-BungE에 압착기를 지원합니다.',
      en: 'A maker of crimping tools for connectors and terminals. IWISS supplies our crimping tools.',
    },
  },
  {
    name: '월드웰',
    logo: '/images/sponsors/worldwel.svg',
    url: 'https://worldwel.com',
    desc: {
      ko: '1991년부터 용접기를 만들어 온 국내 용접기 전문 제조사입니다. G-BungE에 용접기를 지원합니다.',
      en: 'A Korean welding machine maker since 1991. Worldwel supplies our welder.',
    },
  },
  {
    name: '케룸',
    logo: '/images/sponsors/caelum.png',
    url: 'https://xn--jt2bx61b.kr',
    desc: {
      ko: '단체복과 의류 프린팅을 만드는 어패럴 프린팅 전문 기업입니다.',
      en: 'An apparel printing company making custom team wear.',
    },
  },
]

/* Logos for the marquee. */
export const sponsors = partners.map((p) => ({ src: p.logo, alt: p.name }))
