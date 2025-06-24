import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta = {
    title: 'Molecules/FormField',
    component: FormField,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
    args: {
        label: 'Label',
        type: 'text',
        placeholder: 'Enter text...',
        'aria-label': 'Input Label',
    },
};

export const WithError: Story = {
    args: {
        label: 'Label',
        type: 'text',
        placeholder: 'Enter text...',
        'aria-label': 'Input Label',
        error: 'This field is required',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Label',
        type: 'text',
        placeholder: 'Enter text...',
        'aria-label': 'Input Label',
        disabled: true,
    },
}; 