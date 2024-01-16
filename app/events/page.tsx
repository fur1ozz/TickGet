"use client"
import {useState} from "react";
import EventPopup from "@/app/components/EventPopup";

export default function Event() {
    const [showPopup, setShowPopup] = useState(false);

    const handleLearnMoreClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    return (
        <section
            className="bg-gray-50 dark:bg-darkPrimary bg-cover bg-center"
            style={{ backgroundImage: 'url("/images/street2.jpg")' }}
        >
            <div className="flex flex-col items-center px-4 md:px-6 lg:px-8 py-10 mx-auto min-h-screen bg-darken">
                <div className="flex flex-col items-center justify-center h-72 md:h-96 lg:h-96 p-4 md:p-8 lg:p-12">
                    <div className="text-xl md:text-2xl lg:text-3xl tracking-[1rem] pl-[1rem]">upcoming</div>
                    <h1 className="uppercase font-black text-4xl md:text-7xl lg:text-7xl text-event">EVENTS</h1>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div
                        className="group w-[320px] h-[300px] shadow-2xl overflow-hidden bg-cover bg-center rounded m-5"
                        style={{ backgroundImage: 'url("/images/concert1.jpg")' }}
                    >
                        <div className="w-full h-full bg-darken flex flex-col justify-between ">
                            <div className="">
                                <h1 className="flex pt-5 justify-center text-white uppercase text-4xl font-bold">Travis</h1>
                                <div className="flex pt-1 justify-center text-white text-lg font-semibold">Kiipsala</div>
                            </div>
                            <button
                                className="mt-2 p-2 text-lg text-white"
                                onClick={handleLearnMoreClick}
                            >
                                Learn more
                            </button>
                            <div className="flex items-end justify-center text-white text-lg font-semibold">
                                <div className="w-1/2 p-2 flex">01.12.2025</div>
                                <div className="w-1/2 p-2 flex justify-end">16:40</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {showPopup && <EventPopup onClose={handleClosePopup} />}
        </section>
    );
}
