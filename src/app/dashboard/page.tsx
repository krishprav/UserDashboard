'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCard } from '../../components/UserCard';
import { SkeletonCard } from '../../components/SkeletonCard';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
  localId?: string;
}

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [localUsers, setLocalUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('addedUsers');
    setLocalUsers(stored ? JSON.parse(stored) : []);
  }, []);

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem('addedUsers');
      setLocalUsers(stored ? JSON.parse(stored) : []);
    };
    window.addEventListener('storage', handler);
    window.addEventListener('user-added', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('user-added', handler);
    };
  }, []);

  useEffect(() => {
    const allUsers = [...localUsers, ...users];
    const q = query.toLowerCase();
    const filteredData = allUsers.filter((user) =>
      user.name.toLowerCase().includes(q) || user.address.city.toLowerCase().includes(q)
    );
    setFiltered(filteredData);
  }, [query, users, localUsers]);

  return (
    <div className="relative w-full min-h-screen px-2 sm:px-4 py-6 flex flex-col items-center">
      <div className="relative z-10 w-full max-w-6xl">

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl mx-auto mt-6 mb-8"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or city..."
            className="w-full p-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-muted-foreground"
          />
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="bg-red-100 text-red-700 p-4 rounded-md text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* User Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4 w-full">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            <AnimatePresence>
              {filtered.map((user) => (
                <UserCard key={user.id + (user.localId || '')} user={user} />
              ))}
              {filtered.length === 0 && (
                <motion.div
                  className="text-center text-muted-foreground col-span-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No users found.
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
