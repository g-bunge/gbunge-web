/*
 * Cars for the /past-cars page, newest first.
 * TODO: fill in the years, photos, descriptions and specs we don't have yet (specs show '-' until then).
 *   img : e.g. '/images/cars/mk5.jpg' (landscape, ~16:10); a grey placeholder shows until then
 *   desc : { ko, en }
 *   award: { ko, en }, optional; shown as a badge
 */
/* every car lists the same specs, in this order; anything not given shows '-' */
const specs = (given = {}) => ({ motor: '-', battery: '-', drivetrain: '-', weight: '-', dimensions: '-', wheelbase: '-', ...given })

export const pastCars = [
  {
    id: 'mk5',
    name: 'Mk.5',
    year: '2026',
    type: 'E-BAJA',
    img: '/images/mk5-card.jpg',
    award: { ko: '2026 Baja Student Korea 기술아이디어상', en: 'Technical Idea Award, Baja Student Korea 2026' },
    desc: {
      ko: '실제 주행 로그로 BSK 트랙 전용 랩타임 최적화 모델을 만들고, 그 결과로 기어비와 토크맵을 정한 차량입니다. 감이 아니라 계산으로 파워트레인을 설계한 첫 차로, 이 설계로 기술아이디어상을 받았습니다.',
      en: 'The car whose gear ratio and torque map came out of a lap-time optimisation model built from our own driving logs on the BSK track. Our first powertrain designed by calculation instead of feel, and the design that won the Technical Idea Award.',
    },
    // from the 2026 KSAE technical idea report
    specs: specs({
      motor: 'ME1616 IPMSM',
      battery: 'Samsung SDI 120Ah',
      drivetrain: '2-stage chain, 5.2 : 1',
      weight: '370 kg',
      dimensions: '2420 × 1327 × 1478 mm',
      wheelbase: '1600 mm',
    }),
  },
  { id: 'mk4', name: 'Mk.4', year: null, type: 'E-BAJA', specs: specs() },
  {
    id: 'mk3',
    name: 'Mk.3',
    year: '2024',
    type: 'E-BAJA',
    desc: {
      ko: '납축전지 대신 삼성 SDI 셀로 배터리 팩을 직접 만들어 용량을 5.76kWh에서 13.5kWh로 늘리고, 72V 시스템과 수랭식 냉각으로 내구경기 완주를 노린 차량입니다. 프레임은 28.85%, 드라이브트레인은 83.7% 가벼워졌고, CFD로 다듬은 공력 부품과 무선 데이터 로깅을 처음 적용했습니다.',
      en: 'The car where we swapped lead-acid for a battery pack we built ourselves from Samsung SDI cells, taking capacity from 5.76 kWh to 13.5 kWh, and went to 72 V with liquid cooling to finish the endurance race. The frame lost 28.85% of its weight and the drivetrain 83.7%, and it was our first car with CFD-shaped aero parts and wireless data logging.',
    },
    // from the 2024 KSAE design report
    specs: specs({
      motor: '72V HPM 10kW BLDC',
      battery: 'Samsung SDI 94Ah, 20s2p (13.5 kWh)',
      drivetrain: '520 chain, 2.5 : 1',
      weight: '301 kg',
      dimensions: '2227 × 1488 × - mm',
      wheelbase: '859.8 mm',
    }),
  },
  { id: 'mk2', name: 'Mk.2', year: null, type: 'E-BAJA', specs: specs() },
  {
    id: 'mk1',
    name: 'Mk.1',
    year: '2021',
    type: 'E-BAJA',
    desc: {
      ko: 'G-BungE의 첫 번째 차량. 모든 것이 여기서 시작됐습니다.',
      en: 'The very first G-BungE car. This is where it all started.',
    },
    specs: specs(),
  },
]

