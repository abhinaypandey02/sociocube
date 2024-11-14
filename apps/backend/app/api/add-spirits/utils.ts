import categories from "commons/categories";

export async function getCategory(userCategory?: string) {
  if (!userCategory) return "Lifestyle";
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY || ""}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "llama3-8b-8192",

        messages: [
          {
            role: "system",
            content: `
            Here is a list of categories that we have in our app:
            
            ${categories.map((category) => category.title).join(", ")}
            
            The user will enter a category that might not be in this list, you need to find the category that is closest to the user's entered category.
            Return just that exact category name. Nothing else should be returned as its highly case sensitive. Don't say anything. Just say the name of the category. That's it.
            If there is no match then return any of the category that you think would be suitable.
          `,
          },
          {
            role: "user",
            content: userCategory,
          },
        ],
      }),
    });
    const data = (await res.json()) as {
      choices?: {
        message?: {
          content?: string;
        };
      }[];
    };
    return data.choices?.[0]?.message?.content || "Lifestyle";
  } catch (e) {
    return "Lifestyle";
  }
}

export async function getGender(name: string, bio: string, username: string) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY || ""}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "llama3-8b-8192",

        messages: [
          {
            role: "system",
            content: `
            Here is a list of genders that we have in our app:
            
            Male, Female, Other
            
            The user will enter some information about a person, you need to find the gender of the person that is closest to the user's entered information.
            Return just that exact gender name. Nothing else should be returned as its highly case sensitive. Don't say anything. Just say the name of the gender. That's it.
            If there is no match then return Other.
          `,
          },
          {
            role: "user",
            content: `
            Their instagram username: ${username}
            Their instagram name: ${name}
            Their instagram bio: ${bio}
          `,
          },
        ],
      }),
    });
    const data = (await res.json()) as {
      choices?: {
        message?: {
          content?: string;
        };
      }[];
    };
    return data.choices?.[0]?.message?.content || "Other";
  } catch (e) {
    return "Other";
  }
}
