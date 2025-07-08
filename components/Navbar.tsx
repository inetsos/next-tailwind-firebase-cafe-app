// components/Navbar.tsx
'use client'

import Link from 'next/link'
import LoginLink from './LoginLink'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          MyApp
        </Link>
        <div className="space-x-4">
          <LoginLink />
          <Link href="/board" className="hover:underline">
            게시판
          </Link>
          <Link href="/admin" className="hover:underline">
            관리자
          </Link>
        </div>
      </div>
    </nav>
  )
}
