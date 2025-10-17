import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaPaperPlane } from "react-icons/fa6";
import type { PostTypes } from "../../../types/PostTypes";

export default function CommentPopup({ cardIndividuals }: { cardIndividuals: PostTypes }) {
    const [showComments, setShowComments] = useState(false);

    const comments = cardIndividuals.comments || [];

    return (
        <>
            {/* boton de comentario */}
            <div
                onClick={() => setShowComments(true)}
                className="flex items-center cursor-pointer text-[#F9FAFB]"
            >   
            <div className="relative flex right-16 top-0,5">
                <FaRegComment className="text-3xl" />
                <p className="ml-2 text-[20px]">{comments.length}</p>
            </div>
            
            </div>

            {/* visible en mobile */}
            {showComments && (
                <div className="fixed inset-0 flex 
                justify-center items-end bg-black/60 z-50 md:hidden">
                    {/* caja de comentarios */}
                    <div className="bg-[#303030] w-full max-w-md h-[80vh] 
                    rounded-t-3xl flex flex-col justify-between shadow-lg">
                        {/* Header */}
                        <div className="relative flex items-center justify-center px-5 pt-6 pb-3">
                            <h2 className="text-[#F9FAFB] text-2xl font-semibold 
                            text-center mb-4 mt-4">
                                Comments
                            </h2>
                            <IoClose
                                className="absolute right-5 text-[#F9FAFB] text-2xl cursor-pointer"
                                onClick={() => setShowComments(false)}
                            />
                        </div>

                        {/* lista de comentarios */}
                        <div className="flex-1 px-10 pt-2 space-y-7">
                            {comments.map((comment, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <img
                                        src={comment.userImage}
                                        alt="User"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <p className="text-[#F9FAFB] font-semibold text-sm">
                                            {comment.username}{" "}
                                            <span className="text-[#8C8C8C] text-xs ml-1">
                                                {comment.datePublished}
                                            </span>
                                        </p>
                                        <p className="text-[#F9FAFB] text-sm">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* input inferior */}
                        <div className="px-5 py-4 border-t border-[#808080] 
                        flex items-center bg-[#303030] rounded-b-3xl">
                            <img
                                src={cardIndividuals.userImage}
                                alt="Profile"
                                className="w-10 h-10 rounded-full mr-4"
                            />
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="flex-1 bg-transparent text-[#F9FAFB] 
                                text-sm outline-none placeholder-[#888]"
                            />
                            <button className="ml-3 bg-[#7C3AED] p-2 rounded-full
                            hover:bg-[#8B5CF6] transition">
                                <FaPaperPlane className="text-white text-[14px]" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
