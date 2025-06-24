import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { RadioGroup, RadioGroupItem } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
    title: 'Atoms/RadioGroup',
    component: RadioGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
    args: {
        children: (
            <>
                <RadioGroupItem value="option1" id="option1" />
                <RadioGroupItem value="option2" id="option2" />
            </>
        ),
    },
};

export const WithLabel: Story = {
    args: {
        children: (
            <>
                <RadioGroupItem value="option1" id="option1" />
                <RadioGroupItem value="option2" id="option2" />
            </>
        ),
        'aria-label': 'Radio Group Label',
    },
};

export const Disabled: Story = {
    args: {
        children: (
            <>
                <RadioGroupItem value="option1" id="option1" disabled />
                <RadioGroupItem value="option2" id="option2" disabled />
            </>
        ),
    },
}; 