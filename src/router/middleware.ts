import userState from '@/store/user'
import { watch } from '@vue/runtime-core'
import router from './index'

router.beforeEach((to, from, next) => {
  let watching = false

  if (to.matched.some((record) => record.meta.authRequired)) {
    watching = true

    watch(userState.ready, () => {
      if (userState.isAuth.value) return next()
      else {
        return next({
          path: '/login',
          params: {
            ref: to.path
          }
        })
      }
    })
  }

  if (to.matched.some((record) => record.meta.preAuth)) {
    watching = true

    watch(userState.ready, () => {
      if (userState.isAuth.value) return next('/')
      else next()
    })
  }

  if (!watching) next()
})
