import type { ComponentProps } from "react";
import type { Variants } from "../../constants";

interface SelectOption {
  label: string;
  value: string;
}

export type InputProps = {
  textarea?: boolean;
  options?: SelectOption[];
  variant?: Variants;
} & ComponentProps<"textarea"> &
  ComponentProps<"input">;

export type SelectProps = {
  options: SelectOption[];
  variant?: Variants;
} & ComponentProps<"input">;
