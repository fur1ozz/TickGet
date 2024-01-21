"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import {ToastGreen, ToastYellow} from "@/app/components/Toasts";

interface PurchaseHistory {
    id: number;
    user_id: number;
    event_id: number;
    ticket_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
}

interface EventData {
    purchase_history: PurchaseHistory;
    event: Event;
}

interface Event {
    id: number;
    name: string;
    location: string;
    description: string;
    date: string;
    time: string;
    standart_ticket_id: number;
    premium_ticket_id: number;
    vip_ticket_id: number;
    created_at: string;
    updated_at: string;
    category: string;
}

const History = () => {
    const [eventData, setEventData] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState<string[]>([]);

    const [errorToast, setErrorToast] = useState<string | null>(null);
    const [successToast, setSuccessToast] = useState<string | null>(null);

    const userId = localStorage.getItem("userId") || "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost/api/purchase-history', {
                    user_id: userId
                });
                const sortedData = response.data.purchase_history_with_events.sort((a: { purchase_history: { created_at: string | number | Date; }; }, b: { purchase_history: { created_at: string | number | Date; }; }) => {
                    return new Date(b.purchase_history.created_at).getTime() - new Date(a.purchase_history.created_at).getTime();
                });
                setEventData(sortedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const handleReviewChange = (index: number, value: string) => {
        const newReviews = [...reviews];
        newReviews[index] = value;
        setReviews(newReviews);
    };
    const handleReviewSubmit = async (userId: string, eventId: number, review: string, idToDefault: number,) => {
        try {
            const response = await axios.post('http://localhost/api/reviews', {
                user_id: userId,
                event_id: eventId,
                review: review,
            });

            console.log('LOG', response.data);

            const newReviews = '';
            handleReviewChange(idToDefault, newReviews);

            setSuccessToast(response.data.message);
            console.log(reviews);
            setTimeout(() => setSuccessToast(null), 4000);

        } catch (error) {
            console.error('Error submitting review:', error);
            setErrorToast("Failed to submit review");
            setTimeout(() => setErrorToast(null), 4000);
        }
    };

    return (
        <>
            <main className="bg-gray-50 dark:bg-darkPrimary bg-cover bg-center bg-fixed">
                <div className="flex flex-col items-center px-4 md:px-6 lg:px-8 py-10 mx-auto min-h-screen bg-darken">
                    {errorToast && <ToastYellow text={errorToast} />}
                    {successToast && <ToastGreen text={successToast} />}
                    <div className="flex flex-col items-center justify-center h-64 md:h-96 lg:h-96 p-4 md:p-8 lg:p-12">
                        <div className="text-xl md:text-2xl lg:text-3xl tracking-[1rem] pl-[1rem]">purchase</div>
                        <h1 className="uppercase font-black text-4xl md:text-7xl lg:text-7xl text-event">History</h1>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        {loading ? (
                            <p className="text-3xl">Loading...</p>
                        ) : eventData.length === 0 ? (
                            <p>No data available</p>
                        ) : (
                            eventData.map(({ purchase_history, event }) => {
                                const eventDate = new Date(event.date);
                                const dayOfWeekAbbreviated = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(eventDate);
                                const formattedPurchaseDate = new Date(purchase_history.created_at).toLocaleDateString('en-US');

                                const openGoogleMaps = () => {
                                    const address = encodeURIComponent(event.location);
                                    window.open(`https://www.google.com/maps?q=${address}`, '_blank');
                                };
                                const handleReviewSubmitClick = () => {
                                    const review = reviews[purchase_history.id] || '';
                                    if (review){
                                        handleReviewSubmit(userId, event.id, review, purchase_history.id);
                                    } else {
                                        setErrorToast("review is empty");
                                        setTimeout(() => setErrorToast(null), 4000);
                                    }
                                };

                                return (
                                    <div key={purchase_history.id} className="rounded sm:m-5 my-5 relative">
                                        <div className="group w-[320px] shadow-2xl overflow-hidden bg-white text-black flex flex-col">
                                            <div className="border-b-[1px] border-black p-4 border-dashed">
                                                <h1 className="mb-2 min-h-10">{event.name}</h1>
                                                <div className="font-semibold">
                                                    {`${dayOfWeekAbbreviated}, ${event.date} ${event.time.split(':').slice(0, 2).join(':')}`}
                                                </div>
                                                <button className="flex min-h-10 mb-2" onClick={openGoogleMaps}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                    </svg>
                                                    {event.location}
                                                </button>
                                                <div className="font-semibold">
                                                    You bought this ticket at - {formattedPurchaseDate}
                                                </div>
                                            </div>
                                            <div className="border-black p-4">
                                                <div>
                                                    <textarea
                                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-0 mb-2"
                                                        placeholder="Write product review here"
                                                        value={reviews[purchase_history.id]}
                                                        onChange={(e) => handleReviewChange(purchase_history.id, e.target.value)}
                                                        required
                                                    />
                                                    <button
                                                        className="bg-black text-white py-2 px-3 rounded"
                                                        onClick={handleReviewSubmitClick}
                                                    >
                                                        Leave a review
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

export default History;
