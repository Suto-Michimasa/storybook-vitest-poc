import React from 'react';

export interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'highlighted';
}

const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  children,
  variant = 'default' 
}) => {
  return (
    <div
      style={{
        border: variant === 'highlighted' ? '2px solid #0066cc' : '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: variant === 'highlighted' ? '#f0f8ff' : 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>{title}</h3>
      {description && (
        <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
          {description}
        </p>
      )}
      {children && <div>{children}</div>}
    </div>
  );
};

export default Card;