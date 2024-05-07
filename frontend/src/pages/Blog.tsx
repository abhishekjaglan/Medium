import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/UseBlogs"
import { SingleBlog } from "../components/SingleBlog";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Appbar } from "../components/Appbar";

export function Blog(){
    const { id }= useParams();
    const {blog, loading} = useBlog({
        id: id?.toString() || ""
    });

    console.log(typeof id);

    if(loading){
        return(
            <div>
                <Appbar/>
            <div className="flex justify-center ">
                <div>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                </div>
            </div>
            </div>
        )
    }
    return(
        <div>
            <SingleBlog blog={blog}/>
        </div>
    )
}