import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
}

const Label: React.FC<LabelProps> = ({ text, className, ...props }) => {
  return (
    <label
      className={`block text-sm font-medium dark:text-white ${className}`}
      {...props}
    >
      {text}
    </label>
  );
};

export default Label;
