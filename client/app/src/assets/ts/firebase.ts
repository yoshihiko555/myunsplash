import firebase from 'firebase'
// const firebaseui  = require('firebaseui')

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_DATABASEURL,
}

firebase.initializeApp(config)

export default firebase
export const auth = firebase.auth()
export const db = firebase.database()
// export const ui = new firebaseui.auth.AuthUI(auth)
export type FirebaseUser = firebase.User
