import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "./navbar";

export default {
  title: "Organisms/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Navbar>;

type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
  args: {
    sections: [
      [{ label: "Home", href: "/" }],
      [
        {
          label: {
            children: "Login",
            outline: true,
          },
        },
        {
          label: {
            children: "Register",
          },
        },
      ],
    ],
  },
};

export const ActiveHref: Story = {
  args: {
    activeHref: "/",
    sections: [
      [{ label: "Home", href: "/" }],
      [
        {
          label: {
            children: "Login",
            outline: true,
          },
        },
        {
          label: {
            children: "Register",
          },
        },
      ],
    ],
  },
};
