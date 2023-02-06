import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import Directives from '@/directives'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import './assets/main.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(Directives)
app.use(pinia)
app.use(router)

Object.assign(window, {
  app: app.mount('#app'),
  router,
  pinia,
})
