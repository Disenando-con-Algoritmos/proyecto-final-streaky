import { useState } from "react";
import CategoryTag from "../create-post/CategoryTag";
import { MdOutlineModeComment } from "react-icons/md";

export default function Post() {
  const [SComments, setShowCommenst] = useState(false);

  function ShowComments() {
    setShowCommenst(!SComments);
  }

  return (
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

        <div id="btn-container" className="flex items-center">
          <div id="commenst-post" className="flex items-center">
            <MdOutlineModeComment
              onClick={ShowComments}
              className="text-[#F9FAFB] text-3xl"
            ></MdOutlineModeComment>
            <p className="ml-2 text-[20px]">3</p>
          </div>

          <div className="flex justify-end w-100">
            <CategoryTag />
          </div>
        </div>

        <div
          id="ShowComments"
          className={`transition-all duration-200 ease-in-out overflow-hidden ${
            SComments ? "max-h-[140px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex items-center bg-[#2A2A2A] p-3 rounded-xl mb-3">
            <img
              className="w-10 h-10 rounded-full"
              src="https://picsum.photos/100"
              alt="User"
            />
            <div id="Comment" className="ml-3">
              <p className="text-[12px] font-semibold">Nattpro_</p>
              <p>Amazing kevin, what a hacker</p>
            </div>
          </div>

          <div className="flex items-center bg-[#2A2A2A] p-3 rounded-xl mb-3">
            <img
              className="w-10 h-10 rounded-full"
              src="https://picsum.photos/150"
              alt="User"
            />
            <div id="Comment" className="ml-3">
              <p className="text-[12px] font-semibold">Jura</p>
              <p>Teach me kevin</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
