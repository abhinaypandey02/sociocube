import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import Dropdown from "./dropdown";

export default {
  title: "Atoms/Form",
  component: Dropdown,
} as Meta<typeof Dropdown>;

type Story = StoryObj<typeof Dropdown>;

export const Main: Story = {
  args: {
    trigger: <Button>Trigger</Button>,
    children: (close) => (
      <div>
        <Button invert onClick={close}>
          close
        </Button>
        <Button invert onClick={close}>
          close
        </Button>
        <Button invert onClick={close}>
          close
        </Button>
      </div>
    ),
  },
};
