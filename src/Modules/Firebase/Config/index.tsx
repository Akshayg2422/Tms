import { initializeApp } from 'firebase/app';
import { getMessaging } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyALHRM7TgPr6Jf33KK5iEf38o0IPk05ZCg",
    authDomain: "qunata-tms.firebaseapp.com",
    projectId: "qunata-tms",
    storageBucket: "qunata-tms.appspot.com",
    messagingSenderId: "542870698459",
    appId: "1:542870698459:web:2d78445e059c0973f10ffe",
    measurementId: "G-QVT58EMGY6"
};

export const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app)