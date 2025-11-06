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
            className="flex justify-center items-center bg-[#F8575A] hover:bg-[#e14144] 
                duration-300 p-3 gap-2 rounded-[50px] w-[170px] h-[40px] text-[#F9FAFB] font-[600] 
                text-md shadow-md hover:shadow-lg hover:scale-105 transition cursor-pointer"
        >
            {children}
            {text}
        </button>
    );
}
