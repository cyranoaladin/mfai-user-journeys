import { Input, InputProps } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import * as React from 'react';

export interface FormFieldProps extends InputProps {
    label: string;
    error?: string;
    className?: string;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
    ({ label, error, className, ...props }, ref) => (
        <div className={cn('flex flex-col gap-1', className)}>
            <Label htmlFor={props.id}>{label}</Label>
            <Input ref={ref} {...props} />
            {error && (
                <motion.span
                    className="text-xs text-red-500 mt-1"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                >
                    {error}
                </motion.span>
            )}
        </div>
    )
);
FormField.displayName = 'FormField'; 