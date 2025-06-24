import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
    title: 'Atoms/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        children: 'Card Content',
    },
};

export const WithHeader: Story = {
    args: {
        children: (
            <>
                <div className="p-4 border-b">Card Header</div>
                <div className="p-4">Card Content</div>
            </>
        ),
    },
};

export const WithFooter: Story = {
    args: {
        children: (
            <>
                <div className="p-4">Card Content</div>
                <div className="p-4 border-t">Card Footer</div>
            </>
        ),
    },
}; 