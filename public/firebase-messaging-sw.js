// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js%27);
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js%27);
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyALHRM7TgPr6Jf33KK5iEf38o0IPk05ZCg",
    authDomain: "qunata-tms.firebaseapp.com",
    projectId: "qunata-tms",
    storageBucket: "qunata-tms.appspot.com",
    messagingSenderId: "542870698459",
    appId: "1:542870698459:web:2d78445e059c0973f10ffe",
    measurementId: "G-QVT58EMGY6"
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || payload.notification.image,
  }

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions)
})

// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', (event) => {
  if (event.action) {
    clients.openWindow(event.action)
  }
  event.notification.close()
})