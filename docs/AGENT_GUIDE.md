# Agent Guide

This document tells AI agents what to ask and consider when working on this library. Read this alongside `CLAUDE.md` which covers the rules and structure.

## Before Creating a Component

Ask the user these questions if the answers aren't already clear from their request:

### 1. Base Primitive

> Should this component use a shadcn/ui primitive as a base?

Many components have a shadcn equivalent (Button, Card, Dialog, Input, Select, etc.). If one exists, use it — run `npx shadcn@latest add <name>` to get the primitive, then wrap it. If the component is custom with no shadcn equivalent, build from scratch using Radix UI primitives or plain HTML elements as appropriate.

Check the shadcn registry before asking: https://ui.shadcn.com/docs/components

### 2. Variants

> What variants does this component need?

Common variant axes:
- **Visual style**: default, secondary, outline, ghost, destructive
- **Size**: sm, md, lg
- **State**: loading, disabled

If the user only says "add a Button," suggest standard variants and ask for confirmation rather than guessing.

### 3. Interactive States

> Does this component have interactive behavior?

Consider and ask about:
- Click/press handlers
- Hover state
- Focus state (keyboard navigation)
- Disabled state
- Loading state (spinners, skeleton)
- Open/closed state (dropdowns, dialogs, accordions)

### 4. Composition

> Does this component contain other components?

For example:
- A Card might contain a CardHeader, CardContent, CardFooter
- A Dialog might contain a DialogTrigger, DialogContent, DialogClose
- An Input might have a label, helper text, error message

Ask whether these sub-components should be separate exports or internal-only.

### 5. Content

> What kind of content does this component accept?

Consider:
- Text only
- Text + icon
- Icon only
- Custom children (fully flexible)
- Specific slots (e.g., `startIcon`, `endIcon`)

### 6. Accessibility

> Are there specific accessibility requirements?

At minimum, every component must:
- Have the correct ARIA role
- Be keyboard navigable
- Have visible focus indicators
- Work with screen readers

For form components, also ask about:
- Label association
- Error message announcement
- Required field indication

## Before Modifying a Component

### Check Impact

Before changing an existing component:

1. Read the existing test file — understand what's already tested
2. Read the existing stories — understand what variants exist
3. Check `src/index.ts` — confirm what's currently exported
4. **Never rename or remove existing props** without explicit user approval

### Ask About Breaking Changes

If the modification might affect existing consumers:

> This change would rename the `color` prop to `variant`. That's a breaking change for anyone using the current API. Should I add `variant` as a new prop instead and keep `color` working?

## When Building the Component

### RTL Checklist

For every component, verify:
- [ ] Uses `ps-`/`pe-` instead of `pl-`/`pr-` for padding
- [ ] Uses `ms-`/`me-` instead of `ml-`/`mr-` for margin
- [ ] Uses `start-`/`end-` instead of `left-`/`right-` for positioning
- [ ] Icons that imply direction (arrows, chevrons) flip in RTL
- [ ] Text alignment uses `text-start`/`text-end` not `text-left`/`text-right`

### Story Checklist

For every component, include stories for:
- [ ] Default state (most common usage)
- [ ] Each variant
- [ ] Each size
- [ ] Disabled state (if applicable)
- [ ] With icon (if the component supports icons)
- [ ] Long text content (to test overflow behavior)
- [ ] Dark mode (handled by Storybook toolbar, but verify it looks right)

### Test Checklist

For every component, include tests for:
- [ ] Renders without crashing
- [ ] Renders each variant
- [ ] Merges custom className
- [ ] Forwards ref (if using forwardRef)
- [ ] Fires event handlers (onClick, onChange, etc.)
- [ ] Disabled state prevents interaction (if applicable)
- [ ] Accessibility: correct role, label, aria attributes

## Common Patterns

### When to use `cva` (class-variance-authority)

Use cva when a component has **variants that map to different CSS classes**. This is most components.

```tsx
const buttonVariants = cva('base-classes', {
  variants: {
    variant: { default: '...', outline: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})
```

### When to use `forwardRef`

Use forwardRef on **every component that renders a DOM element**. This allows consumers to attach refs for focus management, measurements, etc.

### When to use Radix UI directly

Use Radix primitives (via shadcn) for components that need:
- Complex keyboard navigation (menus, comboboxes)
- Portal rendering (dialogs, popovers, tooltips)
- Managed open/close state (accordions, collapsibles)
- Focus trapping (modals)

Don't reinvent these behaviors — use the primitives.

### When NOT to use shadcn

Build from scratch when:
- The component is layout-only (Grid, Stack, Container)
- The component is purely decorative (Divider, Badge)
- No shadcn/Radix equivalent exists
- The shadcn version is overly complex for your needs
