// Copyright (c) 2021 Johannes Thorén // // This Source Code Form is subject to
the terms of the Mozilla Public // License, v. 2.0. If a copy of the MPL was not
distributed with this // file, You can obtain one at
http://mozilla.org/MPL/2.0/. // Copyright (c) 2021 Johannes Thorén // // This
Source Code Form is subject to the terms of the Mozilla Public // License, v.
2.0. If a copy of the MPL was not distributed with this // file, You can obtain
one at http://mozilla.org/MPL/2.0/. // TODO reverse the list of posts!!

<template>
	<div id="list">
		<Post
			v-for="post in posts"
			:key="post"
			:author="post['author']"
			:title="post['title']"
			:content="post['content']"
			:flag="post['flag']"
			:id="post['id']"
			:board_id="post['board']"
		/>
	</div>
</template>

<script>
import Post from "./Post.vue";
import { api_get_call } from "../api_calls";

export default {
	name: "ProfilePostList",
	components: {
		Post,
	},
	data() {
		return {
			posts: [],
		};
	},
	methods: {
		redirect_add() {
			this.$emit("new-post");
		},
	},
	async created() {
		const data = await api_get_call(
			this.$store.state.api_root,
			`user/${this.$route.params.id}/get/posts`
		);
		for (var index in data) {
			this.posts.push(data[index]);
			console.log(data[index]);
		}

		this.posts.reverse();
	},
};
</script>

<style scoped>
#list * {
	width: 100%;
}
</style>
