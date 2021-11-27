import { ChangeEvent } from 'react';

interface InputProps {
  type: string;
  value: string | number;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
  label?: string;
}

const Input = ({
  type,
  value,
  name,
  onChange,
  disabled = false,
  autoComplete = 'off',
  label = '',
}: InputProps) => {
  return (
    <span className='inpbox'>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        autoComplete={autoComplete}
        disabled={disabled}
      />
    </span>
  );
};

export default Input;
