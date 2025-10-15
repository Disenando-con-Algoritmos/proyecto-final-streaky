import type { PostTypes } from "../../../types/PostTypes";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";;
import { useState } from "react";

export default function LikeButton({ cardIndividuals }: { cardIndividuals: PostTypes }) {
  const [liked, setLiked] = useState(false);

  const [likes, setLikes] = useState(cardIndividuals.likeCount || 0);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="flex items-center z-1">
      <div onClick={handleLike} className="cursor-pointer">
        {liked ? (
          <FaHeart   color="#703EDD" size={30} />
        ) : (
          <FaRegHeart   color="#d1d1d1ff" size={30} />
        )}
      </div>


      <p className="ml-2 text-[20px]">{likes}</p>
    </div>
  );
}