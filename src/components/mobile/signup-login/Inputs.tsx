type InputProps = {
    label: string
    type: string
    placeholder: string
    required?: boolean
    name?: string;
    children?: React.ReactNode
    maxLength?: number
}

export default function Inputs({
    label,
    type, 
    placeholder, 
    required = true,
    children,
    name,
    maxLength,
} : InputProps){

    return(
        <div id="input-container">
            <span className="block text-sm text-gray-300 font-medium leading-none mb-[7px]">
                {label}
            </span>
            <label  className="relative w-full">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#5D5D5D]">
                    {children}
                </span>
                <input
                className="w-full bg-transparent border border-[#E1E1E1] rounded-full 
                py-2 pl-12 pr-4 text-gray-200 placeholder-[#5D5D5D] focus:outline-none 
                focus:border-[#B1F042] transition"
                type={type} placeholder={placeholder} required={required} 
                name={name}  maxLength={maxLength}/>
            </label>
        </div>
    );

}