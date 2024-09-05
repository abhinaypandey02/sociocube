import type { Meta, StoryObj } from "@storybook/react";
import UserCard from "./user-card";

export default {
  title: "Molecules/User Card",
  component: UserCard,
} as Meta<typeof UserCard>;

type Story = StoryObj<typeof UserCard>;

export const Primary: Story = {
  args: {
    imageURL: "https://picsum.photos/200/300",
    name: "Abhinay Pandey",
    bio: "Traveller | 210 followers",
  },
};
