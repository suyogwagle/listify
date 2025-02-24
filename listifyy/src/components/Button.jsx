import clsx from 'clsx';
import React from 'react'

const Button = ({icon, className, label, type, onClick=()=> {}}) => {
  return (
    <Button
    type={type || "button"}
    className={clsx("px-3 py-2 outline-none",className)}>
      <span>{label}</span>
      {icon && icon}
    </Button>
  );
};

export default Button;
