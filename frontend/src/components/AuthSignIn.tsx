import { Link, useNavigate } from "react-router-dom"
import { InputBox } from "./InputBox"
import { useState } from "react"
import { SigninInput} from "@abhishekjaglan/medium-common"
import { Button } from "./Button"
import axios from 'axios'
import { BACKEND_URL } from "../config"

export const AuthSignIn = () => {

    const navigate = useNavigate();

    const [ inputboxInput, setInputboxInput ]= useState<SigninInput>({
        email:"",
        password:"",
    })

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/signin`,{
                email: inputboxInput.email,
                password: inputboxInput.password,
            });
            console.log(response);
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log("Token in sendRequest:    ", token);
            navigate('/blogs');
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="text-4xl font-extrabold px-10">
                        {"Sign in account"}
                    </div>
                    <div className="text-center text-slate-500 pt-2 pb-2">
                        {"Don't have an account?"}
                        <Link className="pl-2 underline" to={'/signin'}>
                            {"Sign In"}
                        </Link>
                    </div>
                    <InputBox label="Email" placeholder="john@example.com" onChange={(e) => {
                        console.log(e.target.value);
                        setInputboxInput({
                            ...inputboxInput,
                            email: e.target.value,
                        });
                    }}/>
                    <InputBox type={'password'} label="Password" placeholder="123456" onChange={(e) => {
                        console.log(e.target.value);
                        setInputboxInput({
                            ...inputboxInput,
                            password: e.target.value,
                        });
                    }}/>
                    <Button label={"Sign In"} onClick={sendRequest}/>
                </div>
            </div>
        </div>
    )
}