// Firebase Cloud Messaging Configuration File. 
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyALHRM7TgPr6Jf33KK5iEf38o0IPk05ZCg",
    authDomain: "qunata-tms.firebaseapp.com",
    projectId: "qunata-tms",
    storageBucket: "qunata-tms.appspot.com",
    messagingSenderId: "542870698459",
    appId: "1:542870698459:web:2d78445e059c0973f10ffe",
    measurementId: "G-QVT58EMGY6"
};


initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: "BJ6Zhlt6n6SvJ1vb6ERTdgbdPfa-mQY0_2ojN28VyUAXoNI0TqRdFpZisYdrHz6aHps1f2jnTElAr0FXF4aIJME" })
        .then((currentToken) => {
            if (currentToken) {
                console.log("----------->",currentToken);

                // Perform any other neccessary action with the token
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
    new Promise((resolve:any) => {
        onMessage(messaging, (payload) => {
            console.log("payload-------->",payload);
            resolve(payload);
        });
    });

