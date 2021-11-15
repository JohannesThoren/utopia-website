// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { api_get_call, api_post_call } from "../api_calls"
import store from "./index"
// import app from '../main'

export default {
      // actions
      async loginAction(context, payload) {
            const TokenBody = { "username": payload[0], "password": payload[1] }
            const Token = await api_post_call(TokenBody, store.state.api_root, "user/auth")

            if (Token["token"] != undefined) {

                  const TmpToken = Token["token"]

                  document.cookie = `token=${TmpToken}`

                  const UserData = await api_get_call(store.state.api_root, `user/get/token/${TmpToken}`)

                  store.commit('authorized')
                  store.commit('set_user', [UserData["id"], UserData["username"], UserData["image"]])
                  
                  return true
            }
            else {
                  return false
            }

      }
}