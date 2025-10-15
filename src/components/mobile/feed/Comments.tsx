import { useState } from "react";
import { MdOutlineModeComment } from "react-icons/md";
import type { PostTypes } from "../../../types/PostTypes";
import { FaPaperPlane } from "react-icons/fa6";

export default function CommentFeed({
  cardIndividuals,
}: {
  cardIndividuals: PostTypes;
}) {
  const [showComments, setShowComments] = useState(false);
  const comments = cardIndividuals.coments || [];

  function toggleComments() {
    setShowComments(!showComments);
  }

  return (
    <div>
      <div
        id="comments-post"
        className="flex items-center cursor-pointer justify-end relative"
        onClick={toggleComments}
      >
        <div className="relative flex right-70 bottom-17">
          <MdOutlineModeComment
            className="text-[#F9FAFB] 
          text-3xl hover:text-[#CCCCCC] transition"
          />
          <p className="ml-2 text-[20px]">{comments.length}</p>
        </div>
      </div>

      {/* Contenedor de comentarios */}
      <div
        id="ShowComments"
        className={`transition-all duration-300 ease-in-out overflow-hidden relative ${
          showComments
            ? "max-h-[400px] opacity-100 mt-[-25px]"
            : "max-h-0 opacity-0 "
        }`}
      >
        {/* Caja con comentarios */}
        <div className="bg-[#2A2A2A] p-4 rounded-xl space-y-5 mt-2">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="flex items-start gap-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={comment.userImage}
                  alt="User"
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
          />
          {/* Botón posicionado dentro del input */}
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#7C3AED] p-2 rounded-full
            hover:bg-[#8B5CF6] transition">
            <FaPaperPlane className="text-white text-[14px]" />
          </button>
          
        </div>
      </div>
    </div>
  );
}
