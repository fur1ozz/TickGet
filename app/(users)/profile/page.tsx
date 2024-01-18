"use client"
import {useState} from "react";

export default function Profile(){
    const [premiumCheck, setPremiumCheck] = useState(false);
    const [vipCheck, setVipCheck] = useState(false);

    const handlePremiumCheckChange = () => {
        setPremiumCheck(!premiumCheck);
    };

    const handleVipCheckChange = () => {
        setVipCheck(!vipCheck);
    };
    return(
        <main className="bg-gray-50 dark:bg-darkPrimary bg-cover bg-center bg-fixed">
            <div className="flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 py-10 mx-auto min-h-screen">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-ticketBg-200 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Add Event
                        </h3>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col mb-4 md:w-1/2 md:mr-2">
                            <div className="w-full mb-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Event name" required></input>
                            </div>
                            <div className="w-full mb-2">
                                <label htmlFor="loc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                <input type="text" name="loc" id="loc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="location" required></input>
                            </div>
                            <div className="flex mb-2">
                                <div className="w-1/2 mr-2">
                                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                    <input type="date" name="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required></input>
                                </div>
                                <div className="w-1/2 ml-2">
                                    <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                                    <input type="time" name="time" id="time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required></input>
                                </div>
                            </div>
                            <div className="w-full">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea id="description" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write product description here"></textarea>
                            </div>
                        </div>
                        <div className="flex flex-col text-gray-900 dark:text-white mb-4 md:w-1/2 md:ml-2 justify-between">
                            <div className="flex flex-col text-lg font-medium text-ticket-100 mb-2">
                                <div className="flex">
                                    <div className="w-1/2">Standart ticket</div>
                                </div>
                                <div className="flex">
                                    <div className="w-1/2 mr-2">
                                        <label htmlFor="s-price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                        <input
                                            type="number"
                                            name="s-price"
                                            id="s-price"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="25"
                                            required
                                        />
                                    </div>
                                    <div className="w-1/2 ml-2">
                                        <label htmlFor="s-quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                        <input
                                            type="number"
                                            name="s-quantity"
                                            id="s-quantity"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="10"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2 flex flex-col text-lg font-medium text-ticket-200 mb-2">
                                <div className="flex">
                                    <div className="w-1/2">Premium ticket</div>
                                    <div className="w-1/2">
                                        <div className="inline-flex items-center">
                                            <label className="relative flex items-center rounded-full cursor-pointer" htmlFor="premium-check">
                                                <input
                                                    type="checkbox"
                                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-500 checked:bg-purple-500 checked:before:bg-purple-500 hover:before:opacity-10"
                                                    id="premium-check"
                                                    checked={premiumCheck}
                                                    onChange={handlePremiumCheckChange}
                                                />
                                                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                                    </svg>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {premiumCheck && (
                                    <div className="flex">
                                        <div className="w-1/2 mr-2">
                                            <label htmlFor="p-price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                            <input
                                                type="number"
                                                name="p-price"
                                                id="p-price"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="50"
                                                required
                                            />
                                        </div>
                                        <div className="w-1/2 ml-2">
                                            <label htmlFor="p-quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                            <input
                                                type="number"
                                                name="p-quantity"
                                                id="p-quantity"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="10"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="sm:col-span-2 flex flex-col text-lg font-medium text-ticket-300">
                                <div className="flex">
                                    <div className="w-1/2">VIP ticket</div>
                                    <div className="w-1/2">
                                        <div className="inline-flex items-center">
                                            <label className="relative flex items-center rounded-full cursor-pointer" htmlFor="vip-check">
                                                <input
                                                    type="checkbox"
                                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                                                    id="vip-check"
                                                    checked={vipCheck}
                                                    onChange={handleVipCheckChange}
                                                />
                                                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                                    </svg>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {vipCheck && (
                                    <div className="flex">
                                        <div className="w-1/2 mr-2">
                                            <label htmlFor="vip-price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                            <input
                                                type="number"
                                                name="vip-price"
                                                id="vip-price"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="100"
                                                required
                                            />
                                        </div>
                                        <div className="w-1/2 ml-2">
                                            <label htmlFor="vip-quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                            <input
                                                type="number"
                                                name="vip-quantity"
                                                id="vip-quantity"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="10"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="text-white inline-flex items-center bg-newEvent-100 hover:bg-newEvent-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Add New Event
                    </button>
                </div>
            </div>
        </main>
    )
}