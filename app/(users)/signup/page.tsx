"use client"

import { useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import {handleInputChange} from "@/app/components/TwoWayBinding";
import {ToastGreen, ToastYellow} from "@/app/components/Toasts";
// import {useRouter} from "next/router";

export default function Home() {
    // const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm_password: '',
    });

    const handleChange = handleInputChange(formData, setFormData);
    const [errorToast, setErrorToast] = useState<string | null>(null);
    const [successToast, setSuccessToast] = useState<string | null>(null);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log(formData);
        if (!formData.email) {
            console.log({ message: 'Write email' });
            setErrorToast('Write email');
            setTimeout(() => setErrorToast(null), 4000);
            return;
        }
        if (!formData.password || !formData.confirm_password) {
            console.log({ message: 'Write your password' });
            setErrorToast('Write your password');
            setTimeout(() => setErrorToast(null), 4000);
            return;
        }
        if (formData.password !== formData.confirm_password) {
            console.log({ message: 'Passwords do not match' });
            setErrorToast('Passwords do not match');
            setTimeout(() => setErrorToast(null), 4000);
            return;
        }

        try {
            const response = await axios.post('http://localhost/api/register', {
                email: formData.email,
                password: formData.password,
            });

            const data = response.data;

            console.log(data);

            if (data.response === 'good') {
                setFormData({
                    email: '',
                    password: '',
                    confirm_password: '',
                });
                setSuccessToast(data.message);
                setTimeout(() => setSuccessToast(null), 4000);
            }
            else{
                setErrorToast(data.message);
                setTimeout(() => setErrorToast(null), 4000);
            }
        } catch (error) {
            console.error(error);
            setErrorToast("An error occurred while processing your request.");
            setTimeout(() => setErrorToast(null), 4000);
        }
    };

    return (
        <section
            className="bg-gray-50 dark:bg-gray-900 bg-cover bg-center"
            style={{ backgroundImage: 'url("/images/landscape5.jpg")' }}
        >
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                {errorToast && <ToastYellow text={errorToast} />}
                {successToast && <ToastGreen text={successToast} />}
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-ticketBg-300 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    name="confirm_password"
                                    id="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                        I accept the{' '}
                                        <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Create an account
                            </button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link legacyBehavior href="/login">
                                    <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
