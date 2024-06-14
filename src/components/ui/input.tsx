import React from 'react'
import { TInputprops } from '../types';

const Input = ({
  name,
  type,
  register,
  focus,
  label,
  error,
  disabled,
}: TInputprops) => {
  return (
    <>
      <>
        <label
          htmlFor={name}
          className={`label ${error ? "text-red-500" : ""}`}
        >
          {label}
        </label>
        <input
          disabled={disabled}
          type={type}
          autoFocus={focus}
          id={name}
          className={`input ${
            error ? "border-red-500 focus-visible:ring-red-700" : ""
          } `}
          {...register(name)}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </>
    </>
  );
};

export default Input