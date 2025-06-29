import { EmailComponent, EmailComponentType } from "@backend/lib/email/types";

export const DeleteUser = ({ name }: { name: string | null }) => ({
  subject: `We're sorry to see you go!`,
  title: "Goodbye from Sociocube",
  components: [
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Hi ${name ? name : "there"},
We're sorry to see you go! If you have any feedback or if there's anything we could have done better, please let us know.
      `,
    },
  ] as EmailComponent[],
});
