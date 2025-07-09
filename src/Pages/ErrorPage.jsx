// src/Components/ErrorPage.jsx
import React from 'react';
import { Link } from 'react-router';
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ErrorPage = () => {

    return (
        // Added py-8 for vertical padding on all screen sizes
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
            <div className="text-center p-8 bg-white shadow-xl rounded-lg max-w-lg w-full">
                <div className="text-red-500 mb-6">
                    {/* Simple SVG error icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                    Oops!
                </h1>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Something went wrong.
                </p>
                <p className="text-md text-gray-600 mb-8">
                    We're sorry, but there was an issue processing your request or loading the page.
                </p>
                <Link to={"/"}
                    className="btn btn-primary text-white hover:scale-105 transition-transform duration-200"
                >
                    <IoArrowBackCircleOutline size={25} />
                    Go to Home Page
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;