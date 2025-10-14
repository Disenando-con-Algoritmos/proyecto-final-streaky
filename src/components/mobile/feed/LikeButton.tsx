import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(125);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1); //cuando corazon esta en gris se le resta 1
    } else {
      setLikes(likes + 1); //cuando corazon esta en morado se le suma 1
    }
    setLiked(!liked); 
  };

  return (
    <div className="flex items-center pr-3" onClick={handleLike}
    >
      {liked ? (
        <AiFillHeart color="#703EDD" size={30} />
      ) : (
        <AiFillHeart color="#d1d1d1ff" size={30} />
      )}

      <p className="ml-2 text-[20px]">{likes}</p>

    </div>
  );
}