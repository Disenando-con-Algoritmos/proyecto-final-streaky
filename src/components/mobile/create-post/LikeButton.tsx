import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex items-center"
      onClick={() => setLiked(!liked)}
    >
      {liked ? (
        <AiFillHeart color="#703EDD" size={30} />
      ) : (
        <AiFillHeart color="#d1d1d1ff" size={30} />
      )}
      
    </div>
);
}