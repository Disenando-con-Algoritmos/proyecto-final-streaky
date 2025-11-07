import { useState } from 'react';

type Props = {
  label: string;
  emoji?: string;
  selected?: boolean;
  onSelect?: (label: string) => void;
  className?: string;
};

export default function CategoryTagWhite({
  label,
  emoji,
  selected = false,
  onSelect,
  className = "",
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = "w-28 py-2 rounded-3xl m-3 mb-5" 
  +" flex items-center justify-center gap-1 transition-all duration-300 cursor-pointer border";
  const selectedStyles = "bg-[#B1F042] text-[#171717] font-semibold border-[#B1F042]";
  const defaultStyles = "bg-transparent text-[#F9FAFB] border-[#ffffff]";
  const hoverStyles = !selected && isHovered ? "border-[#B1F042]" : "";

  return (
    <button
      onClick={() => onSelect && onSelect(label)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseStyles} ${selected ? selectedStyles : defaultStyles} 
      ${hoverStyles} ${className}`}
    >
      <span className="mr-1">{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
