import { useState } from "react";
import { MdOutlineModeComment } from "react-icons/md";
import type { CommentsPost } from "../../../types/Comments";

export default function LikeButton({ cardIndividuals }: { cardIndividuals: CommentsPost }) {
    const [SComments, setShowCommenst] = useState(false);

    function ShowComments() {
        setShowCommenst(!SComments);
    }

    return (
        <div id="btn-container" className="flex items-center">
            <div id="commenst-post" className="flex items-center">
                <MdOutlineModeComment
                    onClick={ShowComments}
                    className="text-[#F9FAFB] text-3xl"
                ></MdOutlineModeComment>
                <p className="ml-2 text-[20px]">3</p>
            </div>
            <div
                id="ShowComments"
                className={`transition-all duration-200 ease-in-out overflow-hidden 
                    ${SComments ? "max-h-[140px] opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="flex items-center bg-[#2A2A2A] p-3 rounded-xl mb-3">
                    <img
                        className="w-10 h-10 rounded-full"
                        src={cardIndividuals.userImage}
                        alt="User"
                    />
                    <div id="Comment" className="ml-3">
                        <p className="text-[12px] font-semibold">
                            {cardIndividuals.username}
                        </p>
                        <p>{cardIndividuals.content}</p>
                    </div>
                </div>

            </div>

            <div>
                    
            </div>

        </div>
    );
}