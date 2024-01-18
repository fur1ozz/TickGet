"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";

interface Event {
    id: number;
    name: string;
    location: string;
    description: string;
    date: string;
    time: string;
    standart_ticket_price: number;
    vip_ticket_price: number;
    created_at: string;
}

export default function Event() {
    const [eventData, setEventData] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/api/events');
                setEventData(response.data.events);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    // console.log(eventData);
    const isNewEvent = (createdDate: string) => {
        const currentDate = new Date();
        const eventDate = new Date(createdDate);
        const differenceInDays = (currentDate.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24);
        return differenceInDays <= 5;
    };

    return (
        <main
            className="bg-gray-50 dark:bg-darkPrimary bg-cover bg-center bg-fixed"
            style={{ backgroundImage: 'url("/images/street2.jpg")' }}
        >
            <div className="flex flex-col items-center px-4 md:px-6 lg:px-8 py-10 mx-auto min-h-screen bg-darken">
                <div className="flex flex-col items-center justify-center h-72 md:h-96 lg:h-96 p-4 md:p-8 lg:p-12">
                    <div className="text-xl md:text-2xl lg:text-3xl tracking-[1rem] pl-[1rem]">upcoming</div>
                    <h1 className="uppercase font-black text-4xl md:text-7xl lg:text-7xl text-event">EVENTS</h1>
                </div>
                <div className="flex flex-wrap justify-center">
                    {loading ? (
                        <p className="text-3xl">Loading...</p>
                    ) : eventData.length === 0 ? (
                        <p>No data available</p>
                    ) : (
                        eventData.map((events) => {
                            const eventDate = new Date(events.date);
                            const dayOfWeekAbbreviated = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(eventDate);

                            const openGoogleMaps = () => {
                                const address = encodeURIComponent(events.location);

                                window.open(`https://www.google.com/maps?q=${address}`, '_blank');
                            };
                            return (
                                <div key={events.id} className="rounded m-5 relative">
                                    {isNewEvent(events.created_at) && (
                                        <span className="absolute top-0 right-0 bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">NEW</span>
                                    )}
                                    <div
                                        className="group w-[320px] h-[230px] shadow-2xl overflow-hidden bg-cover bg-center"
                                        style={{ backgroundImage: 'url("/images/concert1.jpg")' }}
                                    ></div>
                                    <div className="group w-[320px] shadow-2xl overflow-hidden bg-white text-black flex flex-col">
                                        <div className="border-b-[1px] border-black p-4 border-dashed">
                                            <h1 className="mb-2 min-h-10">{events.name}</h1>
                                            <div className="font-semibold">
                                                {`${dayOfWeekAbbreviated}, ${events.date} ${events.time.split(':').slice(0, 2).join(':')}`}
                                            </div>
                                            <button className="flex min-h-10 mb-2" onClick={openGoogleMaps}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                </svg>
                                                {events.location}
                                            </button>
                                            <div className="font-semibold">€ {events.standart_ticket_price} - {events.vip_ticket_price}</div>
                                        </div>
                                        <div className="border-black p-4">
                                            <div>
                                                <Link
                                                    href={`/events/${events.id}`}
                                                    className="bg-black text-white py-2 px-3 rounded"
                                                >
                                                    Buy Tickets
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            {/*{showPopup && <EventPopup onClose={handleClosePopup} />}*/}
        </main>
    );
}
