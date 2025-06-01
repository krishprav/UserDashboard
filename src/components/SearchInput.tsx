"use client";

import { motion } from 'framer-motion';

export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <motion.input
      value={value}
      onChange={onChange}
      placeholder="Search by name or city..."
      className="w-full p-3 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}
