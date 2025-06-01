'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center space-y-6"
      >
        <motion.h1
          className="text-3xl font-bold"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          🚀 Welcome to the User Management Dashboard
        </motion.h1>

        <motion.p className="text-lg text-zinc-600 dark:text-zinc-300">
          View users or add new ones with ease.
        </motion.p>

        <Link
          href="/dashboard"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
        >
          Go to Dashboard
        </Link>
      </motion.div>
    </main>
  );
}
