import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Atoms/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Button',
        variant: 'default',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Button',
        variant: 'secondary',
    },
};

export const Outline: Story = {
    args: {
        children: 'Button',
        variant: 'outline',
    },
};

export const Ghost: Story = {
    args: {
        children: 'Button',
        variant: 'ghost',
    },
};

export const Link: Story = {
    args: {
        children: 'Button',
        variant: 'link',
    },
}; 