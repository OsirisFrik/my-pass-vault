import userState from '@/store/user'
import { watch } from '@vue/runtime-core'
import router from './index'

router.beforeEach((to, from, next) => {
  let watching = false

  if (to.matched.some((record) => record.meta.authRequired)) {
    if (userState.ready.value) {
      if (userState.isAuth.value) return next()
      else {
        return next({
          path: '/login',
          query: {
            ref: to.path
          }
        })
      }
    } else {
      watching = true

      watch(userState.ready, () => {
        if (userState.isAuth.value) return next()
        else {
          return next({
            path: '/login',
            query: {
              ref: to.path
            }
          })
        }
      })
    }
  }

  if (to.matched.some((record) => record.meta.preAuth)) {
    if (userState.ready.value) {
      if (userState.isAuth.value) return next('/')
      else next()
    } else {
      watching = true

      watch(userState.ready, () => {
        if (userState.isAuth.value) return next('/')
        else next()
      })
    }
  }

  if (!watching) next()
})
