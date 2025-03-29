import type { PropsWithChildren } from "react";
import React from "react";
import classNames from "classnames";
import type { UseFormReturn } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import type { InputProps } from "./types";
import Select from "./select";
import { getBaseClassName, getInputErrorMessages } from "./constants";

function InputWrapper({
  label,
  error,
  children,
  suffix,
}: PropsWithChildren<{ label?: string; error?: string; suffix?: string }>) {
  return (
    <div className="w-full">
      {label ? (
        <label className="mb-1.5 block pl-0.5 font-poppins font-semibold">
          {label}
        </label>
      ) : null}
      <div className="flex items-stretch">
        {children}
        {suffix ? (
          <div className="flex items-center rounded-r-md bg-accent px-5 font-medium text-white">
            {suffix}
          </div>
        ) : null}
      </div>
      <small className="text-red-600">{error}</small>
    </div>
  );
}

function Input({
  textarea = false,
  options,
  rules,
  label,
  error,
  suffix,
  ...rest
}: InputProps) {
  const formContext = useFormContext() as UseFormReturn | undefined;
  const formError = formContext?.formState.errors[rest.name];
  const errorMessage =
    error ||
    formError?.message?.toString() ||
    getInputErrorMessages(formError?.type?.toString());
  const className = classNames(
    getBaseClassName(
      Boolean(suffix),
      rest.type === "checkbox" || rest.type === "radio",
    ),
    rest.className,
  );
  if (options)
    return (
      <InputWrapper error={errorMessage} label={label} suffix={suffix}>
        <Select
          options={options}
          rules={rules}
          {...rest}
          className={className}
        />
      </InputWrapper>
    );
  if (textarea)
    return (
      <InputWrapper error={errorMessage} label={label} suffix={suffix}>
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
    <InputWrapper error={errorMessage} label={label} suffix={suffix}>
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
