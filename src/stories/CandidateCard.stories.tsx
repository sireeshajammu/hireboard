import type { Meta, StoryObj } from '@storybook/react'
import { CandidateCard } from '../components/hireboard/CandidateCard'

const meta: Meta<typeof CandidateCard> = {
  title: 'HireBoard/CandidateCard',
  component: CandidateCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CandidateCard>

export const Applied: Story = {
  args: {
    name: 'Sarah Johnson',
    role: 'Frontend Engineer',
    email: 'sarah@example.com',
    stage: 'applied',
  },
}

export const Interviewed: Story = {
  args: {
    name: 'Marcus Lee',
    role: 'Full Stack Developer',
    email: 'marcus@example.com',
    stage: 'interviewed',
  },
}

export const Offered: Story = {
  args: {
    name: 'Priya Patel',
    role: 'Backend Engineer',
    email: 'priya@example.com',
    stage: 'offered',
  },
}

export const Rejected: Story = {
  args: {
    name: 'James Wu',
    role: 'DevOps Engineer',
    email: 'james@example.com',
    stage: 'rejected',
  },
}