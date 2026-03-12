import { FormHTMLAttributes } from 'react';

export function Form(props: FormHTMLAttributes<HTMLFormElement>) {
  return <form {...props} style={{ display: 'grid', gap: '0.75rem', maxWidth: 360 }} />;
}
