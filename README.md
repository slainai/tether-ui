# @numberlabs/tether-ui

A React component library built on Tailwind CSS 4 and shadcn/ui. Designed as an internal design system with strong conventions for consistent, maintainable UI development.

[![CI](https://github.com/slainai/tether-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/slainai/tether-ui/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

## Features

- **React 19** with TypeScript 6 strict mode
- **Tailwind CSS 4** with CSS-first configuration and design tokens
- **shadcn/ui** primitives (Vega style) wrapped in a stable public API
- **RTL support** — all components use logical properties, tested in both directions
- **Dark mode** — built-in light/dark theme support
- **Accessibility** — a11y testing via Storybook addon
- **Phosphor Icons** — consistent icon system
- **Pre-compiled CSS** — consumers import styles without needing Tailwind installed

## Installation

```bash
npm install @numberlabs/tether-ui
```

## Usage

```tsx
import { Button } from '@numberlabs/tether-ui'
import '@numberlabs/tether-ui/styles'

function App() {
  return <Button variant="default">Click me</Button>
}
```

## Components

Browse all components, variants, and interactive examples in the [Storybook](https://slainai.github.io/tether-ui/).

## Development

```bash
# Prerequisites: Node 22+
nvm use

# Install dependencies
npm install

# Start Storybook (the dev environment)
npm run dev

# Run checks
npm test          # unit tests
npm run typecheck # type checking
npm run lint      # linting + formatting
npm run build     # library build
```

## Adding Components

Every component follows the same structure:

```
src/components/YourComponent/
├── YourComponent.tsx
├── YourComponent.stories.tsx
├── YourComponent.test.tsx
└── index.ts
```

Copy the template and follow the guide:

1. `cp -r src/components/_template src/components/YourComponent`
2. Implement, write stories, write tests
3. Re-export from `src/index.ts`

See [docs/COMPONENT_GUIDE.md](docs/COMPONENT_GUIDE.md) for the full walkthrough.

## Releasing

### Quick Reference

```bash
# 1. After your changes are ready, create a changeset
npx changeset
# Prompts: patch/minor/major? + one-line description

# 2. Commit the changeset file with your PR
git add .changeset/
git commit -m "Add changeset for Button component"

# 3. Push and open a PR as usual
git push

# 4. After merge, a "Version Packages" PR appears automatically
# 5. Merge "Version Packages" when ready to publish → npm release happens
```

No changeset = no release. The changeset file is the signal that a change should be published.

### Agentic Workflow Example

Here's what the full flow looks like when working with an AI agent:

```
You:    Add a Button component with default and outline variants

Agent:  [creates Button.tsx, Button.stories.tsx, Button.test.tsx]
        [exports from index.ts]
        [runs tests — all pass]
        Done. Want me to create a changeset and open a PR?

You:    Yes, it's a minor change

Agent:  [runs npx changeset — selects minor, writes "Add Button component
         with default and outline variants"]
        [commits everything to branch add-button-component]
        [opens PR #14: "Add Button component"]
        PR is up: https://github.com/slainai/tether-ui/pull/14

        — CI runs, tests pass, PR is ready for review —

You:    Merge it

Agent:  [merges PR #14]
        Merged. The Changesets bot will open a "Version Packages" PR
        shortly. Merge that when you're ready to publish to npm.

        — A few minutes later, PR #15 "Version Packages" appears —
        — It bumps 0.0.1 → 0.1.0 and updates CHANGELOG.md —

You:    Merge the version PR

Agent:  [merges PR #15]
        Done. @numberlabs/tether-ui@0.1.0 is now live on npm.
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — design decisions and tech stack
- [Component Guide](docs/COMPONENT_GUIDE.md) — how to add and modify components
- [Testing Guide](docs/TESTING_GUIDE.md) — testing requirements and patterns
- [Agent Guide](docs/AGENT_GUIDE.md) — what AI agents should ask and consider
- [Contributing](CONTRIBUTING.md) — how to work with this repo

## License

Apache 2.0 — see [LICENSE](LICENSE) for details.
