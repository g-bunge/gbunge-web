import cx from '../../lib/cx.js'

/* hover fill that sweeps in from the left (the ::before) */
const filled =
  'relative isolate inline-flex h-button items-center justify-center overflow-hidden whitespace-nowrap px-8.5 text-button font-semibold ' +
  '[transition:translate_0.3s_var(--ease-out),color_0.3s] hover:-translate-y-0.5 ' +
  'before:absolute before:inset-0 before:-z-1 before:-translate-x-[101%] before:transition-transform before:duration-450 before:ease-out hover:before:translate-x-0 ' +
  'disabled:pointer-events-none disabled:opacity-60'

const variants = {
  primary: `${filled} bg-brand-gradient text-fg before:bg-brand-gradient-hover`,
  light: `${filled} bg-fg text-fg-on-light before:bg-brand-gradient hover:text-fg`,
  /* text link: brand colour, underline, ↗ arrow (pass the icon as a child) */
  link:
    'group/link inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-15 font-semibold text-brand-end underline decoration-1 underline-offset-5 ' +
    '[&>svg]:size-4 [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:ease-out hover:[&>svg]:translate-x-0.5 hover:[&>svg]:-translate-y-0.5',
}

/**
 * Brand button. Renders an <a> when `href` is given, otherwise a <button>.
 * variant: 'primary' (brand gradient) | 'light' (white, fills with the gradient on hover) | 'link'
 */
export default function Button({ variant = 'primary', href, className = '', children, ...rest }) {
  const cls = cx(variants[variant], className)
  if (href) {
    return (
      <a className={cls} href={href} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}
