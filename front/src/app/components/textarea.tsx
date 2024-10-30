import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  value,
  onChange,
  className,
  ...props
}) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={`border rounded-lg focus:ring-primary-600 outline-none focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-neutral-600 placeholder-neutral-400 text-white ${className}`}
      {...props}
    />
  );
};

export default Textarea;
