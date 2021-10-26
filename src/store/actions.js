// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { api_root } from "../globalvars";
import store from "./index"


export default {
      // actions
      async loginAction(context, payload) {
            const url_get_token = api_root + "user/auth";
            const token_body = {"username": payload[0], "password": payload[1]}
            const token_response = await fetch(url_get_token, {method: 'POST', body: JSON.stringify(token_body)});
            const token_data = await token_response.json();

            store.commit('authorized')

            document.cookie = `token=${token_data["token"]}`

            const url_get_user = api_root + `user/get/token/${token_data["token"]}`;
            const user_response = await fetch(url_get_user);
            const user_data = await user_response.json();
            
            store.commit('set_user', [user_data["id"], user_data["username"], user_data["image"]])

      }

}