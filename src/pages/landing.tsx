import MakeEveryDay from "../components/mobile/landing/MakeEveryDay";
import BuildGoodHabits from "../components/mobile/landing/BuildGoodHabits";
import StayConsistent from "../components/mobile/landing/StayConsistent";
import Adaptabilities from "../components/mobile/landing/Adaptabilities";
import Footer from "../components/mobile/landing/footer";

export default function Landing() {
  return (
    <div className="bg-[#141414] text-white w-full overflow-x-hidden">
      <MakeEveryDay />
      < BuildGoodHabits />
       <StayConsistent />
      <Adaptabilities />
      <Footer/>
    </div>
  );
}
