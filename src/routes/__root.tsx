import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div style={{ padding: '20px' }}>
        <h1>Storybook + Vitest PoC</h1>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>
            Home
          </Link>
          <Link to="/about" style={{ marginRight: '10px' }}>
            About
          </Link>
          <Link to="/demo">
            Demo
          </Link>
        </nav>
        <hr />
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})