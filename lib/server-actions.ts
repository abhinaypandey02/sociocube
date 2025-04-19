"use server";

import type { CreatePostingFormFields } from "@/app/(dashboard)/your-campaigns/components/form";
import {
  NAME_MAX_LENGTH,
  POSTING_BIO_MAX_LENGTH,
} from "@/constants/constraints";
import { getGroqResponse } from "@/lib/utils";

export async function getTransformedPostingData(message: string) {
  return getGroqResponse<CreatePostingFormFields>(
    `We need to convert UGC job posting text messages into structured json. It should convert into a form data for entering into a website. The form is built with typescript and here is the interface for form data:
    
    export enum PostingPlatforms {
      Instagram = INSTAGRAM,
      Youtube = YOUTUBE
    }
      
    interface FormFields {
      title: string; // Max length ${NAME_MAX_LENGTH * 2}. The title of the job posting, include the brand name that is looking for creators 
      description: string; // Description of the job posting. Max length ${POSTING_BIO_MAX_LENGTH - 200}. Format it with the newline character \\n and wrap any important title with * to make it bold, also you can wrap anything important with _ to make it italics/emphasis. Summarize the opportunity with proper formatting with newline character. Should NOT include repeated data from other fields or unnecessary data like posting title, agency names, or any kind of greetings like "We are excited to work with you". Keep it brief and don't add unnecessary headings or details, try to make it as concise and short as possible.
      deliverables: string; // A comma separated list of deliverables that are requested by the content creator. No space between commas. Each deliverable should be what is required by the creator, this should only include real digital items. Each deliverable must have space if it has more than 1 word.
      externalLink?: string; // Link to the google form or any other application form mentioned in the message
      barter: boolean; // Is this a barter collaboration or a paid collaboration
      maximumAge?: number; // If not applicable, should be null
      minimumAge?: number; // If not applicable, should be null
      minimumFollowers?: number; // If not applicable, should be null
      price?: number; // The payment to be sent. If its a barter collab, then this should be the maximum worth of products that content creator will get.
      platforms: PostingPlatforms;
    }
      
    The user will provide a text message sent by the marketing agency, return a JSON with the data filled.`,
    message,
  );
}
export const text = `
You are the point of contact for a marketing agency website. Your job is to talk to brands who want to run a campaign on your website. To run a campaign you need the following details:

export enum PostingPlatforms {
      Instagram = INSTAGRAM,
      Youtube = YOUTUBE
    }
      
    interface FormFields {
      title: string; // Max length 30. The title of the job posting, include the brand name that is looking for creators 
      description: string; // Description of the job posting. Max length 1500. Format it with the newline character \\\\n and wrap any important title with * to make it bold, also you can wrap anything important with _ to make it italics/emphasis. Summarize the opportunity with proper formatting with newline character. Should NOT include repeated data from other fields or unnecessary data like posting title, agency names, or any kind of greetings like "We are excited to work with you". Keep it brief and don't add unnecessary headings or details, try to make it as concise and short as possible.
      deliverables: string; // A comma separated list of deliverables that are requested by the content creator. No space between commas. Each deliverable should be what is required by the creator, this should only include real digital items. Each deliverable must have space if it has more than 1 word. Don't repeat the same deliverables, instead club them like 2 Instagram Reels.
      externalLink?: string; // Link to the google form or any other application form mentioned in the message
      barter: boolean; // Is this a barter collaboration or a paid collaboration
      maximumAge?: number; // If not applicable, should be null
      minimumAge?: number; // If not applicable, should be null
      minimumFollowers?: number; // If not applicable, should be null
      price?: number; // The payment to be sent. If its a barter collab, then this should be the maximum worth of products that content creator will get.
      platforms: PostingPlatforms;
    }

The user is asked a question and his responses are returned to you. But if his response is not enough, you should ask for more details in an additionalQuestion field. The additional question should try to ask multiple details at once to avoid iterations. There is a maximum of 4 questions the user can answer, after which the posting needs to be created. If the user has already given enough information before the 4 question limit, you can ask them if they want any extra details to be added. 

You need to generate titles and descriptions and other fields yourself, so don't ask for them directly, instead you can ask for more details to frame a better title or description or deliverables. 

If you think all the required details have been received then you need to return the postingData field.

The response should be JSON in the format 
{ postingData: FormFields | null, additionalQuestion: string|null }

Additional context about the brand:
The brand's name is AquaLogica, it's bio is "Beauty brand revolutionising makeup industry". It's category is Beauty and Makeup.
`;
