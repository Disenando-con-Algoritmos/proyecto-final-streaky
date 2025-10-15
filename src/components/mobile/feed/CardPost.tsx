import type { PostTypes } from "../../../types/PostTypes";
import CategoryTag from "../create-post/CategoryTag";
import CommentPopup from "./CommentsMobile";
import LikeButton from "./LikeButton";

export default function CardPost({ cardIndividuals }: { cardIndividuals: PostTypes }) {
    return (
        <div className="m-5 mt-8 flex flex-col justify-center items-center">
            <div className="bg-[#242424] text-[#F9FAFB] p-5 rounded-xl max-w-md shadow-md">
                <div className="flex items-center gap-3 mb-5">
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
                    className="rounded-[19px] w-100 h-100 object-cover mb-3"
                    src={cardIndividuals.postImage}
                    alt="Shoes"
                />

                {/* Contenedor de botones */}
                <div id="btn-container" className="flex justify-between items-center mt-2">

                    <div className="flex items-center">
                        <LikeButton cardIndividuals={cardIndividuals} />
                        <div className="block md:hidden">
                            <CommentPopup cardIndividuals={cardIndividuals} />
                        </div>
                    </div>

                    <CategoryTag cardIndividuals={cardIndividuals} />
                </div>

                <p>
                    <span className="font-semibold ml-1 mr-1 text-[18px]">
                    {cardIndividuals.username}: </span>
                    <span className="font-normal text-[18px]">
                    {cardIndividuals.content}</span>
                </p>

            </div>
        </div>
    );
}
