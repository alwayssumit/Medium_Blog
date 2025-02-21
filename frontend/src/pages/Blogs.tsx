import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { format } from "date-fns";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    } 
    return <div>
        <Appbar />
        <div  className="flex justify-center">
            <div>
                
                {blogs.map(blog => <BlogCard
                    key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={format(new Date(blog.createdAt), "dd-MMM-yyyy")}
                />)}
            
            </div>
        </div>
    </div>
}

