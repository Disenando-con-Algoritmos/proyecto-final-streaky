import stayconsistent from "../../../assets/stayconsistent.png";
import beginjourney from "../../../assets/beginjourney.png";


export default function StayConsistent() {
    return (
        <section
            className="flex flex-col md:flex-row items-center justify-center 
        gap-2  py-10 md:py-24"
        >
            <img
                src={stayconsistent}
                className="ml-26 w-[450px] md:w-[500px] md:mr-20"
            />

            <img
                src={beginjourney}
                className="w-[330px] md:w-[600px] md:mr-30"
            />
        </section>
    );
}

