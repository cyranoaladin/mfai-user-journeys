import { cn } from '@/utils/cn';
import { motion, HTMLMotionProps } from 'framer-motion';
import * as React from 'react';

export interface AvatarProps extends Omit<HTMLMotionProps<"div">, 'src'> {
    src?: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
};

export function Avatar({
    className,
    src,
    alt,
    size = 'md',
    ...props
}: AvatarProps) {
    return (
        <motion.div
            className={cn(
                'relative overflow-hidden rounded-full bg-muted',
                sizeClasses[size],
                className
            )}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            {...props}
        >
            {src ? (
                <motion.img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                    {alt?.[0]?.toUpperCase() || '?'}
                </div>
            )}
        </motion.div>
    );
} 