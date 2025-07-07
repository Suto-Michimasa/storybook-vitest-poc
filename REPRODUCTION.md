# How to Reproduce the Issue

## 1. Clone and Setup
```bash
git clone [your-repo-url]
cd storybook-vitest-poc
pnpm install
```

## 2. Run Storybook
```bash
pnpm storybook
```
- Navigate to "UI/Example (stories.tsx)" in the sidebar
- The story is displayed correctly ✅

## 3. Run Vitest Tests
```bash
pnpm test-storybook
```

## 4. Observe the Results

### Working files (*.stories.tsx):
- ✅ packages/ui/src/components/Badge.stories.tsx
- ✅ packages/ui/src/components/Card.stories.tsx
- ✅ packages/ui/src/components/UserList.stories.tsx
- ✅ packages/utils/src/components/DatePicker.stories.tsx
- ✅ packages/utils/src/components/Toggle.stories.tsx

### Not working file (stories.tsx):
- ❌ packages/ui/src/components/Example/stories.tsx
  - Error: "No test suite found in file"

## 5. Apply Workaround

Uncomment lines 36-38 in `vitest.config.ts`:
```typescript
// Exclude Node.js specific MSW setup from browser tests
// resolve: {
//   conditions: ['browser']
// }
```

Change to:
```typescript
// Explicitly include both .stories.tsx and stories.tsx patterns
include: [
  '**/*.stories.{js,jsx,ts,tsx}',
  '**/stories.{js,jsx,ts,tsx}',
],
```

Run tests again:
```bash
pnpm test-storybook
```

Now all tests pass! ✅