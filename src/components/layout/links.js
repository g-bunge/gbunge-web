import { STORIES_ENABLED } from '../../data/site.js'

/** The site's pages, in menu order: the navbar, the mobile menu and the footer all list these. */
export const links = [
  { id: 'about', href: '/about' },
  { id: 'team', href: '/team' },
  { id: 'pastCars', href: '/past-cars' },
  ...(STORIES_ENABLED ? [{ id: 'stories', href: '/stories' }] : []),
  { id: 'sponsors', href: '/sponsors' },
]

/** Whether `href` is the page being shown (or a page under it, like a post under /stories). */
export const isCurrent = (path, href) => path === href || path.startsWith(`${href}/`)
