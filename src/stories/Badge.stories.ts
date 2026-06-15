import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../components/ui/Badge'

const meta: Meta<typeof Badge> = {
  title: 'HireBoard/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['applied', 'screened', 'interviewed', 'offered', 'rejected'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Applied: Story = { args: { variant: 'applied' } }
export const Screened: Story = { args: { variant: 'screened' } }
export const Interviewed: Story = { args: { variant: 'interviewed' } }
export const Offered: Story = { args: { variant: 'offered' } }
export const Rejected: Story = { args: { variant: 'rejected' } }