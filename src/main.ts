import './utils/firebase'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './registerServiceWorker'
import './router/middleware'

createApp(App).use(router).mount('#app')
