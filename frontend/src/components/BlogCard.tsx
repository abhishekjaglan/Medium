import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
// import { Dot } from "./Dot";

interface BlogcardInputs{
    id: string,
    firstName: string,
    lastName: string,
    title: string,
    body: string,
    createdAt?: string,
};
export function BlogCard({
    id,
    firstName,
    lastName,
    title,
    body,
    createdAt
}: BlogcardInputs){
    console.log("Inside BLog card",id);
    return (
        <Link to={`/blog/${id}`}>
            <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
                <div className="flex">
                    <div className="flex justify-center flex-col">
                        <Avatar initials={firstName.split("")[0]+lastName.split("")[0]}/>
                    </div>
                    <div className=" flex justify-center flex-col font-normal text-xs pl-2">
                        {firstName} {lastName}
                    </div>
                    <div className="flex justify-center flex-col pl-2">
                        {/* <Dot/> */}
                        <span className="rib">·</span>
                    </div>
                    <div className=" flex justify-center pl-1 flex-col text-xs font-thin text-slate-500">
                        {createdAt?.split("T")[0]}
                    </div>
                </div>
                <div className="text-xl font-semibold pt-2">
                    {title}
                </div>
                <div className="text-md font-thin">
                    {body.slice(0,200)}{(body.length) > 200 ? "..." : ""}
                </div>
                <div className="flex pt-8 pb-4">
                    <div className="w-full text-slate-400 text-xs font-light">
                        {`${Math.ceil(body.length / 100)} min read`}                
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 pr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 pl-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 pl-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </div>
            </div>
        </Link>
    )
}