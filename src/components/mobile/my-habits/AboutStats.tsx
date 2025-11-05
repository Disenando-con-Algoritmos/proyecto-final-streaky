import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function InfoColor (){
    const [aboutStats, setaboutStats] = useState(true);

    return(
        <div id="InfoColors" className="mt-7">
          <div
            onClick={() => setaboutStats(!aboutStats)}
            className="bg-[#1B1B1B] rounded-xl overflow-hidden 
          transition-all duration-500 ease-in-out cursor-pointer"
          >
            <div className="flex items-center justify-between w-180 h-11">
              <p className="ml-7 text-[#929292] font-semibold text-[20px]">
                About the Stats
              </p>
              {aboutStats ? (
                <IoIosArrowDown
                  className="text-3xl mr-7 text-[#929292] cursor-pointer 
                  transition-transform duration-300"
                />
              ) : (
                <IoIosArrowUp
                  className="text-3xl mr-7 text-[#929292] cursor-pointer 
                  transition-transform duration-300"
                />
              )}
            </div>
            <div
              className={`transition-all duration-500 ease-in-out ${
                aboutStats ? "max-h-0 opacity-0" : "max-h-50 opacity-100"
              }`}
            >
              <div className="pt-3 ml-7 pr-5 pb-5 text-[#c1c1c1] text-sm">
                <p className="text-[#929292] text-[17px]">
                  Colors help you monitor your progress with your habits, get to
                  know them.
                </p>
                <div className="mt-4">
                  <div id="green" className="flex">
                    <div className="w-5 h-5 bg-[#B1F042] rounded-4xl mb-3"></div>
                    <p className="ml-3 text-[#929292] text-[15px]">
                        Excellent, you’re awesome!!</p>
                  </div>
                  <div id="purple" className="flex">
                    <div className="w-5 h-5 bg-[#703EDD] rounded-4xl mb-3"></div>
                    <p className="ml-3 text-[#929292] text-[15px]">
                        Great, keep it up!</p>
                  </div>
                  <div id="pink" className="flex">
                    <div className="w-5 h-5 bg-[#FF6BB7] rounded-4xl mb-3"></div>
                    <p className="ml-3 text-[#929292] text-[15px]">
                        Good, you could do it better.</p>
                  </div>
                  <div id="red" className="flex">
                    <div className="w-5 h-5 bg-[#EF3131] rounded-4xl"></div>
                    <p className="ml-3 text-[#929292] text-[15px]">
                        Oh no! You’re being a lazy cat.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>);
}
export default InfoColor;