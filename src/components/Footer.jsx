import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { FiArrowUp } from 'react-icons/fi'

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <footer className="border-t border-border py-10 px-6 bg-surface relative" ref={ref}>
      {/* Back to top */}
      <motion.a
        href="#"
        className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-surface dark:bg-[#0f1629] border border-border text-text-muted hover:text-primary hover:border-primary shadow-md dark:shadow-black/30 transition-all"
        whileHover={{ y: -4, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <FiArrowUp size={18} />
      </motion.a>

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-lg font-bold text-text">
            &lt;/HP<span className="text-primary">&gt;</span>
          </span>
          <p className="text-text-muted text-sm mt-1">
            &copy; {new Date().getFullYear()} Harsh Patel. Built with passion for scalable systems and clean engineering.
          </p>
        </motion.div>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { icon: <FaLinkedinIn size={14} />, href: 'https://www.linkedin.com/in/harshhk/', hover: 'hover:bg-primary', label: 'LinkedIn' },
            { icon: <FaGithub size={14} />, href: 'https://github.com/Harsh7-dev', hover: 'hover:bg-gray-800', label: 'GitHub' },
            { icon: <HiOutlineMail size={14} />, href: 'mailto:harshbpatel151@gmail.com', hover: 'hover:bg-primary', label: 'Email' },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target={item.href.startsWith('mailto') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              aria-label={item.label}
              className={`w-9 h-9 flex items-center justify-center rounded-full border border-border text-text-muted ${item.hover} hover:text-white hover:border-transparent transition-all`}
              whileHover={{ scale: 1.25, y: -3, rotate: [0, -5, 5, 0] }}
              whileTap={{ scale: 0.85 }}
            >
              {item.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </footer>
  )
}
