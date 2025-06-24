import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'Atoms/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
    },
};

export const WithLabel: Story = {
    args: {
        placeholder: 'Enter text...',
        'aria-label': 'Input Label',
    },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Enter text...',
        disabled: true,
    },
}; 