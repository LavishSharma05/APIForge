// src/components/Header.tsx
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useHistoryStore from '@/store/useHistory';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    useHistoryStore.getState().clearHistory()
    router.push('/login');
  };

  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link href="/">APIForge</Link>
      </h1>

      <nav className="space-x-4">
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="bg-blue-600 px-3 py-1 rounded">Login</Link>
            <Link href="/signup" className="bg-green-600 px-3 py-1 rounded">Signup</Link>
          </>
        )}
      </nav>

    </header>
  );
}
