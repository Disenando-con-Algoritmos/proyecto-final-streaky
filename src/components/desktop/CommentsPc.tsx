import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import type { PostTypes } from "../../types/PostTypes";
import { FaPaperPlane } from "react-icons/fa6";

export default function CommentsPc({
  cardIndividuals,
}: {
  cardIndividuals: PostTypes;
}) {
  const [showComments, setShowComments] = useState(false);
  const comments = cardIndividuals.comments || [];

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
        <div className="bg-[#2A2A2A] p-4 rounded-xl space-y-5 mt-2">
          {comments.length > 0 ? (
            comments.map((Comment, index) => (
              <div key={index} className="flex items-start gap-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={Comment.userImage}
                  alt="User"
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