import type { PostTypes } from "../../../types/PostTypes";
export default function CategoryTag({ cardIndividuals }: { cardIndividuals: PostTypes }) {
    return(
        <div className="border-1 border-[#B1F042] p-1 w-28 rounded-4xl m-2.5">
            <p className="flex justify-center">{cardIndividuals.tag}</p>
        </div>
    );
};