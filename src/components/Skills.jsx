import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaCode, FaServer, FaDatabase, FaCloud, FaVial, FaShieldAlt } from 'react-icons/fa'

const skillCategories = [
  {
    title: 'Languages',
    icon: <FaCode />,
    gradient: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50 dark:bg-violet-500/15 dark:text-violet-300',
    border: 'hover:border-violet-300',
    skills: ['Java', 'Python', 'Go', 'SQL', 'JavaScript', 'TypeScript', 'C/C++', 'C#'],
  },
  {
    title: 'Backend & Frameworks',
    icon: <FaServer />,
    gradient: 'from-primary to-primary-dark',
    bg: 'bg-primary-light dark:bg-primary/15 dark:text-indigo-300',
    border: 'hover:border-primary',
    skills: ['Spring Boot', 'FastAPI', 'REST APIs', 'Microservices', 'Apache Kafka', '.NET'],
  },
  {
    title: 'Databases',
    icon: <FaDatabase />,
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50 dark:bg-emerald-500/15 dark:text-emerald-300',
    border: 'hover:border-emerald-300',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'DynamoDB'],
  },
  {
    title: 'Cloud & DevOps',
    icon: <FaCloud />,
    gradient: 'from-accent to-primary',
    bg: 'bg-cyan-50 dark:bg-cyan-500/15 dark:text-cyan-300',
    border: 'hover:border-cyan-300',
    skills: ['AWS (EC2, ECS, Lambda, S3)', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    title: 'Testing & Monitoring',
    icon: <FaVial />,
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50 dark:bg-amber-500/15 dark:text-amber-300',
    border: 'hover:border-amber-300',
    skills: ['JUnit', 'Mockito', 'Prometheus', 'Grafana', 'ELK Stack'],
  },
  {
    title: 'Security & Tools',
    icon: <FaShieldAlt />,
    gradient: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50 dark:bg-rose-500/15 dark:text-rose-300',
    border: 'hover:border-rose-300',
    skills: ['TLS/SSL', 'OAuth 2.0', 'JWT', 'Git', 'Maven'],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e2a45_1px,transparent_1px)] bg-size-[24px_24px]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.6 } : {}}
        transition={{ duration: 1 }}
      />

      {/* Floating decorations */}
      <motion.div
        className="absolute top-16 right-[8%] w-24 h-24 border-2 border-primary/10 rounded-3xl pointer-events-none"
        animate={{ rotate: 360, y: [0, -20, 0] }}
        transition={{ rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <motion.div
        className="absolute bottom-16 left-[5%] w-16 h-16 bg-accent/8 rounded-full pointer-events-none"
        animate={{ y: [0, -25, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[40%] left-[3%] w-4 h-4 bg-warm/20 rounded-full pointer-events-none"
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Skills</h2>
          <motion.div
            className="w-16 h-1 bg-linear-to-r from-primary to-accent rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -10, transition: { duration: 0.25, type: 'spring', stiffness: 300 } }}
              onHoverStart={() => setHoveredCard(i)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`card-hover bg-white dark:bg-surface border border-border ${cat.border} rounded-2xl p-6 cursor-default relative overflow-hidden`}
            >
              {/* Background gradient glow */}
              <motion.div
                className={`absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br ${cat.gradient} rounded-full blur-3xl`}
                animate={{ opacity: hoveredCard === i ? 0.12 : 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <motion.span
                    className={`w-11 h-11 flex items-center justify-center rounded-xl bg-linear-to-br ${cat.gradient} text-white text-sm shadow-md`}
                    animate={hoveredCard === i ? { rotate: [0, -12, 12, -6, 0], scale: [1, 1.15, 1] } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {cat.icon}
                  </motion.span>
                  <h3 className="text-lg font-bold">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.2 + i * 0.1 + j * 0.05, type: 'spring', stiffness: 200 }}
                      whileHover={{ scale: 1.15, y: -3, transition: { duration: 0.15 } }}
                      className={`${cat.bg} text-text text-xs font-semibold px-3 py-1.5 rounded-lg cursor-default`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
