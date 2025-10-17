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
      className="bg-[#B1F042] hover:bg-[#96cf33] transition-colors duration-300 
                 p-3 rounded-[50px] w-[130px] text-[#171717] font-medium text-lg
                 shadow-md hover:shadow-lg"
    >
      {text}
    </button>
  );
}
