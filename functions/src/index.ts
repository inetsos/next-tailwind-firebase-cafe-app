import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

interface KakaoLoginRequest {
  token: string
}

admin.initializeApp();

export const kakaoLogin = functions.https.onCall(
  {region: "asia-northeast3"},
  async (request: functions.https.CallableRequest<KakaoLoginRequest>) => {
    const {token} = request.data;

    // Kakao 사용자 정보 가져오기
    const kakaoUser = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const uid = `kakao:${kakaoUser.data.id}`;

    // Firebase Custom Token 발급
    const firebaseToken = await admin.auth().createCustomToken(uid, {
      provider: "KAKAO",
      nickname: kakaoUser.data.properties.nickname,
    });

    return {firebaseToken};
  }
);
