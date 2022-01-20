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
		<SignUp
			v-if="b_show_sign_up"
			@close-signup="b_show_sign_up = false"
			@show-signin="b_show_sign_in = true"
		/>
		<NewBoard
			v-if="b_show_new_board"
			@close-new-board="b_show_new_board = false"
		/>
		<SiteHeader
			id="header"
			@show-signup="b_show_sign_up = true"
			@show-signin="b_show_sign_in = true"
			@show-new-board="b_show_new_board = true"
		/>
		<div id="view" tabindex="-1">
			<router-view :key="view" />
		</div>
	</div>
</template>

<script>
import SiteHeader from "./components/SiteHeader.vue";
import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";
import NewBoard from "./components/NewBoard.vue";

import { token_authorize } from "./api_calls";

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
    // when the component is created we try to fetch the token from the cookies
		let token = this.$cookie.get("token");

    // if there is a token cookie we try to authorize a user with that cookie
		if (token != null) {

      // here we send a token_authorize request to the server
			let data = await token_authorize(token, this.$store.state.api_root);

      // if the response code we get back is 200
			if (data["response code"] == 200) {

        // we authorize the user and sets the user in the store
				this.$store.commit("authorized");
				this.$store.commit("set_user", [
					data["id"],
					data["username"],
					data["image"],
				]);

        // then updates the token (you get a new token every time you sign in)
				this.$cookie.set("token", data["token"]);
			}
		}
	},
};
</script>

<style scoped>
#hidden-btn {
  transform: translateY(-120%);
  position: absolute;
	z-index: 1000;
}

#hidden-btn:focus {
  transition: 0.5s;
  transform: translateY(120%);
  color:green;
  background-color:black  
}
#view {
	padding: var(--padding-small);
	padding-top: 5rem;
	width: 90vw;
	margin: auto;
}
</style>