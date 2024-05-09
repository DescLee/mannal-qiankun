import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { registerMicroApps, start } from '../micro/index'
import { navList } from './store/sub'

registerMicroApps(navList)
start()

createApp(App).use(router).mount('#main-container')
