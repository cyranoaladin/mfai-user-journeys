import { Header } from '@/components/organisms/Header';
import { Sidebar } from '@/components/organisms/Sidebar';
import { cn } from '@/utils/cn';
import * as React from 'react';

interface MainLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
    return (
        <div className={cn('min-h-screen flex flex-col bg-background', className)}>
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-8 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}; 