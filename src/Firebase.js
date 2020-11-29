import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDJlId97IjV1kvbBUGmPxgbcIYbXXp6aQQ",
  authDomain: "student-from.firebaseapp.com",
  databaseURL: "https://student-from.firebaseio.com",
  projectId: "student-from",
  storageBucket: "student-from.appspot.com",
  messagingSenderId: "1095595443882",
  appId: "1:1095595443882:web:c35076ab47924cef6a32d3"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

