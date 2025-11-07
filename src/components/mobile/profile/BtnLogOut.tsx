type BtnProps = {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode 
};

export default function BtnLogOut({
    text,
    onClick,
    type = "button",
    children,
}: BtnProps) {

    return (
        <button 
            onClick={onClick}
            type={type}
            className="flex justify-center items-center bg-[#F8575A]
                duration-300 gap-2 rounded-[50px] text-[#F9FAFB] font-[600] 
                shadow-md transition cursor-pointer
                w-[140px] h-[36px] text-sm
                md:w-[150px] md:h-[38px] md:text-[15px]
                lg:w-[170px] lg:h-[40px] lg:text-md"
        >
            {children}
            {text}
        </button>
    );
}
