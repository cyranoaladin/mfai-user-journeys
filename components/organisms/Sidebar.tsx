import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react';

export const Sidebar: React.FC = () => {
    return (
        <motion.aside
            className={cn('h-full w-64 bg-background border-r flex flex-col py-6 px-4 gap-8 shadow')}
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Link href="/">
                <span className="font-bold text-lg tracking-tight mb-8 block">MFAI Journeys</span>
            </Link>
            <nav className="flex flex-col gap-4">
                <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                <Link href="/journeys" className="hover:underline">Journeys</Link>
                <Link href="/personas" className="hover:underline">Personas</Link>
                <Link href="/rewards" className="hover:underline">Rewards</Link>
                <Link href="/settings" className="hover:underline">Settings</Link>
            </nav>
        </motion.aside>
    );
}; 