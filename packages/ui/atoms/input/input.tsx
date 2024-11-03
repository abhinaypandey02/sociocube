import type { PropsWithChildren } from "react";
import React from "react";
import classNames from "classnames";
import type { UseFormReturn } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { Variants } from "../../constants";
import type { InputProps } from "./types";
import Select from "./select";
import { getBaseClassName } from "./constants";

function InputWrapper({
  label,
  error,
  children,
}: PropsWithChildren<{ label?: string; error?: string }>) {
  return (
    <div className="w-full">
      {label ? (
        <label className="mb-1 block pl-0.5 font-poppins text-sm font-medium">
          {label}
        </label>
      ) : null}
      {children}
      <small className="text-red-600">{error}</small>
    </div>
  );
}

function Input({
  textarea = false,
  options,
  variant = Variants.PRIMARY,
  rules,
  label,
  error,
  ...rest
}: InputProps) {
  const formContext = useFormContext() as UseFormReturn | undefined;

  const className = classNames(getBaseClassName(variant), rest.className);
  if (options)
    return (
      <InputWrapper error={error} label={label}>
        <Select options={options} rules={rules} variant={variant} {...rest} />
      </InputWrapper>
    );
  if (textarea)
    return (
      <InputWrapper error={error} label={label}>
        <textarea
          {...(formContext?.register
            ? formContext.register(rest.name, rules)
            : {})}
          {...rest}
          className={className}
        />
      </InputWrapper>
    );
  return (
    <InputWrapper error={error} label={label}>
      <input
        {...(formContext?.register
          ? formContext.register(rest.name, rules)
          : {})}
        {...rest}
        className={className}
      />
    </InputWrapper>
  );
}

export default Input;
