import React, { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { useFormContext, type UseFormReturn } from "react-hook-form";
import { Variants } from "../../constants";
import Dropdown from "../dropdown/dropdown";
import type { SelectProps } from "./types";
import { getBaseClassName } from "./constants";

function Select({
  options,
  variant = Variants.PRIMARY,
  rules,
  ...rest
}: SelectProps) {
  const className = classNames(getBaseClassName(variant), rest.className);
  const formContext = useFormContext() as UseFormReturn | undefined;
  const ref = useRef<HTMLInputElement | null>(null);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    const updatedValue = options.find(
      (option) => option.value === formContext?.getValues(rest.name),
    )?.label;
    if (updatedValue) setSearchValue(updatedValue);
  }, [options]);
  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(searchValue.toLowerCase().replaceAll(" ", "")),
      ),
    [searchValue, options],
  );
  return (
    <Dropdown
      onOpen={() => {
        setSearchValue("");
      }}
      trigger={
        <>
          <input
            {...(formContext?.register
              ? formContext.register(rest.name, rules)
              : { ref })}
            {...rest}
            className="hidden"
          />
          <input
            className={className}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            placeholder={rest.placeholder}
            value={searchValue}
          />
        </>
      }
    >
      {(close) =>
        filteredOptions.length === 0 ? (
          <div className="px-3 py-1 italic opacity-50">No results</div>
        ) : (
          filteredOptions.map((option) => (
            <button
              className={classNames(
                `my-1 block w-full rounded-primary px-3 py-1 text-sm text-left transition-colors outline-0 focus:bg-opacity-5 hover:bg-opacity-5`,
                {
                  "focus:bg-primary hover:bg-primary":
                    variant === Variants.PRIMARY,
                  "focus:bg-accent hover:bg-accent":
                    variant === Variants.ACCENT,
                  "focus:bg-dark hover:bg-dark": variant === Variants.DARK,
                },
              )}
              key={option.value}
              onClick={(e) => {
                e.stopPropagation();
                // eslint-disable-next-line -- no-alert
                window.alert(option.value);
                try {
                  if (!formContext) {
                    const nativeInputValueSetter =
                      Object.getOwnPropertyDescriptor(
                        window.HTMLInputElement.prototype,
                        "value",
                      );
                    nativeInputValueSetter?.set?.call(
                      ref.current,
                      option.value,
                    );
                    const event = new Event("input", { bubbles: true });
                    ref.current?.dispatchEvent(event);
                  }
                  formContext?.setValue(rest.name, option.value);
                  setSearchValue(option.label);
                  close();
                } catch (error: unknown) {
                  // eslint-disable-next-line -- no-alert
                  window.alert((error as Error).message);
                }
              }}
              type="button"
            >
              {option.label}
            </button>
          ))
        )
      }
    </Dropdown>
  );
}

export default Select;
