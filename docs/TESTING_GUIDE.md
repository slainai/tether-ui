# Testing Guide

## Test Types

### Unit Tests (`npm test`)

Run in jsdom via Vitest + Testing Library. Test component logic, rendering, and interactions.

Location: `src/components/ComponentName/ComponentName.test.tsx`

### Story Tests (`npm run test:storybook`)

Run stories in headless Chromium via Storybook's Vitest addon. Validates that stories render without errors.

Location: `src/components/ComponentName/ComponentName.stories.tsx`

## Required Tests Per Component

Every component must have at minimum:

1. **Renders without crashing** — basic smoke test
2. **Renders each variant** — if it has variants, test each one
3. **Applies custom className** — verify `className` prop merges correctly
4. **Forwards ref** — if the component uses `forwardRef`

Interactive components should additionally test:

5. **Click/interaction handlers** — verify callbacks fire
6. **Keyboard navigation** — verify focus and keyboard behavior
7. **Disabled state** — if applicable
8. **Accessibility** — verify roles, labels, aria attributes

## Writing a Test

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders without crashing', () => {
    render(<MyComponent>Hello</MyComponent>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders the secondary variant', () => {
    render(<MyComponent variant="secondary">Hello</MyComponent>)
    expect(screen.getByText('Hello')).toHaveClass('secondary-classes')
  })

  it('merges custom className', () => {
    render(<MyComponent className="custom-class">Hello</MyComponent>)
    expect(screen.getByText('Hello')).toHaveClass('custom-class')
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<MyComponent onClick={onClick}>Click me</MyComponent>)
    await user.click(screen.getByText('Click me'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
```

## Test Queries (Priority Order)

Use the most accessible query available:

1. `getByRole` — preferred, tests accessibility
2. `getByLabelText` — for form elements
3. `getByText` — for visible text content
4. `getByPlaceholderText` — for inputs
5. `getByTestId` — last resort only

## Running Tests

```bash
npm test              # unit tests only
npm run test:watch    # unit tests in watch mode
npm run test:storybook # story tests in headless Chromium
npm run test:all      # all tests
```
