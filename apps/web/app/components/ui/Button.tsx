import { ButtonHTMLAttributes } from 'react';

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      style={{
        padding: '0.5rem 0.75rem',
        borderRadius: 8,
        border: '1px solid #ddd',
        background: '#111',
        color: '#fff',
        cursor: 'pointer'
      }}
    />
  );
}
