import BlogItem from "./BlogItem";
import SectionHeader from "./SectionHeader";

interface blog {
  image: string;
  title: string;
  description: string;
  source: string;
  date: Date;
  link: string
}

interface blogProp {
  blogs: blog[];
}

export default function BlogGrid({ blogs }: blogProp) {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4 py-5 flex flex-col gap-5">
        <SectionHeader subtitle="Blog" title="What's New in Tech World ?" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 items-center">
          {blogs &&
            blogs.length > 0 &&
            blogs.map((blog: blog, idx: number) => (
              <BlogItem
                key={idx}
                image={blog.image}
                title={blog.title}
                description={blog.description}
                source={blog.source}
                date={blog.date.toDateString()}
                link={blog.link}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
