import { Toast, ToastClose, ToastDescription, ToastTitle } from '@/components/atoms/Toast';
import { cn } from '@/utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

interface Notification {
    id: string;
    title: string;
    description?: string;
    variant?: 'success' | 'error' | 'info' | 'warning';
}

interface NotificationSystemProps {
    notifications: Notification[];
    onRemove: (id: string) => void;
    className?: string;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, onRemove, className }) => {
    return (
        <div className={cn('fixed top-4 right-4 z-50 flex flex-col gap-2', className)}>
            <AnimatePresence>
                {notifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Toast className={cn(
                            notification.variant === 'error' && 'bg-red-50 border-red-200',
                            notification.variant === 'success' && 'bg-green-50 border-green-200',
                            notification.variant === 'warning' && 'bg-yellow-50 border-yellow-200',
                            notification.variant === 'info' && 'bg-blue-50 border-blue-200'
                        )}>
                            <div className="grid gap-1">
                                <ToastTitle>{notification.title}</ToastTitle>
                                {notification.description && (
                                    <ToastDescription>
                                        {notification.description}
                                    </ToastDescription>
                                )}
                            </div>
                            <ToastClose onClick={() => onRemove(notification.id)} />
                        </Toast>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}; 