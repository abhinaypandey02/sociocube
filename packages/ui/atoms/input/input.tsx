import React from "react";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import { Variants } from "../../constants";
import type { InputProps } from "./types";
import Select from "./select";
import { getBaseClassName } from "./constants";

function Input({
  textarea = false,
  options,
  variant = Variants.PRIMARY,
  rules,
  ...rest
}: InputProps) {
  const { register } = useFormContext();
  const className = classNames(getBaseClassName(variant), rest.className);
  if (options)
    return (
      <Select options={options} rules={rules} variant={variant} {...rest} />
    );
  if (textarea)
    return (
      <textarea
        {...register(rest.name, rules)}
        {...rest}
        className={className}
      />
    );
  return (
    <input {...register(rest.name, rules)} {...rest} className={className} />
  );
}

export default Input;
