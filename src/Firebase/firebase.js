import firebase from "firebase";
import 'firebase/database';

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyD9b5owEFE1Y6NvM7ciVohYey3CQTN9xa0",
  authDomain: "dh2642-project-6245b.firebaseapp.com",
  databaseURL: "https://dh2642-project-6245b-default-rtdb.firebaseio.com",
  projectId: "dh2642-project-6245b",
  storageBucket: "dh2642-project-6245b.appspot.com",
  messagingSenderId: "629573782865",
  appId: "1:629573782865:web:f0c9602944f96214851770"
};
if(firebase.apps.length === 0){
    firebase.initializeApp(config);
}

export const db = firebase.database();

//export default firebase;