import { Label } from '@/components/atoms/Label';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import * as React from 'react';

interface InputGroupProps {
    label: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({ label, description, children, className }) => (
    <div className={cn('flex flex-col gap-2', className)}>
        <Label>{label}</Label>
        {description && (
            <motion.span
                className="text-xs text-muted-foreground"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
            >
                {description}
            </motion.span>
        )}
        <div className="flex flex-col gap-2">{children}</div>
    </div>
); 