import type { PostTypes } from "../../../types/PostTypes";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { likesService } from "../../../services/supabase/likesService";
import { supabase } from "../../../services/supabase/config";

export default function LikeButton({
  cardIndividuals,
  currentUserId,
}: {
  cardIndividuals: PostTypes;
  currentUserId: number | null;
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(cardIndividuals.likeCount || 0);

  useEffect(() => {
    let isMounted = true;

    const fetchLikeStatus = async () => {
      const count = await likesService.getLikesCount(cardIndividuals.id);
      if (isMounted) setLikes(count);

      if (currentUserId) {
        const hasLiked = await likesService.hasUserLiked(cardIndividuals.id, currentUserId);
        if (isMounted) setLiked(hasLiked);
      }
    };

    fetchLikeStatus();

    //realtime lik es 
    const channel = supabase
      .channel(`likes:${cardIndividuals.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'likes',
          filter: `post_id=eq.${cardIndividuals.id}`,
        },
        () => {
          
          fetchLikeStatus();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [cardIndividuals.id, currentUserId]);

  const handleLike = async () => {
    if (!currentUserId) {
      console.warn("User not logged in, cannot like.");
      return;
    }

    const previousLiked = liked;
    const previousLikes = likes;

    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);

    try {
      const { liked: newLiked, count: newCount } = await likesService.toggleLike(
        cardIndividuals.id,
        currentUserId
      );
      setLiked(newLiked);
      setLikes(newCount);
    } catch (error) {
      console.error("Error toggling like:", error);

      setLiked(previousLiked);
      setLikes(previousLikes);
    }
  };

  return (
    <div className="flex items-center">
      <div
        onClick={handleLike}
        className={`cursor-pointer transition-transform duration-300 ${liked ? "pop" : ""
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
