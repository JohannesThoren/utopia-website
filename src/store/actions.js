// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {api_get_call, api_post_call} from "../api_calls"
import store from "./index"


export default {
      // actions
      async loginAction(context, payload) {
            const token_body = {"username": payload[0], "password": payload[1]}
            const token = await api_post_call(token_body, store.state.api_root, "user/auth")
      
            document.cookie = `token=${token["token"]}`
            store.commit('authorized')

            const user_data = await api_get_call(store.state.api_root, `user/get/token/${token["token"]}`)
            store.commit('set_user', [user_data["id"], user_data["username"], user_data["image"]])

      }
}