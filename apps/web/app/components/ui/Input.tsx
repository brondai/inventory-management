import { InputHTMLAttributes } from 'react';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        width: '100%',
        padding: '0.5rem',
        borderRadius: 8,
        border: '1px solid #ddd'
      }}
    />
  );
}
