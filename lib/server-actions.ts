"use server";

import type { CreatePostingFormFields } from "@/app/account/campaigns/components/form";
import {
  NAME_MAX_LENGTH,
  POSTING_BIO_MAX_LENGTH,
} from "@/constants/constraints";
import { getGroqResponse } from "@/lib/utils";

export async function getTransformedPostingData(message: string) {
  return getGroqResponse<CreatePostingFormFields>(
    `We need to convert UGC job posting text messages into structured json. It should convert into a form data for entering into a website. The form is built with typescript and here is the interface for form data:\n\nexport enum PostingPlatforms {\n  Instagram = '''INSTAGRAM''',\n  Youtube = '''YOUTUBE'''\n}\n\ninterface FormFields {\n  title: string; // Max length ${NAME_MAX_LENGTH * 2}. The title of the job posting, include the brand name that is looking for creators\n  description: string; // Description of the job posting. Max length ${POSTING_BIO_MAX_LENGTH}. Should definitely format it with the newline character \n\n and wrap any headings with * to make it bold, also you can wrap anything important with _ to make it italics/emphasis. Summarize the opportunity in detail with proper formatting with newline character. Should not include repeated data from other fields or unnecessary data like posting title, agency names, greetings, etc .\n  deliverables: string; // A comma separated list of deliverables that are requested by the content creator. No space between commas. Each deliverable should be what is required by the creator, this should only include real digital items. Each deliverable must have space if it has more than 1 word.\n  externalLink?: string; // Link to the google form or any other application form mentioned in the message\n  barter: boolean; // Is this a barter collaboration or a paid collaboration\n  maximumAge?: number; \n  minimumAge?: number;\n  minimumFollowers?: number;\n  price?: number; // The payment to be sent. If its a barter collab, then this should be the maximum worth of products that content creator will get.\n  platforms: PostingPlatforms;\n}\n\n\nThe user will provide a text message sent by the marketing agency, return a JSON with the data filled.\n`,
    message,
  );
}
