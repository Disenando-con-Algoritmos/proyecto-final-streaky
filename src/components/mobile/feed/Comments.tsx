import { useState } from "react";
import { MdOutlineModeComment } from "react-icons/md";
import type { CommentsPost } from "../../../types/Comments";

export default function CommentFeed({
  cardIndividuals,
}: {
  cardIndividuals: CommentsPost;
}) {
  const [showComments, setShowComments] = useState(false);

  function toggleComments() {
    setShowComments(!showComments);
  }

  return (
    <div className="w-full relative right-70 bottom-10 z-0">
      <div id="btn-container" className="flex items-center justify-end">
        <div
          id="comments-post"
          className="flex items-center 
        cursor-pointer"
          onClick={toggleComments}
        >
          <MdOutlineModeComment
            className="text-[#F9FAFB] 
          text-3xl hover:text-[#CCCCCC] transition"
          />
          <p className="ml-2 text-[20px]">3</p>
        </div>
      </div>
      <div className="flex relative left-70 mt-1">
        <h1 className="pr-2 font-medium">{cardIndividuals.username}:</h1>
        <p className="font-normal">{cardIndividuals.content}</p>
      </div>
      <div
        id="ShowComments"
        className={`transition-all relative left-70 duration-300 ease-in-out overflow-hidden ${
          showComments ? "max-h-[400px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-full bg-[#2A2A2A] p-4 rounded-xl space-y-3">
          <div className="flex items-start">
            <img
              className="w-10 h-10 rounded-full"
              src={cardIndividuals.userImage}
              alt="User"
            />
            <div className="ml-3">
              <p className="text-[13px] font-semibold">
                {cardIndividuals.username}
              </p>
              <p className="text-sm text-[#E5E5E5]">
                {cardIndividuals.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
