import type { PostTypes } from "../../../types/PostTypes";
import { AiFillHeart } from "react-icons/ai";
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
    <div className="flex items-center pr-3">
      <div onClick={handleLike} className="cursor-pointer">
        {liked ? (
          <AiFillHeart color="#703EDD" size={30} />
        ) : (
          <AiFillHeart color="#d1d1d1ff" size={30} />
        )}
      </div>


      <p className="ml-2 text-[20px]">{likes}</p>
    </div>
  );
}
