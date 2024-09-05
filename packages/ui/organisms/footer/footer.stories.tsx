import type { Meta, StoryObj } from "@storybook/react";
import Footer from "./footer";

export default {
  title: "Organisms/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Footer>;

type Story = StoryObj<typeof Footer>;

export const Primary: Story = {
  args: {},
};
