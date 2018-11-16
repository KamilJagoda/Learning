import firebase from 'firebase'
// eslint-disable-next-line
import firestore from 'firebase/firestore'
// Initialize Firebase
var config = {
  apiKey: 'AIzaSyARwyeuV6uTQdMx5X4fXjrOdnEAvAMijrA',
  authDomain: 'vue-smoothies-4dbbf.firebaseapp.com',
  databaseURL: 'https://vue-smoothies-4dbbf.firebaseio.com',
  projectId: 'vue-smoothies-4dbbf',
  storageBucket: 'vue-smoothies-4dbbf.appspot.com',
  messagingSenderId: '421653518028'
}
const firebaseApp = firebase.initializeApp(config)
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// exort firestore database
export default firebaseApp.firestore()
