# G-BungE 디자인 시스템

사이트의 모든 스타일은 [Tailwind CSS v4](https://tailwindcss.com) 유틸리티 클래스로 작성합니다.
색·글꼴·크기·간격·모션 값은 **토큰**으로 한곳에 정의하고, 컴포넌트는 토큰에서 만들어진 클래스만 씁니다.

| 파일 | 내용 |
|---|---|
| [`src/styles/theme.css`](../src/styles/theme.css) | **토큰 정의** (`@theme`), 화면 크기별 변형(variant), 애니메이션 키프레임 |
| [`src/styles/index.css`](../src/styles/index.css) | Tailwind 불러오기, 기본 스타일, 공용 텍스트 스타일(`t-*`), 커스텀 유틸리티 |
| 각 `.jsx` 파일 | `className`에 유틸리티 클래스로 직접 스타일 작성 (컴포넌트별 CSS 파일 없음) |

## 원칙

1. **색상 코드(`#d94333` 등)를 컴포넌트에 직접 쓰지 않습니다.** 필요한 색이 없으면 `theme.css`에 토큰을 추가합니다.
2. **토큰 이름이 곧 클래스 이름입니다.** `--color-brand` → `bg-brand`, `text-brand`, `border-brand`
3. **데스크톱 기준으로 작성하고, 작은 화면을 덮어씁니다.** 기본 클래스가 데스크톱이고 `tablet:` `mobile:` 등으로 줄입니다.
4. 딱 한 번만 쓰는 값(특정 그라디언트, 그리드 비율 등)은 `grid-cols-[7fr_5fr]`처럼 대괄호 값으로 써도 됩니다. **두 번 이상 쓰이면 토큰으로 올립니다.**

---

## 색상

기본 Tailwind 팔레트(`red-500` 등)는 꺼 두었습니다. 아래 토큰만 쓸 수 있습니다.

### 브랜드

| 토큰 | 값 | 클래스 예 | 용도 |
|---|---|---|---|
| `brand` | `#d94333` | `bg-brand` `border-brand` | 메인 브랜드 색, 포커스 테두리 |
| `brand-end` | `#db5551` | `text-brand-end` | 브랜드 그라디언트 끝색, 강조 텍스트(카테고리, 링크) |
| `brand-hover` / `brand-hover-end` | `#e5503f` / `#e76a64` | - | 버튼 호버 그라디언트 (직접 쓰지 말고 `bg-brand-gradient-hover`) |

### 배경 (어두운 순)

| 토큰 | 값 | 용도 |
|---|---|---|
| `bg` | `#000000` | 페이지 배경 |
| `raised` | `#131313` | 한 단계 떠 있는 섹션·카드 (`bg-raised`) |
| `surface` | `#232323` | 카드, 입력칸 포커스 |
| `surface-hover` | `#2a2a2a` | 카드 호버 |

### 텍스트

| 토큰 | 값 | 용도 |
|---|---|---|
| `fg` | `#ffffff` | 제목, 강조 (`text-fg`) |
| `fg-body` | `#e9e9e9` | 본문 (`text-fg-body`) |
| `fg-muted` | `#8c8c8c` | 날짜·라벨 등 보조 텍스트 (`text-fg-muted`) |
| `fg-on-light` | `#111111` | 흰 배경 위 글자 |

### 구분선

| 토큰 | 값 | 용도 |
|---|---|---|
| `line` | 흰색 12% | 기본 구분선 (`border-line`) |
| `line-soft` | 흰색 8% | 더 옅은 구분선 |
| `line-faint` | 흰색 6% | 카드 테두리 |

### 한 번씩 쓰는 투명도

`white`, `black`에 `/숫자`를 붙여 씁니다: `bg-black/55`, `border-white/18`, `border-brand/30`.

---

## 글꼴

| 토큰 | 글꼴 | 클래스 | 용도 |
|---|---|---|---|
| `display` | Urbanist → Pretendard | `font-display` | 큰 제목, 숫자, 차량 이름 |
| `sans` | Pretendard | `font-sans` (기본값) | 본문 |
| `ui` | Inter → Pretendard | `font-ui` | 메뉴, 라벨, 메타 정보, 버튼성 텍스트 |

## 글자 크기

### 역할별 크기

줄 간격이 함께 들어 있고, 모바일(640px 이하)에서 자동으로 줄어듭니다.

| 클래스 | 데스크톱 | 모바일 | 용도 |
|---|---|---|---|
| `text-title` | 41px / 1.16 | 30px | 섹션 제목 |
| `text-body` | 18px / 29px | 16px / 26px | 본문 문단 |
| `text-eyebrow` | 15px | - | 제목 위 작은 라벨 |
| `text-button` | 16px | - | 버튼 |

### 고정 크기 (px 이름)

`text-11` `text-12` `text-13` `text-14` `text-15` `text-16` `text-17` `text-18` `text-20` `text-21` `text-24` `text-26` `text-28` `text-32` `text-36` `text-40` `text-56`

이름이 곧 픽셀 크기입니다(`text-13` = 13px). 이 목록에 없는 크기가 필요하면 새로 만들기보다 가까운 값을 먼저 고려하고, 꼭 필요하면 `theme.css`에 추가합니다.

### 화면에 따라 커지는 제목 크기

| 클래스 | 값 | 쓰는 곳 |
|---|---|---|
| `text-hero` | 48–96px | 하위 페이지 상단 큰 제목 |
| `text-car` | 56–88px | 과거 차량 이름 |
| `text-stat` | 48–80px | 소개 페이지 숫자 |
| `text-post-title` | 36–60px | 블로그 글 제목 |
| `text-cta-title` | 34–54px | 스폰서 문의 제목 |
| `text-gallery` | 28–44px | 소개 페이지 사진 위 단어 |
| `text-feature` | 28–40px | 블로그 최신 글 제목 |
| `text-highlight` | 26–34px | 스폰서 페이지 강조 카드 제목 |
| `text-ghost` | 80–180px | 사진 없는 차량 자리의 외곽선 글자 |
| `text-kicker` | 96–160px | 스폰서 강조 카드 뒤 외곽선 글자 |

### 자간

| 클래스 | 값 | | 클래스 | 값 |
|---|---|---|---|---|
| `tracking-tightest` | -0.03em | | `tracking-wide` | 0.06em |
| `tracking-tighter` | -0.02em | | `tracking-wider` | 0.08em |
| `tracking-tight` | -0.01em | | `tracking-widest` | 0.1em |
| `tracking-snug` | 0.01em | | `tracking-label` | 0.12em |

---

## 간격과 레이아웃

간격은 Tailwind 기본 4px 단위를 씁니다: `p-6` = 24px, `mt-2.5` = 10px, `gap-7` = 28px.
이름 붙은 간격은 아래 세 가지입니다.

| 토큰 | 값 | 클래스 예 | 용도 |
|---|---|---|---|
| `gutter` | 80px (태블릿 이하 24px) | `px-gutter` `mx-gutter` `inset-x-gutter` | 페이지 좌우 여백 |
| `nav` | 72px | `h-nav` `scroll-mt-nav` | 상단 메뉴 높이, 앵커 이동 시 가림 방지 |
| `button` | 45px | `h-button` | 버튼 높이 |

## 화면 크기 (breakpoint)

데스크톱 기준이라 **"이 크기 이하에서"** 적용되는 변형입니다. 뒤에 있을수록 우선합니다.

| 변형 | 적용 범위 | 예 |
|---|---|---|
| `laptop:` | 1280px 이하 | `laptop:grid-cols-4` |
| `tablet:` | 1024px 이하 | `tablet:grid-cols-1` |
| `narrow:` | 800px 이하 | `narrow:grid-cols-2` |
| `mobile:` | 640px 이하 | `mobile:text-18` |

Tailwind 기본 `sm:` `md:` `lg:`는 꺼 두었습니다.

---

## 효과

| 클래스 | 용도 |
|---|---|
| `shadow-menu` | 드롭다운 메뉴 |
| `shadow-card` | 팀원 카드 호버 |
| `shadow-lift` | 메인 스토리 카드 호버 (아래 브랜드 선 포함) |

### 커스텀 유틸리티 (`index.css`)

| 클래스 | 하는 일 |
|---|---|
| `bg-brand-gradient` | 브랜드 가로 그라디언트 배경 |
| `bg-brand-gradient-hover` | 버튼 호버용 밝은 그라디언트 |
| `text-brand-gradient` | 글자에 브랜드 그라디언트 (소개 페이지 숫자) |
| `bg-placeholder` | 사진이 아직 없는 자리의 회색 그라디언트 |
| `text-stroke-{색}/{투명도}` | 속이 빈 외곽선 글자. 예: `text-stroke-white/35` |

### 공용 텍스트 스타일

여러 곳에서 같은 모양으로 쓰는 텍스트는 `components` 층의 클래스로 두었습니다. 유틸리티로 덮어쓸 수 있습니다(예: `t-eyebrow tracking-label`).

| 클래스 | 모양 |
|---|---|
| `t-eyebrow` | 제목 위 작은 그라디언트 라벨 |
| `t-title` | 섹션 제목 (Urbanist, `text-title`) |
| `t-body` | 본문 문단 (`text-body`, `text-fg-body`) |

---

## 모션

| 토큰 | 값 | 클래스 |
|---|---|---|
| `ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | `ease-out`: 대부분의 움직임 |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | `ease-in-out`: 슬라이드 전환 |

기본 전환 곡선은 CSS 기본값 `ease`입니다. 속성마다 시간이 다른 전환은 `[transition:opacity_0.3s,translate_0.5s_var(--ease-out)]`처럼 한 번에 씁니다.

### 애니메이션

| 클래스 | 쓰는 곳 |
|---|---|
| `animate-hero-zoom` | 메인 첫 화면 배경이 어두운 상태에서 확대되며 밝아짐 |
| `animate-hero-in` | 메인 로고·부제가 서서히 나타남 |
| `animate-hero-scroll` | 아래 화살표가 나타난 뒤 까딱임 |
| `animate-page-hero-zoom` / `animate-page-hero-rise` | 하위 페이지 상단 사진 확대 / 제목 떠오름 |
| `animate-slide-in` / `animate-slide-out` | 배경 슬라이드쇼 전환 |
| `animate-marquee` | 스폰서 로고 흐름 (속도는 `animation-duration`으로 따로 지정) |

### 스크롤 등장 효과

`<Reveal>` 컴포넌트로 감싸면 화면에 들어올 때 나타납니다(`variant`: `up` `left` `right`, `delay`: ms).
스타일은 `index.css`의 `.reveal`에 있습니다. 동작 줄이기(reduced motion) 설정에서는 효과 없이 바로 보입니다.

---

## 작성 규칙

- **조건부 클래스**는 `src/lib/cx.js`의 `cx()`로 합칩니다: `cx('px-5', isOpen && 'bg-surface')`
- **부모 호버에 반응**할 때는 이름 있는 그룹을 씁니다: 부모 `group/card`, 자식 `group-hover/card:scale-105`
- **컴포넌트 기본 클래스를 덮어쓸 때** 같은 속성이 겹치면 어느 쪽이 이길지 보장되지 않습니다. 이럴 땐 `!`를 붙입니다: `<Button className="w-50 px-0!">`
- **`::before` / `::after`** 는 `before:` `after:` 접두사로 씁니다: `after:absolute after:inset-0 after:bg-black/40`

## 토큰 추가·변경하기

1. `src/styles/theme.css`의 `@theme` 안에 알맞은 이름공간으로 추가합니다.
   - 색 `--color-*`, 글자 크기 `--text-*`, 자간 `--tracking-*`, 간격 `--spacing-*`, 그림자 `--shadow-*`, 곡선 `--ease-*`, 애니메이션 `--animate-*`
2. 화면 크기에 따라 값이 바뀌어야 하면 파일 아래쪽 `@media` 블록의 `:root`에서 같은 변수를 덮어씁니다.
3. 이 문서의 해당 표에 한 줄 추가합니다.

값만 바꾸면(예: `--color-brand`) 그 토큰을 쓰는 사이트 전체에 한 번에 반영됩니다.
