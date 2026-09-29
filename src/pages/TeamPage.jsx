import { useState } from 'react'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { ArrowUpRight, GitHubIcon, InstagramIcon, LinkedInIcon, MailIcon } from '../components/ui/Icons.jsx'
import { teams } from '../data/team.js'
import { advisors, memberGroups } from '../data/members.js'
import useLang from '../i18n/LanguageContext.js'
import cx from '../lib/cx.js'
import { ROSTER_ENABLED } from '../data/site.js'

const groupSize = Object.fromEntries(memberGroups.map((g) => [g.id, g.members.length]))

/* How each `contact` field becomes a link. */
const contactLinks = {
  email: { label: 'Email', Icon: MailIcon, href: (v) => `mailto:${v}` },
  instagram: { label: 'Instagram', Icon: InstagramIcon, href: (v) => `https://www.instagram.com/${v}/` },
  linkedin: { label: 'LinkedIn', Icon: LinkedInIcon, href: (v) => v },
  github: { label: 'GitHub', Icon: GitHubIcon, href: (v) => `https://github.com/${v}` },
}

/** /team page: sub-teams and the member roster. */
export default function TeamPage() {
  const { lang, t } = useLang()
  const copy = t.teamPage
  const [open, setOpen] = useState(null)
  // with the roster hidden, the sub-team cards have nothing to jump to
  const SubCard = ROSTER_ENABLED ? 'a' : 'div'

  return (
    <>
      <PageHero eyebrow="26/27 TEAM" title="Meet Our Team" lead={copy.teamLead} img="/images/team-award-2026.jpg" focus="60% 88%" alt={copy.heroAlt} />

      <main>
        <section id="sub-teams" className="px-gutter pt-24 pb-22 tablet:py-18">
          <Reveal>
            <SectionHeading eyebrow="SUB-TEAMS" title="What We Do" />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 tablet:grid-cols-1">
            {teams.map((team, i) => (
              <Reveal key={team.img} delay={(i % 2) * 120}>
                {/* each card jumps to that group's members below */}
                <SubCard
                  className="group/sub grid h-full grid-cols-[136px_1fr] items-center gap-7 border border-line-faint bg-raised p-4 [transition:background_0.3s,border-color_0.3s] hover:border-white/14 hover:bg-surface mobile:grid-cols-[96px_1fr] mobile:gap-4 mobile:p-3"
                  {...(ROSTER_ENABLED && { href: `#${team.img}` })}
                >
                  <span className="block aspect-square overflow-hidden">
                    {team.photo === false ? (
                      <span className="block size-full bg-placeholder" />
                    ) : (
                      <img
                        className="size-full object-cover brightness-85 [transition:scale_0.6s_var(--ease-out),filter_0.6s] group-hover/sub:scale-106 group-hover/sub:brightness-100"
                        src={`/images/team-${team.img}.jpg`}
                        alt=""
                      />
                    )}
                  </span>
                  <span className="flex flex-col pr-3">
                    <span className="mb-2 font-display text-20 font-bold tracking-snug">{team.name}</span>
                    <span className="text-15 leading-6 break-keep text-fg-body">{team.desc[lang]}</span>
                    {ROSTER_ENABLED && (
                      <span className="mt-3.5 inline-flex items-center gap-1.5 font-ui text-13 font-semibold text-brand-end">
                        {groupSize[team.img]} {copy.people}
                        <ArrowUpRight className="size-3.5 transition-[translate] duration-300 ease-out group-hover/sub:translate-x-0.5 group-hover/sub:-translate-y-0.5" />
                      </span>
                    )}
                  </span>
                </SubCard>
              </Reveal>
            ))}
          </div>
        </section>

        {ROSTER_ENABLED && (
          <section id="advisor" className="px-gutter pb-22">
            {advisors.map((advisor) => (
              <Reveal key={advisor.name.en} className="grid grid-cols-[220px_1fr] items-center gap-12 border-y border-line py-12 mobile:grid-cols-1 mobile:gap-8 mobile:py-10">
                {/* grey gradient stands in until a photo is added */}
                <div className="aspect-3/4 overflow-hidden bg-[linear-gradient(#8a8a8a,#595959)] mobile:w-40">
                  {advisor.photo && <img className="size-full object-cover" src={advisor.photo} alt={advisor.name[lang]} />}
                </div>
                <div>
                  <p className="t-eyebrow mb-3 tracking-label">{copy.advisor.toUpperCase()}</p>
                  <h2 className="font-display text-36 leading-[1.15] font-semibold tracking-tight mobile:text-28">
                    {advisor.url ? (
                      <a className="transition-colors duration-300 hover:text-brand-end" href={advisor.url} target="_blank" rel="noreferrer">
                        {advisor.name[lang]}
                      </a>
                    ) : (
                      advisor.name[lang]
                    )}
                  </h2>
                  <p className="mt-2 font-ui text-14 text-fg-muted">{advisor.dept[lang]}</p>
                  <blockquote className="mt-7 max-w-170 border-l-2 border-brand pl-5 text-17 leading-7 break-keep text-fg-body">{advisor.message[lang]}</blockquote>
                </div>
              </Reveal>
            ))}
          </section>
        )}

        {ROSTER_ENABLED && (
          <section id="members" className="px-gutter pt-6 pb-35">
            {memberGroups.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-24 not-first:mt-24 mobile:not-first:mt-16">
                <Reveal className="mb-8 flex items-baseline gap-4 border-b border-line pb-4.5 mobile:mb-5 mobile:pb-3">
                  <h2 className="font-display text-36 font-medium tracking-tight mobile:text-26">{group.name}</h2>
                  <span className="ml-auto font-ui text-14 font-medium text-fg-muted">
                    {group.members.length} {copy.people}
                  </span>
                </Reveal>
                <Reveal className="grid grid-cols-5 gap-4 laptop:grid-cols-4 tablet:grid-cols-3 narrow:grid-cols-2 mobile:gap-2.5">
                  {group.members.map((member) => (
                    <MemberCard
                      key={member.key}
                      member={member}
                      groupId={group.id}
                      lang={lang}
                      copy={copy}
                      isOpen={open === member.key}
                      onToggle={() => setOpen(open === member.key ? null : member.key)}
                    />
                  ))}
                </Reveal>
              </div>
            ))}
          </section>
        )}
      </main>
    </>
  )
}

