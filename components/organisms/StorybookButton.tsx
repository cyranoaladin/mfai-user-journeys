import { Button } from '@/components/atoms/Button';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import * as React from 'react';

interface StorybookButtonProps {
    className?: string;
}

export const StorybookButton: React.FC<StorybookButtonProps> = ({ className }) => {
    const handleLaunchStorybook = () => {
        window.open('http://localhost:6006', '_blank');
    };

    return (
        <motion.div
            className={cn('fixed bottom-4 right-4 z-50', className)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Button onClick={handleLaunchStorybook}>Launch Storybook</Button>
        </motion.div>
    );
}; 