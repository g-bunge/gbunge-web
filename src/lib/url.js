/*
 * The site can be served from a sub-path (GitHub Pages: /gbunge-web/). Vite's `base` (BASE_PATH in
 * vite.config.js) sets it at build time; paths in the code are written from the site root.
 */
const BASE = import.meta.env.BASE_URL

/** A site-root path ('/about', '/images/x.jpg') under the base; anything else (#top, mailto:, https:) as is. */
export const url = (path) => (path?.startsWith('/') && !path.startsWith('//') ? BASE + path.slice(1) : path)

/** The current page's path without the base or a trailing slash: '' for home, '/about', '/stories/x'. */
export const currentPath = () => `/${window.location.pathname.slice(BASE.length)}`.replace(/\/+$/, '')
