import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }
    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [visible])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      animate={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(6,182,212,0.03) 40%, transparent 70%)',
        }}
        animate={{ x: pos.x - 250, y: pos.y - 250 }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      />
    </motion.div>
  )
}
