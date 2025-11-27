import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5";

interface AlertProps {
  show: boolean;
  message?: string;
  color?: string;
}

export default function 
Alert({ show, message = "Something went wrong", color = "bg-purple-600" }: AlertProps) {
  if (!show) return null;

  const isError = color === "bg-[#EF3131]" || color === "bg-red-500";

  return (
    <div
      role="alert"
      className={`
        alert ${color} text-white border-none
        fixed top-4 left-1/2 -translate-x-1/2 
        w-[90%] max-w-lg shadow-xl rounded-lg
        z-[9999] p-4 flex gap-3 items-center
      `}
    >
      {isError ? (
        <IoCloseCircleOutline className="h-6 w-6 shrink-0 text-white" />
      ) : (
        <IoCheckmarkCircleOutline className="h-6 w-6 shrink-0 text-white" />
      )}

      <span className="font-medium text-white">{message}</span>
    </div>
  );
}
