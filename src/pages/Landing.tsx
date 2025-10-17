import MakeEveryDay from "../components/mobile/landing/MakeEveryDay";
import BuildGoodHabits from "../components/mobile/landing/BuildGoodHabits";
import StayConsistent from "../components/mobile/landing/StayConsistent";
import Adaptabilities from "../components/mobile/landing/Adaptabilities";
import Footer from "../components/mobile/landing/Footer";
import logo from  "../assets/logo.png";

export default function Landing() {
  return (
    <div className="text-white overflow-hidden">
      <div className="flex justify-start md:px-30 px-10 py-10 md:pb-0 md:pt-10">
        <img
          src={logo}
          alt="Streaky logo"
          className="w-[150px] md:w-[180px]"
        />
      </div>

      {/* Secciones del landing */}
      <MakeEveryDay />
      <BuildGoodHabits />
      <StayConsistent />
      <Adaptabilities />

      {/* Footer */}
      <Footer />

    </div>
  );
}
