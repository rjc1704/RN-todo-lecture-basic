import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyCLVH96xE91GeHzQIdomwBeekyhXfom6fM",
  authDomain: "sample12-28823.firebaseapp.com",
  projectId: "sample12-28823",
  storageBucket: "sample12-28823.appspot.com",
  messagingSenderId: "800845592741",
  appId: "1:800845592741:web:40c68e7860d421444c354c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
