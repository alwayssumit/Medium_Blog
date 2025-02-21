import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Blogs } from './pages/Blogs';

import Blog from './pages/Blog';
import Publish from './pages/Publish';
import Hom from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hom/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/publish" element={<Publish />} />
      </Routes>
    </BrowserRouter>
  );
}

// Define a Home component with the button
function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate('/signup')}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Signup
      </button>
    </div>
  );
}

export default App;
