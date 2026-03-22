import { useRef, useState } from 'react'
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

  const [formData, setFormData] = useState({ subject: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    const mailtoLink = `mailto:harshbpatel151@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`
    window.location.href = mailtoLink
    setTimeout(() => {
      setStatus('sent')
      setFormData({ subject: '', message: '' })
      setTimeout(() => setStatus(null), 3000)
    }, 1000)
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
                className="card-hover flex items-center gap-4 p-4 bg-white dark:bg-surface rounded-xl border border-border cursor-default group"
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

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="card-hover bg-white dark:bg-surface border border-border rounded-2xl p-8 space-y-5"
          >
            <h3 className="text-xl font-bold mb-1">Send me a message</h3>
            <div>
              <label htmlFor="subject" className="text-text-muted text-xs font-medium uppercase tracking-wider mb-1.5 block">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-light dark:bg-dark border border-border text-text text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="Subject"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-text-muted text-xs font-medium uppercase tracking-wider mb-1.5 block">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-surface-light dark:bg-dark border border-border text-text text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 px-8 py-3.5 bg-linear-to-r from-primary to-primary-dark text-white font-semibold rounded-full disabled:opacity-60"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiSend size={16} />
              {status === 'sending' ? 'Opening email...' : status === 'sent' ? 'Email client opened!' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
