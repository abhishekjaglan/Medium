import { Link, useNavigate } from "react-router-dom"
import { InputBox } from "./InputBox"
import { useState } from "react"
import { SignupInput } from "@abhishekjaglan/medium-common"
import { Button } from "./Button"
import axios from 'axios'
import { BACKEND_URL } from "../config"

export const AuthSignUp = () => {

    const navigate = useNavigate();

    const [ inputboxInput, setInputboxInput ]= useState<SignupInput>({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
    })

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/signup"`,{
                email: inputboxInput.email,
                firstName: inputboxInput.firstName,
                lastName: inputboxInput.lastName,
                password: inputboxInput.password,
            });
            console.log(response);
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log("Token:",localStorage.getItem("token"));
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
                        {"Create an account"}
                    </div>
                    <div className="text-center text-slate-500 pt-2 pb-2">
                        {"Already have an account?"}
                        <Link className="pl-2 underline" to={'/signin'}>
                            {"Login"}
                        </Link>
                    </div>
                        <InputBox label="First Name" placeholder="Enter your first name" onChange={(e) => {
                        console.log(e.target.value);
                        setInputboxInput({
                            ...inputboxInput,
                            firstName: e.target.value,
                        });
                    }}/>
                        <InputBox label="Second Name" placeholder="Enter your last name" onChange={(e) => {
                        console.log(e.target.value);
                        setInputboxInput({
                            ...inputboxInput,
                            lastName: e.target.value,
                        });
                    }}/>
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
                    <Button label={"Sign Up"} onClick={sendRequest}/>
                </div>
            </div>
        </div>
    )
}