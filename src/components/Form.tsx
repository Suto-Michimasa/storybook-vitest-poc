import React, { useState } from 'react';

export interface FormProps {
  onSubmit: (data: { name: string; email: string }) => void;
  initialValues?: {
    name?: string;
    email?: string;
  };
}

const Form: React.FC<FormProps> = ({ onSubmit, initialValues = {} }) => {
  const [name, setName] = useState(initialValues.name || '');
  const [email, setEmail] = useState(initialValues.email || '');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({});

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (validate()) {
      onSubmit({ name, email });
      setErrors({});
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (touched.name) {
      const newErrors = { ...errors };
      if (!e.target.value.trim()) {
        newErrors.name = 'Name is required';
      } else {
        delete newErrors.name;
      }
      setErrors(newErrors);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (touched.email) {
      const newErrors = { ...errors };
      if (!e.target.value.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
        newErrors.email = 'Email is invalid';
      } else {
        delete newErrors.email;
      }
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <div>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '4px' }}>
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
          style={{
            width: '100%',
            padding: '8px',
            border: errors.name ? '1px solid red' : '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        {errors.name && <span style={{ color: 'red', fontSize: '14px' }}>{errors.name}</span>}
      </div>
      
      <div>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '4px' }}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
          style={{
            width: '100%',
            padding: '8px',
            border: errors.email ? '1px solid red' : '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        {errors.email && <span style={{ color: 'red', fontSize: '14px' }}>{errors.email}</span>}
      </div>
      
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          backgroundColor: '#0066cc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;