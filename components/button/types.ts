import type { ComponentProps } from "react";
import type { Variants } from "@/components/constants";

export type ButtonProps = {
  /** variant */
  variant?: Variants;
  invert?: boolean;
  borderless?: boolean;
  loading?: boolean;
  success?: boolean;
  square?: boolean;
} & ComponentProps<"button">;
