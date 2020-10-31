import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/functions'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
const apiKey = process.env.NEXT_PUBLIC_API_KEY

const config = {
  projectId,
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  storageBucket: `${projectId}.appspot.com`,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

firebase.functions().useEmulator('localhost', 5001)
firebase.auth().useEmulator('http://localhost:9099/')

export default firebase