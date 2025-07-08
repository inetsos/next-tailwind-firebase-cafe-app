// components/LoginLink.tsx
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'

export default function LoginLink() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    alert('로그아웃 되었습니다.')
  }

  return isLoggedIn ? (
    <button onClick={handleLogout} className="text-sm text-white hover:text-red-200 hover:underline px-4 py-2">
      로그아웃
    </button>
  ) : (
    <Link href="/login" className="text-sm text-white hover:text-blue-200 hover:underline px-4 py-2">
      로그인
    </Link>
  )
}
