import React from "react";
import Markdown from "react-markdown";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPost, getBlogPosts } from "../utils";
import { getSEO } from "@/constants/seo";
import { MARKDOWN_COMPONENTS } from "../markdown-components";
import Schema from "../../components/schema";

export interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const blog = getBlogPost((await params).slug);
  return getSEO(blog?.title, blog?.description);
}

export function generateStaticParams() {
  const blogs = getBlogPosts();
  return blogs.map((blog) => ({ slug: blog?.id }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const slug = (await params).slug;
  const blog = getBlogPost(slug);
  if (!blog) return notFound();
  return (
    <div className="mx-auto max-w-6xl px-6 py-8 sm:py-16 md:px-8">
      <Schema
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: blog.title,
          image: [`${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image.png`],
          datePublished: blog.date.toISOString(),
          dateModified: blog.date.toISOString(),
          author: [
            {
              "@type": "Person",
              name: "Abhinay Pandey",
              url: "https://abhinaypandey.com",
            },
          ],
        }}
        id={blog.id}
      />
      <Markdown className="text-gray-800" components={MARKDOWN_COMPONENTS}>
        {blog.content}
      </Markdown>
    </div>
  );
}
