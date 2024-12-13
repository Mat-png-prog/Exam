//src/app/(main)/Navbar.tsxe 
"use client";

import React, { useState } from 'react';
import Link from "next/link";
import UserButton from '@/components/UserButton';
import { useSession } from '@/app/(main)/SessionProvider';
import styles from './app.module.css';

const Navbar: React.FC = () => {
  const { user } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-yellow-300 p-3 flex justify-between w-[100%] h-[40vh]">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          The BookStore
        </Link >
      </div>

      <div className="ml-6 w-full h-full flex items-center justify-between">
        <div>
          {user && (
            <Link href="/books" className="w-auto h-auto hover:text-gray-400 mr-4">
              Edit page
            </Link>
          )}
        </div>
        
        <div>
          <Link href="/about" className={styles.icon}>
            About
          </Link>
        </div>

        <div>
          <Link href="/contact" className={styles.icon}>
            Contact
          </Link>
        </div>

        <UserButton className={styles.icon} />
      </div>
    </nav>
  );
};

export default Navbar;