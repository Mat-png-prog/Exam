//src/components/not-found.tsx

import Link from "next/link";
import React from "react";
import type { FC } from "react"; 
const NotFoundPage: FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">Page Not Found</h1>
      <div className="w-64 h-64 md:w-96 md:h-96 relative">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <rect x="40" y="20" width="120" height="160" rx="10" fill="#f0f0f0" stroke="#2c3e50" strokeWidth="4" />
          <rect x="50" y="30" width="100" height="140" rx="5" fill="#ecf0f1" stroke="#34495e" strokeWidth="2" />
          <text x="100" y="100" fontFamily="Arial, sans-serif" fontSize="48" fill="#2c3e50" textAnchor="middle">404</text>
          <path d="M70 50 L130 50" stroke="#34495e" strokeWidth="2" />
          <path d="M70 70 L130 70" stroke="#34495e" strokeWidth="2" />
          <path d="M70 90 L130 90" stroke="#34495e" strokeWidth="2" />
          <circle cx="100" cy="170" r="15" fill="#e74c3c" />
        </svg>
      </div>
      <p className="text-xl md:text-2xl text-gray-600 mt-8 text-center px-4">
        Sorry, the page you&apos;re looking for is not in our bookstore.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;