/*
 * The whole card is the toggle. Opened, it swaps the name plate for a detail panel: every sub-team
 * the person is in, their bio and contact links (which sit above the toggle so they take clicks).
 */
function MemberCard({ member, groupId, lang, copy, isOpen, onToggle }) {
  const contacts = Object.entries(member.contact ?? {}).filter(([key, value]) => value && contactLinks[key])
  const name = 'font-display text-24 leading-[1.15] font-medium mobile:text-18'

  return (
    <article
      className={cx(
        /* grey gradient stands in until a photo is added */
        'group/member relative aspect-3/4 overflow-hidden bg-[linear-gradient(#8a8a8a,#595959)] [transition:translate_0.5s_var(--ease-out),box-shadow_0.5s_var(--ease-out)] hover:-translate-y-1 hover:shadow-card',
        /* keeps the name legible over photos and dims the card when open */
        'after:pointer-events-none after:absolute after:inset-0 after:transition-[background] after:duration-500 after:ease-out',
        isOpen ? 'after:bg-black/80' : 'after:bg-[linear-gradient(transparent_50%,rgb(0_0_0/0.4))]',
      )}
    >
      {member.photo && (
        <img className="absolute inset-0 size-full object-cover transition-[scale] duration-600 ease-out group-hover/member:scale-104" src={member.photo} alt="" />
      )}
      <button
        type="button"
        className="absolute inset-0 z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={`${member.name}, ${member.role}, ${copy.showMore}`}
      >
        <span
          className={cx(
            'absolute top-5 right-5 z-2 size-4.5 transition-[rotate] duration-400 ease-out mobile:top-4 mobile:right-4 mobile:size-3.5',
            'before:absolute before:top-1/2 before:left-0 before:-mt-px before:h-0.5 before:w-full before:rounded-[1px] before:bg-fg',
            'after:absolute after:top-1/2 after:left-0 after:-mt-px after:h-0.5 after:w-full after:rotate-90 after:rounded-[1px] after:bg-fg',
            isOpen ? 'rotate-45' : 'group-hover/member:rotate-90',
          )}
          aria-hidden
        />
      </button>

      <div
        className={cx(
          'pointer-events-none absolute right-4.5 bottom-6 left-5.5 z-2 flex flex-col gap-1.25 [transition:opacity_0.3s,translate_0.5s_var(--ease-out)] mobile:right-3 mobile:bottom-4.5 mobile:left-3.5',
          isOpen && 'translate-y-2 opacity-0',
        )}
        aria-hidden={isOpen}
      >
        <span className={name}>{member.name}</span>
        <span className="font-ui text-14 text-fg-body mobile:text-12">{member.role}</span>
      </div>

      {/* opened panel: name, every team, bio (gives way when space runs out), contacts */}
      <div
        className={cx(
          'pointer-events-none absolute inset-0 z-2 flex flex-col gap-3.5 px-5.5 pt-13 pb-5.5 [transition:opacity_0.35s,translate_0.5s_var(--ease-out)] mobile:gap-2.5 mobile:px-3.5 mobile:pt-11 mobile:pb-3.5',
          isOpen ? 'opacity-100 delay-80' : 'translate-y-3 opacity-0',
        )}
        aria-hidden={!isOpen}
      >
        <span className={name}>{member.name}</span>
        <ul className="flex flex-col gap-2">
          {member.teams.map((team) => {
            const current = team.group === groupId
            return (
              <li
                key={team.group}
                className={cx('flex flex-col border-l-2 pl-2.5 text-13 leading-[1.35] text-fg-body', current ? 'border-brand' : 'border-white/20')}
              >
                <span className={cx('font-ui text-11 font-semibold tracking-wide uppercase', current ? 'text-brand-end' : 'text-fg-muted')}>{team.groupName}</span>
                {team.role}
              </li>
            )
          })}
        </ul>
        <p className="min-h-0 flex-1 overflow-hidden text-13 leading-5 break-keep text-fg-body [mask-image:linear-gradient(#000_70%,transparent)]">{member.bio?.[lang] ?? copy.bioSoon}</p>
        {contacts.length > 0 && (
          <ul className={cx('flex flex-wrap gap-1.5', isOpen && 'pointer-events-auto')}>
            {contacts.map(([key, value]) => {
              const { label, Icon, href } = contactLinks[key]
              const external = key !== 'email'
              return (
                <li key={key}>
                  <a
                    className="grid size-8 place-items-center rounded-full border border-white/30 [transition:background_0.3s,border-color_0.3s] hover:border-transparent hover:bg-brand-gradient focus-visible:border-transparent focus-visible:bg-brand-gradient"
                    href={href(value)}
                    aria-label={label}
                    tabIndex={isOpen ? 0 : -1}
                    {...(external && { target: '_blank', rel: 'noreferrer' })}
                  >
                    <Icon className="size-3.75" />
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </article>
  )
}
