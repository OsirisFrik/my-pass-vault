<template>
  <div>
    <form @submit.prevent="signUp">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required>
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        minlength="8"
        required>
      <input
        v-model="passwordValid"
        type="password"
        placeholder="Validate Password"
        minlength="8"
        required>
      <input
        v-model="firstName"
        type="text"
        placeholder="First Name">
      <input
        v-model="lastName"
        type="text"
        placeholder="Last Name">
      <button>
        Sign Up
      </button>
    </form>
  </div>
</template>
<script lang="ts">
import router from '@/router'
import auth from '@/utils/firebase/auth'
import db from '@/utils/firebase/database'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const email = ref<string>()
    const password = ref<string>()
    const firstName = ref<string>()
    const lastName = ref<string>()
    const passwordValid = ref<string>()

    function signUp (): void {
      if (!email.value) return
      if (!password.value) return
      if (password.value !== passwordValid.value) return

      auth.createUserWithEmailAndPassword(
        email.value,
        password.value
      ).then(async (user) => {
        if (user !== null && user.user) {
          console.log(user.user)
          await user.user.updateProfile({
            displayName: `${firstName.value} ${lastName.value}`
          })

          db.collection('users').doc(user.user.uid)
            .set({
              firstName: firstName.value,
              lastName: lastName.value,
              email: email.value
            })
            .then(() => router.replace('/'))
        }
      })
    }

    return {
      email,
      password,
      passwordValid,
      firstName,
      lastName,
      signUp
    }
  }
})
</script>
