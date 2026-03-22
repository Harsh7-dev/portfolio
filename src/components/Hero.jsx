import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { SiDatabricks, SiAccenture, SiLeetcode } from 'react-icons/si'
import crestLogo from '../assets/gradient_logo.png'
import profilePic from '../assets/profile.png'

const roles = ['Software Engineer', 'System Designer', 'Problem Solver']

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    let timeout

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentWord.substring(0, text.length - 1)
              : currentWord.substring(0, text.length + 1)
          )
        },
        isDeleting ? deletingSpeed : typingSpeed
      )
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime])

  return text
}

function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const startTime = performance.now()
    const durationMs = duration * 1000

    function animate(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * value)
      setCount(current)
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration])

  return (
    <span>{count}{suffix}</span>
  )
}

const stats = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 45, suffix: '%', label: 'Throughput Increased' },
  { value: 40, suffix: '%', label: 'Faster Incident Resolution' },
]

const textReveal = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

export default function Hero() {
  const typedText = useTypewriter(roles)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [0, window.innerHeight], [5, -5])
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-5, 5])

  const handleMouse = (e) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  return (
    <section
      className="min-h-screen flex items-center pt-16 px-6 relative overflow-hidden"
      onMouseMove={handleMouse}
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)' }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -60, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-5%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, rgba(245,158,11,0.06) 50%, transparent 70%)' }}
          animate={{
            x: [0, -40, 60, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[30%] left-[40%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)' }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -40, 60, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            background: ['#6366f1', '#06b6d4', '#f43f5e', '#f59e0b', '#8b5cf6', '#10b981'][i],
            opacity: 0.3,
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30 - i * 10, 0],
            x: [0, (i % 2 === 0 ? 20 : -20), 0],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-24 right-[12%] w-20 h-20 border-2 border-primary/15 rounded-2xl pointer-events-none"
        animate={{ rotate: 360, y: [0, -25, 0] }}
        transition={{ rotate: { duration: 25, repeat: Infinity, ease: 'linear' }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <motion.div
        className="absolute bottom-[25%] right-[20%] w-14 h-14 border-2 border-accent/10 rounded-full pointer-events-none"
        animate={{ scale: [1, 1.3, 1], rotate: [0, -180, -360] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[55%] right-[6%] w-3 h-3 bg-warm/30 rounded-full pointer-events-none"
        animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[15%] left-[8%] w-16 h-16 border-2 border-rose/10 rounded-xl pointer-events-none"
        animate={{ rotate: [0, 45, 0, -45, 0], y: [0, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-6xl mx-auto w-full relative">
        {/* Journey wheel — right side */}
        <div className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2" style={{ width: 340, height: 340 }}>
          {/* Spinning outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/10 dark:border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-6 rounded-full border border-accent/8 dark:border-accent/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          {/* Center profile picture */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src={profilePic} alt="Harsh Patel" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>

          {/* Curved arrows between milestones */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 340 340">
            <defs>
              <marker id="arrowhead1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#a78bfa" />
              </marker>
              <marker id="arrowhead2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#f97316" />
              </marker>
            </defs>
            {/* Dots at each milestone */}
            <motion.circle cx="170" cy="40" r="5" fill="#06b6d4"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.2 }}
            />
            <motion.circle cx="283" cy="235" r="5" fill="#8b5cf6"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.4 }}
            />
            <motion.circle cx="57" cy="235" r="5" fill="#f97316"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.6 }}
            />

            {/* Crest Data (-90°) → Accenture (30°) */}
            <motion.path
              d="M 200 42 A 130 130 0 0 1 283 235"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="2"
              strokeDasharray="6 4"
              markerEnd="url(#arrowhead1)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.8, ease: 'easeInOut' }}
            />
            {/* Accenture (30°) → Databricks (150°) */}
            <motion.path
              d="M 283 235 A 130 130 0 0 1 57 235"
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              strokeDasharray="6 4"
              markerEnd="url(#arrowhead2)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 2.5, ease: 'easeInOut' }}
            />
          </svg>

          {/* Company milestones on the wheel */}
          {[
            { icon: <img src={crestLogo} alt="Crest Data" className="w-20 h-8 object-contain brightness-0 invert" loading="lazy" />, label: 'Crest Data', year: '2021', gradient: 'from-accent to-primary', angle: -90, isImage: true },
            { icon: <SiAccenture size={22} />, label: 'Accenture', year: '2022', gradient: 'from-purple-500 to-violet-600', angle: 30 },
            { icon: <SiDatabricks size={22} />, label: 'Databricks', year: '2025', gradient: 'from-red-500 to-orange-500', angle: 150 },
          ].map((milestone, i) => {
            const radius = 130
            const centerX = 170
            const centerY = 170
            const x = centerX + Math.cos((milestone.angle * Math.PI) / 180) * radius
            const y = centerY + Math.sin((milestone.angle * Math.PI) / 180) * radius
            return (
              <motion.div
                key={milestone.year}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ left: x, top: y }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 + i * 0.25, type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  className={`flex items-center justify-center gap-2.5 w-40 h-12 rounded-full bg-linear-to-r ${milestone.gradient} shadow-lg text-white cursor-default`}
                  whileHover={{ scale: 1.1, y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  {milestone.icon}
                  {!milestone.isImage && (
                    <div className="leading-none">
                      <p className="text-xs font-bold">{milestone.label}</p>
                      <p className="text-[10px] opacity-75">{milestone.year}</p>
                    </div>
                  )}
                  {milestone.isImage && (
                    <p className="text-[10px] opacity-75">{milestone.year}</p>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          style={{ rotateX, rotateY, perspective: 1000 }}
          className="max-w-3xl"
        >
          <motion.div
            custom={0}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-light border border-primary/20 rounded-full mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-primary dark:text-indigo-300 font-semibold text-sm">Available for opportunities</span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-4"
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Harsh Patel
            </span>
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div
            custom={2}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <span className="text-2xl md:text-3xl font-bold text-text-muted">
              {typedText}
            </span>
            <span className="inline-block w-[3px] h-7 bg-primary ml-1 align-middle animate-blink" />
          </motion.div>

          <motion.p
            custom={3}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="text-text-muted text-lg md:text-xl max-w-xl mb-8 leading-relaxed"
          >
            Building scalable Spring Boot microservices and distributed systems,
            improving performance and reliability using Kafka, PostgreSQL, Redis, and AWS. Passionate about cloud and AI/ML.
          </motion.p>

          <motion.div
            custom={4}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <motion.a
              href="#contact"
              className="magnetic-btn group relative px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full overflow-hidden"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get In Touch
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent to-primary"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
            <motion.a
              href="#experience"
              className="group px-8 py-3.5 border-2 border-border text-text font-semibold rounded-full hover:border-primary hover:text-primary transition-all"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            custom={5}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 mb-16"
          >
            {[
              { icon: <FaLinkedinIn size={18} />, href: 'https://www.linkedin.com/in/harshhk/', color: 'hover:bg-primary', label: 'LinkedIn' },
              { icon: <FaGithub size={18} />, href: 'https://github.com/Harsh7-dev', color: 'hover:bg-gray-800', label: 'GitHub' },
              { icon: <HiOutlineMail size={18} />, href: 'mailto:harshbpatel151@gmail.com', color: 'hover:bg-primary', label: 'Email' },
              { icon: <SiLeetcode size={18} />, href: 'https://leetcode.com/u/hbp227/', color: 'hover:bg-yellow-500', label: 'LeetCode' },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target={item.href.startsWith('mailto') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                aria-label={item.label}
                className={`relative group w-12 h-12 flex items-center justify-center rounded-full border-2 border-border text-text-muted ${item.color} hover:text-white hover:border-transparent transition-all`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: 1.5 + i * 0.15,
                }}
                whileHover={{ scale: 1.2, y: -4, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.9 }}
              >
                {item.icon}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-primary/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated stat counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap gap-8 md:gap-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="group cursor-default"
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2 + i * 0.3} />
              </div>
              <div className="text-text-muted text-sm font-medium mt-1">{stat.label}</div>
              <motion.div
                className="w-0 h-0.5 bg-primary rounded-full mt-2 group-hover:w-full transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="hidden md:flex justify-center mt-12"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-text-muted hover:text-primary transition-colors group"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Scroll Down</span>
            <FiArrowDown size={24} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
