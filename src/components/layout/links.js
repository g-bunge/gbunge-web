import { STORIES_ENABLED } from '../../data/site.js'
import { pastCars } from '../../data/cars.js'

/**
 * The site's pages, in menu order: the navbar, the mobile menu and the footer all list these.
 * `children` are sub-pages: the navbar drops them down on hover, the mobile menu lists them underneath.
 */
export const links = [
  { id: 'about', href: '/about' },
  { id: 'team', href: '/team' },
  { id: 'pastCars', href: '/past-cars', children: pastCars.map((car) => ({ label: car.name, note: car.year, href: `/past-cars/${car.id}` })) },
  ...(STORIES_ENABLED ? [{ id: 'stories', href: '/stories' }] : []),
  { id: 'sponsors', href: '/sponsors' },
]

/** Whether `href` is the page being shown (or a page under it, like a post under /stories). */
export const isCurrent = (path, href) => path === href || path.startsWith(`${href}/`)
