import { ChangeEvent } from 'react';

interface InputProps {
  type: string;
  value: string | number;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
}

const Input = ({
  type,
  value,
  name,
  onChange,
  disabled = false,
  autoComplete = 'off',
}: InputProps) => {
  return (
    <span className='inpbox'>
      <input
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
