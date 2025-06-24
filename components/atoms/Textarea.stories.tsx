import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
    title: 'Atoms/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
    },
};

export const WithLabel: Story = {
    args: {
        placeholder: 'Enter text...',
        'aria-label': 'Textarea Label',
    },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Enter text...',
        disabled: true,
    },
}; 