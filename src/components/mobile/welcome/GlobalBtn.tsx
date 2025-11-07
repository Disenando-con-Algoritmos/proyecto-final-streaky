type BtnProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function GlobalBtn({
  text,
  onClick,
  type = "button",
}: BtnProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-[#B1F042] hover:bg-[#96cf33] duration-300 
                 p-3 rounded-[50px] w-[150px] text-[#171717] font-[600] text-md
                 shadow-md hover:shadow-lg hover:scale-105 transition cursor-pointer"
    >
      {text}
    </button>
  );
}
