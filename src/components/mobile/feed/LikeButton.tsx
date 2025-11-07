import type { PostTypes } from "../../../types/PostTypes";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { useState } from "react";

export default function LikeButton({
  cardIndividuals,
}: {
  cardIndividuals: PostTypes;
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(cardIndividuals.likeCount || 0); {/* Numeros de likes */}

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="flex items-center">
      <div
        onClick={handleLike}
        className={`cursor-pointer transition-transform duration-300 ${
          liked ? "pop" : ""
        }`}
      >
        {liked ? (
          <FaHeart
            size={26}
            className="text-[#703EDD] hover:text-[#703EDD] transition-colors duration-300"
          />
        ) : (
          <FaRegHeart
            size={26}
            className="text-[#d1d1d1ff] hover:text-[#703EDD] transition-colors duration-300"
          />
        )}
      </div>

      <p className="ml-2 text-[18px]">{likes}</p>

      {/* Animación de like */}
      <style>{`
        .pop {
          animation: pop 0.3s ease-in-out;
        }

        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
