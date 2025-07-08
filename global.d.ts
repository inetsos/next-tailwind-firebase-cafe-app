// 타입 확장을 통해 TypeScript 오류 제거
declare global {
  interface Window {
    recaptchaVerifier: import('firebase/auth').RecaptchaVerifier,
    Kakao: any;
  }
}
