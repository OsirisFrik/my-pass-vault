<template>
  <div>
    <button @click="loginGoogle">
      Login
    </button>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import auth, { googlePovider } from '@/utils/firebase/auth'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup () {
    const { query } = useRoute()

    function loginGoogle () {
      auth.signInWithPopup(googlePovider)
        .then((): void => {
          router.replace({
            path: query.ref && typeof query.ref === 'string' ? query.ref : '/'
          })
        })
    }

    return {
      loginGoogle
    }
  }
})
</script>
