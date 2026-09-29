/*
 * Sub-teams shown on the Team cards. `img` maps to /images/team-<img>.jpg.
 * `shock: true` every third time the card is opened sends current crackling around it (easter egg, see Team.jsx).
 * TODO: `photo: false` teams show a grey placeholder until they have a photo; add the file and remove the flag.
 */
export const teams = [
  {
    name: 'MANUFACTURING',
    img: 'manufacturing',
    desc: { ko: '프레임 가공과 용접, 조립까지. 설계를 실물로 만듭니다.', en: 'From machining and welding the frame to final assembly, we turn designs into reality.' },
  },
  {
    name: 'POWERTRAIN',
    img: 'powertrain',
    desc: { ko: '모터와 감속기, 구동계를 설계해 힘을 바퀴까지 전달합니다.', en: 'We design the motor, reduction gear and drivetrain that deliver power to the wheels.' },
  },
  {
    name: 'AERODYNAMICS',
    img: 'aerodynamics',
    photo: false,
    desc: {
      ko: '차량의 공기역학적 성능 향상을 위한 공력 부품의 설계, 해석 및 제작을 담당합니다.',
      en: "We design, simulate and build the aero parts that improve the car's aerodynamic performance.",
    },
  },
  {
    name: 'MARKETING',
    img: 'marketing',
    desc: { ko: '팀을 알리고 스폰서와 함께할 방법을 찾습니다.', en: 'We spread the word about the team and find ways to partner with sponsors.' },
  },
  {
    name: 'HIGH VOLTAGE',
    img: 'high-voltage',
    photo: false,
    shock: true,
    desc: { ko: '배터리 팩과 고전압 시스템을 안전하게 설계합니다.', en: 'We safely design the battery pack and high-voltage system.' },
  },
  {
    name: 'LOW VOLTAGE',
    img: 'low-voltage',
    photo: false,
    desc: { ko: '센서, 제어기, 하네스 등 차량의 신경계를 만듭니다.', en: "Sensors, controllers and harnesses: we build the car's nervous system." },
  },
  {
    name: 'C-BAJA',
    img: 'c-baja',
    desc: { ko: '첫 엔진 바하 차량에 도전하는 신입생 팀입니다.', en: 'A freshman team taking on our first combustion-engine Baja car.' },
  },
]
