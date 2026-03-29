import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { FaLink, FaDumbbell, FaSeedling, FaUtensils } from 'react-icons/fa'

const keywords = [
  'AWS Lambda', 'DynamoDB', 'API Gateway', 'SNS', 'EventBridge', 'Google Maps',
  'Spring Boot', 'PostgreSQL', 'REST API', 'REST APIs', 'RESTful', 'JPA', 'Maven',
  'JWT', 'OpenAPI', 'JUnit', 'Python', 'Java', 'CRUD',
  'serverless', 'barcode scanning', 'authentication',
  'Spring AI', 'Google Gemini', 'SSE', 'React', 'TypeScript', 'Docker', 'AWS ECS',
  'streaming', 'structured output',
]

function highlightKeywords(text) {
  const escaped = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`\\b(${escaped.join('|')})\\b`, 'g')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    keywords.includes(part)
      ? <span key={i} className="text-gray-900 dark:text-white font-semibold">{part}</span>
      : part
  )
}

const projects = [
  {
    title: 'CookGenie',
    description:
      'An AI-powered recipe assistant showcasing Spring AI integration with Google Gemini. Features real-time streaming via SSE, structured output extraction into typed Java records, autonomous tool calling for nutrition lookup and ingredient substitution, and conversation memory across turns.',
    tech: ['React', 'TypeScript', 'Spring Boot', 'Spring AI', 'Google Gemini', 'SSE', 'Docker', 'AWS ECS'],
    github: 'https://github.com/Harsh7-dev/CookGenie',
    live: null,
    gradient: 'from-orange-500 to-amber-500',
    icon: <FaUtensils size={18} />,
  },
  {
    title: 'Food Waste Management',
    description:
      'A full-stack serverless application built on AWS Lambda to track food inventory, reduce waste, and locate nearby food banks. Features automated expiration alerts via SNS, barcode scanning, Google Maps integration, and JWT authentication.',
    tech: ['Python', 'AWS Lambda', 'DynamoDB', 'API Gateway', 'SNS', 'EventBridge', 'Google Maps API'],
    github: 'https://github.com/Harsh7-dev/food-waste-management',
    live: null,
    gradient: 'from-emerald-500 to-teal-500',
    icon: <FaSeedling size={20} />,
  },
  {
    title: 'URL Shortener',
    description:
      'A Spring Boot REST API service that converts long URLs into shortened codes with automatic redirection, access metrics tracking, and full CRUD operations backed by PostgreSQL.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'REST APIs', 'JPA', 'Maven'],
    github: 'https://github.com/Harsh7-dev/URL-Shortener',
    live: null,
    gradient: 'from-primary to-purple-500',
    icon: <FaLink size={18} />,
  },
  {
    title: 'Workout Tracker',
    description:
      'A secure RESTful backend application with JWT authentication, full CRUD APIs for workout and progress management, relational database design, OpenAPI documentation, and comprehensive unit testing.',
    tech: ['Java', 'Spring Boot', 'JWT', 'REST APIs', 'PostgreSQL', 'JUnit', 'OpenAPI'],
    github: 'https://github.com/Harsh7-dev/Workout-Traker',
    live: null,
    gradient: 'from-rose-500 to-orange-500',
    icon: <FaDumbbell size={20} />,
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
      {/* Background pattern */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e2a45_1px,transparent_1px)] bg-size-[24px_24px]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="absolute top-10 left-[8%] w-20 h-20 border-2 border-accent/10 rounded-2xl pointer-events-none"
        animate={{ rotate: [0, 90, 180, 270, 360], y: [0, -15, 0] }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, y: { duration: 6, repeat: Infinity } }}
      />
      <motion.div
        className="absolute bottom-20 right-[10%] w-6 h-6 bg-rose/15 rounded-full pointer-events-none"
        animate={{ y: [0, -20, 0], scale: [1, 1.5, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Projects</h2>
          <motion.div
            className="w-16 h-1 bg-linear-to-r from-primary to-accent rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ y: -12, transition: { duration: 0.3, type: 'spring', stiffness: 300 } }}
              onHoverStart={() => setHoveredProject(i)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative bg-white dark:bg-surface border border-border rounded-2xl overflow-hidden card-hover cursor-default"
            >
              {/* Animated gradient bar */}
              <motion.div
                className={`h-1.5 bg-linear-to-r ${project.gradient}`}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
                style={{ transformOrigin: 'left' }}
              />

              {/* Background glow */}
              <motion.div
                className="absolute -top-20 -right-20 w-60 h-60 bg-linear-to-br from-primary/10 to-purple-500/5 rounded-full blur-3xl"
                animate={{ opacity: hoveredProject === i ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.span
                      className={`w-10 h-10 flex items-center justify-center rounded-xl bg-linear-to-br ${project.gradient} text-white shadow-md`}
                      animate={hoveredProject === i ? { rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {project.icon}
                    </motion.span>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface text-text-muted hover:bg-gray-800 hover:text-white transition-all"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiGithub size={18} />
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface text-text-muted hover:bg-primary hover:text-white transition-all"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiExternalLink size={18} />
                      </motion.a>
                    )}
                  </div>
                </div>
                <p className="text-text-muted text-sm leading-relaxed mb-5">
                  {highlightKeywords(project.description)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, j) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.6 + j * 0.06, type: 'spring', stiffness: 200 }}
                      whileHover={{ scale: 1.15, y: -2 }}
                      className="bg-primary-light dark:bg-primary/15 text-primary dark:text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-default"
                    >
                      {t}
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
