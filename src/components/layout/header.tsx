'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const navLinks = [
  { label: 'Why Face Yoga', href: '#transformations' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
          padding: isScrolled ? '10px 8px' : '0px',
        }}
      >
        <motion.header
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="transition-all duration-500 ease-out"
          style={{
            width: isScrolled ? '98%' : '100%',
            maxWidth: isScrolled ? '1400px' : '100%',
            backgroundColor: isScrolled
              ? 'rgba(55, 55, 55, 0.65)'
              : 'transparent',
            backdropFilter: isScrolled ? 'blur(60px) saturate(200%)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(60px) saturate(200%)' : 'none',
            borderRadius: isScrolled ? '999px' : '0px',
            border: '1px solid',
            borderColor: isScrolled ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
            boxShadow: isScrolled ? '0 4px 24px rgba(0, 0, 0, 0.1)' : 'none',
            outline: 'none',
          }}
        >
          {/* Inner content container */}
          <div
            className="flex items-center justify-between transition-all duration-500"
            style={{
              height: isScrolled ? '52px' : '64px',
              padding: isScrolled ? '0 20px' : '0 32px',
            }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-[15px] font-semibold text-white tracking-[-0.01em]">
                {SITE_CONFIG.name}
              </span>
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
              <Link
                href="/admin/login"
                className="px-4 py-2 text-[13px] text-white hover:text-white rounded-full hover:bg-white/10 transition-all duration-200"
              >
                Login
              </Link>
              {/* CTA Button */}
              <Link
                href="/form"
                className="h-9 px-5 inline-flex items-center text-white text-[13px] font-medium rounded-full hover:bg-white/25 transition-all duration-200"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                Start my plan
              </Link>
            </div>

            {/* Mobile: Start my plan + Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/form"
                className="h-9 px-4 inline-flex items-center text-white text-[13px] font-medium rounded-full transition-all duration-200"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                Start my plan
              </Link>
              <button
                className="p-2 text-white rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" strokeWidth={1.5} />
                ) : (
                  <Menu className="h-5 w-5" strokeWidth={1.5} />
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
                  href="/admin/login"
                  className="text-[15px] text-white/70 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/form"
                  className="h-12 px-8 inline-flex items-center text-white text-[15px] font-medium rounded-full hover:bg-white/20 transition-all"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start my plan
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
