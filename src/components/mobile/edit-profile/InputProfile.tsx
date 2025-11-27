import { useState } from "react";
import { CgEye } from "react-icons/cg"; 
import { RiEyeOffLine } from "react-icons/ri";

type InputProps = {
    label: string
    type: string
    placeholder: string
    required?: boolean
    children?: React.ReactNode
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength?: number
}

export default function InputProfile({
    label,
    type,
    placeholder,
    required = true,
    children,
    value,
    onChange,
    maxLength,
}: InputProps) {

    const [showPassword, setShowPassword] = useState(false);

    //si el tipo es password, puede alternar entre text y password :p
    const inputType =
        type === "password" ? (showPassword ? "text" : "password") : type;

    return (
        <div id="input-container" 
        className="w-full max-w-[320px] sm:max-w-sm md:max-w-md mb-8 mx-auto">
            <span className="block text-[#737373] text-[18px] sm:text-[20px] font-medium mb-2">
                {label}
            </span>

            <label className="relative w-full flex items-center border-b border-[#2E2E2E] 
            focus-within:border-[#B1F042] transition-colors">
                <input
                    type={inputType}
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    className={`w-full bg-transparent text-white text-md placeholder-[#5D5D5D] py-2
                    outline-none transition-colors ${children ? "pr-8" : "pr-0"} pr-6`}
                />
                {type === "password" ? (
                //si es un input de tipo password, mostrar el icono clickeable
                <span
                    className="absolute right-0 top-1/2 -translate-y-1/2 
                    text-[#E1E1E1] cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <CgEye className="text-xl" />
                    ) : (
                        <RiEyeOffLine className="text-xl" />
                    )}
                </span>
            ) : (
                // si no es password, los iconos se muestran normal
                <span className="absolute right-0 top-1/2 -translate-y-1/2 
                text-[#E1E1E1] text-[25px]">
                    {children}
                </span>
            )}
            </label>
        </div>
    );
}