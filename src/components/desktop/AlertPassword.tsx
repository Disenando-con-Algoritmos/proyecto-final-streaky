interface AlertProps {
    show: boolean;
    message?: string;
}

export default function Alert({ show, message }: AlertProps) {
    if (!show) return null;

    return (
        <div
            role="alert"
            className="
        alert bg-[#F8575A] text-white border-[#F8575A] 
        fixed top-4 left-1/2 -translate-x-1/2 
        w-[90%] max-w-lg shadow-xl rounded-lg
        z-[9999] p-4 flex gap-3 items-center
      "
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 
      stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 
          2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>

            <span>{message}</span>
        </div>
    );
}
