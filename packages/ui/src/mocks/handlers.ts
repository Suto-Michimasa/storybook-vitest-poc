import { http, HttpResponse } from 'msw'

export interface User {
  id: number
  name: string
  email: string
  role: string
}

export const handlers = [
  // GET /api/users
  http.get('/api/users', () => {
    return HttpResponse.json<User[]>([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'User'
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'User'
      }
    ])
  }),

  // GET /api/users/:id
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params
    return HttpResponse.json<User>({
      id: Number(id),
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin'
    })
  }),

  // POST /api/users
  http.post('/api/users', async ({ request }) => {
    const user = await request.json() as Partial<User>
    return HttpResponse.json<User>({
      id: 4,
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'User'
    }, { status: 201 })
  }),

  // Error example
  http.get('/api/users/error', () => {
    return new HttpResponse(null, { status: 500 })
  })
]