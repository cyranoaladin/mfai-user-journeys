import { cn } from '@/utils/cn';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { motion } from 'framer-motion';
import * as React from 'react';

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
            className
        )}
        {...props}
    >
        <motion.div
            className="h-full w-full flex-1 bg-primary transition-all"
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
