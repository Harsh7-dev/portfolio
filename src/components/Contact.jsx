import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi'
import { FiSend } from 'react-icons/fi'

const contactInfo = [
  { icon: <HiOutlineMail size={20} />, label: 'Email', value: 'harshbpatel151@gmail.com', href: 'mailto:harshbpatel151@gmail.com', gradient: 'from-primary to-violet-500' },
  { icon: <HiOutlinePhone size={20} />, label: 'Phone', value: '341-800-3353', href: 'tel:+13418003353', gradient: 'from-emerald-500 to-teal-500' },
  { icon: <HiOutlineLocationMarker size={20} />, label: 'Location', value: 'Hayward, CA', href: null, gradient: 'from-rose-500 to-pink-500' },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const handleSendEmail = () => {
    window.location.href = 'mailto:harshbpatel151@gmail.com?subject=Hello from your portfolio'
  }

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }}
        animate={{ x: [0, 30, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)' }}
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-6xl mx-auto relative" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
          <motion.div
            className="w-16 h-1 bg-linear-to-r from-primary to-accent rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-text-muted text-lg mb-12 max-w-lg"
        >
          Have a project in mind or want to chat? I'd love to hear from you.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.12 }}
                whileHover={{ x: 10, scale: 1.02, transition: { duration: 0.2 } }}
                className="card-hover flex items-center gap-4 p-4 bg-white dark:bg-[#0f1629] rounded-xl border border-border cursor-default group"
              >
                <motion.span
                  className={`w-11 h-11 flex items-center justify-center rounded-xl bg-linear-to-br ${item.gradient} text-white shadow-md`}
                  whileHover={{ rotate: [0, -15, 15, -5, 0], scale: 1.1, transition: { duration: 0.5 } }}
                >
                  {item.icon}
                </motion.span>
                <div>
                  <p className="text-text-muted text-xs font-medium uppercase tracking-wider">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-text text-sm font-medium hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-text text-sm font-medium">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Quick connect note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="p-4 bg-linear-to-r from-primary/5 to-accent/5 dark:from-primary/15 dark:to-accent/15 rounded-xl border border-primary/10 dark:border-primary/25 mt-6"
            >
              <p className="text-sm text-text-muted">
                <span className="text-primary font-semibold">Typical response time:</span> within 24 hours
              </p>
            </motion.div>
          </motion.div>

          {/* Send email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="card-hover bg-white dark:bg-[#0f1629] border border-border rounded-2xl p-8 flex flex-col items-center text-center"
          >
            <motion.div
              className="w-16 h-16 flex items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent text-white shadow-lg mb-6"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <HiOutlineMail size={28} />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Drop me an email</h3>
            <p className="text-text-muted text-sm mb-6 max-w-sm">
              Click below to open your email client and send me a message directly.
            </p>
            <motion.button
              onClick={handleSendEmail}
              className="magnetic-btn flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-primary to-primary-dark text-white font-semibold rounded-full"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiSend size={16} />
              Send Email
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
