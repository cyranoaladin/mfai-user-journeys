import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
    title: 'Atoms/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {},
};

export const Checked: Story = {
    args: {
        checked: true,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        disabled: true,
        checked: true,
    },
}; 