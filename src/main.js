// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {createApp} from 'vue'
import App from './App.vue'

import "../style/LGJT-ClassLib/style/LGJT.css"
import router from './router'
import store from './store'
import cookie from './plugins/cookie'

export const app = createApp(App).use(store).use(router).use(cookie).mount('#app')
