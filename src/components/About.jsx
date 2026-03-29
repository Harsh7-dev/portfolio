import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { HiOutlineLocationMarker, HiOutlineAcademicCap, HiOutlineBriefcase } from 'react-icons/hi'

const infoItems = [
  { icon: <HiOutlineLocationMarker size={20} />, label: 'Location', value: 'San Francisco, CA', gradient: 'from-rose-500 to-pink-500' },
  { icon: <HiOutlineAcademicCap size={20} />, label: 'Education', value: 'M.S. Computer Science, CSU East Bay', gradient: 'from-primary to-purple-500' },
  { icon: <HiOutlineBriefcase size={20} />, label: 'Current', value: 'Software Engineer @ Databricks', gradient: 'from-accent to-cyan-400' },
]

const techStack = ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Kubernetes']

const aboutText = "I'm a Software Engineer currently at Databricks, where I design and implement scalable Java Spring Boot microservices for internal data platform services. I'm passionate about building reliable, high-performance backend systems. I bring a strong focus on clean architecture, distributed systems, and operational excellence."

function ScrollHighlightText({ text, scrollYProgress }) {
  const words = text.split(' ')
  return (
    <p className="text-lg leading-relaxed mb-8">
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return <HighlightWord key={i} word={word} range={[start, end]} scrollYProgress={scrollYProgress} />
      })}
    </p>
  )
}

function HighlightWord({ word, range, scrollYProgress }) {
  const opacity = useTransform(scrollYProgress, range, [0.15, 1])
  const color = useTransform(scrollYProgress, range, ['var(--color-text-muted)', 'var(--color-text)'])
  return (
    <motion.span style={{ opacity, color }} className="font-medium transition-none">
      {word}{' '}
    </motion.span>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start 0.9', 'start 0.3'] })

  return (
    <section id="about" className="py-24 px-6 section-divider pb-28">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <motion.div
            className="w-16 h-1 bg-linear-to-r from-primary to-accent rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <div ref={scrollRef}>
            <ScrollHighlightText text={aboutText} scrollYProgress={scrollYProgress} />

            {/* Animated tech marquee */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="overflow-hidden relative"
            >
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider mb-3">Core Technologies</p>
              <div className="flex gap-3 flex-wrap">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08, type: 'spring', stiffness: 200 }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    className="px-4 py-2 bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/15 dark:to-accent/15 border border-primary/15 dark:border-primary/25 text-text text-sm font-medium rounded-xl cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3"
          >
            {infoItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 50, filter: 'blur(5px)' }}
                animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
                whileHover={{ x: 10, scale: 1.02, transition: { duration: 0.2 } }}
                className="card-hover flex items-center gap-4 p-4 bg-surface rounded-xl border border-border cursor-default group"
              >
                <motion.span
                  className={`w-11 h-11 flex items-center justify-center rounded-xl bg-linear-to-br ${item.gradient} text-white shadow-sm`}
                  whileHover={{ rotate: [0, -15, 15, -5, 0], scale: 1.1, transition: { duration: 0.5 } }}
                >
                  {item.icon}
                </motion.span>
                <div className="flex-1">
                  <p className="text-text-muted text-xs font-medium uppercase tracking-wider">{item.label}</p>
                  <p className="text-text text-sm font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
