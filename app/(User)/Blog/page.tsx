import BlogGrid from "@/Components/BlogGrid";
import { Blogs } from "@/constants";

export default function Blog() {
    return (
        <div>
            <BlogGrid blogs={Blogs}/>
        </div>
    )
}