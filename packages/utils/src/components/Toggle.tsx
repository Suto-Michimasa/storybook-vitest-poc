import React, { useState } from 'react';

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ 
  checked = false, 
  onChange,
  label,
  disabled = false
}) => {
  const [internalChecked, setInternalChecked] = useState(checked);

  React.useEffect(() => {
    setInternalChecked(checked);
  }, [checked]);

  const handleToggle = () => {
    if (!disabled) {
      const newValue = !internalChecked;
      setInternalChecked(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={handleToggle}
    >
      <div
        style={{
          width: '44px',
          height: '24px',
          backgroundColor: internalChecked ? '#0066cc' : '#ccc',
          borderRadius: '12px',
          position: 'relative',
          transition: 'background-color 0.3s',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: '2px',
            left: internalChecked ? '22px' : '2px',
            transition: 'left 0.3s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />
      </div>
      {label && <span style={{ fontSize: '14px', color: '#333' }}>{label}</span>}
    </div>
  );
};

export default Toggle;