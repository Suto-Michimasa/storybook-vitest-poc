import React, { useEffect, useState } from 'react'
import type { User } from '../mocks/handlers'

export interface UserListProps {
  onUserClick?: (user: User) => void
}

export const UserList: React.FC<UserListProps> = ({ onUserClick }) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/users')
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return <div data-testid="loading">Loading users...</div>
  }

  if (error) {
    return <div data-testid="error">Error: {error}</div>
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2>User List</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              padding: '10px',
              margin: '5px 0',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: onUserClick ? 'pointer' : 'default',
            }}
            onClick={() => onUserClick?.(user)}
            data-testid={`user-${user.id}`}
          >
            <div style={{ fontWeight: 'bold' }}>{user.name}</div>
            <div style={{ fontSize: '0.9em', color: '#666' }}>{user.email}</div>
            <div style={{ fontSize: '0.8em', color: '#999' }}>Role: {user.role}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}