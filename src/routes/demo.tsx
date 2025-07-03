import { createFileRoute } from '@tanstack/react-router'
import Button from '../components/Button'

export const Route = createFileRoute('/demo')({
  component: Demo,
})

function Demo() {
  return (
    <div>
      <h2>Demo Components</h2>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Button 
          label="Primary Button" 
          onClick={() => alert('Primary clicked!')} 
        />
        <Button 
          label="Secondary Button" 
          variant="secondary"
          onClick={() => alert('Secondary clicked!')} 
        />
        <Button 
          label="Disabled Button" 
          disabled
          onClick={() => alert('This should not appear')} 
        />
      </div>
    </div>
  )
}