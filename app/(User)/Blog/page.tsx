import BlogPageClient from "@/Components/BlogPageClient";
import { defaultBlogs } from "@/constants";
import { GetBlog } from "@/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Apex Solution",
  description:
    "Ethiopian tech news, global AI insights, and digital transformation stories curated by the Apex Solution team.",
};

export default async function Blog() {
  const fetched = await GetBlog().catch(() => null);
  const blogs = fetched ? fetched.concat(defaultBlogs) : defaultBlogs;
  return <BlogPageClient blogs={blogs} />;
}
