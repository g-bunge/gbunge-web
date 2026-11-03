import Navbar from './components/layout/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import Sponsors from './sections/Sponsors.jsx'
import About from './sections/About.jsx'
import Team from './sections/Team.jsx'
import Stories from './sections/Stories.jsx'
import SponsorCta from './sections/SponsorCta.jsx'
import Footer from './sections/Footer.jsx'
import AboutPage from './pages/AboutPage.jsx'
import TeamPage from './pages/TeamPage.jsx'
import PastCarsPage from './pages/PastCarsPage.jsx'
import CarPage from './pages/CarPage.jsx'
import StoriesPage from './pages/StoriesPage.jsx'
import PostPage from './pages/PostPage.jsx'
import SponsorsPage from './pages/SponsorsPage.jsx'
import RacePage from './pages/RacePage.jsx'
import ReactionPage from './pages/ReactionPage.jsx'
import { STORIES_ENABLED } from './data/site.js'
import { findCar } from './data/cars.js'
import { currentPath } from './lib/url.js'

/* Plain path routing: links are ordinary <a href>, so each page is a full load. */
const pages = { '/about': AboutPage, '/team': TeamPage, '/past-cars': PastCarsPage, '/sponsors': SponsorsPage, ...(STORIES_ENABLED && { '/stories': StoriesPage }) }
const path = currentPath()
const postSlug = STORIES_ENABLED ? path.match(/^\/stories\/([\w-]+)$/)?.[1] : undefined
/* /past-cars/mk5 etc.: one page per car; an unknown id falls through to the home page like any unknown path */
const car = findCar(path.match(/^\/past-cars\/([\w-]+)$/)?.[1])
const Page = pages[path] ?? (postSlug && PostPage) ?? (car && CarPage)

export default function App() {
  // hidden minigames take the whole screen: no navbar or footer
  if (path === '/race') return <RacePage />
  if (path === '/reaction') return <ReactionPage />

  if (Page) {
    return (
      <>
        <Navbar alwaysVisible />
        <Page slug={postSlug} car={car} />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Hero />
      <main>
        <Sponsors />
        <About />
        <Team />
        {STORIES_ENABLED && <Stories />}
        <SponsorCta />
      </main>
      <Footer />
    </>
  )
}
