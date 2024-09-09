import type { ComponentProps } from "react";
import type { Variants } from "../../constants";

export type ButtonProps = {
  /** variant */
  variant?: Variants;
  outline?: boolean;
  loading?: boolean;
  success?: boolean;
} & ComponentProps<"button">;
