import { cn } from '@/utils/cn';
import { motion, HTMLMotionProps } from 'framer-motion';
import * as React from 'react';

export interface TextareaProps
    extends HTMLMotionProps<"textarea"> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <motion.textarea
                className={cn(
                    'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                {...props}
            />
        );
    }
);
Textarea.displayName = 'Textarea';

export { Textarea };
