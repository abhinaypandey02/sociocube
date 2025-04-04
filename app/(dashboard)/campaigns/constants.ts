import { InstagramLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import { PostingPlatforms } from "@/__generated__/graphql";

export const POSTING_PLATFORMS = [
  {
    label: "Instagram",
    value: PostingPlatforms.Instagram,
    icon: InstagramLogo,
  },
  {
    label: "Youtube",
    value: PostingPlatforms.Youtube,
    icon: YoutubeLogo,
  },
];
