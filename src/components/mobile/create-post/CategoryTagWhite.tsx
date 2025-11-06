type Props = {
  label: string;
  emoji?: string;
  variant?: "button" | "text";
  selected?: boolean;
  onSelect?: (label: string) => void;
};

export default function CategoryTag({ label, emoji, variant = "button", 
  selected = false, onSelect }: Props) {
  if (variant === "text") {
    return <p className="text-[#B1F042]">{emoji} {label}</p>;
  }

  return (
    <button
      onClick={() => onSelect && onSelect(label)}
      className={`border w-28 py-2 rounded-3xl m-3 mb-5 flex items-center 
        justify-center gap-1 transition-all duration-200
        ${
          selected
            ? "bg-[#B1F042]  text-black font-medium " 
            : "border-[#ffffff] text-[#F9FAFB] hover:border-[#B1F042]"
        }
      `}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
