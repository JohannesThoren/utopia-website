// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

<template>
	<div>
		<div id="background" @click="$emit('close-signin')"></div>

		<div id="signin" class="card">
			<div class="card-header">
				<div class="title center-text">Sign In</div>
			</div>
			<p v-if="b_show_error" class="warning-fg center-text">
				Invalid password or username
			</p>
			<div id="input" class="card-content center-text">
				<input
					class="input"
					v-model="username"
					type="text"
					name="username"
					placeholder="Username"
				/>
				<br />
				<input
					class="input"
					v-model="password"
					type="password"
					name="password"
					placeholder="Password"
				/>
				<br />
				<button class="btn center-item" @click="login([username, password])">
					Sign In
				</button>
				<p class="center-text">
					If you dont have an account you can sign up
					<span
						id="signup"
						@click="
							$emit('show-signup');
							$emit('close-signin');
						"
						>here</span
					>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
      return {
          username: "",
          password: "",
          b_show_error: false,
      };
  },
    methods: {
        ...mapActions(["loginAction"]),
        async login(credentials) {
            if (await this.loginAction(credentials)) {
                this.$emit("close-signin");
                this.$router.go();
            } else {
                this.b_show_error = true;
                this.username = "";
                this.password = "";
            }
        },
    },
};
</script>

<style scoped>
input {
	width: 50%;
}
.card {
	z-index: 10;
}

#background {
	position: absolute;
	top: 0;
	background-color: rgba(10, 10, 10, 0.8);
	height: 100vh;
	width: 100%;
	z-index: 100;
}

#signin {
	z-index: 101;
	width: 30%;
	color: var(--text-accent);
	position: absolute;
	top: 5%;
	left: 35%;
	right: 35%;
}

#input * {
	margin-top: 10px;
}

#signup {
	text-decoration: underline;
	cursor: pointer;
	color: var(--accent-3);
	font-weight: 600;
}
</style>