# Contributing

This library is designed to be maintained through AI-assisted development. You don't need to be an engineer — the AI agent handles the implementation. Your job is to describe what you want and review the result.

## Getting Started

```bash
# Clone and install
git clone https://github.com/slainai/tether-ui.git
cd tether-ui
nvm use
npm install

# Start the dev environment
npm run dev
# Opens Storybook at http://localhost:6006
```

## Branch Workflow

All changes go through branches and pull requests — never commit directly to `main`.

The agent handles this for you, but here's what happens behind the scenes:

1. Agent creates a branch (e.g., `feat/badge-component`)
2. Agent makes changes and commits to that branch
3. Agent opens a pull request
4. CI runs automatically (tests, lint, typecheck, build)
5. You review the result in Storybook and the PR diff
6. You merge the PR — code lands on `main`

If you're ever asked "should I commit this to main?" the answer is always **no — open a PR**.

## Working with an AI Agent

Open the repo in Claude Code (or your preferred AI tool). The agent reads `CLAUDE.md` and `docs/AGENT_GUIDE.md` automatically — you don't need to explain the project structure.

### Adding a Component

Tell the agent what you need:

> Add a Badge component with these variants: default, secondary, outline, destructive. It should support small and medium sizes.

The agent will ask clarifying questions (see `docs/AGENT_GUIDE.md` for what it should ask), implement the component, write stories and tests, and run all checks.

### Modifying a Component

> Add a "ghost" variant to the existing Button component.

The agent knows not to break the existing API — it will add the variant without changing how existing variants work.

### Fixing an Issue

> The Card component has too much padding in RTL mode. Fix it.

The agent will check Storybook, identify the issue, fix it, and verify in both LTR and RTL.

## Review Checklist

After the agent finishes, verify:

1. **Storybook looks right** — run `npm run dev` and check the component visually
2. **CI is green** — all checks pass on the PR
3. **No unexpected files changed** — the diff should only touch the relevant component + `src/index.ts`

## Creating a Release

After merging your PR:

1. A "Version Packages" PR will appear automatically
2. Review the changelog in that PR
3. Merge it when you're ready to publish

See the [Releasing section in README](README.md#releasing) for the full flow.

## Rules

- Every component needs a `.test.tsx` and `.stories.tsx` file — no exceptions
- Don't add npm dependencies without team approval
- Don't change existing component APIs without team approval
- Use Phosphor Icons — not Lucide, not Font Awesome, not others
- Use logical properties for RTL support (`ps-`, `pe-`, `ms-`, `me-`)
