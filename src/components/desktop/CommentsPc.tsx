import { useState, useEffect } from "react";
import { FaRegComment } from "react-icons/fa";
import type { PostTypes } from "../../types/PostTypes";
import { FaPaperPlane } from "react-icons/fa6";
import UserAvatar from "../UserAvatar/UserAvatar";
import { addComment, getCommentsByPostId } from "../../services/supabase/commentsService";
import { getCurrentUser } from "../../services/supabase/userService";
import type { CommentsPost } from "../../types/Comments";
import { supabase } from "../../services/supabase/config";

export default function CommentsPc({
  cardIndividuals,
}: {
  cardIndividuals: PostTypes;
}) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentsPost[]>([]);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch current user
    getCurrentUser().then((user) => {
      if (user) setUserId(user.id);
    });

    // Fetch comments for this post
    fetchComments();

    // Realtime subscription for comments
    const channel = supabase
      .channel(`comments_pc:${cardIndividuals.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${cardIndividuals.id}`,
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [cardIndividuals.id]);

  async function fetchComments() {
    const fetchedComments = await getCommentsByPostId(cardIndividuals.id);
    setComments(fetchedComments);
  }

  function toggleComments() {
    setShowComments(!showComments);
  }

  async function handleSendComment() {
    if (!newComment.trim() || !userId) return;

    try {
      await addComment(cardIndividuals.id, userId, newComment);
      setNewComment("");
      // Refresh comments to show the new one
      fetchComments();
    } catch (error) {
      console.error("Failed to send comment", error);
    }
  }

  return (
    <div>
      <div
        id="comments-post"
        className="flex items-center cursor-pointer justify-end relative"
        onClick={toggleComments}
      >
        <div className="relative flex right-70 bottom-17">
          <FaRegComment
            className="text-[#E7E7E7] 
          text-3xl hover:text-[#703EDD] transition-colors duration-300"
          />
          <p className="ml-2 text-[20px]">{comments.length}</p>
        </div>
      </div>

      {/* Contenedor de comentarios */}
      <div
        id="ShowComments"
        className={`transition-all duration-300 ease-in-out overflow-hidden ${showComments
          ? "max-h-[400px] opacity-100 mt-[-25px]"
          : "max-h-0 opacity-0 "
          }`}
      >
        {/* Caja con comentarios */}
        <div className="bg-[#2A2A2A] p-4 rounded-xl space-y-5 mt-2 overflow-y-auto max-h-[300px]">
          {comments.length > 0 ? (
            comments.map((Comment, index) => (
              <div key={index} className="flex items-start gap-3">
                <UserAvatar
                  userImage={Comment.userImage}
                  username={Comment.username}
                  size="w-10 h-10"
                  textSize="text-sm"
                />
                <div>
                  <p className="text-[#F9FAFB] font-semibold text-sm">
                    {Comment.username}{" "}
                    <span className="text-[#8C8C8C] text-xs ml-1">
                      {Comment.datePublished}
                    </span>
                  </p>
                  <p className="text-[#F9FAFB] text-sm">{Comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#9CA3AF] text-sm text-center">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>

        {/* Campo de input con botón dentro */}
        <div className="relative mt-3">
          <input
            placeholder="Add a comment..."
            className="bg-[#2A2A2A] rounded-full w-full h-11 p-4 pr-12 
            text-[#F9FAFB] focus:outline-none"
            maxLength={30}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendComment();
            }}
          />
          {/* Botón posicionado dentro del input */}
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#7C3AED] p-2 rounded-full
            hover:bg-[#8B5CF6] transition cursor-pointer"
            onClick={handleSendComment}
            disabled={!userId}
          >
            <FaPaperPlane className="text-white text-[14px]" />
          </button>

        </div>
      </div>
    </div>
  );
}