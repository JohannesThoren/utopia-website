// Copyright (c) 2021 Johannes Thorén // // This Source Code Form is subject to
the terms of the Mozilla Public // License, v. 2.0. If a copy of the MPL was not
distributed with this // file, You can obtain one at
http://mozilla.org/MPL/2.0/.

<template>
	<router-link tabindex="-1" :to="'/p/' + user_id" class="avatar" :id="user_id">
		<img :src="profile_picture" alt="profile pic"/>
		<div id="name">{{ username }}</div>
	</router-link>
</template>


<style scoped>
img {	
	width: 65%;
	object-fit: contain;
	aspect-ratio: 1/1;
	border-radius: 100%;
	border: 0.5px solid var(--accent-1)
}

.avatar {
	text-align: center;
	text-decoration: none;
	display: grid;
	grid-template-columns: 0.5fr 1.5fr;
	height: 100%;
	width: 200px;
	max-height: 40px;
	align-items: center;
	border: 0.5px solid var(--accent-2);
	border-radius: var(--radius);
	padding: var(--padding-small)
}

</style>

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
			profile_picture: "",
		};
	},
	async created() {
		setTimeout(async () => {
			let id = this.user_id;
			const data = await api_get_call(
				this.$store.state.api_root,
				"user/get/id/" + id
			);
			setTimeout(() => {
				this.username = data["username"];
				this.profile_picture = data["profile_picture"];
			}, 10);
		}, 100);
	},
};
</script>

