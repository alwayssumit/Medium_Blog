import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"
import {jwtDecode,JwtPayload} from "jwt-decode";
import { useEffect,useState } from "react";
interface CustomJwtPayload extends JwtPayload {
    id?: number;
    name?: string;
  }
export const Appbar = () => {
    const [user, setUser] = useState<CustomJwtPayload | null>(null);;
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
        //   const decoded = jwtDecode(token);
          const decoded: CustomJwtPayload = jwtDecode<CustomJwtPayload>(token);
          setUser(decoded);
          setUser(decoded);
        } catch (error) {
          console.error("Invalid token", error);
        }
      }
    }, []); 
    return <div className="border-b flex justify-between px-36 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer font-bold">
            <div className="hover:text-lg">
                Medium
            </div>
                
        </Link>
        <div>
            <Link to={"/publish"}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Publish</button>
            </Link>
            <Avatar size={8} name={user?.name || "user" }/>
        </div>
      </div>
}