import { Auth } from "../Components/Auth"
import Quote from "../Components/Quote"


export const Signin = ()=>{

    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signin"/>
            </div>
            <div className="invisible lg:visible">
               <Quote/>
            </div>
        </div>
       
    </div>
}