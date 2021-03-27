import firebase from 'firebase/app'

const settings = JSON.parse(process.env.VUE_APP_FIREBASE || '{}')

firebase.initializeApp(settings)
