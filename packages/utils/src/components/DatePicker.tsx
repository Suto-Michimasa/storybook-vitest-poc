import React, { useState } from 'react';

export interface DatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  min?: string;
  max?: string;
  label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  value = '', 
  onChange,
  min,
  max,
  label = 'Select Date'
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const inputId = `date-picker-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label 
        htmlFor={inputId}
        style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}
      >
        {label}
      </label>
      <input
        id={inputId}
        type="date"
        value={internalValue}
        onChange={handleChange}
        min={min}
        max={max}
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px',
          backgroundColor: 'white',
        }}
      />
    </div>
  );
};

export default DatePicker;