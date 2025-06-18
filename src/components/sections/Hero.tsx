'use client';

import { Inter } from 'next/font/google';
import { motion, Variants } from 'framer-motion';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 25 },
  },
};

export default function Hero() {
  return (
    <motion.section
      className={`relative overflow-hidden min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-16 lg:px-24 bg-gradient-to-b from-black to-gray-900 ${inter.variable}`}
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {/* Animated background blobs */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500 opacity-30 rounded-full"
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 opacity-20 rounded-full"
        animate={{ scale: [1, 1.1, 1], x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
      />
      <motion.div variants={item} className="relative z-10 w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
          Cześć, jestem{' '}
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 bg-[length:200%_200%]"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          >
            MichelDev
          </motion.span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          Tworzę nowoczesne strony internetowe i projekty graficzne, które przyciągają uwagę i konwertują.
        </p>
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            variants={item}
            href="#projekty"
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition"
          >
            Moje projekty
          </motion.a>
          <motion.a
            variants={item}
            href="#kontakt"
            className="px-6 py-3 border-2 border-purple-500 hover:border-purple-600 text-purple-500 hover:text-purple-600 font-semibold rounded-lg transition"
          >
            Skontaktuj się
          </motion.a>
        </motion.div>
      </motion.div>
      {/* Mockup preview */}
      <motion.div
        variants={item}
        className="relative z-10 w-full md:w-1/2 flex justify-center mb-8 md:mb-0"
      >
        <div className="w-80 h-64 bg-white/10 dark:bg-black/30 backdrop-blur-lg border border-white/20 rounded-xl p-4 relative overflow-hidden">
          {/* Browser header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <div className="flex-1 h-2 bg-white/20 rounded-full"></div>
          </div>
          {/* Content placeholder */}
          <div className="mb-2 h-4 bg-white/20 rounded-full w-5/6"></div>
          <div className="mb-4 h-4 bg-white/20 rounded-full w-4/6"></div>
          <div className="h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-3/5"></div>
          {/* Animated glass circles */}
          <motion.div
            className="absolute top-2 right-2 w-10 h-10 bg-purple-500 opacity-25 rounded-full"
            animate={{ scale: [1, 1.2, 1], x: [0, -10, 0], y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-6 h-6 bg-indigo-500 opacity-20 rounded-full"
            animate={{ scale: [1, 1.1, 1], x: [0, 15, 0], y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}