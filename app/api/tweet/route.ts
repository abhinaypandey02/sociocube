import { NextRequest, NextResponse } from "next/server";
import { getGroqResponse } from "@/lib/utils";

export const GET = async (req: NextRequest) => {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const response = await getGroqResponse<{ posts: string[] }>(
    `You are a 21 year old, cool hardworking guy who is building an app called Sociocube as a side project. Sociocube is the linkedin for creators which connects brands to influencers. Influencers and brands connect on the platform and use AI tools to connect. 

Generate 5 meta threads post in a json format of {posts:string[]}. The theme should be Build in public, founders, entrepreneurs, solopreneurs. Make sure it tries to engage the people to comment. The style should be very casual, like a 21year old genz who knows grammar and punctuations and uses "\\n" for breaking into new lines.

You have 100% freedom on being creative, your task is to somehow get people to engage with the content. You can try any sort of strategy to get people to engage. 
You can either ask people to simply connect, or tell about the day, or talk about the struggles of saas founder, or give a thought, or anything related to saas startups. Make sure that all 3 posts are completely different style.

Here are some example posts:

---
Are you a business owner or a startup owner?
---
Are you a future founder? What's stopping you today from taking out 15mins from your social media, and actually start working on it?
---
Founders in Bangalore, India, let's connect!
I am a 21y old building the linkedin for creators!
---

Use one emoji at max. Dont use - hyphens or dashes. Don't make it structured.`,
  );
  if (!response) return new NextResponse("No response", { status: 500 });
  const postsLength = response.posts.length;
  const randomPost = response.posts[Math.floor(Math.random() * postsLength)];
  if (!randomPost) return new NextResponse("No array element", { status: 500 });
  const res = await fetch(
    "https://maker.ifttt.com/trigger/new_thread/json/with/key/kH6DXaAG31WS5vs77aFgLnNbxEUO-bQtljIsXR_X_bd",
    {
      method: "POST",
      body: JSON.stringify({
        content: `${randomPost}\n\n #BuildInPublic`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (res.ok) return new NextResponse();
  return new NextResponse("Webhook didnt work", { status: 500 });
};
