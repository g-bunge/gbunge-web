/*
 * Pulls the blog from Notion into src/data/notion-posts.json, downloading every image into
 * public/notion/ (Notion's own image links expire after an hour). Runs before `dev` and `build`.
 *
 * Needs, in .env.local (locally) or the host's environment variables (see .env.example):
 *   NOTION_TOKEN       : an internal integration's secret, with both databases shared to it
 *   NOTION_BLOG_KO_DB  : id of "blog (KOR)"
 *   NOTION_BLOG_EN_DB  : id of "blog (ENG)" (optional; posts fall back to Korean without it)
 * Without a token it leaves the current file alone, so the site keeps building with what it has.
 *
 * Only pages whose Status is "Published" are included. Property names are in PROPS below -
 * change them there if the databases' columns are renamed.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_JSON = path.join(ROOT, 'src/data/notion-posts.json')
const IMG_DIR = path.join(ROOT, 'public/notion')

const PROPS = {
  title: '제목',
  category: '카테고리',
  team: '팀',
  author: '작성자',
  date: '작성일',
  status: 'Status',
  published: 'Published',
  // optional columns: used when present
  excerpt: '요약',
  slug: 'slug',
  // blog (ENG) → its Korean original
  original: '원본',
}

/* Notion 팀 option → group id in members.js (matched case-insensitively; anything else is shown as written) */
const TEAMS = {
  aero: 'aerodynamics',
  aerodynamics: 'aerodynamics',
  manufacturing: 'manufacturing',
  powertrain: 'powertrain',
  hv: 'high-voltage',
  'high voltage': 'high-voltage',
  lv: 'low-voltage',
  'low voltage': 'low-voltage',
  marketing: 'marketing',
  operation: 'operation',
  'c-baja': 'c-baja',
}

const { NOTION_TOKEN, NOTION_BLOG_KO_DB, NOTION_BLOG_EN_DB } = process.env

/* ---------- Notion REST ---------- */

