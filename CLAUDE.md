# @numberlabs/tether-ui — Agent Rules

This is a React component library built with Vite, TypeScript, Tailwind CSS 4, and shadcn/ui.
It is published as `@numberlabs/tether-ui` and consumed by other applications.

## Critical Rules

- **Every component MUST have a `.test.tsx` file** — at minimum, test that it renders without crashing and renders each variant.
- **Every component MUST have a `.stories.tsx` file** — one story per variant/size/state at minimum.
- **Every new component MUST be re-exported from `src/index.ts`** — this is the public API surface.
- **Never change an existing component's public prop interface without explicit user approval.** Adding new optional props is allowed; removing or renaming props is a breaking change.
- **Never add new npm dependencies without explicit user approval.** The dependency tree must stay lean.
- **Never modify `package.json` exports, `vite.config.ts` build config, or `tsconfig` files without explicit user approval.**
- **Never skip or delete tests.** If a test fails, fix the implementation to match the test. If you believe the test itself is wrong, ask the user.
- **Run tests from the project root directory.** Use `npm test` for unit tests, `npm run test:storybook` for story tests.

## Project Structure

```
src/
├── index.ts                    # Root barrel export — the PUBLIC API
├── index.css                   # Tailwind + theme tokens — do not restructure
├── test-setup.ts               # Vitest setup for Testing Library
├── lib/
│   └── utils.ts                # cn() helper and shared utilities
├── hooks/                      # Shared React hooks
├── components/
│   ├── _template/              # Copy this for every new component
│   │   ├── Template.tsx
│   │   ├── Template.stories.tsx
│   │   ├── Template.test.tsx
│   │   └── index.ts
│   └── ui/                     # shadcn primitives (managed by shadcn CLI)
```

## Adding a New Component

1. Copy `src/components/_template/` to `src/components/YourComponent/`
2. Rename all `Template` references to `YourComponent`
3. Implement the component in `YourComponent.tsx`
4. Write stories in `YourComponent.stories.tsx` — one per variant minimum
5. Write tests in `YourComponent.test.tsx` — render test + variant tests minimum
6. Export from `src/components/YourComponent/index.ts`
7. Re-export from `src/index.ts`
8. Run `npm test` to verify all tests pass
9. Run `npm run typecheck` to verify types
10. Run `npm run lint` to verify code quality

## Adding a shadcn Component

Use the shadcn CLI: `npx shadcn@latest add <component-name>`
This places primitives in `src/components/ui/`. These are internal — wrap them in a custom component before exporting.

## Styling

- Use Tailwind utility classes. Design tokens are CSS variables in `src/index.css`.
- Use the `cn()` helper from `@/lib/utils` for conditional classes.
- Use `class-variance-authority` (cva) for component variants.
- Tailwind 4 uses CSS-first config (`@theme` directive). Do not create a `tailwind.config.ts` file.
- This library supports RTL. Always use logical properties (e.g., `ps-4` not `pl-4`, `ms-2` not `ml-2`).

## Testing

- **Unit tests**: `npm test` — runs via Vitest + jsdom + Testing Library
- **Story tests**: `npm run test:storybook` — runs stories in headless Chromium
- **All tests**: `npm run test:all`
- Use `@testing-library/react` for rendering and querying
- Use `@testing-library/user-event` for interactions
- Prefer `getByRole`, `getByText`, `getByLabelText` over `getByTestId`

## Code Quality

- Biome handles linting and formatting (no ESLint/Prettier). Run `npm run lint`.
- Use `npm run lint:fix` to auto-fix issues.
- TypeScript strict mode is enabled. Do not use `any` — use `unknown` if the type is truly unknown.

## Icons

This library uses Phosphor Icons (`@phosphor-icons/react`). Do not use Lucide or other icon libraries.

## Fonts

- Body: Noto Sans (`--font-sans`)
- Headings: Noto Sans Display (`--font-heading`)

## RTL Support

This library supports right-to-left text direction. All components must work correctly in both LTR and RTL modes. Use Tailwind logical properties (`ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`) instead of directional properties (`pl-`, `pr-`, `ml-`, `mr-`, `left-`, `right-`).

## Build & Publish

- `npm run build` — builds ESM + CJS to `dist/`
- CSS is output as `dist/styles.css`
- React is externalized — consumers provide their own React
- Use `npm run changeset` to create a changeset before publishing
