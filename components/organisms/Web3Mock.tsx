import { Button } from '@/components/atoms/Button';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface Web3MockProps {
    className?: string;
}

export const Web3Mock: React.FC<Web3MockProps> = ({ className }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState<string | null>(null);

    const handleConnect = () => {
        // Simuler une connexion
        setIsConnected(true);
        setAddress('0x1234...5678');
    };

    const handleDisconnect = () => {
        setIsConnected(false);
        setAddress(null);
    };

    return (
        <motion.div
            className={cn('flex flex-col gap-4 p-4 border rounded-lg bg-background', className)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-bold">Web3 Mock</h2>
            {isConnected ? (
                <div className="flex flex-col gap-2">
                    <p>Connected: {address}</p>
                    <Button onClick={handleDisconnect}>Disconnect</Button>
                </div>
            ) : (
                <Button onClick={handleConnect}>Connect Wallet</Button>
            )}
        </motion.div>
    );
}; 