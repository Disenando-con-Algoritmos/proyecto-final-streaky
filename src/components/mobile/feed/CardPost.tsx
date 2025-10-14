import type { PostTypes } from "../../../types/PostTypes";
import CategoryTag from "../create-post/CategoryTag";
import CommentFeed from "./Comments";
import LikeButton from "./LikeButton";

export default function CardPost({ cardIndividuals }: { cardIndividuals: PostTypes }) {
  return (
    <div className="m-5 flex flex-col justify-center items-center">
      <div className="bg-[#242424] text-[#F9FAFB] p-5 rounded-xl max-w-md w-full shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={cardIndividuals.userImage}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-lg">{cardIndividuals.username}</h3>
            <p className="text-[#5A5A5A] text-sm">{cardIndividuals.datePublished}</p>
          </div>
        </div>
        <img
          className="rounded-[19px] w-full h-100 object-cover mb-4"
          src={cardIndividuals.postImage}
          alt="Post"
        />
        <div id="btn-container" className="flex justify-between items-center">
          <LikeButton cardIndividuals={cardIndividuals} />
          <CategoryTag cardIndividuals={cardIndividuals} />
        </div>
        <CommentFeed cardIndividuals={cardIndividuals} />
      </div>
    </div>
  );
}
