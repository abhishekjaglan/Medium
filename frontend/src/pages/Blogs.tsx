import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/UseBlogs";

export function Blogs(){
    const {loading, blogs} = useBlogs();

    if(loading){
        return (
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
            <Appbar/>
            <div className="flex justify-center">
                <div className="">
                    {
                        blogs.map(blog => <BlogCard id={blog.id} firstName={blog.author.firstName} lastName={blog.author.lastName} title={blog.title} body={blog.body} key={blog.id} createdAt={blog.createdAt} />)
                        
                    }
                </div>
            </div>
        </div>
    )
}