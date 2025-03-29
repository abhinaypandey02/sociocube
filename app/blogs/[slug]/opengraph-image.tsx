import { getOgImage } from "../../../lib/util-components";
import { getBlogPost } from "../utils";
import type { BlogPageProps } from "./page";

export { size } from "../../../lib/util-components";

export default async function Image({ params }: BlogPageProps) {
  const blog = getBlogPost((await params).slug);
  return getOgImage(blog?.title || "Sign in to Sociocube", "Read more");
}
