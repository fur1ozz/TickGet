"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

interface EventIdProps {
    params: {
        id: number;
    };
}
interface Event {
    id: number;
    name: string;
    location: string;
    description: string;
    date: string;
    time: string;
    standart_ticket_price: number;
    premium_ticket_price: number;
    vip_ticket_price: number;
    standart_ticket_quantity: number;
    premium_ticket_quantity: number;
    vip_ticket_quantity: number;
}

export default function EventId({ params }: EventIdProps) {
    const [eventData, setEventData] = useState<Event | null>(null); // Updated the type and initialized to null
    const [loading, setLoading] = useState(true);
    const [selectedTicketType, setSelectedTicketType] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost/api/events/${params.id}`);
                setEventData(response.data.event);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    const openGoogleMaps = () => {
        if (eventData && eventData.location) {
            const address = encodeURIComponent(eventData.location);
            window.open(`https://www.google.com/maps?q=${address}`, '_blank');
        }
    };
    const eventDate = eventData ? new Date(eventData.date) : null;
    const dayOfWeekAbbreviated = eventDate ? new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(eventDate) : null;

    const handleTicketTypeSelect = (type: string) => {
        setSelectedTicketType(type);
    };
    const handleSubmit = () => {
        console.log("tests");
    }

    return (
        <main
            className="bg-gray-50 dark:bg-darkPrimary bg-cover bg-center bg-fixed"
            style={{ backgroundImage: 'url("/images/street2.jpg")' }}
        >
            <div className="flex flex-col items-center px-4 md:px-6 lg:px-8 py-10 mx-auto min-h-screen bg-darken">
                <h1 className="uppercase font-black text-4xl md:text-7xl lg:text-7xl text-event">ticket {params.id}</h1>
                {loading ? (
                    <p className="text-3xl">Loading...</p>
                ) : eventData === null ? ( // Updated the condition
                    <p>No data available</p>
                ) : (
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-darkPrimary sm:p-5">
                        <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                            <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                                <h3 className="font-semibold ">{eventData.name}</h3>
                            </div>
                        </div>
                        <div>
                            <div className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{eventData.description}</div>
                            <div className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Location</div>
                            {/*<div className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{eventData.location}</div>*/}
                            <button className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 flex" onClick={openGoogleMaps}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                {eventData.location}
                            </button>
                            <div className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                                {`${dayOfWeekAbbreviated}, ${eventData.date} ${eventData.time.split(':').slice(0, 2).join(':')}`}
                            </div>
                        </div>
                        <div className="text-lg text-gray-900 md:text-xl dark:text-white flex w-full justify-center">
                            <h3 className="font-semibold ">Available tickets</h3>
                        </div>
                        <div className="flex w-full justify-around my-2 text-black dark:text-white">
                            <div
                                onClick={() => handleTicketTypeSelect('Standart')}
                                className={`cursor-pointer ${selectedTicketType === 'Standart' ? 'border-b-4 border-primary-500' : ''}`}
                            >
                                <p className="font-bold">Standart</p>
                                <p className="font-bold">${eventData.standart_ticket_price}</p>
                                <p className="font-bold">Quantity</p>
                                <p className="font-bold">{eventData.standart_ticket_quantity}</p>
                            </div>
                            <div
                                onClick={() => handleTicketTypeSelect('Premium')}
                                className={`cursor-pointer ${selectedTicketType === 'Premium' ? 'border-b-4 border-primary-500' : ''}`}
                            >
                                <p className="font-bold">Premium</p>
                                <p className="font-bold">${eventData.premium_ticket_price}</p>
                                <p className="font-bold">Quantity</p>
                                <p className="font-bold">{eventData.standart_ticket_quantity}</p>
                            </div>
                            <div
                                onClick={() => handleTicketTypeSelect('VIP')}
                                className={`cursor-pointer ${selectedTicketType === 'VIP' ? 'border-b-4 border-primary-500' : ''}`}
                            >
                                <p className="font-bold">VIP</p>
                                <p className="font-bold">${eventData.vip_ticket_price}</p>
                                <p className="font-bold">Quantity</p>
                                <p className="font-bold">{eventData.standart_ticket_quantity}</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-3">
                            <button
                                onClick={handleSubmit}
                                type="button"
                                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                disabled={!selectedTicketType} // Disable the button if no ticket type is selected
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
                                </svg>
                                Buy
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
