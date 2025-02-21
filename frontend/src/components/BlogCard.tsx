import { Link } from "react-router-dom";
interface BlogCardProps{
    id:number,
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
}

export const BlogCard=({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer hover:bg-slate-100">
        <div className="flex">

            <Avatar name={authorName}></Avatar>
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
            <div className="pl-2 flex justify-center flex-col"><Circle/></div>
             <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">{publishedDate}</div>
        </div>
        <div className="text-xl pt-2 font-semibold">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100)+"..."}
        </div>
        <div className=" text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/100)} minute(s) read`}
        </div>
    </div>
    </Link>
    }

export function Circle(){
    return<div className="h-1 w-1 rounded-full bg-slate-500"></div>
}
    
export function Avatar({ name, size = 5 }: { name: string; size?: number }) {
    console.log("Avatar Component Rendered with name:", name, "and size:", size);

    const sizeMap: Record<number, string> = {
        5: "w-5 h-5",
        6: "w-6 h-6",
        8: "w-8 h-8",
        10: "w-10 h-10",
        12: "w-12 h-12",
    };

    return (
        <div
            className={`relative inline-flex flex-col items-center justify-center 
            ${sizeMap[size] || "w-5 h-5"} overflow-hidden bg-gray-600 rounded-full`}
        >
            <span className="font-extralight text-xs text-gray-100 dark:text-gray-300">
                {name ? name[0] : "?"}
            </span>
        </div>
    );
}
