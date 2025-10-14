import CategoryTag from "../create-post/CategoryTag";
import LikeButton from "./LikeButton";
import CommentFeed from "./Comments";

export default function Post() {
  return (
    <div className="min-h-screen bg-[#171717] flex flex-col justify-center items-center">
      <div className="bg-[#242424] text-[#F9FAFB] p-5 rounded-xl w-full max-w-md shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <img
            src="https://i.pravatar.cc/150?img=15"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-lg">Kelocoes</h3>
            <p className="text-[#5A5A5A] text-sm">30 minutes ago</p>
          </div>
        </div>

        <img className="rounded-[19px] h-[304.12px]"
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes" />
        <div id="btn-container" className="flex justify-end">
          <div className="flex">
            <LikeButton />
            <CommentFeed />
          </div>

          <CategoryTag />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-10">
        <div className="bg-[#1D1D1D] text-[#F9FAFB] p-5 rounded-xl w-full max-w-md shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://i.pravatar.cc/150?img=15"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-lg">Kelocoes</h3>
              <p className="text-[#5A5A5A] text-sm">30 minutes ago</p>
            </div>
          </div>

          <img
            className="rounded-[19px] h-[304.12px]"
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />



          <div className="flex justify-end w-100">
            <CategoryTag />
          </div>
        </div>
      </div>
    </div>

  );
};
