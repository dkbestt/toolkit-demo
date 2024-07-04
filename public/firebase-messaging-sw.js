

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');



// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyAZql0f6Ae1AgEML0bzJzvG8C8jp6Rcyns",
  authDomain: "triftel-b7728.firebaseapp.com",
  projectId: "triftel-b7728",
  storageBucket: "triftel-b7728.appspot.com",
  messagingSenderId: "170308493922",
  appId: "1:170308493922:web:e4afd4dfde4eb7efd2a73b",
  measurementId: "G-KQZXHEP2B2"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});