'use client';

import StepForm from '../../../components/StepForm';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AddUserPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-muted text-foreground">
      {/* Form Container */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl rounded-2xl border border-border bg-card shadow-xl p-8 sm:p-10 space-y-8"
      >
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl font-semibold text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Add New User
        </motion.h1>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <StepForm />
        </motion.div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
