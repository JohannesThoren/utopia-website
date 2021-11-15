// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { createStore } from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'

export default createStore({
  state: {
    api_root: "http://localhost:3500/",
    authorized: false,
    postMaxChars: 1000,
    user: {
      id: String,
      name: String,
      image: String,
    }
  },
  mutations: mutations,
  actions: actions,
  modules: {
  }
})
