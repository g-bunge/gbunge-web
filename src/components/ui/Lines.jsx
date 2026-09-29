import { Fragment } from 'react'

/** Renders a string as-is, or an array of strings separated by <br />. */
export default function Lines({ lines }) {
  if (!Array.isArray(lines)) return lines
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ))
}
