// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { api_get_call, api_post_call } from "../api_calls"
import store from "./index"
// import app from '../main'

export default {

      //  login action, used to sign in the user.
      async loginAction(context, payload) {

            // first we get the username a and password from the payload
            const TokenBody = { "username": payload[0], "password": payload[1] }

            // we then send that to the api server and in response get the user + token, if the credentials check out
            const User = await api_post_call(TokenBody, store.state.api_root, "user/auth")

            // we then checks if the token exists (aka if the credentials checked out)
            if (User["token"] !== undefined) {

                  const Token = Token["token"]
                  // here we create the token cookie
                  document.cookie = `token=${Token}`

                  // Get all user data with the token
                  const UserData = await api_get_call(store.state.api_root, `user/get/token/${Token}`)

                  // Commits to the store that the user is authorized and the user daya
                  store.commit('authorized')
                  store.commit('set_user', [UserData["id"], UserData["username"], UserData["image"]])
                  
                  return true
            }
            else {
                  return false
            }

      }
}