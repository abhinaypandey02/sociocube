import React, { useMemo, useState } from "react";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
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
  const { register, setValue, getValues } = useFormContext();
  const [searchValue, setSearchValue] = useState(
    (getValues(rest.name) as string) || "",
  );

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
          <input {...register(rest.name, rules)} {...rest} className="hidden" />
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
              onClick={() => {
                setValue(rest.name, option.value);
                setSearchValue(option.label);
                close();
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
