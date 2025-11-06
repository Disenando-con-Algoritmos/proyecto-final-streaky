import { useState } from "react";
import type { PostTypes } from "../../../types/PostTypes";
import CategoryTag from "../create-post/CategoryTag";
import CommentFeed from "../../desktop/CommentsPc";
import CommentPopup from "./CommentsMobile";
import LikeButton from "./LikeButton";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function CardPost({
    cardIndividuals,
}: {
    cardIndividuals: PostTypes;
}) {
    const [showPopup, setShowPopup] = useState(false);

    // Simulación de usuario logueado (esto luego vendrá de auth)
    const currentUserId = 5;

    const isOwnPost = cardIndividuals.id === currentUserId;

    return (
        <div className="m-5 flex flex-col justify-center items-center relative">
            <div className="bg-[#242424] text-[#F9FAFB] p-5 rounded-xl 
        max-w-md w-full shadow-md relative">
                {/* Header con imagen y tres puntos */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <img
                            src={cardIndividuals.userImage}
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <h3 className="font-semibold text-lg">{cardIndividuals.username}</h3>
                            <p className="text-[#5A5A5A] text-sm">
                                {cardIndividuals.datePublished}
                            </p>
                        </div>
                    </div>

                    {/* Tres puntos solo si el post es del usuario actual */}
                    {isOwnPost && (
                        <div className="relative">
                            <button
                                onClick={() => setShowPopup(!showPopup)}
                                className="text-[#A1A1A1] hover:text-white transition"
                            >
                                <BsThreeDotsVertical size={22} />
                            </button>

                            {/* Popup */}
                            {showPopup && (
                                <div className="absolute right-0 mt-2 w-36 bg-[#1C1C1C] border 
                border-[#333] rounded-xl shadow-lg z-50">
                                    <button
                                        onClick={() => alert('Eliminar post (simulado)')}
                                        className="w-full text-left px-4 py-2 text-red-500 
                                        hover:bg-[#2C2C2C] rounded-xl transition"
                                    >
                                        Eliminar post
                                    </button>
                                </div>
                            )}
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
                    {/* Grupo de botones izquierda */}
                    <div className="flex items-center gap-4">
                        <LikeButton cardIndividuals={cardIndividuals} />

                        {/* Comentarios (solo visible en mobile) */}
                        <div className="block md:hidden">
                            <CommentPopup cardIndividuals={cardIndividuals} />
                        </div>
                    </div>

                    {/* Categoría a la derecha */}
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
        </div>
    );
}
