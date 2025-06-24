import { Switch } from '@/components/atoms/Switch';
import { useTheme } from 'next-themes';
import * as React from 'react';

export const DarkModeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();
    return (
        <Switch
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            aria-label="Toggle dark mode"
        />
    );
}; 