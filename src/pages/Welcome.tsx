import GlobalBtn from "../components/mobile/welcome/GlobalBtn";
import miffyCompleto from "../assets/miffy-completo.png";
import AsteriscoGris from "../assets/asterisco-gris.png";
import VectorVioleta from "../assets/Vector-violeta.png";
import AsteriscoOuline from "../assets/asterisco-ounline.png";
import { useNavigate } from "react-router";

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <div
            className="relative flex flex-col justify-center items-center 
      h-screen text-center bg-[#171717] 
      text-[#F9FAFB] s" 
        >
            {/* Vector Violeta izquierdo */}
            <img
                src={VectorVioleta}
                alt="Vector Violeta"
                className="w-[200px] 
        sm:w-[150px] absolute top-0 left-0 lg:w-[180px]"
            />

            {/* Asterisco Outline detrás del gato */}
            <img
                src={AsteriscoOuline}
                alt="Asterisco Outline"
                className="hidden sm:block lg:w-[270px] absolute left-[35%] z-0 bottom-0"
            />

            {/* Texto principal */}
            <div className="z-10 px-4" >
                <p className="font-bold text-[36px] sm:text-[60px]">
                    Welcome Jenny!
                </p>
                <p className="text-[16px] sm:text-[20px] pt-[20px]">
                    Start adding your first habit ✏️
                </p>
            </div>

            {/* Botón */}
            <div className="lg:mb-[200px] sm:mt-[50px] mt-[30px]">
                <GlobalBtn text="Start" type="button" onClick={() => navigate("feed")} />
            </div>

            {/* Imagen del Miffy */}
            <img
                src={miffyCompleto}
                alt="Miffy completo"
                className="w-[300px] sm:w-[200px] lg:w-[300px] absolute
                bottom-0 left-1/2 transform -translate-x-1/2 z-10"
            />

            {/* Asterisco gris (esquina inferior derecha) */}
            <img
                src={AsteriscoGris}
                alt="Asterisco Gris"
                className="w-[160px] top-125 absolute  lg:bottom-0 right-0 lg:w-[180px] lg:top-100"
            />
        </div>
    );
}
