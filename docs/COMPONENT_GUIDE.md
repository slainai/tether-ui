# Component Guide

## Creating a New Component

### Step 1: Copy the Template

```bash
cp -r src/components/_template src/components/MyComponent
```

### Step 2: Rename Files and References

Rename:
- `Template.tsx` → `MyComponent.tsx`
- `Template.stories.tsx` → `MyComponent.stories.tsx`
- `Template.test.tsx` → `MyComponent.test.tsx`

Replace all `Template` references with `MyComponent` inside each file.

### Step 3: Implement

In `MyComponent.tsx`:
- Define props with a TypeScript interface
- Use `cva` for variants if the component has multiple visual states
- Use `cn()` for merging class names
- Use Tailwind logical properties for RTL support (`ps-`, `pe-`, `ms-`, `me-`)
- Forward refs where appropriate

### Step 4: Write Stories

In `MyComponent.stories.tsx`:
- Export a `Default` story showing the most common usage
- Export one story per variant/size/state
- Use `args` for interactive controls
- Include an RTL story if the component has directional behavior

### Step 5: Write Tests

In `MyComponent.test.tsx`:
- Test that the component renders without crashing
- Test each variant renders correctly
- Test interactive behavior (clicks, focus, keyboard)
- Test accessibility (role, label, aria attributes)
- Use Testing Library queries: `getByRole`, `getByText`, `getByLabelText`

### Step 6: Export

1. Re-export from `src/components/MyComponent/index.ts`
2. Add to `src/index.ts`:
   ```typescript
   export { MyComponent } from './components/MyComponent'
   export type { MyComponentProps } from './components/MyComponent'
   ```

### Step 7: Verify

```bash
npm test          # unit tests pass
npm run typecheck # types are valid
npm run lint      # code quality checks pass
```

## Wrapping a shadcn Primitive

When adding a new shadcn component:

1. Install it: `npx shadcn@latest add button`
2. This places the primitive in `src/components/ui/button.tsx`
3. Create a wrapper in `src/components/Button/Button.tsx` that imports from `@/components/ui/button`
4. The wrapper is what gets exported — never export `ui/` primitives directly
5. The wrapper can add default props, restrict variants, or compose multiple primitives

## Component Anatomy

```typescript
import { type VariantProps, cva } from 'class-variance-authority'
import { type ComponentRef, type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

const myComponentVariants = cva('base-classes', {
  variants: {
    variant: {
      default: 'default-classes',
      secondary: 'secondary-classes',
    },
    size: {
      sm: 'small-classes',
      md: 'medium-classes',
      lg: 'large-classes',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

interface MyComponentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {}

const MyComponent = forwardRef<ComponentRef<'div'>, MyComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(myComponentVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)
MyComponent.displayName = 'MyComponent'

export { MyComponent, type MyComponentProps, myComponentVariants }
```
