import { Blog } from "../hooks/UseBlogs"
import { Appbar } from "./Appbar"
import { Avatar } from "./Avatar"

export const SingleBlog = ({blog}:{blog:Blog}) =>{
    return (
        <div>
            <Appbar/>
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-200 max-screen-xl pt-12">
                    <div className="col-span-8 pl-5">
                        <div className="pt-2 text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="py-3 text-slate-500 font-thin">
                            Posted on: {blog.createdAt.split("T")[0]}
                        </div>
                        <div className="pt-3 ">
                            {blog.body}
                        </div>
                    </div>
                    <div className="col-span-4 pt-">
                        Author
                        <div className="flex pt-5">
                            <div className="flex justify-center flex-col">
                            <Avatar initials={blog.author.firstName.split("")[0]+blog.author.lastName.split("")[0]}/>
                            </div>
                            <div className="pl-3 text-2xl font-bold">
                                {`${blog.author.firstName} ${blog.author.lastName}`}
                            </div>
                        </div>
                        <div className="text-slate-500 pt-2 pl-9">
                            Description about the author increasing the engagement for the profile and makes it seem interesting!
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    )
}