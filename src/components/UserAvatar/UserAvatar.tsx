
import { useState } from "react";

type UserAvatarProps = {
    userImage?: string | null;
    username: string;
    size?: string;
    textSize?: string;
}

const colors = ["#F8575A", "#833AFF", "#B2F042", "#FF6BB7"];

const getColor = (username: string) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
};

export default function UserAvatar({
    userImage,
    username,
    size = "w-10 h-10",
    textSize = "text-sm",
}: UserAvatarProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    if (userImage && !imageError) {
        return (
            <div className={`relative ${size} rounded-full`}>
                {!imageLoaded && (
                    <div className={`absolute inset-0 flex items-center 
                    justify-center bg-[#2A2A2A] rounded-full`}>
                        <div className="w-3/4 h-3/4 border-2 
                        border-[#B1F042] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                <img
                    src={userImage}
                    alt={username}
                    className={`${size} rounded-full 
                    object-cover ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                />
            </div>
        );
    }

    return (
        <div
            className={`${size} rounded-full flex 
            items-center justify-center text-white ${textSize} font-bold`}
            style={{ backgroundColor: getColor(username) }}
        >
            {username ? username.substring(0, 2).toUpperCase() : "??"}
        </div>
    );
}
