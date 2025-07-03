import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>This project demonstrates how to integrate Storybook with Vitest.</p>
      <ul>
        <li>React with TypeScript</li>
        <li>TanStack Router for routing</li>
        <li>Storybook for component development</li>
        <li>Vitest for testing</li>
      </ul>
    </div>
  )
}