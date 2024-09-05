import React from "react";
import classNames from "classnames";
import { Variants } from "../../constants";
import type { InputProps } from "./types";
import Select from "./select";
import { getBaseClassName } from "./constants";

function Input({
  textarea = false,
  options,
  variant = Variants.PRIMARY,
  ...rest
}: InputProps) {
  const className = classNames(getBaseClassName(variant), rest.className);
  if (options) return <Select options={options} variant={variant} {...rest} />;
  if (textarea) return <textarea {...rest} className={className} />;
  return <input {...rest} className={className} />;
}

export default Input;
