import { useState, useEffect } from "react";
import type { PostTypes } from "../../../types/PostTypes";
import CategoryTag from "../create-post/CategoryTag";
import CommentFeed from "../../desktop/CommentsPc";
import CommentPopup from "./CommentsMobile";
import LikeButton from "./LikeButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import miffyPost from "../../../assets/miffyPost.png";
import DeletePost from "../profile/DeletePost";
import { useNavigate } from "react-router";
import UserAvatar from "../../UserAvatar/UserAvatar";
import authService from "../../../services/AuthServices";

type AuthUser = {
    id: string; 
    user_metadata?: {
        username?: string;
    };
};

export default function CardPost({
    cardIndividuals,
    showMiffy = false,
}: {
    cardIndividuals: PostTypes;
    showMiffy?: boolean;
}) {
    const [showPopup, setShowPopup] = useState(false);
    const nav = useNavigate();
    const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

    const isOwnPost = currentUser &&
        currentUser.user_metadata?.username?.toLowerCase()
        === cardIndividuals.username?.toLowerCase();
    const [timeAgo, setTimeAgo] = useState("");

    useEffect(() => {
        async function fetchUser() {
            try {
                const user = await authService.getCurrentUser();
                // console.log("CardPost - Fetched user:", user)
                setCurrentUser(user);
            } catch (error) {
                console.error("CardPost - Error fetching user:", error);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        const calculateTimeAgo = () => {

            let dateStr = cardIndividuals.datePublished;
            if (!dateStr.endsWith("Z") && !dateStr.includes("+")) {
                dateStr += "Z";
            }

            const date = new Date(dateStr);
            const now = new Date();

            const diffInSeconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000));

            if (diffInSeconds < 60) {
                setTimeAgo(`Hace ${diffInSeconds} segundo${diffInSeconds !== 1 ? 's' : ''}`);
            } else {
                const diffInMinutes = Math.floor(diffInSeconds / 60);
                if (diffInMinutes < 60) {
                    setTimeAgo(`Hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`);
                } else {
                    const diffInHours = Math.floor(diffInMinutes / 60);
                    if (diffInHours < 23) {
                        setTimeAgo(`Hace ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`);
                    } else {
                        setTimeAgo(date.toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        }));
                    }
                }
            }
        };

        calculateTimeAgo();
        const interval = setInterval(calculateTimeAgo, 1000);

        return () => clearInterval(interval);
    }, [cardIndividuals.datePublished]);

    return (
        <div className="m-5 flex flex-col justify-center items-center">
            <div className="bg-[#242424] text-[#F9FAFB] p-5 rounded-xl 
        max-w-md w-full shadow-md relative">
                {showMiffy && (
                    <img
                        src={miffyPost}
                        className="absolute -top-21 right-5 w-30
                        sm:-top-16 sm:right-10 sm:w-24
                        md:-top-24 md:w-35
                        pointer-events-none select-none"
                    />
                )}
                {/* imagen + info perfil */}
                <div className="flex items-center justify-between mb-3">
                    <div
                        onClick={() => {
                            if (isOwnPost) {
                                nav("/welcome/profile");
                            } else {
                                nav(`/welcome/profile/${cardIndividuals.username}`);
                            }
                        }}
                        className="flex items-center gap-3 hover:opacity-80 cursor-pointer">
                        <UserAvatar
                            userImage={cardIndividuals.userImage}
                            username={cardIndividuals.username}
                            size="w-12 h-12"
                            textSize="text-lg"
                        />
                        <div>
                            <h3 className="font-semibold text-lg">{cardIndividuals.username}</h3>
                            <p className="text-[#5A5A5A] text-sm">
                                {timeAgo}
                            </p>
                        </div>
                    </div>

                    {/* icono de 3 puntos solo si el post es del usuario actual */}
                    {isOwnPost && (
                        <div className="relative">
                            <button
                                onClick={() => setShowPopup(true)}
                                className="relative cursor-pointer"
                            >
                                <BsThreeDotsVertical size={22} />
                            </button>
                        </div>
                    )}
                </div>

                {/* imagen del post */}
                <img
                    className="rounded-[19px] w-full h-100 object-cover mb-4"
                    src={cardIndividuals.postImage}
                    alt="Post"
                />

                <div
                    id="btn-container"
                    className="flex items-center justify-between w-full mt-4"
                >
                    {/* botones like y comentarios */}
                    <div className="flex items-center gap-20">
                        <LikeButton cardIndividuals={cardIndividuals} />

                        {/* comentarios (solo visible en mobile) */}
                        <div className="block md:hidden" >
                            <CommentPopup cardIndividuals={cardIndividuals} />
                        </div>
                    </div>

                    {/* categoría */}
                    <div className="flex items-center justify-end">
                        <CategoryTag cardIndividuals={cardIndividuals} />
                    </div>
                </div>

                {/* texto y comentarios */}
                <div className="hidden md:flex w-full flex-col">
                    <p>
                        <span className="font-semibold ml-1 mr-1 text-[18px]">
                            {cardIndividuals.username}:{" "}
                        </span>
                        <span className="font-normal text-[18px] relative">
                            {cardIndividuals.content}
                        </span>
                    </p>
                    <CommentFeed cardIndividuals={cardIndividuals} />
                </div>

                {/* móvil */}
                <p className="flex md:hidden ml-0">
                    <span className="font-semibold ml-1 mr-1 text-[20px]">
                        {cardIndividuals.username}:
                    </span>
                    <span className="font-normal text-[20px] relative">
                        {cardIndividuals.content}
                    </span>
                </p>
            </div>

            <DeletePost
                open={showPopup}
                onClose={() => setShowPopup(false)}
                onDelete={() => {
                    alert("Post Eliminado :0");
                    setShowPopup(false);
                }}
            />
        </div>
    );
}
