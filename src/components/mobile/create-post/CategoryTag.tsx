import type { PostTypes } from "../../../types/PostTypes";
export default function LikeButton({ cardIndividuals }: { cardIndividuals: PostTypes }) {
    return(
        <div className="border-1 p-1 w-25 rounded-4xl m-2.5">
            <p className="flex justify-center">{cardIndividuals.tag}</p>
        </div>
    );
};