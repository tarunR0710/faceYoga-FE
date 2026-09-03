import Link from 'next/link'
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants'

/**
 * Footer columns follow the blueprint: Explore / Support / Legal / Connect.
 *
 * Support and the two extra legal documents point at anchors and pages that do
 * not exist yet — each one is marked below so they can be wired up as those
 * pages land, rather than shipping links that quietly 404.
 */
const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Your Face Map', href: '/#face-map' },
      { label: 'Experts', href: '/#experts' },
      { label: 'Add-ons', href: '/#add-ons' },
      { label: 'Pricing', href: '/#pricing' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact', href: `mailto:${SITE_CONFIG.email}` },
      { label: 'Clarification support', href: `mailto:${SITE_CONFIG.email}?subject=Clarification` },
      // TODO: point at the rescheduling policy page when it exists.
      { label: 'Rescheduling', href: '/#faq' },
      { label: 'FAQ', href: '/#faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Refund Policy', href: '/refund' },
      // TODO: consent & image policy needs its own page — currently folded
      // into /privacy so the link is not dead.
      { label: 'Consent & Image Policy', href: '/privacy' },
    ],
  },
]

const socials = [
  {
    label: 'Instagram',
    href: SOCIAL_LINKS.instagram,
    icon: (
      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
    ),
  },
  {
    label: 'YouTube',
    href: SOCIAL_LINKS.youtube,
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border-soft bg-white">
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-[17px] tracking-[-0.01em] text-ink" style={{ fontWeight: 500 }}>
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="mt-3 max-w-[260px] text-[13px] leading-relaxed text-ink-muted">
              {SITE_CONFIG.description}
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="mt-4 inline-block text-[12.5px] text-ink/50 transition-colors hover:text-ink"
            >
              {SITE_CONFIG.email}
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/40">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-ink-muted transition-colors duration-150 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect */}
          <div>
            <p className="mb-4 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/40">
              Connect
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/[0.055] text-ink/55 transition-all duration-150 hover:bg-ink/10 hover:text-ink"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border-soft pt-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="text-[12px] text-ink/40">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <p className="max-w-xl text-[11.5px] leading-relaxed text-ink/40 md:text-right">
              MapMyFace provides appearance, routine and educational guidance. It does not diagnose
              or treat medical conditions. Payments secured by Razorpay.
            </p>
          </div>
        </div>

        {/* Big brand wordmark — live text, graphite gradient + sheen (decorative, centered) */}
        <div className="mt-8 text-center leading-none md:mt-12">
          <span className="wordmark-shine inline-block select-none text-[clamp(3.25rem,13vw,7.5rem)]">
            {SITE_CONFIG.name}
          </span>
        </div>
      </div>
    </footer>
  )
}
