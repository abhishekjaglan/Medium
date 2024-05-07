import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SingUp } from "./pages/SignUp"
import { SingIn } from "./pages/SignIn"
import { Blog } from "./pages/Blog"
import { Blogs } from "./pages/Blogs"
import { CreateBlog } from "./pages/CreateBlog"
import Home from "./pages/Home"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SingUp/>}/>
          <Route path="/signin" element={<SingIn/>}/>
          <Route path="/blog/:id" element={<Blog/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/createblog" element={<CreateBlog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
