'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Mail, Phone, MapPin, Globe, Building2, User as UserIcon, Hash, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

function getAvatarUrl(name: string) {
  // DiceBear initials avatar
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundType=gradientLinear&fontWeight=700`;
}

function getMapUrl(lat: string, lng: string) {
  // OpenStreetMap static image (via Mapbox, no API key needed for demo)
  return `https://static-maps.yandex.ru/1.x/?lang=en-US&ll=${lng},${lat}&z=12&l=map&size=450,200&pt=${lng},${lat},pm2rdm`;
}

export function UserCard({ user }: { user: any }) {
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modalOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [modalOpen]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  // Professional color palette
  const companyColor = 'bg-blue-500 text-white';
  const cityColor = 'bg-teal-500 text-white';

  return (
    <>
      {/* Card summary */}
      <motion.div
        ref={cardRef}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={`relative group cursor-pointer overflow-visible z-0 select-none
          bg-white dark:bg-[#232b3a]
          border border-slate-200 dark:border-slate-700
          rounded-2xl shadow-lg
          transition-all duration-300
          focus-within:ring-2 focus-within:ring-blue-400
          hover:shadow-2xl
        `}
        tabIndex={0}
        aria-expanded={modalOpen}
        onClick={() => setModalOpen(true)}
        onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !modalOpen) setModalOpen(true); }}
      >
        <div className="absolute inset-0 rounded-2xl bg-white/80 dark:bg-[#232b3a]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow transition-all duration-300 pointer-events-none" />
        <div className="relative p-5 flex flex-col gap-2 z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1">
            <img src={getAvatarUrl(user.name)} alt={user.name} className="w-12 h-12 rounded-full border-2 border-blue-500 shadow mx-auto md:mx-0" loading="lazy" />
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold flex items-center gap-2 flex-wrap">
                <UserIcon size={20} className="text-blue-500" /> {user.name}
              </h2>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${companyColor} shadow`}>
                  <Building2 size={13} className="mr-1" /> {user.company?.name}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${cityColor} shadow`}>
                  <MapPin size={13} className="mr-1" /> {user.address.city}
                </span>
              </div>
            </div>
            <span className="mt-2 md:mt-0 md:ml-auto flex items-center gap-1 select-none text-blue-500 font-semibold text-xs">
              <ChevronDown size={18} className="transition-transform duration-300" />
              Show details
            </span>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <div className="text-sm text-slate-700 dark:text-slate-200 flex flex-wrap items-center gap-2 break-all">
              <Mail size={16} />
              {user.email}
              <button onClick={e => { e.stopPropagation(); copyToClipboard(user.email, 'Email'); }} className="ml-1 p-1 rounded hover:bg-blue-100 dark:hover:bg-slate-700 transition"><Copy size={14} /></button>
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-200 flex flex-wrap items-center gap-2 break-all">
              <Phone size={16} />
              {user.phone}
              <button onClick={e => { e.stopPropagation(); copyToClipboard(user.phone, 'Phone'); }} className="ml-1 p-1 rounded hover:bg-blue-100 dark:hover:bg-slate-700 transition"><Copy size={14} /></button>
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-200 flex flex-wrap items-center gap-2 break-all">
              <MapPin size={16} /> {user.address.city}
            </div>
          </div>
        </div>
      </motion.div>
      {/* Modal overlay for details */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-lg"
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative w-full max-w-2xl mx-auto bg-gradient-to-br from-white via-slate-50 to-slate-200 dark:from-[#181f2a] dark:via-[#232b3a] dark:to-[#1a2233] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8 overflow-y-auto max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <button
                ref={closeBtnRef}
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
              <div className="flex flex-col md:flex-row items-center gap-5 mb-6">
                <img src={getAvatarUrl(user.name)} alt={user.name} className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-lg mx-auto md:mx-0" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold flex items-center gap-2 flex-wrap">
                    <UserIcon size={26} className="text-blue-500" /> {user.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded text-sm font-semibold ${companyColor} shadow`}>
                      <Building2 size={16} className="mr-1" /> {user.company?.name}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded text-sm font-semibold ${cityColor} shadow`}>
                      <MapPin size={16} className="mr-1" /> {user.address.city}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[16px] mb-6">
                <div>
                  <div className="font-semibold flex items-center gap-1"><UserIcon size={17}/> Name:</div>
                  <div className="ml-5">{user.name}</div>
                  <div className="font-semibold flex items-center gap-1 mt-4"><Hash size={17}/> Username:</div>
                  <div className="ml-5">{user.username}</div>
                  <div className="font-semibold flex items-center gap-1 mt-4"><Mail size={17}/> Email:</div>
                  <div className="ml-5 flex items-center gap-2">{user.email} <button onClick={() => copyToClipboard(user.email, 'Email')} className="p-1 rounded hover:bg-blue-100 dark:hover:bg-slate-700 transition"><Copy size={14} /></button></div>
                  <div className="font-semibold flex items-center gap-1 mt-4"><Phone size={17}/> Phone:</div>
                  <div className="ml-5 flex items-center gap-2">{user.phone} <button onClick={() => copyToClipboard(user.phone, 'Phone')} className="p-1 rounded hover:bg-blue-100 dark:hover:bg-slate-700 transition"><Copy size={14} /></button></div>
                  <div className="font-semibold flex items-center gap-1 mt-4"><Globe size={17}/> Website:</div>
                  <div className="ml-5">{user.website}</div>
                </div>
                <div>
                  <div className="font-semibold flex items-center gap-1"><Building2 size={17}/> Company:</div>
                  <div className="ml-5">{user.company?.name}</div>
                  <div className="ml-5 text-xs italic text-slate-500 dark:text-slate-400">{user.company?.catchPhrase}</div>
                  <div className="ml-5 text-xs text-slate-400 dark:text-slate-500">{user.company?.bs}</div>
                  <div className="font-semibold flex items-center gap-1 mt-4"><MapPin size={17}/> Address:</div>
                  <div className="ml-5">
                    <div>{user.address.street}, {user.address.suite}</div>
                    <div>{user.address.city}, {user.address.zipcode}</div>
                  </div>
                  <div className="font-semibold flex items-center gap-1 mt-4"><MapPin size={17}/> Geo:</div>
                  <div className="ml-5 text-xs text-slate-400">Lat: {user.address.geo?.lat}, Lng: {user.address.geo?.lng}</div>
                  {/* Map preview */}
                  {user.address?.geo?.lat && user.address?.geo?.lng && (
                    <div className="mt-4">
                      <span className="font-semibold text-xs text-slate-500">Map Preview:</span>
                      <img
                        src={getMapUrl(user.address.geo.lat, user.address.geo.lng)}
                        alt="Map preview"
                        className="rounded-lg mt-1 border border-blue-200 dark:border-slate-700 shadow"
                        width={350}
                        height={150}
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
