import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

export function Appbar(){
    return (
        <div className="border-b flex justify-between px-10 py-2">
            <Link to={'/blogs'}>
                <div className="font-medium text-2xl flex justify-center flex-col italic hover:not-italic cursor-pointer">
                    Medium
                </div>
            </Link>
            <div className="flex justify-center flex-cols">
                <div className="flex justify-center flex-cols cursor-pointer">
                    <Link to={"/createblog"}>
                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-1 me-2 mb-2">
                        New
                    </button>
                    </Link>
                </div>
                <div className="flex justify-center flex-cols ml-2">
                    <Avatar initials="AJ" size={10}/>
                </div>
            </div>
        </div>
    )
}