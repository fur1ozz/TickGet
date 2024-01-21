"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import {handleInputChange} from "@/app/components/TwoWayBinding";

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
    category: string;
}
export default function Event() {
    const [eventData, setEventData] = useState<Event[]>([]);
    const [filteredData, setFilteredData] = useState<Event[]>([]); // Add filteredData state
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchCatQuery, setSearchCatQuery] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/api/events');
                const currentDate = new Date();
                const futureEvents = response.data.events.filter((event: Event) => {
                    const eventDate = new Date(event.date);
                    return eventDate.getTime() >= currentDate.getTime();
                });
                setEventData(futureEvents);
                setFilteredData(futureEvents);
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
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSortOption = e.target.value;
        setSortOption(selectedSortOption);

        if (selectedSortOption === 'soonest') {
            const sortedEvents = [...eventData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setEventData(sortedEvents);
        } else if (selectedSortOption === 'latest') {
            const sortedEvents = [...eventData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setEventData(sortedEvents);
        } else {
            setEventData(eventData);
        }
    };
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCatQuery("");
        const query = e.target.value;
        setSearchQuery(query);

        // Filter events based on the search query
        const filteredEvents = eventData.filter((event) =>
            event.name.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredData(filteredEvents);
    };
    const handleCatSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery("");
        const query = e.target.value;
        setSearchCatQuery(query);

        // Filter events based on the search query
        const filteredEvents = eventData.filter((event) =>
            event.category.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredData(filteredEvents);
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
                {loading ? (
                    <div>

                    </div>
                ) : (
                    <div className="flex flex-wrap">
                        <div className="flex flex-col mr-2">
                            <label htmlFor="search" className="block mb-1 text-base font-semibold text-white">
                                Search
                            </label>
                            <input
                                type="text"
                                id="search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 block w-52 p-2.5 dark:bg-ticketBg-200 dark:border-ticketBg-300 dark:placeholder-gray-400 dark:text-white"
                                value={searchQuery}
                                onChange={handleSearchInput}
                            />
                        </div>
                        <div className="flex flex-col mr-2">
                            <label htmlFor="sort" className="block mb-1 text-base font-semibold text-white">By happening date</label>
                            <select
                                id="sort"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 block w-52 p-2.5 dark:bg-ticketBg-200 dark:border-ticketBg-300 dark:placeholder-gray-400 dark:text-white"
                                value={sortOption}
                                onChange={handleSortChange}
                            >
                                <option value=""></option>
                                <option value="soonest">Soonest</option>
                                <option value="latest">Latest</option>
                            </select>
                        </div>
                        <div className="flex flex-col mr-2">
                            <label htmlFor="searchCat" className="block mb-1 text-base font-semibold text-white">
                                Search by Category
                            </label>
                            <input
                                type="text"
                                id="searchCat"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 block w-52 p-2.5 dark:bg-ticketBg-200 dark:border-ticketBg-300 dark:placeholder-gray-400 dark:text-white"
                                value={searchCatQuery}
                                onChange={handleCatSearchInput}
                            />
                        </div>
                    </div>

                )}
                <div className="flex flex-wrap justify-center">
                    {loading ? (
                        <p className="text-3xl">Loading...</p>
                    ) : filteredData.length === 0 ? (
                        <p>No data available</p>
                    ) : (
                        filteredData.map((events) => {
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
