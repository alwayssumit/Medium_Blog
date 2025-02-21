import { Appbar } from "./Appbar"
import { Blog} from "../hooks"
import { Avatar } from "./BlogCard"
import {format } from "date-fns"
export const FullBlog=({blog}:{blog : Blog})=>{


const formattedDate = format(new Date(blog.createdAt), 'dd MMM yyyy');


    return (<div>
        <Appbar/>
        <div className="flex justify-center pt-12">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl">
            <div className="col-span-8 pr-4">
               <div className="text-5xl font-extrabold">
                {blog.title}
               </div>
               <div className="text-slate-500 pt-2">
               Post on {formattedDate}
               </div>
               <div className="pt-4">
                  {blog.content}
               </div>
            </div>
           <div className="col-span-4">
                <div className="text-slate-600 text-lg">Author</div>
               <div className="flex w-full">
                  <div className="flex flex-col justify-center pr-4 pb-14">
                      <Avatar name={blog.author.name} size={6}></Avatar>
                  </div>
                 <div>
                    <div className="text-xl font-extrabold"> 
                        {blog.author.name}
                    </div>
                    <div className="pt-2 text-slate-500">
                        <div className="pt-2 text-slate-500">
                            {`"${blog.title}" is just one of many insights from ${blog.author.name}.`}
                        </div>
                    </div>
                </div>
            </div>
        </div>   
        </div>
        </div>
        
    </div>
    )
}