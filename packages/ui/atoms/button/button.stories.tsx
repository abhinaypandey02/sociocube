import { expect, fn, userEvent, within } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle } from "@phosphor-icons/react";
import { enumArgTypes } from "../../storybook-utils";
import { Variants } from "../../constants";
import Button from "./button";

export default {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    variant: enumArgTypes(Variants),
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

const mockOnClick = fn();

export const Primary: Story = {
  args: {
    onClick: mockOnClick,
    children: "Primary",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByText("Primary");
    await userEvent.click(btn);
    await expect(mockOnClick).toHaveBeenCalledOnce();
  },
};
export const Accent: Story = {
  args: {
    children: "Accent",
    variant: Variants.ACCENT,
  },
};
export const Dark: Story = {
  args: {
    children: "Dark",
    variant: Variants.DARK,
  },
};
export const PrimaryOutline: Story = {
  args: {
    children: <CheckCircle />,
    invert: true,
    disabled: true,
  },
};
export const AccentOutline: Story = {
  args: {
    children: "Accent Outline",
    variant: Variants.ACCENT,
    invert: true,
  },
};
export const DarkOutline: Story = {
  args: {
    children: "Dark Outline",
    variant: Variants.DARK,
    invert: true,
  },
};
