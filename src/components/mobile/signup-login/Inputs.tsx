<<<<<<< HEAD

=======
>>>>>>> 4b51d78e91fa69bfb95eded9e9ff77b2c8649ba8
type InputProps = {
    label: string
    type: string
    placeholder: string
    required?: boolean
    children?: React.ReactNode
}

export default function Inputs({
    label,
    type, 
    placeholder, 
    required = true,
    children,
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
<<<<<<< HEAD
                className="w-[90%] bg-transparent border border-[#E1E1E1] rounded-full 
                py-2 pl-12 pr-4 text-gray-200 placeholder-[#5D5D5D] focus:outline-none 
                focus:border-[#B1F042] transition mx-auto"
=======
                className="w-full bg-transparent border border-[#E1E1E1] rounded-full 
                py-2 pl-12 pr-4 text-gray-200 placeholder-[#5D5D5D] focus:outline-none 
                focus:border-[#B1F042] transition"
>>>>>>> 4b51d78e91fa69bfb95eded9e9ff77b2c8649ba8
                type={type} placeholder={placeholder} required={required} />
            </label>
        </div>
    );

}