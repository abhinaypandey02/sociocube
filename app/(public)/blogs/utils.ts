import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "app", "blogs", "content");

export function getBlogPosts() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    return getBlogPost(id);
  });
}

export function getBlogPost(id: string) {
  // Get file names under /posts
  try {
    const file = fs.readFileSync(path.join(postsDirectory, `${id}.md`), "utf8");
    const matterResult = matter(file);
    return {
      id,
      title: matterResult.data.title as string,
      date: matterResult.data.date as Date,
      description: matterResult.data.description as string,
      content: matterResult.content,
    };
  } catch (e) {
    return null;
  }
}
