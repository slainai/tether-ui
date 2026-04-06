# Architecture

## Overview

`@numberlabs/tether-ui` is an internal React component library that provides a unified design system for Tether applications. Components are built on top of shadcn/ui primitives, styled with Tailwind CSS 4, and documented with Storybook.

## Design Decisions

### shadcn/ui as a Foundation, Not a Dependency

shadcn/ui components are copied into `src/components/ui/` as source code, not installed as a package. This means:
- We own the code and can customize freely
- We wrap shadcn primitives in our own components before exporting
- Consumers interact with our API, not shadcn's
- Updates from shadcn are opt-in, not automatic

### Pre-compiled CSS

The library ships compiled CSS. Consumers import `@numberlabs/tether-ui/styles` and do not need Tailwind installed. Design tokens are CSS custom properties, allowing consumers to override the theme without rebuilding.

### Dual ESM + CJS Output

Vite builds both ESM and CJS formats for maximum compatibility. TypeScript declarations are generated alongside.

### React as Peer Dependency

React and ReactDOM are externalized. Consumers provide their own React, avoiding version conflicts and duplicate React instances.

### Biome over ESLint + Prettier

A single tool for linting and formatting. Fewer configuration files, faster execution, deterministic output. Reduces the surface area for configuration conflicts, especially important for agentic workflows.

### RTL-First

All components use Tailwind logical properties and are tested in both LTR and RTL modes via Storybook.

## Layers

```
┌──────────────────────────────────┐
│        Exported Components       │  ← Public API (src/index.ts)
│  (Button, Card, Dialog, etc.)    │
├──────────────────────────────────┤
│        shadcn/ui Primitives      │  ← Internal (src/components/ui/)
│  (managed by shadcn CLI)         │
├──────────────────────────────────┤
│     Radix UI + Tailwind CSS 4    │  ← Foundation
│  (headless components + styling) │
└──────────────────────────────────┘
```

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Vite | 8 | Build (library mode) |
| React | 19.2 | UI framework |
| TypeScript | 6.0 | Type safety |
| Tailwind CSS | 4 | Styling (CSS-first config) |
| shadcn/ui | latest | Component primitives (Vega style) |
| Storybook | 10.3 | Development + documentation |
| Vitest | latest | Unit + story testing |
| Biome | latest | Linting + formatting |
| Changesets | latest | Version management |
| Phosphor Icons | latest | Icon library |

## Theme

- **Style**: Vega (classic shadcn)
- **Base color**: Neutral
- **Radius**: 0.45rem
- **Body font**: Noto Sans
- **Heading font**: Noto Sans Display
- **Color format**: oklch
- **Direction**: RTL (default), LTR supported
