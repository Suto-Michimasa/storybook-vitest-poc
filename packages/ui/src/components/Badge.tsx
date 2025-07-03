import React from 'react';

export interface BadgeProps {
  label: string;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

const Badge: React.FC<BadgeProps> = ({ 
  label, 
  color = 'primary',
  size = 'medium' 
}) => {
  const colors = {
    primary: '#0066cc',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545',
  };

  const sizes = {
    small: { padding: '2px 8px', fontSize: '12px' },
    medium: { padding: '4px 12px', fontSize: '14px' },
    large: { padding: '6px 16px', fontSize: '16px' },
  };

  return (
    <span
      style={{
        display: 'inline-block',
        backgroundColor: colors[color],
        color: 'white',
        borderRadius: '12px',
        fontWeight: 'bold',
        ...sizes[size],
      }}
    >
      {label}
    </span>
  );
};

export default Badge;