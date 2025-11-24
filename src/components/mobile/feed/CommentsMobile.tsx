import { useState, useEffect, useCallback } from "react";
import { FaRegComment } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaPaperPlane } from "react-icons/fa6";
import type { PostTypes } from "../../../types/PostTypes";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { getCurrentUser } from "../../../services/supabase/userService";
import { addComment, getCommentsByPostId } from "../../../services/supabase/commentsService";
import type { UserProfile } from "../../../types/UserProfileType";
import type { CommentsPost } from "../../../types/Comments";

export default function CommentPopup({ cardIndividuals }: { cardIndividuals: PostTypes }) {
    const [showComments, setShowComments] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [comments, setComments] = useState<CommentsPost[]>([]);
    const [newComment, setNewComment] = useState("");

    //memorizar la función que trae comentarios
    const fetchComments = useCallback(async () => {
        const fetchedComments = await getCommentsByPostId(cardIndividuals.id);
        setComments(fetchedComments);
    }, [cardIndividuals.id]);

    // useEffect depende de fetchComments (que ya depende de cardIndividuals.id)
    useEffect(() => {
        async function fetchData() {
            const userData = await getCurrentUser();
            if (userData) {
                setCurrentUser(userData);
            }
            await fetchComments();
        }
        fetchData();
    }, [fetchComments]);

    async function handleSendComment() {
        if (!newComment.trim() || !currentUser) return;

        try {
            await addComment(cardIndividuals.id, currentUser.id, newComment);
            setNewComment("");
            await fetchComments(); 
        } catch (error) {
            console.error("Failed to send comment", error);
        }
    }

    return (
        <>
            {/* boton de comentario */}
            <div
                onClick={() => setShowComments(true)}
                className="flex items-center cursor-pointer text-[#F9FAFB]"
            >
                <div className="relative flex right-16 top-0.5">
                    <FaRegComment className="text-3xl" />
                    <p className="ml-2 text-[20px]">{comments.length}</p>
                </div>

            </div>

            {/* visible en mobile */}
            {showComments && (
                <div className="fixed inset-0 flex 
                justify-center items-end bg-black/60 z-50 md:hidden">
                    {/* caja de comentarios */}
                    <div className="bg-[#303030] w-full max-w-md h-[750px] 
                    rounded-t-3xl flex flex-col justify-between">
                        {/* Header */}
                        <div className="relative flex items-center justify-center px-5 pt-6 pb-3">
                            <h2 className="text-[#F9FAFB] text-2xl font-semibold 
                            text-center mb-4 mt-4">
                                Comments
                            </h2>
                            <IoClose
                                className="absolute right-5 text-[#F9FAFB] text-2xl"
                                onClick={() => setShowComments(false)}
                            />
                        </div>

                        {/* lista de comentarios */}
                        <div className="flex-1 px-10 pt-2 space-y-8 overflow-y-auto">
                            {comments.map((comment, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <UserAvatar
                                        userImage={comment.userImage}
                                        username={comment.username}
                                        size="w-10 h-10"
                                        textSize="text-sm"
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
                            {currentUser && (
                                <div className="mr-4">
                                    <UserAvatar
                                        userImage={currentUser.userImage}
                                        username={currentUser.username}
                                        size="w-10 h-10"
                                        textSize="text-sm"
                                    />
                                </div>
                            )}
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="flex-1 bg-transparent text-[#F9FAFB] 
                                text-sm outline-none placeholder-[#888]"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSendComment();
                                }}
                            />
                            <button
                                className="ml-3 bg-[#7C3AED] p-2 rounded-full 
                                hover:bg-[#8B5CF6] transition cursor-pointer"
                                onClick={handleSendComment}
                                disabled={!currentUser}
                            >
                                <FaPaperPlane className="text-white text-[14px]" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
