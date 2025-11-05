type Props = {
  label: string; // nombre visible (ej: "Sport")
  emoji: string; // emoji (ej: 🏃‍♂️)
};

export default function CategoryTagWhite({ label, emoji }: Props) {
  return (
    <button
      className="border border-[#B1F042] text-[#F9FAFB] w-28 py-2 rounded-3xl m-2.5
                 transition-all duration-200 hover:border-[#D9FF7A]
                 hover:shadow-[0_0_8px_#B1F042] flex items-center justify-center gap-1"
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </button>
  );
}