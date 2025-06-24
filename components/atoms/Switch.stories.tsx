import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
    title: 'Atoms/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

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