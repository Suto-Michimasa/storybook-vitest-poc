# Storybook Vitest Stories.tsx Issue Reproduction

This repository demonstrates an issue where `@storybook/addon-vitest` doesn't recognize story files named `stories.tsx` without component prefix.

## Issue Description

- Files named `ComponentName.stories.tsx` ✅ Work correctly
- Files named `stories.tsx` ❌ Show "No test suite found" error

## Setup

```bash
# Install dependencies
pnpm install

# Run Storybook (stories.tsx files are displayed correctly)
pnpm storybook

# Run tests (stories.tsx files are not recognized)
pnpm test-storybook
```

## Reproduction Steps

1. This repo contains working story files:
   - `packages/ui/src/components/Badge.stories.tsx` - ✅ Recognized
   - `packages/ui/src/components/Card.stories.tsx` - ✅ Recognized

2. We'll create a story file without component prefix:
   - `packages/ui/src/components/Example/stories.tsx` - ❌ Not recognized

3. Run `pnpm test-storybook` and observe the error

## Project Structure

```
.
├── packages/
│   ├── ui/
│   │   └── src/
│   │       └── components/
│   │           ├── Card.tsx
│   │           ├── Card.stories.tsx
│   │           ├── Badge.tsx
│   │           └── Badge.stories.tsx
│   └── utils/
│       └── src/
│           └── components/
│               ├── DatePicker.tsx
│               ├── DatePicker.stories.tsx
│               ├── Toggle.tsx
│               └── Toggle.stories.tsx
├── .storybook/
├── vite.config.ts
├── vitest.config.ts
├── vitest.setup.ts
└── pnpm-workspace.yaml
```

## Expected Behavior

All files matching Storybook's stories patterns should be recognized by addon-vitest.

## Actual Behavior

Only `*.stories.tsx` pattern is recognized, `stories.tsx` pattern is ignored.

## Workaround

Add explicit include pattern in `vitest.config.ts`:

```typescript
test: {
  include: [
    '**/*.stories.{js,jsx,ts,tsx}',
    '**/stories.{js,jsx,ts,tsx}', // This line is needed
  ],
}
```

## Environment

- @storybook/addon-vitest: ^9.0.15
- @storybook/react-vite: ^9.0.15
- storybook: ^9.0.15
- vitest: ^3.2.4
- Node: 18+
- pnpm: 10.12.4