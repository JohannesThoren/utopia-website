// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

<template>
	<div @keydown.enter="signup()">
		<div id="background" @click="$emit('close-signup')"></div>

		<div id="signup" class="card">
			<div class="card-header center-text">
				<div class="title">Sign Up</div>
			</div>
			<div id="input" class="card-content center-text">
				<input
					v-model="username"
					class="input"
					type="text"
					name="name"
					id="username"
					placeholder="Username"
				/><br />
				<input
					v-model="email"
					class="input"
					type="email"
					name="email"
					id="email"
					placeholder="Email"
				/><br />
				<input
					v-model="pass1"
					class="input"
					type="password"
					name="password1"
					id="password1"
					placeholder="Password"
				/><br />
				<input
					v-model="pass2"
					class="input"
					type="password"
					name="password2"
					id="password2"
					placeholder="Confirm Password"
				/>
				<br />
				<p class="warning-fg center-text" v-if="checkPassword == false">
					Password is not matching
				</p>

				<p class="warning-fg center-item" v-if="err">
					{{ err }}
				</p>

				<button
					class="btn ok-bg center-item"
					@click="signup()"
					v-if="checkPassword == true"
				>
					Sign Up
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { api_post_call } from "../api_calls.js";
export default {
	data() {
		return {
			pass1: "",
			pass2: "",
			username: "",
			email: "",
			err: "",
		};
	},
	methods: {
		async signup() {
			const body = {
				username: this.username,
				password: this.pass1,
				email: this.email,
			};
			const data = await api_post_call(
				body,
				this.$store.state.api_root,
				"user/new"
			);

			if (data["response code"] == 200) {
				this.$emit("close-signup");
				this.$emit("show-signin");
			} else {
				this.err = data["err"];
			}
		},
	},
	computed: {
		checkPassword() {
			if (this.pass1 != "" && this.pass2 != "") {
				if (this.pass1 == this.pass2) return true;
				else return false;
			}
			return null;
		},
	},
};
</script>

<style scoped>
#background {
	z-index: 100;
	position: absolute;
	top: 0;
	background-color: rgba(10, 10, 10, 0.8);
	height: 100vh;
	width: 100%;
}
#signup {
	width: 30%;
	margin: auto;
	top: 5%;
	color: var(--text-accent);
	position: absolute;
	left: 35%;
	right: 35%;
	z-index: 101;
}

#input * {
	margin-top: 10px;
}

input {
	width: 50%;
}
</style>