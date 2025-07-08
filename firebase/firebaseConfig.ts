// firebase/firebaseConfig.ts
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

// ✅ 여기 값을 Firebase 콘솔에서 복사해서 넣으세요
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// 중복 초기화 방지
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

declare global {
  interface Window {
    FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean | string
  }

  interface Self {
    FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean | string
  }
}

// ✅ App Check 초기화 (한 번만 실행)
if (typeof window !== 'undefined') {
  // 개발 중 디버깅용 토큰 사용 가능
  if (process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG === 'true') {
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
  }

  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY! // 콘솔에서 발급받은 site key
    ),
    isTokenAutoRefreshEnabled: true, // 자동 갱신 활성화
  })
}

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
