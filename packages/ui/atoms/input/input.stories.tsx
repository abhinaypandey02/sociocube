import type { Meta, StoryObj } from "@storybook/react";
import { enumArgTypes } from "../../storybook-utils";
import { Variants } from "../../constants";
import Input from "./input";

export default {
  title: "Atoms/Input",
  component: Input,
  argTypes: {
    variant: enumArgTypes(Variants),
  },
} as Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const BaseInput: Story = {
  args: {
    placeholder: "Input",
  },
};
export const Textarea: Story = {
  args: {
    placeholder: "Textarea",
    textarea: true,
    rows: 4,
  },
};
export const Select: Story = {
  args: {
    placeholder: "Select",
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
    ],
  },
};
