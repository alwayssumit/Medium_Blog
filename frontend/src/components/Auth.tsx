
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import { SigninInput } from "@codingprism/medium";




export const Auth=({type}:{type:"signup"|"signin"})=>{
   const [postInputs,setpostInputs]=useState<SigninInput>({
    email:"",
    password:"",
    name:""
   });
   const navigate=useNavigate();
   async function sendRequest() {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
            postInputs
        );
        if (response.status === 200) {
            if (type === "signin") {
                toast.success("Login Successful");
            } else {
                toast.success("Account Created Successfully");
            }

            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 422) {
                toast.error("Inputs are not correct");
            } else if (error.response.status === 401) {
                toast.error("Incorrect credentials");
            } else {
                toast.error("An error occurred");
            }
        } else {
            toast.error("Something went wrong");
        }
    }
}

   
   return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
                <div className="text-3xl font-extrabold">
                    Create an account 
                </div>
                <div className="text-slate-400">
                    {type==="signin"? "Don't have an Account" : "Already have an Account?"}
                    <Link className="pl-2 underline" to={type==="signin" ?"/signup":"/signin"}>
                    {type ==="signin"?"Sign Up": "Sign In"}
                    </Link>
                </div>
            </div>
            <div className="pt-8">
            {type==="signup" ? <LabelledInput label="Name" placeholder="Sumit Shukla..." onChange={(e)=>{
                setpostInputs(c=>({
                    ...c,
                    name:e.target.value
                }))
            }}/> : null}
            <LabelledInput label="Email" placeholder="sumitshukla@gmail.com" onChange={(e)=>{
                setpostInputs(c=>({
                    ...c,
                    email:e.target.value
                }))
            }}/>
            <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e)=>{
                setpostInputs(c=>({
                    ...c,
                    password:e.target.value
                }))
            }}/>
            <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm
             px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 mt-8 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"?"Sign Up":"Sign In"}</button>
            </div>
            </div>
            
        </div>
    </div>

}

interface LabelledInputType{
    label:string;
    placeholder:string;
    onChange:(e:any)=>void;
    type?: string;
}

function LabelledInput ({label,placeholder,onChange,type}:LabelledInputType){
    return <div>
            <label className="block mb-2 text-sm font-semibold text-black pt-2 dark:text-white">{label}</label>
            <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}