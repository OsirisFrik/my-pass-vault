<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
  <div v-if="isAuth">
    Hi {{ user.displayName }}
    <button @click="logout">
      LogOut
    </button>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import userState from '@/store/user'
import auth from '@/utils/firebase/auth'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup () {
    function logout () {
      auth.signOut()
        .then(() => router.replace({
          path: '/login'
        }))
    }

    return {
      ...userState,
      logout
    }
  }
})
</script>
