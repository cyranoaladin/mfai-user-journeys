import { cn } from '@/utils/cn';
import * as LabelPrimitive from '@radix-ui/react-label';
import { motion } from 'framer-motion';
import * as React from 'react';

const Label = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
    <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
    >
        <LabelPrimitive.Root
            ref={ref}
            className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                className
            )}
            {...props}
        />
    </motion.div>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
