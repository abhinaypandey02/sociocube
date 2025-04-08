import classNames from "classnames";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFormContext, type UseFormReturn } from "react-hook-form";

import Dropdown from "../dropdown/dropdown";
import type { SelectOption, SelectProps } from "./types";

export function isTouchDevice() {
  if (typeof window !== "undefined")
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function Select({ options, rules, ...rest }: SelectProps) {
  const formContext = useFormContext() as UseFormReturn | undefined;
  const ref = useRef<HTMLInputElement | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const value = formContext?.getValues(rest.name) as string;
  useEffect(() => {
    const updatedValue = options.find(
      (option) =>
        option.value === (rest.value || formContext?.getValues(rest.name)),
    )?.label;
    if (updatedValue) setSearchValue(updatedValue);
  }, [options, value]);
  const IS_TOUCH = useMemo(() => isTouchDevice(), []);
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
  const handleChange = useCallback((option: SelectOption) => {
    if (!formContext) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value",
      );
      nativeInputValueSetter?.set?.call(ref.current, option.value);
      const event = new Event("input", { bubbles: true });
      ref.current?.dispatchEvent(event);
    }
    formContext?.setValue(rest.name, option.value);
    setSearchValue(option.label);
  }, []);
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
            placeholder={undefined}
          />
          <input
            className={rest.className}
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
                `focus:bg-primary hover:bg-primary my-1 block w-full rounded-primary px-3 py-1 text-sm text-left transition-colors outline-0 focus:bg-opacity-5 hover:bg-opacity-5`,
              )}
              key={option.value}
              onClick={() => {
                if (!IS_TOUCH) {
                  handleChange(option);
                  close();
                }
              }}
              onMouseEnter={() => {
                if (IS_TOUCH) {
                  handleChange(option);
                  close();
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
