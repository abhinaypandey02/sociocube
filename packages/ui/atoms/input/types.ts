import type { ComponentProps } from "react";
import type { RegisterOptions } from "react-hook-form";
import type { Variants } from "../../constants";

interface SelectOption {
  label: string;
  value: string | number;
}

export type InputProps = {
  textarea?: boolean;
  options?: SelectOption[];
  variant?: Variants;
  name: string;
  rules?: RegisterOptions;
  label?: string;
  error?: string;
} & ComponentProps<"textarea"> &
  ComponentProps<"input">;

export type SelectProps = {
  options: SelectOption[];
  variant?: Variants;
  name: string;
  rules?: RegisterOptions;
} & ComponentProps<"input">;
