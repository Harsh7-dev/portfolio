import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SiKubernetes, SiTerraform } from 'react-icons/si'
import { FiExternalLink } from 'react-icons/fi'

const certs = [
  {
    title: 'Certified Kubernetes Application Developer (CKAD)',
    issuer: 'The Linux Foundation',
    icon: <SiKubernetes size={24} />,
    gradient: 'from-primary to-primary-dark',
    shadow: 'shadow-primary/20',
    href: 'https://drive.google.com/file/d/145tksDpdZzOOYG3-07PcX7xY7pdlOavW/preview',
  },
  {
    title: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    icon: <SiTerraform size={24} />,
    gradient: 'from-purple-500 to-violet-600',
    shadow: 'shadow-purple-500/20',
    href: 'https://drive.google.com/file/d/16NVE93_rjfMMGj_Lq2_quqqJ6jSITU3C/preview',
  },
]

export default function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="certifications" className="py-24 px-6 section-divider pb-28">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Certifications</h2>
          <motion.div
            className="w-16 h-1 bg-linear-to-r from-primary to-accent rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {certs.map((cert, i) => (
            <motion.a
              key={cert.title}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3, type: 'spring', stiffness: 300 } }}
              className="group relative bg-white dark:bg-[#0f1629] border border-border rounded-2xl p-6 card-hover overflow-hidden block"
            >
              {/* Gradient accent bar */}
              <motion.div
                className={`absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b ${cert.gradient}`}
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                style={{ transformOrigin: 'top' }}
              />

              <div className="flex items-center gap-4">
                <motion.span
                  className={`w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-br ${cert.gradient} text-white shadow-lg ${cert.shadow}`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1, transition: { duration: 0.5 } }}
                >
                  {cert.icon}
                </motion.span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{cert.title}</h3>
                  <p className="text-text-muted text-sm font-medium">{cert.issuer}</p>
                </div>
                <FiExternalLink size={16} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
