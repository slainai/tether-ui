import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  globalTypes: {
    direction: {
      description: 'Text direction',
      toolbar: {
        title: 'Direction',
        icon: 'transfer',
        items: ['ltr', 'rtl'],
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    direction: 'rtl',
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const direction = context.globals.direction || 'rtl'
      const theme = context.globals.theme || 'light'
      document.documentElement.dir = direction
      document.documentElement.classList.toggle('dark', theme === 'dark')
      return Story()
    },
  ],
}

export default preview
