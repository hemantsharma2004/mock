'use client';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import Link from 'next/link';

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      {/* Logo */}
      <Link href="/">
      <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight hover:text-blue-700 transition-all">
        Mockly<span className="text-slate-400 text-sm ml-1 align-top">AI</span>
      </h1>
    </Link>

      {/* Navigation */}
      <ul className="flex space-x-6 text-gray-700 font-medium text-xl">
        <li>
          <Link
            href="/dashboard"
            className={`hover:text-blue-600 transition-all ${
              path === '/dashboard' ? 'text-primary font-bold' : ''
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/question"
            className={`hover:text-blue-600 transition-all ${
              path === '/dashboard/questions' ? 'text-primary font-bold' : ''
            }`}
          >
            Questions
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/upgrade"
            className={`hover:text-blue-600 transition-all ${
              path === '/dashboard/upgrade' ? 'text-primary font-bold' : ''
            }`}
          >
            Upgrade
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/how"
            className={`hover:text-blue-600 transition-all ${
              path === '/dashboard/how' ? 'text-primary font-bold' : ''
            }`}
          >
            How it works
          </Link>
        </li>
      </ul>

      {/* User Button */}
      <UserButton />
    </div>
  );
}

export default Header;
