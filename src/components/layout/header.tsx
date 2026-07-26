'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const navLinks = [
  { label: 'Why MapMyFace', href: '/#why' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Experts', href: '/#experts' },
  { label: 'FAQ', href: '/#faq' },
]

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // On pages without a dark hero (everything except the homepage), show the solid
  // pill from the top so the white logo/nav stay visible on the white background.
  const solid = isScrolled || pathname !== '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Navbar container - fixed at top */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out"
        style={{
          padding: solid ? '10px 8px' : '0px',
        }}
      >
        <motion.header
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="transition-all duration-500 ease-out"
          style={{
            width: solid ? '98%' : '100%',
            maxWidth: solid ? '1400px' : '100%',
            backgroundColor: isScrolled
              ? 'rgba(21, 36, 33, 0.72)'
              : 'transparent',
            backdropFilter: solid ? 'blur(60px) saturate(200%)' : 'none',
            WebkitBackdropFilter: solid ? 'blur(60px) saturate(200%)' : 'none',
            borderRadius: solid ? '999px' : '0px',
            border: '1px solid',
            borderColor: solid ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
            boxShadow: solid ? '0 4px 24px rgba(0, 0, 0, 0.1)' : 'none',
            outline: 'none',
          }}
        >
          {/* Inner content container */}
          <div
            className="flex items-center justify-between transition-all duration-500"
            style={{
              height: solid ? '58px' : '68px',
              padding: solid ? '0 14px' : '0 10px',
            }}
          >
            {/* Logo — brand mark only, rendered white for the dark navbar */}
            <Link href="/" className="flex items-center" aria-label={`${SITE_CONFIG.name} home`}>
              <Image
                src="/logo-mark.png"
                alt={SITE_CONFIG.name}
                width={52}
                height={52}
                priority
                style={{ filter: 'brightness(0) invert(1) drop-shadow(0 1px 3px rgba(0,0,0,0.35))' }}
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-[13px] text-white hover:text-white rounded-full hover:bg-white/10 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2">
              {/* CTA Button */}
              <Link
                href="/form"
                className="h-9 px-5 inline-flex items-center bg-white text-ink text-[13px] font-semibold rounded-full hover:bg-white/90 transition-colors duration-200"
              >
                Start My Face Map
              </Link>
            </div>

            {/* Mobile: Start My Face Map + Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/form"
                className="h-10 px-4 inline-flex items-center bg-white text-ink text-[13px] font-semibold rounded-full hover:bg-white/90 transition-colors duration-200"
              >
                Start My Face Map
              </Link>
              <button
                className="p-2 -mr-1 text-white rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" strokeWidth={2.25} />
                ) : (
                  <Menu className="h-6 w-6" strokeWidth={2.25} />
                )}
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden flex items-center justify-center"
            style={{
              backgroundColor: 'rgba(40, 40, 40, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-medium text-white hover:text-white/70 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-4 mt-6"
              >
                <Link
                  href="/form"
                  className="h-12 px-8 inline-flex items-center text-white text-[15px] font-medium rounded-full hover:bg-white/20 transition-all"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start My Face Map
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
