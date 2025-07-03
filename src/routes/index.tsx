import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div>
      <h2>Welcome to Home</h2>
      <p>This is a PoC for Storybook with Vitest integration using TanStack Router.</p>
    </div>
  )
}