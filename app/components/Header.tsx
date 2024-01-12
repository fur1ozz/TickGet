"use client"
import React, {useState} from 'react';
import Link from "next/link";
import {ThemeSwitcher} from "@/app/components/ThemeSwitcher";
import { usePathname } from 'next/navigation'

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname()

    // @ts-ignores
    const username = localStorage.getItem("TickGetUsername");

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return(
        <>
            <header className="absolute z-10 w-full">
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a className="flex items-center">
                            <span className="text-black self-center text-xl font-semibold whitespace-nowrap dark:text-white">TickGet</span>
                        </a>
                        <div className="flex items-center lg:order-2">
                            <ThemeSwitcher />
                            {username ? (
                                <Link
                                    href="/profile"
                                    class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
                                >
                                    <span className="font-medium text-gray-600 dark:text-gray-300">{username}</span>
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                >
                                    Login
                                </Link>
                            )}
                            <button
                                onClick={handleMobileMenuToggle}
                                type="button"
                                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-expanded={mobileMenuOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                        <div
                            className={`${
                                mobileMenuOpen ? "block" : "hidden"
                            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
                            id="mobile-menu-2"
                        >
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <Link
                                        href="/"
                                        className={`block py-2 pr-4 pl-3 lg:bg-transparent lg:p-0 border-b border-gray-100 dark:border-gray-700 lg:border-0 ${pathname === '/' ? 'bg-primary-700 lg:text-primary-700 text-white dark:text-white rounded' : 'text-gray-700 dark:text-gray-400'}`}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className={`block py-2 pr-4 pl-3 lg:bg-transparent lg:p-0 border-b border-gray-100 dark:border-gray-700 lg:border-0 ${pathname === '#' ? 'bg-primary-700 lg:text-primary-700 text-white dark:text-white rounded' : 'text-gray-700 dark:text-gray-400'}`}
                                    >
                                        Tickets
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;