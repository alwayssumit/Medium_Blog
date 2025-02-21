import { ChangeEvent, useState } from 'react'
import { Appbar } from '../Components/Appbar'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Publish() {
    
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const navigate =useNavigate();
    return (
    <div>
        <Appbar/>
         <div className='flex pt-8 justify-center w-full'>
        <div className='max-w-screen-lg w-full'>
        <input
        onChange={(e)=>{
            setTitle(e.target.value);
        }}
        type="text" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title"/>
        <TextEditor onChange={(e)=>{
            setDescription(e.target.value);
        }}/>
        <button 
   onClick={async ()=>{
    try {
        const response=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
            title,
            content:description
        },{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        });
        if(response.status===200) toast.success("Blog Published");
        navigate(`/blog/${response.data.id}`);
    } catch (error) {
        toast.error("Error publishing blog");
    }
    
   }}
   type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
       Publish post
   </button>  
        </div>
       
    </div>


    </div>
    
  )
}

function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}){
    return (
    
<form>
   <div className="w-full mb-4 ">
       <div className="flex items-center justify-between  border">
       <div className=" my-2 bg-white rounded-b-lg w-full">
           <label className="sr-only">Publish post</label>
           <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none pl-2 block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0" placeholder="Write an article..." required ></textarea>
       </div>
   </div>
   </div>
</form>
    )
}

export default Publish 