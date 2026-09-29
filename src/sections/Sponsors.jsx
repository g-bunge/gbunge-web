import Marquee from '../components/ui/Marquee.jsx'
import { sponsors } from '../data/sponsors.js'

export default function Sponsors() {
  return (
    <section id="sponsors" aria-label="Sponsors">
      <Marquee className="h-50" items={sponsors} duration={46} />
    </section>
  )
}
