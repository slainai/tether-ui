import type { Meta, StoryObj } from '@storybook/react-vite'
import { Template } from './Template'

const meta = {
  title: 'Components/Template',
  component: Template,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Template>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Template component',
  },
}
