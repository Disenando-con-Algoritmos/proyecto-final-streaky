import { useState } from "react";

export default function BtnFollow() {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleClick = () => {
        setIsFollowing(!isFollowing);
    };

    //para que cuando se le de click cambi e a morado
    return (
        <button
            onClick={handleClick}
            className={`px-10 py-3  mr-5 rounded-full font-semibold transition-colors duration-300 
                    ${isFollowing
                    ? "bg-[#703EDD] text-[#F9FAFB]" // sigue es igual a morado 
                    : "bg-[#B1F042] text-[#121212]" //no sigue igual a verde
                }`}
        >
            {isFollowing ? "Following" : "Follow"} {/* si esta siguiendo ,following 
            si no, follow */}
        </button>
    );
}
