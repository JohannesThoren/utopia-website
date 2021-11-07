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
