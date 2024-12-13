/* "use client";

import React from 'react';
import { useSession } from '../SessionProvider';

const About: React.FC = () => {
  const { userCount } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="max-w-4xl px-4 py-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">About The GameStore</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to The GameStore! We are dedicated to providing a platform for personal use, with a limited number of users to maintain quality and exclusivity.
        </p>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Current User Count</h2>
          <p className="text-lg text-gray-700">
            {userCount !== null ? `${userCount} / 100 users` : 'Loading...'}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Pricing</h2>
          <p className="text-lg text-gray-700">200 ZAR for lifetime usage</p>
          <p className="text-lg text-gray-700">Only 6 products can be advertised at a time</p>
        </div>
      </div>
    </div>
  );
};

export default About; */import React from 'react';
import { User, Session } from 'lucia';

interface SessionContextType {
  user: User | null;
  session: Session | null;
  userCount: number;
}

const About: React.FC<{ sessionContextValue: SessionContextType }> = ({ sessionContextValue }) => {
  const { userCount } = sessionContextValue;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="max-w-4xl px-4 py-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">About The GameStore</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to The GameStore! We are dedicated to providing a platform for personal use, with a limited number of users to maintain quality and exclusivity.
        </p>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Current User Count</h2>
          <p className="text-lg text-gray-700">
            {userCount !== null ? `${userCount} / 100 users` : 'Loading...'}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Pricing</h2>
          <p className="text-lg text-gray-700">200 ZAR for lifetime usage</p>
          <p className="text-lg text-gray-700">Only 6 products can be advertised at a time</p>
        </div>
      </div>
    </div>
  );
};

export default About;


