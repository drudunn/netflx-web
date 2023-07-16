"use client"

import { useAudio } from 'react-use';
import { motion } from 'framer-motion'

export const Splash = () => {
  const [audio, state, controls, ref] = useAudio({
    src: '/dunndunn.mp3',
    autoPlay: false,
  });

  return (
    <main className="flex h-screen">
      <div className="m-auto">
        <div className="sr-only">{audio}</div>
        <motion.img src="/dunnflix.svg" onClick={controls.play} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} />
        <h1 className="text-center"><span className="sr-only">Dunnflix </span>coming soon</h1>
      </div>
    </main>
  )
}