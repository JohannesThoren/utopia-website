// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

<template>
  <div>
    <SignIn
      v-if="b_show_sign_in"
      @show-signup="b_show_sign_up = true"
      @close-signin="b_show_sign_in = false"
    />
    <SignUp v-if="b_show_sign_up" @close-signup="b_show_sign_up = false" />
    <NewBoard
      v-if="b_show_new_board"
      @close-new-board="b_show_new_board = false"
    />
    <SiteHeader
      @show-signup="b_show_sign_up = true"
      @show-signin="b_show_sign_in = true"
      @show-new-board="b_show_new_board = true"
    />
    <router-view />
  </div>
</template>

<script>
import SiteHeader from "./components/SiteHeader.vue";
import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";
import NewBoard from "./components/NewBoard.vue";

import {token_authorize} from "./api_calls"

export default {
  components: {
    SiteHeader,
    SignIn,
    SignUp,
    NewBoard,
  },
  data() {
    return {
      b_show_sign_in: false,
      b_show_sign_up: false,
      b_show_new_board: false,
    };
  },
  async created() {
    let token = this.$cookie.get("token")
    if(token != null) {
      let data = await token_authorize(token, this.$store.state.api_root)
      this.$store.commit('authorized')
      this.$store.commit('set_user', [data["id"], data["username"], data["image"]])
      this.$cookie.set("token", data["token"])
    }
  }
};
</script>

