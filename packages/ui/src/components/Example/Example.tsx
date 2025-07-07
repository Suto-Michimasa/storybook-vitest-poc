import React from 'react'

export interface ExampleProps {
  title: string
  description?: string
}

export const Example: React.FC<ExampleProps> = ({ title, description }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

export default Example