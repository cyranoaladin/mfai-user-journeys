import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import * as React from 'react';

interface LoaderProps {
    className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className }) => {
    return (
        <motion.div
            className={cn('flex items-center justify-center', className)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
        </motion.div>
    );
}; 