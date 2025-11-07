type Props = {
    label: string;
    emoji?: string;
    variant?: "button" | "text";
    selected?: boolean;
    onSelect?: (label: string) => void;
    className?: string;
};

export default function CategoryTagWhite({
    label,
    emoji,
    variant = "button",
    selected = false,
    onSelect,
    className = "",
}: Props) {
    if (variant === "text") {
        return (
            <p className="text-[#B1F042]">
                {emoji} {label}
            </p>
        );
    }

    return (
        <button
            onClick={() => onSelect && onSelect(label)}
            className={`border w-28 py-2 rounded-3xl m-3 mb-5 flex items-center 
                justify-center gap-1 transition-all duration-200 cursor-pointer
                ${selected
                    ? "bg-[#B1F042] text-black font-semibold"
                    : "border-[#ffffff] text-[#F9FAFB] hover:border-[#B1F042]"
                }
                ${className}
            `}
        >
            <span>{emoji}</span>
            <span>{label}</span>
        </button>
    );
}
