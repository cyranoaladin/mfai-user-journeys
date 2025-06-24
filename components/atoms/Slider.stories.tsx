import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
    title: 'Atoms/Slider',
    component: Slider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
    args: {
        defaultValue: [50],
        max: 100,
        step: 1,
    },
};

export const WithLabel: Story = {
    args: {
        defaultValue: [50],
        max: 100,
        step: 1,
        'aria-label': 'Slider Label',
    },
};

export const Disabled: Story = {
    args: {
        defaultValue: [50],
        max: 100,
        step: 1,
        disabled: true,
    },
}; 