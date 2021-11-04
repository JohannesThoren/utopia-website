import {createApp} from 'vue'
import App from './App.vue'

import "../style/LGJT-ClassLib/style/LGJT.css"
import router from './router'
import store from './store'
import cookie from './plugins/cookie'


createApp(App).use(cookie).use(store).use(router).use(cookie).mount('#app')
