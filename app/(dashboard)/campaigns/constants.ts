import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TiktokLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";

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
  {
    label: "X",
    value: PostingPlatforms.X,
    icon: XLogo,
  },
  {
    label: "Tiktok",
    value: PostingPlatforms.Tiktok,
    icon: TiktokLogo,
  },
  {
    label: "Linkedin",
    value: PostingPlatforms.Linkedin,
    icon: LinkedinLogo,
  },
  {
    label: "Facebook",
    value: PostingPlatforms.Facebook,
    icon: FacebookLogo,
  },
];

export const WRAPPER_ID = "dashboard-wrapper-container";
