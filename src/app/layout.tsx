'use client';

// import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { useEffect, useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
import { motion } from 'framer-motion';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState('dark');
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('theme');
    if (saved) setTheme(saved);
    document.documentElement.classList.toggle('dark', saved === 'dark');
  }, []);

  useEffect(() => {
    const observer = () => {
      setShowNavbar(!document.body.classList.contains('modal-open'));
    };
    observer();
    window.addEventListener('modal-toggle', observer);
    const mutation = new MutationObserver(observer);
    mutation.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => {
      window.removeEventListener('modal-toggle', observer);
      mutation.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-100 text-black dark:bg-zinc-900 dark:text-white`}
      >
        <Toaster position="top-right" richColors closeButton />
        {showNavbar && (
          <nav className="w-full flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 bg-card/80 border-b border-border shadow-sm sticky top-0 z-40 gap-2 sm:gap-0">
            <span className="text-xl font-bold tracking-tight mb-2 sm:mb-0">User Dashboard</span>
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
              <a
                href="/dashboard/add"
                className="inline-flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 text-base sm:text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-md w-full sm:w-auto justify-center"
                aria-label="Add User"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span className="hidden xs:inline">Add User</span>
              </a>
              {/* Switch Toggle */}
              <motion.button
                onClick={toggleTheme}
                initial={false}
                animate={{ backgroundColor: theme === 'dark' ? '#334155' : '#e5e7eb' }}
                className="relative w-12 sm:w-14 h-8 rounded-full flex items-center px-1 transition-colors focus:outline-none border border-border shadow"
                aria-label="Toggle dark mode"
              >
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                  className={`absolute left-1 top-1 w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-transform ${theme === 'dark' ? 'translate-x-4 sm:translate-x-6 bg-zinc-800 text-yellow-400' : 'translate-x-0 bg-white text-blue-500'}`}
                >
                  {theme === 'dark' ? (
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="10" cy="10" r="5"/><path d="M10 1v2m0 14v2m9-9h-2M3 10H1m14.14 5.14-1.41-1.41M5.86 5.86 4.45 4.45m11.31 0-1.41 1.41M5.86 14.14l-1.41 1.41"/></svg>
                  ) : (
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M19 12.79A9 9 0 1 1 9.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
                  )}
                </motion.span>
              </motion.button>
            </div>
          </nav>
        )}
        {children}
      </body>
    </html>
  );
}
