import { useState, useEffect } from "react";
import { followService } from "../../../services/supabase/followService";

type BtnFollowProps = {
    targetUserId: number;
    currentUserId: number | null;
    onFollowChange?: (isFollowing: boolean) => void;
};

export default function BtnFollow({ targetUserId, currentUserId, onFollowChange }: BtnFollowProps) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUserId) {
            followService.isFollowing(currentUserId, targetUserId).then(setIsFollowing);
        }
    }, [currentUserId, targetUserId]);

    const handleClick = async () => {
        if (!currentUserId) {
            console.warn("User not logged in");
            return;
        }
        if (loading) return;

        // Optimistic update
        const previousState = isFollowing;
        setIsFollowing(!isFollowing);
        if (onFollowChange) onFollowChange(!isFollowing);
        setLoading(true);

        try {
            if (previousState) {
                await followService.unfollowUser(currentUserId, targetUserId);
            } else {
                await followService.followUser(currentUserId, targetUserId);
            }
        } catch (error) {
            console.error("Error toggling follow:", error);
            // Revert
            setIsFollowing(previousState);
            if (onFollowChange) onFollowChange(previousState);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading || !currentUserId}
            className={`px-10 py-3  mr-5 rounded-full font-semibold transition-colors duration-300 
                cursor-pointer 
                ${isFollowing
                    ? "bg-[#703EDD] text-[#F9FAFB]" // sigue es igual a morado 
                    : "bg-[#B1F042] text-[#121212]" //no sigue igual a verde
                } ${(!currentUserId) ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {isFollowing ? "Following" : "Follow"}
        </button>
    );
}
