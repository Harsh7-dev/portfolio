import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const keywords = [
  'Java', 'Spring Boot', 'REST APIs', 'RESTful APIs', 'Apache Kafka', 'Kafka',
  'PostgreSQL', 'Redis', 'Maven', 'Docker', 'Kubernetes', 'AWS', 'AWS EC2',
  'Prometheus', 'Grafana', 'ELK Stack', 'AWS CloudWatch', 'JMeter', 'JVM',
  'HikariCP', 'Swagger', 'OpenAPI', 'RabbitMQ', 'MongoDB', 'Liquibase',
  'Hibernate', 'GC', 'CI/CD', 'EKS', 'SQL', 'Jenkins',
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

const experiences = [
  {
    company: 'Databricks',
    role: 'Software Engineer',
    date: 'Jul 2025 — Present',
    gradient: 'from-red-500 to-orange-500',
    shadow: 'shadow-red-500/20',
    current: true,
    bullets: [
      'Engineered a dataset lineage and metadata service using Java and Spring Boot to track dependencies between upstream pipelines and downstream tables, enabling engineers to identify impacted workloads across 12K+ datasets while reducing analysis time from hours to minutes.',
      'Architected a Kafka-based telemetry ingestion service that collects execution statistics from distributed SQL workloads, processing 10M+ query events daily and cutting query performance troubleshooting time by 40% for platform teams.',
      'Containerized metadata services using Docker and deployed them to Kubernetes, reducing deployment failures by 60% and improving scalability to handle 5K+ concurrent requests.',
      'Established centralized observability and deployment pipelines using ELK Stack and Jenkins CI/CD, reducing mean time to detection (MTTD) for production issues by 50% and accelerating release cycles by 40%.',
    ],
  },
  {
    company: 'Accenture',
    role: 'Software Engineer',
    date: 'Aug 2022 — Jul 2023',
    gradient: 'from-purple-500 to-violet-600',
    shadow: 'shadow-purple-500/20',
    current: false,
    bullets: [
      'Delivered transaction validation services using Java and Spring Boot, enforcing regulatory rules on payment requests and processing 1M+ transactions daily with 99.99% accuracy.',
      'Designed a Kafka event streaming pipeline that publishes validated transactions to fraud detection systems, slashing fraud detection latency from 10 minutes to near real-time.',
      'Introduced a Redis caching layer for frequently accessed customer account data, reducing database query load by 70% and improving API response time from 150ms to 25ms.',
      'Architected backend services supporting loan underwriting workflows using Spring Boot and REST APIs, aggregating credit history and financial records used by analysts to evaluate loan applications.',
    ],
  },
  {
    company: 'Crest Data Systems',
    role: 'Software Engineer',
    date: 'Jun 2021 — Aug 2022',
    gradient: 'from-accent to-primary',
    shadow: 'shadow-cyan-500/20',
    current: false,
    bullets: [
      'Developed eligibility verification microservices using Java, Spring Boot, and REST APIs, replacing a legacy batch process with real-time APIs that validate patient insurance coverage before claim submission, slashing verification time from 24 hours to under 2 seconds.',
      'Built asynchronous claim processing services using Spring Boot and message-based workflows, enabling hospitals to submit and track claims while processing 500K+ claims monthly with 99.9% uptime.',
      'Implemented a PHI audit-trail service using MongoDB change streams, capturing patient data access events to support HIPAA compliance while managing hundreds of millions of audit records.',
      'Refactored claim validation logic using the Strategy design pattern, reducing code duplication by 40% and enabling dynamic payer-specific rules across 50+ insurance providers.',
    ],
  },
]

function ExperienceCard({ exp, i, isInView }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1])
  const x = useTransform(scrollYProgress, [0, 0.5], [-30, 0])

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x }}
      className="relative pl-8 mb-14 last:mb-0"
    >
      {/* Timeline dot */}
      <motion.div
        className={`absolute -left-1.5 top-6 w-3.5 h-3.5 rounded-full bg-linear-to-br ${exp.gradient} border-2 border-white dark:border-dark shadow-md ${exp.shadow}`}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.4 + i * 0.2, type: 'spring', stiffness: 300 }}
      />
      {/* Pulse ring for current */}
      {exp.current && (
        <motion.div
          className="absolute -left-3 top-4.5 w-6 h-6 rounded-full border-2 border-red-400 dark:border-red-500/60"
          animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
        />
      )}

      <motion.div
        className={`card-hover bg-white dark:bg-surface border border-border rounded-2xl p-6 group relative overflow-hidden`}
        whileHover={{ x: 6, transition: { duration: 0.2 } }}
      >
        {/* Subtle colored left accent */}
        <motion.div
          className={`absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b ${exp.gradient}`}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 + i * 0.2 }}
          style={{ transformOrigin: 'top' }}
        />

        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold">{exp.company}</h3>
            {exp.current && (
              <span className="px-2 py-0.5 bg-green-50 dark:bg-green-500/15 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full border border-green-200 dark:border-green-500/30">
                Current
              </span>
            )}
          </div>
          <span className="text-text-muted text-sm font-medium bg-surface-light dark:bg-[#1a2035] px-3 py-1 rounded-full">{exp.date}</span>
        </div>
        <p className={`bg-linear-to-r ${exp.gradient} bg-clip-text text-transparent font-semibold mb-4`}>{exp.role}</p>
        <ul className="space-y-2.5">
          {exp.bullets.map((bullet, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.15 + j * 0.06 }}
              className="text-text-muted text-sm leading-relaxed pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/40 hover:text-text hover:before:bg-primary transition-colors"
            >
              {highlightKeywords(bullet)}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-24 px-6 section-divider pb-28">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Experience</h2>
          <motion.div
            className="w-16 h-1 bg-linear-to-r from-primary to-accent rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <div className="relative">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-0 top-2 w-0.5 bg-linear-to-b from-primary via-accent to-transparent"
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
          />

          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} i={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
