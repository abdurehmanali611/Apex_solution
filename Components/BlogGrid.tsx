import BlogItem from "./BlogItem";
import SectionHeader from "./SectionHeader";

interface Blog {
  image: string;
  title: string;
  description: string;
  source: string;
  date: string;
  link: string;
  category?: string;
}

export default function BlogGrid({ blogs }: { blogs: Blog[] }) {
  return (
    <section className="section-padding px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          subtitle="Insights"
          title="What's New in Tech"
          description="Ethiopian digital stories and global AI breakthroughs — curated to keep you ahead."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog, idx) => (
            <BlogItem
              key={idx}
              image={blog.image}
              title={blog.title}
              description={blog.description}
              source={blog.source}
              date={new Date(blog.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              link={blog.link}
              category={blog.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
