import { AuthSignIn } from "../components/AuthSignIn";
import { Quote } from "../components/Quote";

export function SingIn(){
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <AuthSignIn/>
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
        </div>
    )
}