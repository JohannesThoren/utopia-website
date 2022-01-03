// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

<template>
	<div id="post" class="card">
		<div id="header" class="card-header">
			<router-link :to="'/post/' + id" class="title center-text">{{
				title
			}}</router-link>
		</div>
		<div id="content" class="card-content">
			<pre v-if="flag == 'TEXT'">{{ content }}</pre>
			<img id="img" v-if="flag == 'IMAGE'" :src="content" alt="" />
		</div>

		<div class="card-footer">
			<Avatar :user_id="author" />
			<div class="btn-group">
				<router-link class="btn btn-hollow" :to="'/b/' + board_id"
					>To board</router-link
				>
				<button
					class="btn warning-bg"
					v-if="currentUserId == author && $store.state.authorized"
					@click="fn_delete"
				>
					<i class="fas fa-trash-alt"></i>Delete
				</button>
			</div>
		</div>
	</div>
</template>      

<script>
import Avatar from "./Avatar.vue";
import { api_get_call, api_post_call } from "../api_calls";

export default {
	name: "Post",
	data() {
		return {
			currentUserId: "",
			b_blur: true,

		};
	},
	props: {
		author: String,
		title: String,
		content: String,
		flag: String,
		id: String,
		board_id: String,
	},
	components: {
		Avatar,
	},
	methods: {
		async fn_delete() {
			const data = await api_post_call(
				{ token: this.$cookie.get("token") },
				this.$store.state.api_root,
				`post/${this.id}/delete`
			);
			this.$router.go();
			return data;
		},
	},
	async created() {
		const token = this.$cookie.get("token");
		const data = await api_get_call(
			this.$store.state.api_root,
			`user/get/token/${token}`
		);
		this.currentUserId = data["id"];


	},
};
</script>

<style scoped>
.card-footer {
	box-shadow: var(--shadow);
	justify-content: space-between;
}

#img {
	max-width: 30vw;
	max-height: 35vh;
	margin: auto;
	box-sizing: border-box;
}


#content {
	display: grid;
}

#content pre {
	padding: var(--padding-large);
	white-space: pre-line;
	font-family: var(--font);
	overflow-x: wrap;
	overflow-wrap: break-word;
}
#header {
	padding: var(--padding-medium);
	display: flex;
	align-items: center;
	box-shadow: var(--shadow);
	gap: 10px;
}

.title {
	font-size: 1.5em;
	text-decoration: none;
}
</style>
