import { reactive, ToRefs, toRefs } from 'vue'
import firebase from 'firebase/app'
import auth from '@/utils/firebase/auth'

interface UserState {
  user: firebase.User | null
  isAuth: boolean
  ready: boolean
}

function userAuth (): ToRefs<UserState> {
  const state = reactive<UserState>({
    isAuth: false,
    ready: false,
    user: null
  })

  auth.onAuthStateChanged((user) => {
    if (!user) {
      state.isAuth = false
      state.user = null
    } else {
      state.isAuth = true
      state.user = user
    }

    state.ready = true
  })

  return {
    ...toRefs(state)
  }
}

export default userAuth()
