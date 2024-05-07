import { AuthSignUp } from "../components/AuthSignUp";
import { Quote } from "../components/Quote";

export function SingUp(){
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <AuthSignUp/>
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
        </div>
    )
}