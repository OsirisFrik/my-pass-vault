import firebase from 'firebase/app'
import 'firebase/auth'

const auth = firebase.auth()
const googlePovider = new firebase.auth.GoogleAuthProvider()

export default auth
export {
  googlePovider
}
