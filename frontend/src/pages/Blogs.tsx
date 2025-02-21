
import { BlogCard } from "../Components/BlogCard"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../Components/BlogSkeleton"
import { format } from "date-fns"
import { Appbar } from "../Components/Appbar"
export const Blogs=()=>{
  const {loading,blogs}=useBlogs();
  if(loading){
    return <div>
      <Appbar/>
      <div className="flex item-center justify-center"> 
        <div className="">
          <BlogSkeleton/>
          <BlogSkeleton/>
          <BlogSkeleton/>
        </div>
      </div>
      
    </div>
  }
    return <div >
      <Appbar/>
      <div className="flex justify-center">
       <div>
        {blogs.map(blog=><BlogCard 
          id={blog.id}
          authorName={blog.author.name || "Anonymous"}
            title={blog.title}
              content={blog.content}
            publishedDate={format(new Date(blog.createdAt), 'dd MMM yyyy')}
            />)}
       </div>
      </div>
     
    </div>
    
}


