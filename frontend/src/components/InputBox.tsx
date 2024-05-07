import { ChangeEvent } from "react"

interface InputBoxInputType {
    label: string,
    placeholder: string,
    onChange: (e:ChangeEvent<HTMLInputElement>) => void,
    type?: string
};

export function InputBox({ label, placeholder, onChange, type }:InputBoxInputType){
    return (
        <div>
            <label className="block mb-1 text-sm font-semibold text-black pt-4">{label}</label>
            <input onChange={onChange} type={type || "text"} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    )
}