async function notion(endpoint, body) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`https://api.notion.com/v1/${endpoint}`, {
      method: body ? 'POST' : 'GET',
      headers: { Authorization: `Bearer ${NOTION_TOKEN}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
      body: body && JSON.stringify(body),
    })
    if (res.status === 429 && attempt < 5) {
      await new Promise((r) => setTimeout(r, Number(res.headers.get('retry-after') ?? 1) * 1000))
      continue
    }
    const data = await res.json()
    if (!res.ok) throw new Error(`Notion ${endpoint}: ${data.message ?? res.status}`)
    return data
  }
}

/* every result of a paginated call */
async function all(fetchPage) {
  const out = []
  let cursor
  do {
    const page = await fetchPage(cursor)
    out.push(...page.results)
    cursor = page.has_more ? page.next_cursor : undefined
  } while (cursor)
  return out
}

const queryDb = (id, filter, sorts) => all((start_cursor) => notion(`databases/${id}/query`, { filter, sorts, start_cursor, page_size: 100 }))
const children = (id) => all((cursor) => notion(`blocks/${id}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ''}`))

/* ---------- images ---------- */

/* Notion-hosted files expire, so they're saved under public/notion/; external links are kept as they are. */
async function saveImage(file, name) {
  if (!file) return null
  if (file.type === 'external') return file.external.url
  const url = file.file.url
  const ext = path.extname(new URL(url).pathname) || '.jpg'
  const res = await fetch(url)
  if (!res.ok) throw new Error(`image ${name}: ${res.status}`)
  await fs.writeFile(path.join(IMG_DIR, name + ext), Buffer.from(await res.arrayBuffer()))
  return `/notion/${name}${ext}`
}

/* ---------- properties ---------- */

const plain = (rich = []) => rich.map((r) => r.plain_text).join('')

function prop(page, name) {
  const p = page.properties[name]
  if (!p) return null
  switch (p.type) {
    case 'title':
      return plain(p.title)
    case 'rich_text':
      return plain(p.rich_text)
    case 'select':
      return p.select?.name ?? null
    case 'multi_select':
      return p.multi_select[0]?.name ?? null
    case 'status':
      return p.status?.name ?? null
    case 'people':
      return p.people[0]?.name ?? null
    case 'date':
      return p.date?.start?.slice(0, 10) ?? null
    case 'relation':
      return p.relation.map((r) => r.id)
    default:
      return null
  }
}

/* ---------- body ---------- */

/* Notion rich text → [{ text, bold, italic, strike, underline, code, href }], dropping the defaults */
const rich = (items = []) =>
  items.map(({ plain_text: text, href, annotations: a }) => ({
    text,
    ...(a.bold && { bold: true }),
    ...(a.italic && { italic: true }),
    ...(a.strikethrough && { strike: true }),
    ...(a.underline && { underline: true }),
    ...(a.code && { code: true }),
    ...(href && { href }),
  }))

/*
 * Page blocks → the site's body format (see PostBody.jsx). Consecutive list items are grouped
 * into one list. Nested blocks and anything unsupported (tables, embeds…) are skipped.
 */
async function toBody(pageId, slug) {
  const blocks = await children(pageId)
  const body = []
  let imageCount = 0
  for (const block of blocks) {
    const { type } = block
    const value = block[type]
    const last = body.at(-1)
    if (type === 'paragraph') {
      if (value.rich_text.length) body.push({ type: 'p', text: rich(value.rich_text) })
    } else if (type === 'heading_1' || type === 'heading_2') {
      body.push({ type: 'h2', text: rich(value.rich_text) })
    } else if (type === 'heading_3') {
      body.push({ type: 'h3', text: rich(value.rich_text) })
    } else if (type === 'bulleted_list_item' || type === 'numbered_list_item') {
      const list = type === 'bulleted_list_item' ? 'ul' : 'ol'
      if (last?.type === list) last.items.push(rich(value.rich_text))
      else body.push({ type: list, items: [rich(value.rich_text)] })
    } else if (type === 'quote' || type === 'callout') {
      body.push({ type: 'quote', text: rich(value.rich_text) })
    } else if (type === 'divider') {
      body.push({ type: 'hr' })
    } else if (type === 'image') {
      const src = await saveImage(value, `${slug}-${++imageCount}`)
      body.push({ type: 'img', src, caption: rich(value.caption) })
    }
  }
  return body
}

const firstParagraph = (body) => {
  const text = plain((body.find((b) => b.type === 'p')?.text ?? []).map((r) => ({ plain_text: r.text })))
  return text.length > 120 ? `${text.slice(0, 120).trimEnd()}…` : text
}

/* ---------- main ---------- */

async function main() {
  if (!NOTION_TOKEN || !NOTION_BLOG_KO_DB) {
    console.log('[notion] NOTION_TOKEN / NOTION_BLOG_KO_DB not set: keeping the current posts.')
    try {
      await fs.access(OUT_JSON)
    } catch {
      await fs.writeFile(OUT_JSON, '[]\n')
    }
    return
  }

  const published = { property: PROPS.status, status: { equals: PROPS.published } }
  const ko = await queryDb(NOTION_BLOG_KO_DB, published, [{ property: PROPS.date, direction: 'descending' }])
  // English versions, keyed by the Korean page they point back to
  const en = new Map()
  if (NOTION_BLOG_EN_DB) {
    for (const page of await queryDb(NOTION_BLOG_EN_DB)) {
      for (const id of prop(page, PROPS.original) ?? []) en.set(id, page)
    }
  }

  await fs.rm(IMG_DIR, { recursive: true, force: true })
  await fs.mkdir(IMG_DIR, { recursive: true })

  const posts = []
  for (const page of ko) {
    const slug = (prop(page, PROPS.slug) || page.id.replaceAll('-', '')).trim()
    const enPage = en.get(page.id)
    const bodyKo = await toBody(page.id, slug)
    const bodyEn = enPage ? await toBody(enPage.id, `${slug}-en`) : bodyKo
    const teamRaw = prop(page, PROPS.team)
    const excerptKo = prop(page, PROPS.excerpt) || firstParagraph(bodyKo)

    posts.push({
      slug,
      category: prop(page, PROPS.category),
      team: teamRaw && (TEAMS[teamRaw.toLowerCase()] ?? teamRaw),
      author: prop(page, PROPS.author),
      date: prop(page, PROPS.date),
      cover: await saveImage(page.cover, `${slug}-cover`),
      title: { ko: prop(page, PROPS.title), en: (enPage && prop(enPage, PROPS.title)) || prop(page, PROPS.title) },
      excerpt: { ko: excerptKo, en: (enPage && (prop(enPage, PROPS.excerpt) || firstParagraph(bodyEn))) || excerptKo },
      body: { ko: bodyKo, en: bodyEn },
    })
  }

  await fs.writeFile(OUT_JSON, `${JSON.stringify(posts, null, 2)}\n`)
  console.log(`[notion] ${posts.length} published posts written to src/data/notion-posts.json`)
}

main().catch((err) => {
  console.error(`[notion] ${err.message}`)
  process.exit(1)
})
