import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  value,
  onChange,
  className,
  ...props
}) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={`border rounded-lg outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-neutral-600 placeholder-neutral-400 text-white ${className}`}
      {...props}
    />
  );
};

export default Input;
