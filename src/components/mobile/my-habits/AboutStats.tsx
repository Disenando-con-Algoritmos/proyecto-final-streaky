import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function InfoColor() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-92 md:max-w-2xl mx-auto mt-6">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#1B1B1B] rounded-2xl overflow-hidden transition-all 
        duration-500 ease-in-out cursor-pointer shadow-md"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-12">
          <p className="text-[#A1A1AA] font-semibold text-lg md:text-xl">
            About the Stats
          </p>
          {isOpen ? (
            <IoIosArrowUp className="text-2xl text-[#A1A1AA] transition-transform duration-300" />
          ) : (
            <IoIosArrowDown className="text-2xl text-[#A1A1AA] transition-transform duration-300" />
          )}
        </div>

        {/* Contenido desplegable */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pb-6 text-[#C1C1C1] text-sm">
            <p className="text-[#A1A1AA] text-base leading-relaxed">
              Colors help you monitor your progress with your habits — get to
              know them.
            </p>

            <div className="mt-4 space-y-3">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-[#B1F042] rounded-full" />
                <p className="ml-3 text-[#A1A1AA] text-sm">
                  Excellent, you’re awesome!
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-[#703EDD] rounded-full" />
                <p className="ml-3 text-[#A1A1AA] text-sm">
                  Great, keep it up!
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-[#FF6BB7] rounded-full" />
                <p className="ml-3 text-[#A1A1AA] text-sm">
                  Good, you could do better.
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-[#EF3131] rounded-full" />
                <p className="ml-3 text-[#A1A1AA] text-sm">
                  Oh no! You’re being a lazy cat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoColor;
