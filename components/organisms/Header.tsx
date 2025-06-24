import { DarkModeToggle } from '@/components/organisms/DarkModeToggle';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react';

export const Header: React.FC = () => {
    return (
        <motion.header
            className={cn('w-full flex items-center justify-between px-6 py-4 bg-background shadow')}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Link href="/">
                <span className="font-bold text-xl tracking-tight">MFAI Journeys</span>
            </Link>
            <nav className="flex items-center gap-6">
                <Link href="/journeys" className="hover:underline">Journeys</Link>
                <Link href="/personas" className="hover:underline">Personas</Link>
                <Link href="/rewards" className="hover:underline">Rewards</Link>
                <DarkModeToggle />
            </nav>
        </motion.header>
    );
}; 