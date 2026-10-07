import { memberGroups, people } from './members.js'
import notionPosts from './notion-posts.json'

/*
 * Blog posts for /stories, newest first. Each post lives at /stories/<slug>.
 *
 * They can come from Notion: `npm run posts` (scripts/fetch-posts.mjs) writes notion-posts.json; it is no longer part of dev/build
 * (setup is described at the top of that script). Until it has any, the placeholders below show.
 *   category: the Notion 카테고리; known ones get their English label from `knownCategories`
 *   team    : a group id from members.js (e.g. 'aerodynamics') or a team name as written; hidden while null
 *   author  : a person id from members.js, or a name as written in Notion; hidden while null
 *   date    : 'YYYY-MM-DD'; hidden while null
 *   cover   : landscape image, ~16:10; a grey block shows while null
 *   body    : { ko: blocks, en: blocks }; see components/ui/PostBody.jsx
 */
const knownCategories = {
  design: { ko: '설계', en: 'Design' },
  build: { ko: '작업일지', en: 'Build Log' },
  race: { ko: '대회', en: 'Competition' },
  team: { ko: '팀 소식', en: 'Team' },
}

/* Notion gives the Korean category name; map it to its key so it gets the English label too */
const categoryKey = (name) => Object.keys(knownCategories).find((key) => key === name || knownCategories[key].ko === name) ?? name

const placeholder = (n, category) => ({
  slug: `post-${n}`,
  category,
  team: null,
  author: null,
  date: null,
  cover: null,
  title: { ko: '제목', en: 'Title' },
  excerpt: { ko: '게시글 요약이 들어갈 자리입니다.', en: 'A short summary of the post goes here.' },
  body: { ko: ['본문이 들어갈 자리입니다.'], en: ['Post body goes here.'] },
})

const placeholders = [
  {
    slug: 'example-title',
    category: 'design',
    team: 'aerodynamics',
    author: 'yewon-kim',
    date: '2026-09-25',
    cover: null,
    title: { ko: '예시) 제목입니다.', en: 'example) This is title' },
    excerpt: { ko: '게시글 요약이 들어갈 자리입니다.', en: 'A short summary of the post goes here.' },
    body: { ko: ['본문이 들어갈 자리입니다.'], en: ['Post body goes here.'] },
  },
  ...['build', 'race', 'team', 'build', 'race'].map((category, i) => placeholder(i + 1, category)),
]

export const posts = notionPosts.length ? notionPosts.map((post) => ({ ...post, category: categoryKey(post.category ?? '기타') })) : placeholders

/* the known categories, plus any new one a Notion post brings (shown as written, in both languages) */
export const categories = { ...knownCategories }
posts.forEach(({ category }) => (categories[category] ??= { ko: category, en: category }))

export const findPost = (slug) => posts.find((post) => post.slug === slug)

/** A post's team: a group id ('aerodynamics' → 'Aerodynamics'), or a Notion team name, shown as is. */
export const teamName = (id) => memberGroups.find((g) => g.id === id)?.name ?? id

/*
 * A post's author in `lang`: a person id ('yewon-kim' → '김예원' / 'Yewon Kim') or a name from Notion.
 * A Notion name matching someone's Korean name gets their English name on the English site.
 */
export const authorName = (id, lang) => {
  const person = people[id] ?? Object.values(people).find((p) => p.ko === id)
  if (!person) return id
  return (lang === 'ko' && person.ko) || person.name
}

/** `2026-09-20` → `2026.09.20` */
export const formatDate = (date) => date.replaceAll('-', '.')
