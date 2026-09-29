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
import StoriesPage from './pages/StoriesPage.jsx'
import PostPage from './pages/PostPage.jsx'
import SponsorsPage from './pages/SponsorsPage.jsx'
import RacePage from './pages/RacePage.jsx'
import ReactionPage from './pages/ReactionPage.jsx'
import { STORIES_ENABLED } from './data/site.js'

/* Plain path routing: links are ordinary <a href>, so each page is a full load. */
const pages = { '/about': AboutPage, '/team': TeamPage, '/past-cars': PastCarsPage, '/sponsors': SponsorsPage, ...(STORIES_ENABLED && { '/stories': StoriesPage }) }
const path = window.location.pathname.replace(/\/+$/, '')
const postSlug = STORIES_ENABLED ? path.match(/^\/stories\/([\w-]+)$/)?.[1] : undefined
const Page = pages[path]

export default function App() {
  // hidden minigames take the whole screen: no navbar or footer
  if (path === '/race') return <RacePage />
  if (path === '/reaction') return <ReactionPage />

  if (Page || postSlug) {
    return (
      <>
        <Navbar alwaysVisible />
        {postSlug ? <PostPage slug={postSlug} /> : <Page />}
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
