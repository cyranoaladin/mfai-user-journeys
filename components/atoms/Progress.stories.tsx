import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
    title: 'Atoms/Progress',
    component: Progress,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
    args: {
        value: 50,
    },
};

export const Zero: Story = {
    args: {
        value: 0,
    },
};

export const Full: Story = {
    args: {
        value: 100,
    },
}; 