// Copyright (c) 2021 Johannes Thorén // // This Source Code Form is subject to
the terms of the Mozilla Public // License, v. 2.0. If a copy of the MPL was not
distributed with this // file, You can obtain one at
http://mozilla.org/MPL/2.0/.

<template>
	<router-link :to="'/p/' + user_id" class="avatar">
		<img :src="image" />
		<div id="name">{{ username }}</div>
	</router-link>
</template>

<script>
import { api_get_call } from "../api_calls";

export default {
	name: "Avatar",
	props: {
		user_id: String,
	},
	data() {
		return {
			username: "",
			image: "",
		};
	},
	async created() {
		console.log(this.user_id);
		setTimeout(async () => {
			let id = this.user_id;
			const data = await api_get_call(
				this.$store.state.api_root,
				"user/get/id/" + id
			);
			setTimeout(() => {
				this.username = data["username"];
				this.image = data["profile_picture"];
			}, 10);
		}, 100);
	},
};
</script>

<style scoped>
.avatar {
	max-height: 48px;
	width: 200px;
	padding: var(--padding-small);
	display: flex;
	align-items: center;
	border-radius: var(--radius);
	border: 0.5px solid var(--accent-3);
	text-decoration: none;
}

#name {
	margin: auto;
	text-align: center;
	width: 70%;
	overflow-x: hidden;
}

.avatar img {
	width: 36px;
	height: 36px;
	border-radius: 100%;
	margin-left: 5px;
	margin-right: 5px;
}

.avatar span {
	font-size: 1.2em;
}
</style>
