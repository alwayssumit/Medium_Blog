
import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import { FullBlog } from '../Components/FullBlog';
import Spinner from '../Components/Spinner';
import { Appbar } from '../Components/Appbar';

function Blog() {
    const {id} =useParams();
    const {loading, blog} = useBlog({
        id:Number(id ||"")
    });
    if(loading || (!blog)){
        return (
            <div>
                <Appbar/>
                <div className='h-screen flex flex-col justify-center'>
            <div className='flex justify-center'>
                <Spinner/>
            </div>
        </div>
            </div>
        )
        
    }
  return (
    <div>
        
        <FullBlog blog={blog}/>
    </div>
  )
}

export default Blog