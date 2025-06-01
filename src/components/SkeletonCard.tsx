'use client';

import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <motion.div
      className="bg-gray-100 dark:bg-zinc-900 p-4 rounded-xl animate-pulse space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="h-5 bg-gray-300 dark:bg-zinc-600 rounded w-2/3" />
      <div className="h-4 bg-gray-300 dark:bg-zinc-600 rounded w-3/4" />
      <div className="h-4 bg-gray-300 dark:bg-zinc-600 rounded w-1/2" />
    </motion.div>
  );
}
