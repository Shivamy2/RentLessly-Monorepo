/**
 * Navbar Component
 * Header navigation
 */

'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@rent-lessly/ui';

export function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="border-b border-gray-300 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl hover:text-gray-700">
          Rent Lessly
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm hover:text-gray-600">
            Search
          </Link>
          {user && (
            <>
              <Link href="/saved" className="text-sm hover:text-gray-600">
                Saved
              </Link>
              <Link href="/visits" className="text-sm hover:text-gray-600">
                Visits
              </Link>
            </>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">{user.phoneNumber}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button size="sm" variant="primary">
                Login/Signup
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
