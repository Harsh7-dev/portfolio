import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious()
    setScrolled(latest > 50)
    if (latest > prev && latest > 200) {
      setHidden(true)
      setIsOpen(false)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 dark:bg-[#0a0e1a]/80 backdrop-blur-2xl border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <motion.a
          href="#"
          className="text-xl font-bold text-text"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          &lt;HP<span className="text-primary">&gt;</span>
        </motion.a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <a
                href={link.href}
                className="text-text-muted text-sm font-medium hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="https://drive.google.com/file/d/1kWSjetd41nJbqniFyTa4Ta4mpTtDDm5E/preview"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold rounded-full"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.a>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <ThemeToggle />
          </motion.li>
        </ul>

        {/* Mobile toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text text-2xl"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9, rotate: 90 }}
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white/95 dark:bg-[#0f1629]/95 backdrop-blur-2xl border-b border-border overflow-hidden"
          >
            <ul className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-text-muted text-lg font-medium hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <a
                  href="https://drive.google.com/file/d/1kWSjetd41nJbqniFyTa4Ta4mpTtDDm5E/preview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full"
                >
                  Resume
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <ThemeToggle />
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
