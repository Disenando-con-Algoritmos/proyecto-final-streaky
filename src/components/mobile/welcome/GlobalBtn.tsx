type BtnProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export default function GlobalBtn({
  text,
  onClick,
  type = "button",
  className = "",
}: BtnProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-[#B1F042] hover:bg-[#96cf33] duration-300 
                  p-3 rounded-[50px] w-[160px] text-[#171717] font-[600] text-lg
                  shadow-md hover:shadow-lg hover:scale-105 transition cursor-pointer 
                  whitespace-nowrap
                  ${className}`} 
    >
      {text}
    </button>
  );
}
